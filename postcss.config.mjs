/**
 * PostCSS Konfigürasyonu
 * 
 * PostCSS, CSS'i transform etmek için kullanılan bir araçtır.
 * Bu dosya hangi PostCSS plugin'lerinin kullanılacağını belirtir.
 * 
 * Kullanılan Plugin'ler:
 * 1. tailwindcss: Tailwind CSS sınıflarını CSS'e çevirir
 * 2. autoprefixer: (otomatik eklenir) Vendor prefix'leri ekler
 * 
 * Build sürecinde CSS dosyaları bu plugin'lerden geçer:
 * SCSS/CSS → PostCSS → Tailwind → Autoprefixer → Final CSS
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    /**
     * Tailwind CSS Plugin
     * 
     * Tailwind utility sınıflarını actual CSS'e çevirir.
     * tailwind.config.ts dosyasındaki ayarları kullanır.
     * 
     * Boş obje ({}) varsayılan ayarları kullanır anlamına gelir.
     * İhtiyaç duyulduğunda özel ayarlar buraya eklenebilir.
     */
    tailwindcss: {},
    
    // Autoprefixer otomatik olarak Next.js tarafından eklenir
    // Manually eklemek gerekmiyor
  },
};

export default config;
