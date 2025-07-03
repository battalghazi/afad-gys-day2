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
import { questions, Question } from '@/lib/questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Trophy, RotateCcw, Home, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

/**
 * Quiz Cevap Interface'i
 * 
 * Kullanıcının verdiği her cevap için gerekli bilgileri tutar.
 * 
 * @property questionIndex - Sorunun index numarası (0'dan başlar)
 * @property selectedAnswer - Kullanıcının seçtiği cevap metni
 * @property isCorrect - Cevabın doğru olup olmadığı (boolean)
 */
interface QuizAnswer {
  questionIndex: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

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
  // State Yönetimi
  const [topicQuestions, setTopicQuestions] = useState<Question[]>([]);      // Quiz soruları
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);                 // Kullanıcı cevapları
  const [isSubmitted, setIsSubmitted] = useState(false);                    // Sınav bitiş durumu
  const [timeLeft, setTimeLeft] = useState(20 * 60);                        // Kalan süre (saniye)
  const [isTimeUp, setIsTimeUp] = useState(false);                          // Süre doldu mu?

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
   * Slug değiştiğinde ilgili konunun sorularını yükler.
   * Mevcut soru havuzundan rastgele 20 soru seçer.
   */
  useEffect(() => {
    const q = questions[params.slug] || [];
    
    // Rastgele soru seçimi için Fisher-Yates shuffle algoritması
    const shuffleArray = (array: Question[]) => {
      const shuffled = [...array]; // Orijinal diziyi korumak için kopyala
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Soruları karıştır ve ilk 20'sini al
    const shuffledQuestions = shuffleArray(q);
    const quizQuestions = shuffledQuestions.slice(0, Math.min(20, shuffledQuestions.length));
    
    setTopicQuestions(quizQuestions);
  }, [params.slug]);

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
   * Sınav Bitirme Fonksiyonu
   * 
   * Kullanıcı "Sınavı Bitir" butonuna bastığında çalışır.
   * Sınavı sonlandırır ve sonuç ekranına geçer.
   */
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  /**
   * Sınavı Yeniden Başlatma Fonksiyonu
   * 
   * Tüm state'leri sıfırlar ve sınavı baştan başlatır.
   * Sonuç ekranından tekrar sınava dönmek için kullanılır.
   */
  const handleRestart = () => {
    setAnswers([]);           // Tüm cevapları sil
    setIsSubmitted(false);    // Sınav durumunu sıfırla
    setTimeLeft(20 * 60);     // Süreyi yeniden 20 dakika yap
    setIsTimeUp(false);       // Süre doldu flag'ini sıfırla
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
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  timeLeft <= 300 ? 'bg-red-100 text-red-700' : timeLeft <= 600 ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                </div>
              )}
              <div className="text-sm text-gray-500">
                {answeredCount} / {topicQuestions.length}
              </div>
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
                        <p className="text-base text-gray-800 leading-relaxed">
                          {question.question}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = userAnswer?.selectedAnswer === option;
                          
                          return (
                            <Button
                              key={option}
                              onClick={() => handleAnswer(index, option)}
                              className={`justify-start text-left h-auto py-3 px-4 text-sm transition-all duration-200 border-2 ${
                                isSelected
                                  ? 'bg-blue-100 border-blue-500 text-blue-800 hover:bg-blue-100'
                                  : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                              }`}
                              variant="outline"
                            >
                              <div className="flex items-center w-full">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-xs font-semibold ${
                                  isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'
                                }`}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className="flex-1">{option}</span>
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

            {/* Submit Button */}
            <div className="text-center mb-8">
              <Card className="inline-block border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      Sınavı Bitir
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {answeredCount} / {topicQuestions.length} soru cevaplanmış
                    </p>
                    {answeredCount < topicQuestions.length && (
                      <div className="flex items-center justify-center text-amber-600 text-sm mb-4">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        {topicQuestions.length - answeredCount} soru cevaplanmamış
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8"
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Sınavı Bitir
                  </Button>
                </CardContent>
              </Card>
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
                        <p className="text-base text-gray-800 leading-relaxed">
                          {question.question}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isCorrectAnswer = option === question.answer;
                          const isUserAnswer = userAnswer?.selectedAnswer === option;
                          
                          let className = "p-3 rounded-lg border-2 text-sm ";
                          if (isCorrectAnswer) {
                            className += "bg-green-100 border-green-500 text-green-800";
                          } else if (isUserAnswer && !isCorrectAnswer) {
                            className += "bg-red-100 border-red-500 text-red-800";
                          } else {
                            className += "bg-gray-50 border-gray-200 text-gray-700";
                          }
                          
                          return (
                            <div key={option} className={className}>
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-xs font-semibold">
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                <span className="flex-1">{option}</span>
                                {isCorrectAnswer && (
                                  <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <XCircle className="h-5 w-5 text-red-600 ml-2" />
                                )}
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
                              <p className="text-sm text-blue-800">
                                <strong>Açıklama:</strong> {question.explanation}
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