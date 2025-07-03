/**
 * Ana Sayfa Bileşeni (Home Page)
 * 
 * AFAD GYS Hazırlık uygulamasının ana sayfası.
 * Kullanıcıların quiz konularını kategorilere göre seçebileceği ana arayüz.
 * 
 * Özellikler:
 * - Responsive sidebar navigasyon
 * - Kategorilere göre gruplandırılmış konular
 * - Açılır/kapanır kategori menüleri
 * - Mobil uyumlu hamburger menü
 * - İstatistik kartları ve özellik tanıtımları
 * - Modern gradient tasarım
 * 
 * Kullanılan Teknolojiler:
 * - React Hooks (useState)
 * - Next.js Link (client-side routing)
 * - Lucide React icons
 * - Tailwind CSS
 * - Custom UI components
 */
'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Trophy, Users, CheckCircle, GraduationCap, Award, Menu, X, Home, Clock, BarChart3, ChevronDown, ChevronRight, Scale, FileText, Building2, Shield, UserCheck } from 'lucide-react';
import { useState } from 'react';

/**
 * Quiz Konuları Veritabanı
 * 
 * AFAD GYS sınavında çıkan tüm konuları kategorilere göre organize eder.
 * Her konu bir id (slug), başlık ve kategori içerir.
 * 
 * Konular 4 ana kategoride toplanır:
 * 1. Temel Bilgiler: Anayasa, Atatürk İlkeleri, Türkçe
 * 2. Afet Mevzuatı: AFAD ile ilgili kanunlar
 * 3. Yönetmelikler: Uygulama yönetmelikleri
 * 4. Personel Mevzuatı: Memur hakları ve sorumlulukları
 * 
 * id değerleri URL slug'ı olarak kullanılır (/quiz/[slug])
 */
const topics = [
    { id: 'anayasa', title: 'Türkiye Cumhuriyeti Anayasası', category: 'temel' },
    { id: 'ataturk', title: 'Atatürk İlkeleri ve İnkılap Tarihi', category: 'temel' },
    { id: 'turkce', title: 'Türkçe ve Dil Bilgisi', category: 'temel' },
    { id: '5902', title: '5902 Sayılı Kanun', category: 'afet' },
    { id: '7269', title: '7269 Sayılı Kanun', category: 'afet' },
    { id: '4123', title: '4123 Sayılı Kanun', category: 'afet' },
    { id: '7126', title: '7126 Sayılı Sivil Savunma Kanunu', category: 'afet' },
    { id: '4', title: '4 Sayılı Cumhurbaşkanlığı Kararnamesi', category: 'afet' },
    { id: 'afet-yonetim-merkezleri', title: 'Afet ve Acil Durum Yönetim Merkezleri Yönetmeliği', category: 'yonetmelik' },
    { id: 'afet-mudahale-hizmetleri', title: 'Afet ve Acil Durum Müdahale Hizmetleri Yönetmeliği', category: 'yonetmelik' },
    { id: 'afet-harcamalari', title: 'Afet ve Acil Durum Harcamaları Yönetmeliği', category: 'yonetmelik' },
    { id: 'afetlerin-genel-hayata-etkililigi', title: 'Afetlerin Genel Hayata Etkililiğine İlişkin Yönetmelik', category: 'yonetmelik' },
    { id: 'buyuksehir-belediyeleri-harcamalar', title: 'Büyükşehir Belediyeleri Harcama Yönetmeliği', category: 'yonetmelik' },
    { id: 'binalarin-yangindan-korunmasi', title: 'Binaların Yangından Korunması Hakkında Yönetmelik', category: 'yonetmelik' },
    { id: 'afad-personeli-gorevde-yukselme', title: 'AFAD Personeli Görevde Yükselme Yönetmeliği', category: 'personel' },
    { id: '657', title: '657 Sayılı Devlet Memurları Kanunu', category: 'personel' },
    { id: '4982', title: '4982 Sayılı Bilgi Edinme Hakkı Kanunu', category: 'personel' },
    { id: '3071', title: '3071 Sayılı Dilekçe Hakkının Kullanılmasına Dair Kanun', category: 'personel' },
    { id: '5018', title: '5018 Sayılı Kamu Mali Yönetimi ve Kontrol Kanunu', category: 'personel' },
    { id: '6245', title: '6245 Sayılı Harcırah Kanunu', category: 'personel' },
    { id: '3628', title: '3628 Sayılı Mal Bildiriminde Bulunulması Kanunu', category: 'personel' },
    { id: '4483', title: '4483 Sayılı Memurların Yargılanması Hakkında Kanun', category: 'personel' },
    { id: '2577', title: '2577 Sayılı İdari Yargılama Usulü Kanunu', category: 'personel' },
    { id: '6331', title: '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu', category: 'personel' },
    { id: '5442', title: '5442 Sayılı İl İdaresi Kanunu', category: 'personel' },
    { id: 'devlet-memurlari-disiplin', title: 'Devlet Memurları Disiplin Yönetmeliği', category: 'personel' },
    { id: 'resmi-yazismalar', title: 'Resmî Yazışmalarda Uygulanacak Usul ve Esaslar', category: 'personel' },
    { id: 'devlet-memurlari-sikayet', title: 'Devlet Memurlarının Şikayet ve Müracaatları Yönetmeliği', category: 'personel' },
    { id: 'kamu-gorevlileri-etik', title: 'Kamu Görevlileri Etik Davranış İlkeleri Yönetmeliği', category: 'personel' },
    { id: 'devlet-memurlari-hastalik-raporlari', title: 'Devlet Memurları Hastalık Raporları Yönetmeliği', category: 'personel' },
];

/**
 * Kategori Konfigürasyonu
 * 
 * Her kategori için görsel ve renk bilgilerini tanımlar.
 * Sidebar'da kategori başlıklarında kullanılır.
 * 
 * Her kategori içerir:
 * - name: Görüntülenen kategori adı
 * - icon: Lucide React icon bileşeni
 * - color: Tema rengi (CSS sınıfları için)
 * 
 * Renkler Tailwind CSS color palette'ini takip eder.
 */
const categories = {
  temel: { name: 'Temel Bilgiler', icon: Scale, color: 'blue' },
  afet: { name: 'Afet Mevzuatı', icon: Shield, color: 'red' },
  yonetmelik: { name: 'Yönetmelikler', icon: FileText, color: 'green' },
  personel: { name: 'Personel Mevzuatı', icon: UserCheck, color: 'purple' }
};

/**
 * Ana Sayfa Bileşeni (HomePage)
 * 
 * Uygulamanın ana sayfası. Kullanıcıların quiz konularını seçebileceği
 * responsive arayüzü sağlar.
 * 
 * State Yönetimi:
 * - sidebarOpen: Mobil cihazlarda sidebar'ın açık/kapalı durumu
 * - openCategories: Açık kategorilerin listesi (accordion davranışı)
 * 
 * Başlangıç durumu: 'temel' kategorisi açık
 */
export default function HomePage() {
  // Sidebar durumu (mobil cihazlar için)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Açık kategoriler (accordion navigasyon için)
  // Temel bilgiler kategorisi varsayılan olarak açık
  const [openCategories, setOpenCategories] = useState<string[]>(['temel']);

  /**
   * Kategori Açma/Kapama Fonksiyonu
   * 
   * Belirli bir kategoriyi açar veya kapatır.
   * Eğer kategori açıksa kapatır, kapalıysa açar.
   * 
   * @param categoryId - Açılacak/kapatılacak kategori ID'si
   */
  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)  // Kategori açıksa kapat
        : [...prev, categoryId]                 // Kategori kapalıysa aç
    );
  };

  /**
   * Kategoriye Göre Konu Filtreleme Fonksiyonu
   * 
   * Belirli bir kategorideki tüm konuları döndürür.
   * 
   * @param categoryId - Filtrelenecek kategori ID'si
   * @returns Kategoriye ait konular dizisi
   */
  const getTopicsByCategory = (categoryId: string) => {
    return topics.filter(topic => topic.category === categoryId);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col h-screen`}>
        <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">AFAD Portal</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 flex flex-col mt-6 px-3 pb-6 overflow-y-auto">
          <div className="space-y-1 mb-6 flex-shrink-0">
            <a href="#ana-sayfa" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
              <Home className="mr-3 h-5 w-5" />
              Ana Sayfa
            </a>
            <a href="#konular" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
              <BookOpen className="mr-3 h-5 w-5" />
              Sınav Konuları
            </a>
            <a href="#istatistikler" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
              <BarChart3 className="mr-3 h-5 w-5" />
              İstatistikler
            </a>
          </div>

          {/* Topic Categories */}
          <div className="border-t pt-4 flex-1">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Konu Kategorileri
            </h3>
            <div className="space-y-1">
              {Object.entries(categories).map(([categoryId, category]) => {
                const isOpen = openCategories.includes(categoryId);
                const categoryTopics = getTopicsByCategory(categoryId);
                const Icon = category.icon;
                
                return (
                  <div key={categoryId}>
                    <button
                      onClick={() => toggleCategory(categoryId)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Icon className={`mr-3 h-4 w-4 text-${category.color}-600`} />
                        <span>{category.name}</span>
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full bg-${category.color}-100 text-${category.color}-600`}>
                          {categoryTopics.length}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        {categoryTopics.map((topic) => (
                          <a 
                            key={topic.id} 
                            href={`/quiz/${topic.id}`}
                            className="block px-3 py-1.5 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors line-clamp-2"
                          >
                            {topic.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-auto p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex-shrink-0">
            <div className="text-center">
              <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 mb-1">Günlük Hedef</p>
              <p className="text-xs text-gray-600">5 test çözün!</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full w-3/5"></div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">AFAD Portal</span>
            </div>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">AFAD Görevde Yükselme Sınav Portalı</h1>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10K+ Kullanıcı</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>7/24 Erişim</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {/* Hero Section */}
          <section id="ana-sayfa" className="py-4 sm:py-6 md:py-12 lg:py-16">
            <div className="container mx-auto px-2 sm:px-4 md:px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-6">
                  <div className="p-1.5 sm:p-2 md:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg">
                    <Trophy className="h-5 w-5 sm:h-6 sm:w-6 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />
                  </div>
                </div>
                <h1 className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-6">
                  AFAD Sınavına Hazırlanın
                </h1>
                <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-3 sm:mb-4 md:mb-8 px-1 sm:px-2">
                  Güncel mevzuat ve konularla hazırlanan sorular ile kendinizi test edin. 
                  Başarıya giden yolda yanınızdayız.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-3 sm:mb-4 md:mb-8">
                  <div className="text-center p-1.5 sm:p-2 bg-white/70 backdrop-blur-sm rounded-md sm:rounded-lg shadow-sm">
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-xs text-gray-600">Soru</div>
                  </div>
                  <div className="text-center p-1.5 sm:p-2 bg-white/70 backdrop-blur-sm rounded-md sm:rounded-lg shadow-sm">
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900">30+</div>
                    <div className="text-xs text-gray-600">Konu</div>
                  </div>
                  <div className="text-center p-1.5 sm:p-2 bg-white/70 backdrop-blur-sm rounded-md sm:rounded-lg shadow-sm">
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-xs text-gray-600">Başarı</div>
                  </div>
                </div>

                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:rounded-xl">
                  <Link href="#konular">
                    Konuları Keşfet <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Topics Section */}
          <section id="konular" className="py-6 sm:py-8 md:py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-2 sm:px-4 md:px-6">
              <div className="text-center mb-4 sm:mb-6 md:mb-12">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2 md:mb-4">
                  Sınav Konuları
                </h2>
                <p className="text-xs sm:text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-1 sm:px-2">
                  Aşağıdaki konulardan birini seçerek hemen teste başlayın. Her konu için 20 soruluk test hazır.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                {topics.map((topic, index) => (
                  <Link href={`/quiz/${topic.id}`} key={topic.id} passHref legacyBehavior>
                    <a className="block h-full group">
                      <Card className="h-32 sm:h-36 md:h-40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 bg-white group-hover:border-blue-300 relative overflow-hidden flex flex-col">
                        <CardHeader className="p-2 sm:p-3 md:p-4 text-center flex-1 flex flex-col justify-center">
                          <div className="p-1 sm:p-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-md sm:rounded-lg mb-2 mx-auto w-fit group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                          </div>
                          <CardTitle className="text-xs sm:text-sm md:text-sm lg:text-base leading-tight font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-3 px-1">
                            {topic.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section id="istatistikler" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-3 sm:px-4 md:px-6">
              <div className="text-center mb-6 sm:mb-8 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                  Platform İstatistikleri
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                  Binlerce öğrenci başarıya ulaşmak için platformumuzu kullanıyor.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
                <div className="text-center p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg mx-auto w-fit mb-2 sm:mb-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Güncel Soru</div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg mx-auto w-fit mb-2 sm:mb-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">10K+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Aktif Kullanıcı</div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
                  <div className="p-2 sm:p-3 bg-purple-100 rounded-lg mx-auto w-fit mb-2 sm:mb-3">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">95%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Başarı Oranı</div>
                </div>
                <div className="text-center p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm">
                  <div className="p-2 sm:p-3 bg-orange-100 rounded-lg mx-auto w-fit mb-2 sm:mb-3">
                    <Trophy className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-orange-600" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">50K+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Çözülen Test</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 px-4">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-1">
              &copy; {new Date().getFullYear()} AFAD Sınav Portalı. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-gray-400">
              Başarıya giden yolda yanınızdayız
            </p>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}