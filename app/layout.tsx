/**
 * Root Layout Bileşeni
 * 
 * Next.js uygulamasının ana layout bileşeni.
 * Tüm sayfalarda ortak olan HTML yapısını ve stil tanımlarını içerir.
 * 
 * Özellikler:
 * - Google Sans font ailesi
 * - Türkçe dil desteği
 * - Responsive tasarım
 * - Global stil dosyası
 * - Hydration uyarılarını bastırma
 * 
 * Bu layout tüm sayfalarda otomatik olarak uygulanır.
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

/**
 * Font Konfigürasyonu
 * 
 * Inter fontunu kullanıyoruz - Google Sans'a en yakın açık kaynak alternatif.
 * Modern, okunabilir ve Google'ın tasarım prensipleriyle uyumlu.
 */
const googleSansFont = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-google-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
});

/**
 * Metadata Konfigürasyonu
 * 
 * SEO ve tarayıcı tab bilgileri için meta verileri tanımlar.
 * Next.js otomatik olarak bu verileri HTML head'e ekler.
 * 
 * @property title - Sayfa başlığı (tarayıcı tab'ında görünür)
 * @property description - Sayfa açıklaması (SEO için önemli)
 */
export const metadata: Metadata = {
  title: 'AFAD Quiz App',
  description: 'AFAD Görevde Yükselme Sınavı Hazırlık Uygulaması',
};

/**
 * Root Layout Fonksiyonu
 * 
 * Uygulamanın ana layout bileşeni. Tüm sayfalarda ortak HTML yapısını sağlar.
 * 
 * HTML Yapısı:
 * - lang="tr": Türkçe dil desteği (SEO ve erişilebilirlik için)
 * - suppressHydrationWarning: Next.js hydration uyarılarını bastırır
 * - Font değişkenleri: CSS custom properties olarak font ailelerini tanımlar
 * - Gradient arka plan: Mavi tonlarda çapraz geçiş
 * - Responsive tasarım: Tüm ekran boyutlarına uyumlu
 * 
 * @param children - Child sayfalar ve bileşenler (React.ReactNode)
 * @returns JSX elementi (HTML document yapısı)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          googleSansFont.className    // Inter fontunu uygula
        )}
      >
        {children}
      </body>
    </html>
  );
}