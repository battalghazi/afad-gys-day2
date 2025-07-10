/**
 * Quiz Uygulaması Tipleri
 * 
 * AFAD GYS (Görevde Yükselme Sınavı) hazırlık uygulaması için
 * temel tip tanımları.
 */

/**
 * Soru Tipi (Interface)
 * 
 * Her sorunun sahip olması gereken özellikler:
 * 
 * @property id - Soru benzersiz kimliği (opsiyonel, otomatik üretilir)
 * @property question - Soru metni (zorunlu)
 * @property options - Çoktan seçmeli şıklar dizisi (zorunlu, minimum 2 şık)
 * @property answer - Doğru cevap (options dizisindeki değerlerden biri olmalı)
 * @property explanation - Cevabın açıklaması (opsiyonel, eğitim amaçlı)
 */
export type Question = {
  id?: string;
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

/**
 * Quiz Cevap Interface'i
 * 
 * Kullanıcının verdiği her cevap için gerekli bilgileri tutar.
 * 
 * @property questionIndex - Sorunun index numarası (0'dan başlar)
 * @property selectedAnswer - Kullanıcının seçtiği cevap metni
 * @property isCorrect - Cevabın doğru olup olmadığı (boolean)
 */
export interface QuizAnswer {
  questionIndex: number;
  selectedAnswer: string;
  isCorrect: boolean;
}

/**
 * Quiz Konusu Tipi
 * 
 * @property id - Konu slug'ı (URL için kullanılır)
 * @property title - Konunun görüntülenen adı
 * @property category - Konunun kategorisi
 */
export interface QuizTopic {
  id: string;
  title: string;
  category: 'temel' | 'afet' | 'yonetmelik' | 'personel';
}

/**
 * Quiz Sonucu Tipi
 * 
 * @property totalQuestions - Toplam soru sayısı
 * @property correctAnswers - Doğru cevap sayısı
 * @property score - Yüzdelik puan
 * @property timeSpent - Harcanan süre (saniye)
 * @property answers - Verilen cevaplar
 */
export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  answers: QuizAnswer[];
}
