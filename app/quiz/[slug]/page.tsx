/**
 * Quiz Sayfası Bileşeni
 * 
 * Dinamik quiz uygulaması. URL parametresinden aldığı konu slug'ına göre
 * ilgili soruları yükler ve interaktif bir sınav deneyimi sunar.
 * 
 * Özellikler:
 * - 20 dakikalık zamanlayıcı
 * - Soruları teker teker cevaplama
 * - Gerçek zamanlı ilerleme takibi
 * - Sınav sonrası detaylı sonuç raporu
 * - Responsive tasarım
 * - Her sorunun doğru cevabı ve açıklaması
 * 
 * Route: /quiz/[slug] (örn: /quiz/anayasa, /quiz/5902)
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Question, QuizAnswer } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Trophy, RotateCcw, Home, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

/**
 * Soru Benzersizliği ve Seçim Utility Fonksiyonları
 */

/**
 * Soruları benzersizleştirme fonksiyonu
 * Aynı soru metnine sahip soruları filtreler ve benzersiz ID atar
 * 
 * @param questions - Filtrelenecek sorular
 * @returns Benzersiz sorular
 */
const removeDuplicateQuestions = (questions: Question[]): Question[] => {
  const seen = new Set<string>();
  const uniqueQuestions: Question[] = [];
  
  questions.forEach((question, index) => {
    // Soru metni ve seçenekleri üzerinden benzersizlik kontrolü
    const questionKey = `${question.question.trim().toLowerCase()}|${question.options.map(opt => opt.trim().toLowerCase()).sort().join('|')}`;
    
    if (!seen.has(questionKey)) {
      seen.add(questionKey);
      // Sorulara benzersiz ID ata (eğer yoksa)
      uniqueQuestions.push({
        ...question,
        id: question.id || `q_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`
      });
    }
  });
  
  return uniqueQuestions;
};

/**
 * Gelişmiş Fisher-Yates shuffle algoritması
 * Kriptografik olarak güvenli rastgele sayı üretici kullanır
 * 
 * @param array - Karıştırılacak dizi
 * @returns Karıştırılmış dizi
 */
const secureShuffleArray = <T extends any>(array: T[]): T[] => {
  const shuffled = [...array];
  
  // Crypto API'si varsa kullan, yoksa Math.random() kullan
  const getRandomInt = (max: number): number => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const cryptoArray = new Uint32Array(1);
      window.crypto.getRandomValues(cryptoArray);
      return cryptoArray[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Quiz Sayfası Ana Bileşeni
 * 
 * Dynamic routing ile gelen slug parametresine göre quiz sayfasını render eder.
 * Zamanlayıcı, soru-cevap yönetimi, sonuç hesaplama gibi tüm quiz mantığını içerir.
 * 
 * @param params - Next.js dynamic route parametreleri
 * @param params.slug - Konu slug'ı (URL'den gelir)
 */
export default function QuizPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams();
  const questionCount = parseInt(searchParams.get('count') || '20', 10); // Varsayılan 20 soru
  
  // Soru sayısına göre süre hesaplama (soru başına 30 saniye)
  const calculateTimeLimit = (count: number) => {
    const timePerQuestion = 30; // 30 saniye per soru
    return count * timePerQuestion;
  };

  // State Yönetimi
  const [topicQuestions, setTopicQuestions] = useState<Question[]>([]);      // Quiz soruları
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);                 // Kullanıcı cevapları
  const [isSubmitted, setIsSubmitted] = useState(false);                    // Sınav bitiş durumu
  const [timeLeft, setTimeLeft] = useState(calculateTimeLimit(questionCount)); // Kalan süre (saniye)
  const [isTimeUp, setIsTimeUp] = useState(false);                          // Süre doldu mu?
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);        // Sınavı bitir onay popup'ı

  /**
   * Zamanlayıcı Effect Hook'u
   * 
   * Her saniye kalan süreyi 1 azaltır.
   * Süre 0'a ulaştığında sınavı otomatik olarak bitirir.
   * Sınav bittiğinde veya süre dolduğunda timer'ı durdurur.
   */
  useEffect(() => {
    if (isSubmitted || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);      // Süre doldu flag'ini set et
          setIsSubmitted(true);   // Sınavı otomatik bitir
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);  // Cleanup: Timer'ı temizle
  }, [isSubmitted, isTimeUp]);

  /**
   * Soru Yükleme Effect Hook'u
   * 
   * Slug değiştiğinde ilgili konunun sorularını JSON dosyasından yükler.
   * Query parameter'dan gelen soru sayısı kadar rastgele soru seçer.
   * Aynı sorunun birden fazla kez seçilmesini engeller.
   */
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // JSON dosyasından soruları yükle
        const response = await fetch(`/data/questions/${params.slug}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const q: Question[] = await response.json();
        
        // Soru benzersizliğini kontrol et ve mükerrer soruları temizle
        const uniqueQuestions = removeDuplicateQuestions(q);
        
        // Debug: Soru sayıları logla
        console.log(`Toplam soru sayısı: ${q.length}`);
        console.log(`Benzersiz soru sayısı: ${uniqueQuestions.length}`);
        console.log(`Mükerrer soru sayısı: ${q.length - uniqueQuestions.length}`);
        
        // Güvenli rastgele soru seçimi
        const shuffledQuestions = secureShuffleArray(uniqueQuestions);
        const availableQuestions = Math.min(questionCount, shuffledQuestions.length);
        const quizQuestions = shuffledQuestions.slice(0, availableQuestions);
        
        // Final kontrol: Seçilen soruların benzersiz olduğunu doğrula
        const finalQuestions = quizQuestions.filter((question, index, self) =>
          index === self.findIndex(q => q.id === question.id)
        );
        
        // Debug: Seçilen soruları logla
        console.log(`İstenilen soru sayısı: ${questionCount}`);
        console.log(`Seçilen soru sayısı: ${quizQuestions.length}`);
        console.log(`Final benzersiz soru sayısı: ${finalQuestions.length}`);
        
        // Eğer istenilen soru sayısı mevcut soru sayısından fazlaysa uyarı ver
        if (questionCount > uniqueQuestions.length) {
          console.warn(`İstenilen soru sayısı (${questionCount}) mevcut benzersiz soru sayısından (${uniqueQuestions.length}) fazla. ${availableQuestions} soru gösterilecek.`);
        }
        
        setTopicQuestions(finalQuestions);
        
        setTopicQuestions(quizQuestions);
      } catch (error) {
        console.error('Sorular yüklenirken hata oluştu:', error);
        // Hata durumunda boş dizi set et
        setTopicQuestions([]);
      }
    };

    loadQuestions();
  }, [params.slug, questionCount]);

  /**
   * Zaman Formatlama Fonksiyonu
   * 
   * Saniye cinsinden gelen süreyi MM:SS formatına çevirir.
   * 
   * @param seconds - Saniye cinsinden süre
   * @returns MM:SS formatında string (örn: "05:30")
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Cevap İşleme Fonksiyonu
   * 
   * Kullanıcı bir soruya cevap verdiğinde çalışır.
   * Cevabın doğruluğunu kontrol eder ve state'i günceller.
   * 
   * @param questionIndex - Cevaplanacak sorunun index'i
   * @param selectedAnswer - Kullanıcının seçtiği cevap
   */
  const handleAnswer = (questionIndex: number, selectedAnswer: string) => {
    if (isSubmitted) return; // Sınav bitmişse cevap kabul edilmez

    const question = topicQuestions[questionIndex];
    const isCorrect = selectedAnswer === question.answer; // Doğruluk kontrolü

    setAnswers(prev => {
      const existing = prev.find(a => a.questionIndex === questionIndex);
      if (existing) {
        // Daha önce cevaplanmış soruyu güncelle
        return prev.map(a => 
          a.questionIndex === questionIndex 
            ? { ...a, selectedAnswer, isCorrect }
            : a
        );
      }
      // Yeni cevap ekle
      return [...prev, { questionIndex, selectedAnswer, isCorrect }];
    });
  };

  /**
   * Sınav Bitirme Onay Fonksiyonu
   * 
   * Kullanıcı "Sınavı Bitir" butonuna bastığında önce onay popup'ını gösterir.
   */
  const handleSubmitRequest = () => {
    setShowSubmitConfirm(true);
  };

  /**
   * Sınav Bitirme Fonksiyonu
   * 
   * Kullanıcı onay verdikten sonra çalışır.
   * Sınavı sonlandırır ve sonuç ekranına geçer.
   */
  const handleSubmit = () => {
    setShowSubmitConfirm(false);
    setIsSubmitted(true);
  };

  /**
   * Sınav Bitirme İptal Fonksiyonu
   * 
   * Kullanıcı onay popup'ında iptal ederse çalışır.
   */
  const handleSubmitCancel = () => {
    setShowSubmitConfirm(false);
  };

  /**
   * Sınavı Yeniden Başlatma Fonksiyonu
   * 
   * Tüm state'leri sıfırlar ve sınavı baştan başlatır.
   * Sonuç ekranından tekrar sınava dönmek için kullanılır.
   */
  const handleRestart = () => {
    setAnswers([]);                               // Tüm cevapları sil
    setIsSubmitted(false);                        // Sınav durumunu sıfırla
    setTimeLeft(calculateTimeLimit(questionCount)); // Süreyi seçilen soru sayısına göre ayarla
    setIsTimeUp(false);                           // Süre doldu flag'ini sıfırla
  };

  /**
   * Belirli Bir Soru İçin Cevap Getirme Fonksiyonu
   * 
   * Verilen index'e sahip sorunun kullanıcı cevabını bulur.
   * 
   * @param questionIndex - Sorunun index'i
   * @returns QuizAnswer | undefined
   */
  const getAnswerForQuestion = (questionIndex: number) => {
    return answers.find(a => a.questionIndex === questionIndex);
  };

  // Hesaplanan değerler (her render'da güncellenir)
  const score = answers.filter(a => a.isCorrect).length;              // Doğru cevap sayısı
  const answeredCount = answers.length;                               // Toplam cevaplanan soru sayısı
  const progressPercentage = (answeredCount / topicQuestions.length) * 100; // İlerleme yüzdesi
  const topicTitle = getTopicTitle(params.slug);                      // Konunun başlığı

  /**
   * Yükleme Durumu
   * 
   * Sorular henüz yüklenmemişse loading ekranı gösterir.
   */
  if (topicQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Sorular yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Ana Sayfa
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 text-center flex-1 mx-4">
              {topicTitle}
            </h1>
            <div className="flex items-center space-x-4">
              {!isSubmitted && (
                <>
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    timeLeft <= 300 ? 'bg-red-100 text-red-700' : timeLeft <= 600 ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Clock className="h-4 w-4" />
                    <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {answeredCount} / {topicQuestions.length}
                  </div>
                  <Button 
                    onClick={handleSubmitRequest}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Trophy className="mr-1 h-4 w-4" />
                    Sınavı Bitir
                  </Button>
                </>
              )}
              {isSubmitted && (
                <div className="text-sm text-gray-500">
                  Sınav Tamamlandı
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {!isSubmitted && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">İlerleme</span>
              <span className="text-sm text-gray-500">%{Math.round(progressPercentage)}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto p-4 md:p-8">
        {!isSubmitted ? (
          <>
            {/* Quiz Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {topicQuestions.map((question, index) => {
                const userAnswer = getAnswerForQuestion(index);
                
                return (
                  <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                        <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </span>
                        Soru {index + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {question.question.replace(/\\n/g, '\n')}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = userAnswer?.selectedAnswer === option;
                          
                          return (
                            <Button
                              key={option}
                              onClick={() => handleAnswer(index, option)}
                              className={`justify-start text-left h-auto min-h-[3rem] py-3 px-4 text-sm transition-all duration-200 border-2 ${
                                isSelected
                                  ? 'bg-blue-100 border-blue-500 text-blue-800 hover:bg-blue-100'
                                  : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                              }`}
                              variant="outline"
                            >
                              <div className="flex items-start w-full">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 mt-1 text-xs font-semibold flex-shrink-0 ${
                                  isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'
                                }`}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className="flex-1 text-left leading-relaxed whitespace-pre-wrap break-words pt-0.5">{option.replace(/\\n/g, '\n')}</span>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          /* Results */
          <div className="max-w-6xl mx-auto">
            {/* Score Card */}
            <Card className="text-center border-0 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
              <CardHeader className="pb-6">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                    <Trophy className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {isTimeUp ? 'Süre Doldu!' : 'Sınav Tamamlandı!'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">{score}</div>
                  <div className="text-xl text-gray-600">/ {topicQuestions.length} doğru</div>
                  <div className="text-lg text-gray-500 mt-2">
                    Başarı oranınız: %{Math.round((score / topicQuestions.length) * 100)}
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${(score / topicQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    onClick={handleRestart}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Tekrar Dene
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Ana Sayfa
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topicQuestions.map((question, index) => {
                const userAnswer = getAnswerForQuestion(index);
                const isCorrect = userAnswer?.isCorrect ?? false;
                const wasAnswered = userAnswer !== undefined;
                
                return (
                  <Card key={index} className={`border-0 shadow-lg ${
                    !wasAnswered ? 'bg-gray-50' : isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                          !wasAnswered ? 'bg-gray-400 text-white' : isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="flex-1">Soru {index + 1}</span>
                        {!wasAnswered ? (
                          <XCircle className="h-6 w-6 text-gray-500" />
                        ) : isCorrect ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-600" />
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {question.question.replace(/\\n/g, '\n')}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isCorrectAnswer = option === question.answer;
                          const isUserAnswer = userAnswer?.selectedAnswer === option;
                          
                          let className = "p-4 rounded-lg border-2 text-sm min-h-[3rem] ";
                          if (isCorrectAnswer) {
                            className += "bg-green-100 border-green-500 text-green-800";
                          } else if (isUserAnswer && !isCorrectAnswer) {
                            className += "bg-red-100 border-red-500 text-red-800";
                          } else {
                            className += "bg-gray-50 border-gray-200 text-gray-700";
                          }
                          
                          return (
                            <div key={option} className={className}>
                              <div className="flex items-start">
                                <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 mt-1 text-xs font-semibold flex-shrink-0">
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className="flex-1 text-left leading-relaxed whitespace-pre-wrap break-words pt-0.5">{option.replace(/\\n/g, '\n')}</span>
                                <div className="flex-shrink-0 ml-2 mt-1">
                                  {isCorrectAnswer && (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="h-5 w-5 text-red-600" />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      {question.explanation && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
                                <strong>Açıklama:</strong> {question.explanation.replace(/\\n/g, '\n')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Status */}
                      <div className="text-center py-2">
                        {!wasAnswered ? (
                          <span className="text-sm text-gray-500 font-medium">Cevaplanmadı</span>
                        ) : isCorrect ? (
                          <span className="text-sm text-green-600 font-medium">✓ Doğru</span>
                        ) : (
                          <span className="text-sm text-red-600 font-medium">✗ Yanlış</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Submit Confirmation Popup */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl bg-white">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Sınavı Bitirmek İstediğinizden Emin Misiniz?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  <span className="font-semibold">{answeredCount}</span> / {topicQuestions.length} soru cevaplanmış
                </p>
                {answeredCount < topicQuestions.length && (
                  <p className="text-amber-600 text-sm">
                    <span className="font-semibold">{topicQuestions.length - answeredCount}</span> soru henüz cevaplanmamış
                  </p>
                )}
                <p className="mt-3 text-sm">
                  Sınavı bitirdikten sonra cevaplarınızı değiştiremezsiniz.
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleSubmitCancel}
                  variant="outline" 
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Evet, Bitir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/**
 * Konu Başlığı Getirme Yardımcı Fonksiyonu
 * 
 * URL slug'ından konu başlığını döndürür.
 * Ana sayfada gösterilen konu listesi ile quiz sayfası arasında tutarlılık sağlar.
 * 
 * @param slug - URL'den gelen konu tanımlayıcısı
 * @returns Konunun tam başlığı (bulunamazsa 'Quiz' döner)
 * 
 * @example
 * getTopicTitle('anayasa') → 'Türkiye Cumhuriyeti Anayasası'
 * getTopicTitle('5902') → '5902 Sayılı Afet ve Acil Durum Yönetimi Kanunu'
 */
function getTopicTitle(slug: string): string {
  /**
   * Konu Başlıkları Haritası
   * 
   * Her slug için karşılık gelen tam başlığı tutar.
   * Kategoriler:
   * - Temel konular: Anayasa, Atatürk, Türkçe
   * - Kanunlar: Sayılı kanunlar (5902, 7269, vs.)
   * - Yönetmelikler: Uygulama yönetmelikleri
   * - Personel mevzuatı: Memur hakları ve sorumlulukları
   */
  const topicTitles: Record<string, string> = {
    // Temel Bilgiler
    'anayasa': 'Türkiye Cumhuriyeti Anayasası',
    'ataturk': 'Atatürk İlkeleri ve İnkılap Tarihi',
    'turkce': 'Türkçe ve Dil Bilgisi',
    
    // Afet Mevzuatı - Kanunlar
    '5902': '5902 Sayılı Afet ve Acil Durum Yönetimi Kanunu',
    '7269': '7269 Sayılı Kanun',
    '4123': '4123 Sayılı Kanun',
    '7126': '7126 Sayılı Sivil Savunma Kanunu',
    '4': '4 Sayılı Cumhurbaşkanlığı Kararnamesi',
    
    // Yönetmelikler
    'afet-yonetim-merkezleri': 'Afet ve Acil Durum Yönetim Merkezleri Yönetmeliği',
    'afet-mudahale-hizmetleri': 'Afet ve Acil Durum Müdahale Hizmetleri Yönetmeliği',
    'afet-harcamalari': 'Afet ve Acil Durum Harcamaları Yönetmeliği',
    'afetlerin-genel-hayata-etkililigi': 'Afetlerin Genel Hayata Etkililiğine İlişkin Yönetmelik',
    'buyuksehir-belediyeleri-harcamalar': 'Büyükşehir Belediyeleri Harcama Yönetmeliği',
    'binalarin-yangindan-korunmasi': 'Binaların Yangından Korunması Hakkında Yönetmelik',
    
    // Personel Mevzuatı
    'afad-personeli-gorevde-yukselme': 'AFAD Personeli Görevde Yükselme Yönetmeliği',
    '657': '657 Sayılı Devlet Memurları Kanunu',
    '4982': '4982 Sayılı Bilgi Edinme Hakkı Kanunu',
    '3071': '3071 Sayılı Dilekçe Hakkının Kullanılmasına Dair Kanun',
    '5018': '5018 Sayılı Kamu Mali Yönetimi ve Kontrol Kanunu',
    '6245': '6245 Sayılı Harcırah Kanunu',
    '3628': '3628 Sayılı Mal Bildiriminde Bulunulması Kanunu',
    '4483': '4483 Sayılı Memurların Yargılanması Hakkında Kanun',
    '2577': '2577 Sayılı İdari Yargılama Usulü Kanunu',
    '6331': '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu',
    '5442': '5442 Sayılı İl İdaresi Kanunu',
    'devlet-memurlari-disiplin': 'Devlet Memurları Disiplin Yönetmeliği',
    'resmi-yazismalar': 'Resmî Yazışmalarda Uygulanacak Usul ve Esaslar',
    'devlet-memurlari-sikayet': 'Devlet Memurlarının Şikayet ve Müracaatları Yönetmeliği',
    'kamu-gorevlileri-etik': 'Kamu Görevlileri Etik Davranış İlkeleri Yönetmeliği',
    'devlet-memurlari-hastalik-raporlari': 'Devlet Memurları Hastalık Raporları Yönetmeliği',
  };
  
  return topicTitles[slug] || 'Quiz';
}