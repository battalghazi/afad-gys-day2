# AFAD GYS Quiz Uygulaması - Kod Dokümantasyonu

Bu dokümantasyon, AFAD Görevde Yükselme Sınavı hazırlık uygulamasının kod yapısını ve kullanılan teknolojileri detaylı olarak açıklar.

## 📁 Proje Yapısı

```
afad-gys-test/
├── app/                          # Next.js App Router
│   ├── favicon.ico               # Uygulama ikonu
│   ├── globals.css               # Global CSS stilleri
│   ├── layout.tsx               # Ana layout bileşeni
│   ├── page.tsx                 # Ana sayfa (homepage)
│   ├── fonts/                   # Font dosyaları
│   └── quiz/
│       └── [slug]/
│           └── page.tsx         # Dinamik quiz sayfası
├── components/
│   └── ui/                      # Yeniden kullanılabilir UI bileşenleri
│       ├── button.tsx           # Button bileşeni
│       ├── card.tsx            # Card bileşeni
│       └── progress.tsx        # Progress bar bileşeni
├── lib/
│   ├── questions.ts            # Soru veritabanı
│   └── utils.ts               # Yardımcı fonksiyonlar
└── config dosyaları...
```

## 🔧 Teknoloji Stack'i

### Frontend Framework
- **Next.js 14**: React tabanlı full-stack framework
- **App Router**: Yeni Next.js routing sistemi
- **TypeScript**: Tip güvenliği için

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Hazır UI bileşen kütüphanesi
- **Lucide React**: Modern SVG icon kütüphanesi
- **Radix UI**: Headless UI primitives

### State Management
- **React Hooks**: useState, useEffect ile local state yönetimi
- **Client-side rendering**: 'use client' direktifi ile

## 📄 Dosya Açıklamaları

### `/app/layout.tsx`
```typescript
/**
 * Root Layout Bileşeni
 * 
 * - Tüm sayfalarda ortak HTML yapısı
 * - Font tanımları (Geist)
 * - Meta veriler (SEO)
 * - Türkçe dil desteği
 */
```

### `/app/page.tsx`
```typescript
/**
 * Ana Sayfa Bileşeni
 * 
 * - Quiz konuları listesi
 * - Kategorilere göre filtreleme
 * - Responsive sidebar navigasyon
 * - İstatistik kartları
 */
```

### `/app/quiz/[slug]/page.tsx`
```typescript
/**
 * Quiz Sayfası Bileşeni
 * 
 * - Dinamik quiz yükleme
 * - 20 dakikalık zamanlayıcı
 * - Soru-cevap yönetimi
 * - Sonuç hesaplama ve gösterimi
 */
```

### `/lib/questions.ts`
```typescript
/**
 * Soru Veritabanı
 * 
 * - TypeScript tiplendirilmiş sorular
 * - Konulara göre organize edilmiş
 * - Her soru için açıklama
 */
```

### `/components/ui/`
```typescript
/**
 * UI Bileşenleri
 * 
 * - Shadcn/ui standartlarında
 * - Fully accessible (ARIA support)
 * - Variant sistem ile özelleştirilebilir
 * - TypeScript prop tanımları
 */
```

## 🎨 Stil Sistemi

### CSS Değişkenleri
```css
:root {
  --background: 0 0% 100%;
  --foreground: 20 14.3% 4.1%;
  --primary: 24 9.8% 10%;
  /* ... */
}
```

### Özel Animasyonlar
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

### Utility Sınıfları
```css
.text-balance { text-wrap: balance; }
.line-clamp-2 { /* 2 satır sınırlaması */ }
.animate-float { animation: float 3s ease-in-out infinite; }
```

## 🔄 Veri Akışı

### Quiz Sayfası State Management
```typescript
// Ana state'ler
const [topicQuestions, setTopicQuestions] = useState<Question[]>([]);
const [answers, setAnswers] = useState<QuizAnswer[]>([]);
const [isSubmitted, setIsSubmitted] = useState(false);
const [timeLeft, setTimeLeft] = useState(20 * 60);

// Hesaplanan değerler
const score = answers.filter(a => a.isCorrect).length;
const progressPercentage = (answeredCount / topicQuestions.length) * 100;
```

### Routing Sistemi
```
/ → Ana sayfa (konu listesi)
/quiz/[slug] → Quiz sayfası
  - /quiz/anayasa → Anayasa quiz'i
  - /quiz/5902 → 5902 sayılı kanun quiz'i
  - vs.
```

## 🎯 Özellikler

### Quiz Motoru
- ✅ 20 dakikalık otomatik zamanlayıcı
- ✅ Gerçek zamanlı ilerleme takibi
- ✅ Cevap değiştirme imkanı
- ✅ Sınav sonrası detaylı analiz
- ✅ Açıklamalı doğru cevaplar

### UI/UX
- ✅ Fully responsive design
- ✅ Dark mode hazır altyapı
- ✅ Smooth animasyonlar
- ✅ Modern glassmorphism efektleri
- ✅ Accessible design (ARIA support)

### Performance
- ✅ Next.js automatic optimizations
- ✅ Tree-shaking (unused CSS removal)
- ✅ Image optimization
- ✅ Static generation ready

## 🚀 Geliştirme

### Yeni Konu Ekleme
1. `/lib/questions.ts` dosyasına yeni sorular ekle
2. `/app/page.tsx` dosyasında topics array'ine yeni konu ekle
3. Quiz sayfası otomatik olarak yeni konuyu handle eder

### Yeni UI Bileşeni Ekleme
1. `/components/ui/` klasörüne yeni dosya oluştur
2. Shadcn/ui standardlarını takip et
3. TypeScript prop interface'i tanımla
4. forwardRef kullan (ref forwarding için)

### Stil Değişiklikleri
1. Global değişiklikler için `/app/globals.css`
2. Component-specific için Tailwind sınıfları
3. Yeni animasyonlar için CSS keyframes

## 📦 Dependencies Açıklaması

### Production Dependencies
- `next`: React framework
- `react` / `react-dom`: React core
- `@radix-ui/*`: Headless UI primitives
- `lucide-react`: SVG icons
- `tailwind-merge`: Tailwind class merging
- `clsx`: Conditional classes
- `class-variance-authority`: Variant sistem
- `geist`: Font ailesi

### Development Dependencies
- `@types/*`: TypeScript tip tanımları
- `tailwindcss`: CSS framework
- `typescript`: TypeScript compiler
- `eslint`: Code linting
- `postcss`: CSS processing

## 🔍 Kod Kalitesi

### TypeScript
- Strict mode aktif
- Tüm componentler tiplendirilmiş
- Interface'ler belgelenmiş
- Generic tipler kullanıldığı yerde

### ESLint
- Next.js önerilen kurallar
- React Hooks kuralları
- TypeScript kuralları

### Code Comments
- Tüm major fonksiyonlar açıklamalı
- JSDoc standardında
- Türkçe açıklamalar
- Örnek kullanımlar mevcut

Bu dokümantasyon, kodun maintainability'sini artırmak ve yeni geliştiricilerin projeye hızlı adapte olmasını sağlamak için hazırlanmıştır.
