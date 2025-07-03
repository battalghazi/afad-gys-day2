
/**
 * Soru Veritabanı ve Tipleri
 * 
 * AFAD GYS (Görevde Yükselme Sınavı) hazırlık uygulaması için
 * soru tiplerini ve soru veritabanını içerir.
 * 
 * Bu dosya:
 * - Soru tiplerini tanımlar (TypeScript interface)
 * - Tüm kategoriler için soruları barındırır
 * - Konulara göre organize edilmiş soru koleksiyonları sağlar
 */

/**
 * Soru Tipi (Interface)
 * 
 * Her sorunun sahip olması gereken özellikler:
 * 
 * @property question - Soru metni (zorunlu)
 * @property question - Soru metni (zorunlu)
 * @property options - Çoktan seçmeli şıklar dizisi (zorunlu, minimum 2 şık)
 * @property answer - Doğru cevap (options dizisindeki değerlerden biri olmalı)
 * @property explanation - Cevabın açıklaması (opsiyonel, eğitim amaçlı)
 */
export type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
};

/**
 * Soru Veritabanı
 * 
 * Konu slug'larına göre organize edilmiş soru koleksiyonu.
 * Her konu anahtarı (slug) bir Question dizisi içerir.
 * 
 * Kategoriler:
 * 1. Temel Bilgiler (anayasa, ataturk, turkce)
 * 2. Afet Mevzuatı (5902, 7269, 4123, 7126, 4)
 * 3. Yönetmelikler (afet-*, binalarin-*, buyuksehir-*)
 * 4. Personel Mevzuatı (657, 4982, 3071, vb.)
 * 
 * Her soru:
 * - Açık ve anlaşılır soru metni
 * - 5 çoktan seçmeli şık
 * - Doğru cevap
 * - Açıklayıcı bilgi (öğrenmeyi desteklemek için)
 * 
 * @example
 * const anayasaSorulari = questions['anayasa'];
 * const rastgeleSoru = questions['anayasa'][0];
 */
export const questions: Record<string, Question[]> = {
  anayasa: [
    {
      "question": "1982 Anayasası'nın Başlangıç metni ile ilgili aşağıdakilerden hangisi doğrudur?",
      "options": [
        "Yorumlayıcı nitelikte olup hukuki bağlayıcılığı yoktur.",
        "Sadece Anayasa'nın ruhunu yansıtır, metne dahil değildir.",
        "Anayasa metnine dahildir ve Anayasa'nın diğer maddeleri gibi bağlayıcıdır.",
        "Sadece ilk üç maddenin değiştirilemeyeceğini belirtir.",
        "Anayasa Mahkemesi tarafından denetlenemez."
      ],
      "answer": "Anayasa metnine dahildir ve Anayasa'nın diğer maddeleri gibi bağlayıcıdır.",
      "explanation": "Anayasa'nın 176. maddesi, 'Anayasanın dayandığı temel görüş ve ilkeleri belirten başlangıç kısmı, Anayasa metnine dahildir.' hükmünü içerir. Bu nedenle hukuki olarak bağlayıcıdır ve Anayasa'nın bir parçasıdır."
    },
    {
      "question": "Aşağıdakilerden hangisi, 1982 Anayasası'nın 5. maddesinde sayılan 'Devletin temel amaç ve görevleri' arasında yer almaz?",
      "options": [
        "Kişinin temel hak ve hürriyetlerini, sosyal hukuk devleti ve adalet ilkeleriyle bağdaşmayacak surette sınırlayan siyasal, ekonomik ve sosyal engelleri kaldırmaya çalışmak.",
        "Türk Milletinin bağımsızlığını ve bütünlüğünü korumak.",
        "Ülkenin bölünmez bütünlüğünü korumak.",
        "Kişilerin ve toplumun refah, huzur ve mutluluğunu sağlamak.",
        "Her vatandaşa ücretsiz barınma imkânı sağlamak."
      ],
      "answer": "Her vatandaşa ücretsiz barınma imkânı sağlamak.",
      "explanation": "Anayasa'nın 5. maddesinde devletin temel amaç ve görevleri sayılmıştır. Bu görevler arasında kişilerin refahını sağlamak vardır ancak herkese ücretsiz barınma sağlamak gibi spesifik bir taahhüt bulunmamaktadır. Konut hakkı (Madde 57) devletin bu konuda planlama yapma ve tedbir alma ödevini belirtir, ücretsiz sağlama zorunluluğunu değil."
    },
    {
      "question": "1982 Anayasası'nda 'Kişinin Hakları ve Ödevleri' (Negatif Statü Hakları) bölümünde düzenlenen haklardan hangisi, aynı zamanda bir ödev niteliği de taşır?",
      "options": [
        "Düşünce ve kanaat hürriyeti",
        "Konut dokunulmazlığı",
        "Eğitim ve öğrenim hakkı",
        "Dernek kurma hürriyeti",
        "Özel hayatın gizliliği"
      ],
      "answer": "Eğitim ve öğrenim hakkı",
      "explanation": "Anayasa'nın 42. maddesi başlığı 'Eğitim ve Öğrenim Hakkı ve Ödevi' şeklindedir. Madde metninde de 'Kimse, eğitim ve öğrenim hakkından yoksun bırakılamaz.' denilerek hak boyutu, 'İlköğretim, kız ve erkek bütün vatandaşlar için zorunludur' denilerek ödev boyutu vurgulanmıştır. Diğer şıklar sadece hak niteliğindedir."
    },
    {
      "question": "Aşağıdakilerden hangisi, 'Siyasi Haklar ve Ödevler' (Aktif Statü Hakları) arasında düzenlenmemiştir?",
      "options": [
        "Vatandaşlık hakkı",
        "Seçme ve seçilme hakkı",
        "Siyasi parti kurma hakkı",
        "Sendika kurma hakkı",
        "Vatan hizmeti"
      ],
      "answer": "Sendika kurma hakkı",
      "explanation": "Sendika kurma hakkı (Madde 51), Anayasa'nın 'Sosyal ve Ekonomik Haklar ve Ödevler' (Pozitif Statü Hakları) başlıklı bölümünde yer alır. Diğer şıklar ise Siyasi Haklar ve Ödevler bölümündedir."
    },
    {
      "question": "1982 Anayasası'na göre angarya yasaktır. 'Angarya' kavramının tanımı aşağıdakilerden hangisidir?",
      "options": [
        "Bir işin karşılığının geç ödenmesi",
        "Ağır ve tehlikeli işlerde çalıştırma",
        "Bir kimsenin emeğinin karşılıksız olarak zorla sömürülmesi",
        "Haftalık çalışma süresinin aşılması",
        "Çocuk işçi çalıştırılması"
      ],
      "answer": "Bir kimsenin emeğinin karşılıksız olarak zorla sömürülmesi",
      "explanation": "Anayasa'nın 18. maddesi 'Zorla çalıştırma yasağı' başlığını taşır ve 'Hiç kimse zorla çalıştırılamaz. Angarya yasaktır.' der. Angarya, kişinin emeğinin bir bedel ödenmeksizin veya rızası dışında zorla kullandırılmasıdır. Madde, vatan hizmeti veya hükümlülük sırasındaki çalıştırmaları bu kapsamın dışında tutar."
    },
    {
      "question": "Aşağıdakilerden hangisi hem bir hak hem de bir ödev olarak düzenlenmiştir?",
      "options": [
        "Çalışma hakkı",
        "Mülkiyet hakkı",
        "Sağlık hakkı",
        "Vergi ödevi",
        "Dernek kurma hakkı"
      ],
      "answer": "Çalışma hakkı",
      "explanation": "Anayasa'nın 49. maddesi 'Çalışma Hakkı ve Ödevi' başlığını taşır. Madde, 'Çalışma, herkesin hakkı ve ödevidir.' diyerek her iki niteliği de açıkça belirtir. Vergi ise sadece bir ödevdir (Madde 73)."
    },
    {
      "question": "Anayasa'ya göre, kamulaştırma bedeli ile kesin hükme bağlanan artırım bedeli, kural olarak en geç ne kadar sürede ve nasıl ödenir?",
      "options": [
        "Peşin ve nakden",
        "Bir yıl içinde taksitle",
        "Beş yıl içinde eşit taksitlerle",
        "Devlet tahvili olarak",
        "Mahkeme kararından sonraki mali yıl içinde"
      ],
      "answer": "Peşin ve nakden",
      "explanation": "Anayasa'nın 46. maddesine göre, 'Kamulaştırma bedeli ile kesin hükme bağlanan artırım bedeli nakden ve peşin olarak ödenir.' Maddede belirtilen büyük enerji, sulama, iskan projeleri gibi istisnai durumlarda taksitle ödeme imkanı tanınmıştır, ancak kural peşin ödemedir."
    },
    {
      "question": "Aşağıdakilerden hangisi hem 'Kişinin Hakları ve Ödevleri' hem de 'Siyasi Haklar ve Ödevler' bölümüyle ilgili ortak bir konu içerir?",
      "options": [
        "Vatandaşlık - Mülkiyet hakkı",
        "Dernek kurma hürriyeti - Siyasi parti kurma hakkı",
        "Düşünce hürriyeti - Seçme hakkı",
        "Konut dokunulmazlığı - Vergi ödevi",
        "Basın hürriyeti - Dilekçe hakkı"
      ],
      "answer": "Dernek kurma hürriyeti - Siyasi parti kurma hakkı",
      "explanation": "Dernek kurma hürriyeti (Madde 33) Kişinin Hakları bölümündedir. Siyasi partiler ise dernekler kanununa tabi, özel bir örgütlenme biçimidir ve Siyasi Parti Kurma Hakkı (Madde 68) Siyasi Haklar bölümünde düzenlenmiştir. İkisi de örgütlenme özgürlüğünün farklı yansımalarıdır."
    },
    {
      "question": "Olağanüstü hallerde dahi dokunulamayacak olan 'çekirdek haklar' arasında aşağıdakilerden hangisi yer almaz?",
      "options": [
        "Kişinin yaşama hakkına, maddî ve manevî varlığının bütünlüğüne dokunulmaması",
        "Din, vicdan, düşünce ve kanaatlerini açıklamaya zorlanamama",
        "Suç ve cezaların geriye yürümezliği ilkesi",
        "Masumiyet karinesi",
        "Dernek kurma hürriyeti"
      ],
      "answer": "Dernek kurma hürriyeti",
      "explanation": "Anayasa'nın 15. maddesi, savaş, seferberlik ve olağanüstü hallerde dahi dokunulamayacak hakları sayar. Dernek kurma hürriyeti bu 'çekirdek haklar' arasında yer almaz ve olağanüstü halin gerektirdiği ölçüde sınırlandırılabilir veya durdurulabilir."
    },
    {
      "question": "Aşağıdakilerden hangisi 1982 Anayasası'nın sosyal ve ekonomik haklar bölümünde özel olarak korunması gerekenler arasında sayılmamıştır?",
      "options": [
        "Harp ve vazife şehitlerinin dul ve yetimleri",
        "Maluller ve gaziler",
        "Sakatlar",
        "Yaşlılar ve çocuklar",
        "Memurlar"
      ],
      "answer": "Memurlar",
      "explanation": "Anayasa'nın 61. maddesi 'Sosyal güvenlik bakımından özel olarak korunması gerekenler' başlığı altında harp ve vazife şehitlerinin dul ve yetimleri ile malûl ve gazileri, sakatları, yaşlıları ve korunmaya muhtaç çocukları saymıştır. Memurlar bu özel koruma kategorisinde yer almaz."
    },
    {
      "question": "Türk vatandaşlığının kazanılması ile ilgili aşağıdakilerden hangisi yanlıştır?",
      "options": [
        "Türk ananın veya Türk babanın çocuğu Türktür.",
        "Vatandaşlık, kanunun gösterdiği şartlarla kazanılır ve ancak kanunda belirtilen hallerde kaybedilir.",
        "Hiçbir Türk, vatana bağlılıkla bağdaşmayan bir eylemde bulunmadıkça vatandaşlıktan çıkarılamaz.",
        "Vatandaşlıktan çıkarma ile ilgili karar ve işlemlere karşı yargı yolu kapalıdır.",
        "Türk Devletine vatandaşlık bağı ile bağlı olan herkes Türktür."
      ],
      "answer": "Vatandaşlıktan çıkarma ile ilgili karar ve işlemlere karşı yargı yolu kapalıdır.",
      "explanation": "Anayasa'nın 66. maddesi vatandaşlığı düzenler. Maddeye göre, 'Vatandaşlıktan çıkarma ile ilgili karar ve işlemlere karşı yargı yolu kapatılamaz.' Bu, idarenin her türlü eylem ve işlemine karşı yargı yolunun açık olması (Madde 125) ilkesinin bir yansımasıdır."
    },
    {
      "question": "1982 Anayasası'na göre, Türkiye'de ikamet eden yabancılar, karşılıklılık esası gözetilmek şartıyla hangi siyasi hakkı kullanabilirler?",
      "options": [
        "Seçme ve seçilme hakkı",
        "Siyasi parti kurma hakkı",
        "Kamu hizmetine girme hakkı",
        "Dilekçe hakkı",
        "Halkoylamasına katılma hakkı"
      ],
      "answer": "Dilekçe hakkı",
      "explanation": "Anayasa'nın 74. maddesi, 'Vatandaşlar ve karşılıklılık esası gözetilmek kaydıyla Türkiye’de ikamet eden yabancılar kendileriyle veya kamu ile ilgili dilek ve şikâyetleri hakkında... Türkiye Büyük Millet Meclisine ve yetkili makamlara yazı ile başvurma hakkına sahiptir.' demektedir. Diğer siyasi haklar genellikle sadece vatandaşlara tanınmıştır."
    },
    {
      "question": "TBMM ara seçimleri ile ilgili aşağıdakilerden hangisi yanlıştır?",
      "options": [
        "TBMM üyeliklerinde boşalma olması halinde yapılır.",
        "Her seçim döneminde sadece bir defa yapılabilir.",
        "Genel seçimlerden otuz ay geçmedikçe ara seçime gidilemez.",
        "Genel seçimlere bir yıl kala ara seçim yapılamaz.",
        "Boşalan üyeliklerin sayısı üye tamsayısının yüzde beşini bulursa, ara seçimin üç ay içinde yapılmasına karar verilir."
      ],
      "answer": "Her seçim döneminde sadece bir defa yapılabilir.",
      "explanation": "Anayasa'nın 78. maddesinde ara seçimin bir yasama döneminde bir defa yapılabileceğine dair bir kısıtlama yoktur. Ancak genel seçimlerden 30 ay geçmedikçe ve genel seçimlere 1 yıl kala yapılamayacağı kuralı vardır. %5'lik boşalma istisnası bu kuralları geçersiz kılar."
    },
    {
      "question": "Milletvekillerinin, Meclis çalışmalarındaki oy ve sözlerinden, Mecliste ileri sürdükleri düşüncelerden sorumlu tutulamamalarını ifade eden kavram hangisidir?",
      "options": [
        "Yasama sorumsuzluğu (Kürsü dokunulmazlığı)",
        "Yasama dokunulmazlığı",
        "Milletin temsili",
        "Kanun önünde eşitlik",
        "Takdir yetkisi"
      ],
      "answer": "Yasama sorumsuzluğu (Kürsü dokunulmazlığı)",
      "explanation": "Anayasa'nın 83. maddesi iki tür koruma sağlar. 'Yasama sorumsuzluğu' (mutlak koruma), milletvekilinin Meclis'teki söz ve düşüncelerinden dolayı sorumlu tutulmamasını sağlar ve ömür boyu sürer. 'Yasama dokunulmazlığı' (nispi koruma) ise görev süresince suç iddialarına karşı tutuklama ve yargılamadan korur, kaldırılabilir ve geçicidir."
    },
    {
      "question": "TBMM İçtüzüğünün yargısal denetimini hangi mahkeme yapar?",
      "options": [
        "Danıştay",
        "Yargıtay",
        "Uyuşmazlık Mahkemesi",
        "Anayasa Mahkemesi",
        "İdare Mahkemeleri"
      ],
      "answer": "Anayasa Mahkemesi",
      "explanation": "Anayasa'nın 148. maddesine göre Anayasa Mahkemesi, kanunların, Cumhurbaşkanlığı kararnamelerinin ve Türkiye Büyük Millet Meclisi İçtüzüğünün Anayasaya şekil ve esas bakımlarından uygunluğunu denetler."
    },
    {
      "question": "Anayasa'ya göre, Cumhurbaşkanı seçiminin ilk turunda genel geçer oyların ...... alan aday Cumhurbaşkanı seçilir. Bu çoğunluk sağlanamazsa ikinci tura gidilir.",
      "options": [
        "üçte ikisini",
        "beşte üçünü",
        "salt çoğunluğunu",
        "en fazlasını",
        "yüzde kırkını"
      ],
      "answer": "salt çoğunluğunu",
      "explanation": "Anayasa'nın 101. maddesine göre, 'Genel oyla yapılacak seçimde, geçerli oyların salt çoğunluğunu alan aday, Cumhurbaşkanı seçilir. İlk oylamada bu çoğunluk sağlanamazsa, bu oylamayı izleyen ikinci pazar günü ikinci oylama yapılır.'"
    },
    {
      "question": "Aşağıdakilerden hangisi Cumhurbaşkanlığı Kararnamesi (CBK) ile düzenlenemez?",
      "options": [
        "Bakanlıkların kurulması ve teşkilat yapısı",
        "Devlet Denetleme Kurulunun işleyişi",
        "Milli Güvenlik Kurulu Genel Sekreterliğinin teşkilatı",
        "Anayasada münhasıran kanunla düzenlenmesi öngörülen konular",
        "Üst kademe kamu yöneticilerinin atanmasına ilişkin usul ve esaslar"
      ],
      "answer": "Anayasada münhasıran kanunla düzenlenmesi öngörülen konular",
      "explanation": "Anayasa'nın 104. maddesi Cumhurbaşkanlığı Kararnamesinin sınırlarını çizer. 'Anayasada münhasıran kanunla düzenlenmesi öngörülen konularda' ve 'kanunda açıkça düzenlenen konularda' Cumhurbaşkanlığı kararnamesi çıkarılamaz. Ayrıca, temel haklar, kişi hakları ve ödevleriyle siyasi haklar ve ödevler CBK ile düzenlenemez."
    },
    {
      "question": "Anayasa'ya göre, idarenin her türlü eylem ve işlemlerine karşı ...... yolu açıktır.",
      "options": [
        "yargı",
        "itiraz",
        "dilekçe",
        "kamu denetçisine başvuru",
        "uzlaşma"
      ],
      "answer": "yargı",
      "explanation": "Anayasa'nın 125. maddesi, hukuk devleti ilkesinin en önemli güvencelerinden birini sunar: 'İdarenin her türlü eylem ve işlemlerine karşı yargı yolu açıktır.' Bu kuralın çok sınırlı istisnaları (YSK kararları, HSK'nın bazı kararları, Cumhurbaşkanının tek başına yaptığı işlemler vb.) yine Anayasada belirtilmiştir."
    },
    {
      "question": "Cumhurbaşkanı, Türkiye Büyük Millet Meclisince kabul edilen kanunları kaç gün içinde yayımlar?",
      "options": [
        "10",
        "15",
        "30",
        "45",
        "60"
      ],
      "answer": "15",
      "explanation": "Anayasa'nın 89. maddesi 'Cumhurbaşkanı, Türkiye Büyük Millet Meclisince kabul edilen kanunları onbeş gün içinde yayımlar.' der."
    },
    {
      "question": "Anayasa Mahkemesi üyelerinin görev süresi kaç yıldır ve bir kimse kaç defa Anayasa Mahkemesi üyesi seçilebilir?",
      "options": [
        "10 yıl - Bir defa",
        "12 yıl - Bir defa",
        "12 yıl - İki defa",
        "8 yıl - İki defa",
        "65 yaşına kadar - Sınırsız"
      ],
      "answer": "12 yıl - Bir defa",
      "explanation": "Anayasa'nın 147. maddesine göre, 'Anayasa Mahkemesi üyeleri oniki yıl için seçilirler. Bir kimse iki defa Anayasa Mahkemesi üyesi seçilemez. Anayasa Mahkemesi üyeleri altmışbeş yaşını doldurunca emekliye ayrılırlar.'"
    },
    {
      "question": "Bireysel başvuru hakkını düzenleyen Anayasa'nın 148. maddesine göre, bireysel başvuru yapabilmek için öncelikle neyin tüketilmiş olması gerekir?",
      "options": [
        "İdari başvuru yollarının",
        "Olağan kanun yollarının",
        "Uzlaşma yollarının",
        "Dilekçe hakkının",
        "Af talebinin"
      ],
      "answer": "Olağan kanun yollarının",
      "explanation": "Anayasa'nın 148. maddesi, 'Bireysel başvuru ancak ihlale yol açtığı ileri sürülen işlem, eylem ya da ihmal nedeniyle güncel ve kişisel bir hakkı doğrudan etkilenenler tarafından yapılabilir. Bireysel başvuru, olağan kanun yollarının tüketilmiş olması şartıyla yapılabilir.' demektedir. Bu, AYM'nin ikincil bir denetim mercii olduğunu gösterir."
    },
    {
      "question": "Yüce Divan sıfatıyla yargılama yapma görevi hangi mahkemeye aittir?",
      "options": [
        "Yargıtay Ceza Genel Kurulu",
        "Danıştay İdari Dava Daireleri Kurulu",
        "Anayasa Mahkemesi",
        "Uyuşmazlık Mahkemesi",
        "Özel yetkili ağır ceza mahkemeleri"
      ],
      "answer": "Anayasa Mahkemesi",
      "explanation": "Anayasa'nın 148. maddesi, Anayasa Mahkemesi'nin görevleri arasında üst düzey devlet görevlilerini (Cumhurbaşkanı, Bakanlar, yüksek mahkeme başkan ve üyeleri vb.) görevleriyle ilgili suçlardan dolayı Yüce Divan sıfatıyla yargılamayı sayar."
    },
    {
      "question": "Mali yılbaşından en az ...... gün önce merkezi yönetim bütçe kanun teklifinin TBMM'ye sunulması gerekir.",
      "options": [
        "30",
        "45",
        "60",
        "75",
        "90"
      ],
      "answer": "75",
      "explanation": "Anayasa'nın 161. maddesi, 'Cumhurbaşkanı, merkezî yönetim bütçe kanun teklifini malî yılbaşından en az yetmişbeş gün önce Türkiye Büyük Millet Meclisine sunar.' hükmünü amirdir."
    },
    {
      "question": "Bütçe kanununa, bütçeyle ilgili olmayan hükümler konulamaz. Bu yasağa ne ad verilir?",
      "options": [
        "Bütçenin genelliği ilkesi",
        "Bütçenin torba kanun olmaması ilkesi",
        "Bütçenin birliği ilkesi",
        "Bütçenin açıklığı ilkesi",
        "Bütçenin denkliği ilkesi"
      ],
      "answer": "Bütçenin torba kanun olmaması ilkesi",
      "explanation": "Anayasa'nın 161. maddesinin son fıkrası 'Bütçe kanununa, bütçe ile ilgili hükümler dışında hiçbir hüküm konulamaz.' der. Bu, bütçe kanununun sadece gelir ve gider tahminlerini içermesi gerektiğini, konuyla ilgisiz kanun maddelerinin bütçeye eklenemeyeceğini ifade eder ve literatürde bu ilkeyle anılır."
    },
    {
      "question": "Anayasa'nın değiştirilmesi teklifinin TBMM Genel Kurulunda kabul edilmesi için gereken en az oy sayısı kaçtır?",
      "options": [
        "301",
        "360",
        "400",
        "450",
        "600"
      ],
      "answer": "360",
      "explanation": "Anayasa'nın 175. maddesine göre, Anayasa'nın değiştirilmesi hakkındaki tekliflerin kabulü, Meclis üye tamsayısının en az beşte üç çoğunluğunun (600'ün 3/5'i = 360) gizli oyuyla mümkündür."
    },


    {
      "question": "1982 Anayasası'nın 2. maddesinde sayılan Cumhuriyetin nitelikleri arasında aşağıdakilerden hangisi yer almaz?",
      "options": [
        "Demokratik devlet",
        "Laik devlet",
        "İnsan haklarına dayanan devlet",
        "Sosyal devlet",
        "Hukuk devleti"
      ],
      "answer": "İnsan haklarına dayanan devlet",
      "explanation": "Anayasa'nın 2. maddesinde 'Türkiye Cumhuriyeti, toplumun huzuru, millî dayanışma ve adalet anlayışı içinde, insan haklarına saygılı, Atatürk milliyetçiliğine bağlı, başlangıçta belirtilen temel ilkelere dayanan, demokratik, lâik ve sosyal bir hukuk Devletidir.' ifadesi yer alır. Maddede 'insan haklarına saygılı' ifadesi kullanılır, 'dayanan' ifadesi kullanılmaz. Bu ince bir ayrımdır ve sınavlarda sıkça sorulur."
    }, {
      "question": "Anayasa'nın değiştirilmesi dahi teklif edilemeyecek olan ilk üç maddesini güvence altına alan hüküm, Anayasa'nın kaçıncı maddesidir?",
      "options": [
        "Madde 2",
        "Madde 4",
        "Madde 5",
        "Madde 11",
        "Madde 175"
      ],
      "answer": "Madde 4",
      "explanation": "Anayasa'nın 4. maddesi, 'Anayasanın 1 inci maddesindeki Devletin şeklinin Cumhuriyet olduğu hakkındaki hüküm ile, 2 nci maddesindeki Cumhuriyetin nitelikleri ve 3 üncü maddesi hükümleri değiştirilemez ve değiştirilmesi teklif edilemez.' diyerek ilk üç maddeyi mutlak koruma altına almıştır."
    }, {
      "question": "Anayasa'ya göre egemenlik, kayıtsız şartsız ...... aittir.",
      "options": [
        "Devlete",
        "Türkiye Büyük Millet Meclisine",
        "Millete",
        "Cumhurbaşkanına",
        "Mahkemelere"
      ],
      "answer": "Millete",
      "explanation": "Anayasa'nın 6. maddesi, 'Egemenlik, kayıtsız şartsız Milletindir. Türk Milleti, egemenliğini, Anayasanın koyduğu esaslara göre, yetkili organları eliyle kullanır.' hükmünü içerir."
    }, {
      "question": "Anayasa'nın 8. maddesine göre yürütme yetkisi ve görevi kime aittir?",
      "options": [
        "Türkiye Büyük Millet Meclisine",
        "Bakanlar Kuruluna",
        "Başbakana",
        "Cumhurbaşkanına",
        "Yargıtay Başkanına"
      ],
      "answer": "Cumhurbaşkanına",
      "explanation": "2017 Anayasa değişikliği ile parlamenter sistemden Cumhurbaşkanlığı Hükümet Sistemine geçilmiştir. Bu kapsamda güncellenen 8. madde, 'Yürütme yetkisi ve görevi, Cumhurbaşkanı tarafından, Anayasaya ve kanunlara uygun olarak kullanılır ve yerine getirilir.' şeklindedir."
    }, {
      "question": "Savaş, seferberlik veya olağanüstü hallerde, milletlerarası hukuktan doğan yükümlülükler ihlâl edilmemek kaydıyla, durumun gerektirdiği ölçüde temel hak ve hürriyetlerin kullanılmasının kısmen veya tamamen durdurulabileceğini düzenleyen madde aşağıdakilerden hangisidir?",
      "options": [
        "Madde 13",
        "Madde 14",
        "Madde 15",
        "Madde 19",
        "Madde 119"
      ],
      "answer": "Madde 15",
      "explanation": "Anayasa'nın 15. maddesi, 'Temel hak ve hürriyetlerin kullanılmasının durdurulması' başlığını taşır ve olağanüstü durumlarda hakların sınırlandırılmasına ilişkin temel çerçeveyi çizer. Ancak bu durumda bile savaş hukukuna uygun fiiller sonucu meydana gelen ölümler dışında, kişinin yaşama hakkına, maddî ve manevî varlığının bütünlüğüne dokunulamayacağı belirtilir."
    }, {
      "question": "Anayasa'nın 32. maddesine göre, kişilerin haysiyet ve şereflerine dokunan veya kendileriyle ilgili gerçeğe aykırı yayınlar yapılması halinde tanınan düzeltme ve cevap hakkının yerine getirilmediğine dair yapılan müracaatta, hâkim tarafından en geç ...... içinde karar verilmelidir.",
      "options": [
        "24 saat",
        "48 saat",
        "3 gün",
        "7 gün",
        "15 gün"
      ],
      "answer": "7 gün",
      "explanation": "Anayasa'nın 32. maddesi, 'Düzeltme ve cevap yayımlanmazsa, yayımlanmasının gerekip gerekmediğine hâkim tarafından ilgilinin müracaat tarihinden itibaren en geç yedi gün içerisinde karar verilir.' hükmünü içerir."
    }, {
      "question": "Anayasa'ya göre toplantı ve gösteri yürüyüşü düzenleme hakkı, ...... ilkesine dayanır.",
      "options": [
        "bildirim esasına",
        "önceden izin almaksızın",
        "valilik onayına",
        "mahkeme kararına",
        "kolluk nezaretine"
      ],
      "answer": "önceden izin almaksızın",
      "explanation": "Anayasa'nın 34. maddesi, 'Herkes, önceden izin almadan, silahsız ve saldırısız toplantı ve gösteri yürüyüşü düzenleme hakkına sahiptir.' diyerek bu hakkın izne tabi olmadığını açıkça belirtir."
    }, {
      "question": "Anayasa'nın 42. maddesine göre, 'İlköğretim kız ve erkek bütün vatandaşlar için ...... ve Devlet okullarında ...... .' cümlesindeki boşluklara sırasıyla ne gelmelidir?",
      "options": [
        "serbesttir - isteğe bağlıdır",
        "zorunludur - ücretlidir",
        "zorunludur - parasızdır",
        "haktır - önceliklidir",
        "tavsiye edilir - ücretsizdir"
      ],
      "answer": "zorunludur - parasızdır",
      "explanation": "Anayasa'nın 42. maddesi eğitim ve öğrenim hakkını düzenler ve 'İlköğretim, kız ve erkek bütün vatandaşlar için zorunludur ve Devlet okullarında parasızdır.' hükmünü amirdir."
    }, {
      "question": "1982 Anayasası'na göre aşağıdakilerden hangisi 'Sosyal ve Ekonomik Haklar ve Ödevler'den biri değildir?",
      "options": [
        "Konut hakkı",
        "Sağlık hizmetleri ve çevrenin korunması",
        "Sendika kurma hakkı",
        "Dilekçe hakkı",
        "Çalışma ve sözleşme hürriyeti"
      ],
      "answer": "Dilekçe hakkı",
      "explanation": "Dilekçe, bilgi edinme ve kamu denetçisine başvurma hakkı (Madde 74), Anayasa'nın 'Siyasi Haklar ve Ödevler' başlıklı dördüncü bölümünde yer alır. Diğer şıklar 'Sosyal ve Ekonomik Haklar ve Ödevler' bölümündedir."
    }, {
      "question": "Anayasa'nın 59. maddesine göre, spor federasyonlarının spor faaliyetlerinin yönetimine ve disiplinine ilişkin kararlarına karşı gidilebilecek tek hukuki yol aşağıdakilerden hangisidir?",
      "options": [
        "İdare Mahkemeleri",
        "Danıştay",
        "Zorunlu tahkim",
        "Anayasa Mahkemesi",
        "Yargıtay"
      ],
      "answer": "Zorunlu tahkim",
      "explanation": "Anayasa'nın 59. maddesi çok nettir: 'Spor federasyonlarının spor faaliyetlerinin yönetimine ve disiplinine ilişkin kararlarına karşı ancak zorunlu tahkim yoluna başvurulabilir. Tahkim kurulu kararları kesin olup bu kararlara karşı hiçbir yargı merciine başvurulamaz.'"
    }, {
      "question": "Anayasa'ya göre seçme, seçilme ve siyasi faaliyette bulunma hakkı için yaş sınırı kaçtır?",
      "options": [
        "25",
        "21",
        "20",
        "18",
        "30"
      ],
      "answer": "18",
      "explanation": "Anayasa'nın 67. maddesi uyarınca, 'Onsekiz yaşını dolduran her Türk vatandaşı seçme ve halkoylamasına katılma haklarına sahiptir.'"
    }, {
      "question": "T.C. Anayasası'na göre, siyasi partilerle ilgili hükümler kapsamında, aşağıdakilerden hangisi doğrudur?",
      "options": [
        "Siyasi partiler önceden izin almadan kurulamazlar.",
        "Silahlı Kuvvetler mensupları ile yükseköğretim öncesi öğrencileri siyasi partilere üye olabilirler.",
        "Siyasi partiler, ticari faaliyetlere girişemezler.",
        "Partilere yapılacak yardımın esasları TBMM İçtüzüğü ile düzenlenir.",
        "Temelli kapatılan bir parti bir başka ad altında kurulabilir."
      ],
      "answer": "Siyasi partiler, ticari faaliyetlere girişemezler.",
      "explanation": "Anayasa'nın 68. maddesine göre; a) Siyasi partiler önceden izin almadan kurulurlar. b) Silahlı Kuvvetler mensupları ve yükseköğretim öncesi öğrencileri partilere üye olamazlar. c) Siyasi partilerin gelir ve giderlerinin amaçlarına uygun olması gerekir ve ticari faaliyete girişemezler. d) Partilere yapılacak devlet yardımı kanunla düzenlenir. e) Temelli kapatılan bir parti başka ad altında kurulamaz."
    }, {
      "question": "Türkiye Büyük Millet Meclisi (TBMM) toplam ...... milletvekilinden oluşur.",
      "options": [
        "550",
        "450",
        "600",
        "650",
        "Değişkendir"
      ],
      "answer": "600",
      "explanation": "Anayasa'nın 75. maddesi, 2017 değişikliği ile 'Türkiye Büyük Millet Meclisi, genel oyla seçilen altıyüz milletvekilinden oluşur.' şeklinde güncellenmiştir."
    }, {
      "question": "Anayasa'ya göre TBMM ve Cumhurbaşkanı seçimleri kaç yılda bir birlikte yapılır?",
      "options": [
        "4",
        "5",
        "6",
        "7",
        "TBMM'nin belirleyeceği bir sürede"
      ],
      "answer": "5",
      "explanation": "Anayasa'nın 77. maddesi, 'Türkiye Büyük Millet Meclisi ve Cumhurbaşkanlığı seçimleri beş yılda bir aynı günde yapılır.' hükmünü içerir."
    }, {
      "question": "Anayasa'ya göre, savaş sebebiyle yeni seçimlerin yapılmasına imkân görülmezse, TBMM, seçimlerin ...... süreyle geriye bırakılmasına karar verebilir.",
      "options": [
        "altı ay",
        "bir yıl",
        "iki yıl",
        "süre sınırı olmaksızın",
        "üç ay"
      ],
      "answer": "bir yıl",
      "explanation": "Anayasa'nın 78. maddesi, 'Savaş sebebiyle yeni seçimlerin yapılmasına imkân görülmezse, Türkiye Büyük Millet Meclisi, seçimlerin bir yıl geriye bırakılmasına karar verebilir. Geri bırakma sebebi ortadan kalkmamışsa, erteleme kararındaki usule göre bu işlem tekrarlanabilir.' der."
    }, {
      "question": "Anayasa'ya göre seçimlerin genel yönetimi ve denetimini yürütmekle görevli olan kurum aşağıdakilerden hangisidir?",
      "options": [
        "İçişleri Bakanlığı",
        "Anayasa Mahkemesi",
        "Yüksek Seçim Kurulu",
        "Danıştay",
        "Adalet Bakanlığı"
      ],
      "answer": "Yüksek Seçim Kurulu",
      "explanation": "Anayasa'nın 79. maddesi, seçimlerin başlamasından bitimine kadar, seçimin düzen içinde yönetimi ve dürüstlüğü ile ilgili bütün işlemleri yapma ve yaptırma, seçim süresince ve seçimden sonra seçim konularıyla ilgili bütün yolsuzlukları, şikâyet ve itirazları inceleme ve kesin karara bağlama görevinin Yüksek Seçim Kuruluna (YSK) ait olduğunu belirtir."
    }, {
      "question": "TBMM Genel Kurulu, üye tamsayısının en az ...... ile toplanır ve Anayasada başkaca bir hüküm yoksa toplantıya katılanların ...... ile karar verir. Ancak karar yeter sayısı hiçbir şekilde üye tamsayısının ...... az olamaz.",
      "options": [
        "yarısı - salt çoğunluğu - üçte birinden",
        "üçte biri - salt çoğunluğu - dörtte birinin bir fazlasından",
        "beşte biri - üçte iki çoğunluğu - yarısından",
        "üçte biri - basit çoğunluğu - beşte birinin bir fazlasından",
        "salt çoğunluğu - oybirliği - yarısından"
      ],
      "answer": "üçte biri - salt çoğunluğu - dörtte birinin bir fazlasından",
      "explanation": "Anayasa'nın 96. maddesi toplantı ve karar yeter sayılarını net bir şekilde düzenler: 'Türkiye Büyük Millet Meclisi, yapacağı seçimler dahil bütün işlerinde üye tamsayısının en az üçte biri (200 milletvekili) ile toplanır. Türkiye Büyük Millet Meclisi, Anayasada başkaca bir hüküm yoksa toplantıya katılanların salt çoğunluğu ile karar verir; ancak karar yeter sayısı hiçbir şekilde üye tamsayısının dörtte birinin bir fazlasından (151 milletvekili) az olamaz.'"
    }, {
      "question": "Cumhurbaşkanı tarafından bir kanunun tekrar görüşülmek üzere Meclis'e geri gönderilmesi (veto) durumunda, TBMM geri gönderilen kanunu üye tamsayısının ...... ile aynen kabul ederse, kanun Cumhurbaşkanınca yayımlanır.",
      "options": [
        "salt çoğunluğu",
        "üçte iki çoğunluğu",
        "beşte üç çoğunluğu",
        "dörtte üç çoğunluğu",
        "basit çoğunluğu"
      ],
      "answer": "salt çoğunluğu",
      "explanation": "Anayasa'nın 89. maddesi, 'Cumhurbaşkanı, Türkiye Büyük Millet Meclisince kabul edilen kanunları onbeş gün içinde yayımlar... Geri gönderilen kanun, Türkiye Büyük Millet Meclisi üye tamsayısının salt çoğunluğuyla (301 milletvekili) aynen kabul edilirse, kanun Cumhurbaşkanınca yayımlanır.' hükmünü içerir."
    }, {
      "question": "Aşağıdakilerden hangisi TBMM'nin bilgi edinme ve denetim yollarından biri değildir?",
      "options": [
        "Meclis araştırması",
        "Genel görüşme",
        "Meclis soruşturması",
        "Yazılı soru",
        "Gensoru"
      ],
      "answer": "Gensoru",
      "explanation": "Gensoru, parlamenter sistemde hükümetin veya bir bakanın siyasi sorumluluğunu denetleme aracıydı. 2017 Anayasa değişikliği ile Cumhurbaşkanlığı Hükümet Sistemine geçilmesiyle birlikte gensoru, denetim yolları arasından kaldırılmıştır. Anayasa'nın 98. maddesinde mevcut denetim yolları sayılmıştır."
    }, {
      "question": "1982 Anayasası'na göre Cumhurbaşkanı adayı olabilmek için ...... yaşını doldurmuş olmak gerekir.",
      "options": [
        "30",
        "35",
        "40",
        "45",
        "25"
      ],
      "answer": "40",
      "explanation": "Anayasa'nın 101. maddesi, Cumhurbaşkanı adaylık ve seçimi şartlarını düzenler. 'Cumhurbaşkanı, kırk yaşını doldurmuş, yükseköğrenim yapmış, milletvekili seçilme yeterliliğine sahip Türk vatandaşları arasından... seçilir.' der."
    }, {
      "question": "Cumhurbaşkanı hakkında, bir suç işlediği iddiasıyla Türkiye Büyük Millet Meclisi üye tamsayısının ...... vereceği önergeyle soruşturma açılması istenebilir.",
      "options": [
        "üçte birinin",
        "beşte üçünün",
        "salt çoğunluğunun",
        "dörtte birinin",
        "üçte ikisinin"
      ],
      "answer": "salt çoğunluğunun",
      "explanation": "Anayasa'nın 105. maddesi Cumhurbaşkanının cezai sorumluluğunu düzenler. Buna göre, 'Türkiye Büyük Millet Meclisi üye tamsayısının salt çoğunluğunun vereceği önergeyle' soruşturma açılması istenebilir. Meclis, bu istemi en geç bir ay içinde görüşür ve üye tamsayısının beşte üçünün gizli oyuyla soruşturma açılmasına karar verebilir."
    }, {
      "question": "Cumhurbaşkanı yardımcıları ve bakanlar kime karşı sorumludur?",
      "options": [
        "Türkiye Büyük Millet Meclisine",
        "Anayasa Mahkemesine",
        "Cumhurbaşkanına",
        "Halka",
        "Yüce Divana"
      ],
      "answer": "Cumhurbaşkanına",
      "explanation": "Anayasa'nın 106. maddesi uyarınca, 'Cumhurbaşkanı yardımcıları ve bakanlar, Cumhurbaşkanına karşı sorumludur.' Bu, Cumhurbaşkanlığı Hükümet Sisteminin hiyerarşik yapısının bir gereğidir."
    }, {
      "question": "TBMM adına kamu idarelerinin ve kamuya ait kuruluşların mali denetimini yapan yüksek denetim organı aşağıdakilerden hangisidir?",
      "options": [
        "Devlet Denetleme Kurulu",
        "Maliye Bakanlığı Teftiş Kurulu",
        "Hâkimler ve Savcılar Kurulu",
        "Sayıştay",
        "Danıştay"
      ],
      "answer": "Sayıştay",
      "explanation": "Anayasa'nın 160. maddesi Sayıştay'ı düzenler ve 'Sayıştay, merkezî yönetim bütçesi kapsamındaki kamu idareleri ile sosyal güvenlik kurumlarının bütün gelir ve giderleri ile mallarını Türkiye Büyük Millet Meclisi adına denetlemek...le görevlidir.' der. Kesin hesap kanun tekliflerini de TBMM'ye sunar."
    }, {
      "question": "Anayasa'ya göre, Cumhurbaşkanı tarafından ilan edilen olağanüstü hal (OHAL), Resmi Gazete'de yayımlanarak derhal ...... onayına sunulur.",
      "options": [
        "Anayasa Mahkemesinin",
        "Bakanlar Kurulunun",
        "Yüksek Seçim Kurulunun",
        "Türkiye Büyük Millet Meclisinin",
        "Milli Güvenlik Kurulunun"
      ],
      "answer": "Türkiye Büyük Millet Meclisinin",
      "explanation": "Anayasa'nın 119. maddesine göre, Cumhurbaşkanı OHAL ilan edebilir ancak bu karar derhal TBMM'nin onayına sunulmak zorundadır. 'Türkiye Büyük Millet Meclisi tatilde ise derhal toplantıya çağrılır; Meclis, olağanüstü hal süresini değiştirebilir, Cumhurbaşkanının istemi üzerine, her defasında dört ayı geçmemek üzere, süreyi uzatabilir veya olağanüstü hali kaldırabilir.'"
    }, {
      "question": "Cumhurbaşkanı, en fazla ...... süreyi geçmemek üzere olağanüstü hal ilan edebilir.",
      "options": [
        "üç ay",
        "altı ay",
        "bir yıl",
        "dokuz ay",
        "dört ay"
      ],
      "answer": "altı ay",
      "explanation": "Anayasa'nın 119. maddesi, 'Cumhurbaşkanı... yurdun tamamında veya bir bölgesinde, süresi altı ayı geçmemek üzere olağanüstü hal ilân edebilir.' hükmünü içerir. Bu süre TBMM kararıyla uzatılabilir."
    }, {
      "question": "Anayasa'ya göre mahkemelerin bağımsızlığı ilkesi uyarınca, görülmekte olan bir dava hakkında Yasama Meclisinde yargı yetkisinin kullanılması ile ilgili soru sorulamaz, görüşme yapılamaz veya herhangi bir beyanda bulunulamaz. Bu yasağa ne ad verilir?",
      "options": [
        "Yargı dokunulmazlığı",
        "Yasama sorumsuzluğu",
        "Yargı bağımsızlığı ilkesinin gereği",
        "Derdestlik itirazı",
        "Kuvvetler ayrılığı"
      ],
      "answer": "Yargı bağımsızlığı ilkesinin gereği",
      "explanation": "Anayasa'nın 138. maddesi mahkemelerin bağımsızlığını düzenler ve son fıkrasında 'Görülmekte olan bir dava hakkında Yasama Meclisinde yargı yetkisinin kullanılması ile ilgili soru sorulamaz, görüşme yapılamaz veya herhangi bir beyanda bulunulamaz; yasama ve yürütme organları ile idare, mahkeme kararlarına uymak zorundadır' hükmü yer alır. Bu, yargının diğer organların etkisinden korunması amacını taşır."
    }, {
      "question": "Anayasa Mahkemesi toplam ...... üyeden oluşur.",
      "options": [
        "11",
        "13",
        "15",
        "17",
        "22"
      ],
      "answer": "15",
      "explanation": "Anayasa'nın 146. maddesine göre 'Anayasa Mahkemesi onbeş üyeden kurulur.' Bu üyelerin üçünü TBMM, on ikisini ise Cumhurbaşkanı seçer."
    }, {
      "question": "Aşağıdakilerden hangisi Anayasa Mahkemesi'nin görev ve yetkileri içinde yer almaz?",
      "options": [
        "Kanunların Anayasaya şekil ve esas bakımından uygunluğunu denetlemek",
        "Temel hak ve özgürlüklerin ihlali iddiasıyla yapılan bireysel başvuruları incelemek",
        "Yüce Divan sıfatıyla Cumhurbaşkanını ve bakanları yargılamak",
        "Siyasi partilerin kapatılmasına ilişkin davalara bakmak",
        "Kanunların uygulanmasından doğan uyuşmazlıkları kesin olarak çözümlemek"
      ],
      "answer": "Kanunların uygulanmasından doğan uyuşmazlıkları kesin olarak çözümlemek",
      "explanation": "Kanunların uygulanmasından doğan uyuşmazlıkları çözümlemek, adli ve idari yargı mahkemelerinin (Yargıtay, Danıştay, ilk derece mahkemeleri) görevidir. Anayasa Mahkemesi ise kanunların (normların) Anayasa'ya uygunluğunu denetler (norm denetimi yapar), bireysel başvurulara bakar ve Yüce Divan gibi özel görevleri yerine getirir."
    }, {
      "question": "Anayasa Mahkemesinin, bir kanun veya Cumhurbaşkanlığı kararnamesinin tamamını veya bir hükmünü iptal etmesi durumunda, iptal kararı geriye ...... .",
      "options": [
        "yürür",
        "yürümez",
        "ancak bir yıl geriye yürür",
        "mağduriyet varsa yürür",
        "TBMM onayıyla yürür"
      ],
      "answer": "yürümez",
      "explanation": "Anayasa'nın 153. maddesi, 'İptal kararları geriye yürümez.' hükmünü açıkça belirtir. Bu, hukuk güvenliği ilkesinin bir gereğidir. İptal kararları Resmi Gazete'de yayımlandığı tarihte hüküm ifade eder."
    }, {
      "question": "Adli yargı alanındaki mahkemelerce verilen ve kanunun başka bir adli yargı merciine bırakmadığı karar ve hükümlerin son inceleme mercii aşağıdakilerden hangisidir?",
      "options": [
        "Danıştay",
        "Anayasa Mahkemesi",
        "Uyuşmazlık Mahkemesi",
        "Sayıştay",
        "Yargıtay"
      ],
      "answer": "Yargıtay",
      "explanation": "Anayasa'nın 154. maddesi, 'Yargıtay, adliye mahkemelerince verilen ve kanunun başka bir adlî yargı merciine bırakmadığı karar ve hükümlerin son inceleme merciidir.' diyerek Yargıtay'ın adli yargıdaki temyiz mercii olduğunu tanımlar."
    }, {
      "question": "İdari mahkemelerce verilen ve kanunun başka bir idari yargı merciine bırakmadığı karar ve hükümlerin son inceleme mercii aşağıdakilerden hangisidir?",
      "options": [
        "Yargıtay",
        "Danıştay",
        "Sayıştay",
        "Anayasa Mahkemesi",
        "Bölge İdare Mahkemesi"
      ],
      "answer": "Danıştay",
      "explanation": "Anayasa'nın 155. maddesi, 'Danıştay, idare mahkemelerince verilen ve kanunun başka bir idarî yargı merciine bırakmadığı karar ve hükümlerin son inceleme merciidir.' diyerek Danıştay'ın idari yargıdaki en üst mahkeme (temyiz mercii) olduğunu belirtir."
    }, {
      "question": "Adli ve idari yargı mercileri arasındaki görev ve hüküm uyuşmazlıklarını kesin olarak çözümlemeye yetkili mahkeme hangisidir?",
      "options": [
        "Anayasa Mahkemesi",
        "Yargıtay",
        "Danıştay",
        "Uyuşmazlık Mahkemesi",
        "Hâkimler ve Savcılar Kurulu"
      ],
      "answer": "Uyuşmazlık Mahkemesi",
      "explanation": "Anayasa'nın 158. maddesi, Uyuşmazlık Mahkemesini 'adlî ve idarî yargı mercileri arasındaki görev ve hüküm uyuşmazlıklarını kesin olarak çözümlemeye yetkili' olarak tanımlar."
    }, {
      "question": "Hâkimler ve Savcılar Kurulu (HSK) toplam ...... üyeden oluşur ve ...... daire halinde çalışır.",
      "options": [
        "15 - 3",
        "13 - 2",
        "17 - 3",
        "11 - 2",
        "22 - 4"
      ],
      "answer": "13 - 2",
      "explanation": "Anayasa'nın 159. maddesine göre, Hâkimler ve Savcılar Kurulu onüç üyeden oluşur ve iki daire halinde çalışır. Kurulun Başkanı Adalet Bakanıdır. Adalet Bakanı Yardımcısı da Kurulun doğal üyesidir."
    }, {
      "question": "Anayasa'ya göre, bütçe kanun teklifini ve merkezi yönetim kesinhesap kanunu teklifini hazırlayıp TBMM'ye sunma görevi kime aittir?",
      "options": [
        "Hazine ve Maliye Bakanı",
        "TBMM Plan ve Bütçe Komisyonu",
        "Sayıştay Başkanı",
        "Cumhurbaşkanı",
        "TBMM Başkanı"
      ],
      "answer": "Cumhurbaşkanı",
      "explanation": "Anayasa'nın 161. maddesi uyarınca, 'Cumhurbaşkanı, merkezî yönetim bütçe kanun teklifini malî yılbaşından en az yetmişbeş gün önce Türkiye Büyük Millet Meclisine sunar.' Kesinhesap kanunu teklifini de yine Cumhurbaşkanı sunar."
    }, {
      "question": "Anayasa değişikliği teklifi, TBMM üye tamsayısının en az ...... tarafından yazıyla önerilebilir.",
      "options": [
        "beşte biri",
        "dörtte biri",
        "üçte biri",
        "salt çoğunluğu",
        "üçte ikisi"
      ],
      "answer": "üçte biri",
      "explanation": "Anayasa'nın 175. maddesi, anayasa değişikliği sürecini düzenler. 'Anayasanın değiştirilmesi Türkiye Büyük Millet Meclisi üye tamsayısının en az üçte biri (200 milletvekili) tarafından yazıyla teklif edilebilir.' hükmünü içerir."
    }, {
      "question": "TBMM'de Anayasa değişikliği teklifinin kabul edilebilmesi için gereken asgari çoğunluk nedir?",
      "options": [
        "Üye tamsayısının salt çoğunluğu (301)",
        "Toplantıya katılanların salt çoğunluğu",
        "Üye tamsayısının üçte iki çoğunluğu (400)",
        "Üye tamsayısının beşte üç çoğunluğu (360)",
        "Üye tamsayısının dörtte üç çoğunluğu (450)"
      ],
      "answer": "Üye tamsayısının beşte üç çoğunluğu (360)",
      "explanation": "Anayasa'nın 175. maddesine göre, 'Değiştirme teklifinin kabulü, Meclisin üye tamsayısının beşte üç çoğunluğunun (360) gizli oyuyla mümkündür.' Bu oranın altında kalan teklifler reddedilmiş sayılır."
    }, {
      "question": "Anayasa değişikliğine ilişkin kanun, Meclis'te üye tamsayısının üçte ikisinden (400) az oyla kabul edilirse, Cumhurbaşkanı bu kanunu halkoyuna sunmak ...... .",
      "options": [
        "zorundadır",
        "isterse sunabilir",
        "sunamaz, veto etmelidir",
        "Anayasa Mahkemesine gönderebilir",
        "TBMM'ye geri gönderebilir"
      ],
      "answer": "zorundadır",
      "explanation": "Anayasa'nın 175. maddesi bu durumu netleştirir. Değişiklik, beşte üç (360) ile üçte iki (400) arasında bir oyla kabul edilirse, Cumhurbaşkanı ya kanunu Meclis'e geri gönderir ya da zorunlu olarak halkoyuna sunar. Eğer Meclis'e geri gönderir ve Meclis yine aynı oyla kabul ederse, halkoyuna sunulması zorunlu hale gelir."
    }, {
      "question": "Anayasa'da sayılan İnkılâp Kanunlarının, Anayasaya aykırı olduğu şeklinde anlaşılamayacağını ve yorumlanamayacağını belirten koruma maddesi aşağıdakilerden hangisidir?",
      "options": [
        "Madde 4",
        "Madde 11",
        "Madde 174",
        "Madde 176",
        "Madde 68"
      ],
      "answer": "Madde 174",
      "explanation": "Madde 174, 'İnkılâp Kanunlarının Korunması' başlığını taşır ve Tevhidi Tedrisat Kanunu, Şapka İktisası Hakkında Kanun, Harf İnkılabı gibi sekiz temel kanunun Anayasa'ya aykırılığının iddia edilemeyeceğini hüküm altına alır."
    }, {
      "question": "Anayasa'ya göre, 'Hiç kimse, kanunen tâbi olduğu ...... önünden başka bir merci önüne çıkarılamaz.' ifadesindeki boşluğa ne gelmelidir?",
      "options": [
        "hâkim",
        "mahkeme",
        "yargı kolu",
        "savcı",
        "mahkeme heyeti"
      ],
      "answer": "mahkeme",
      "explanation": "Bu ilke 'kanuni/doğal hâkim güvencesi' olarak bilinir ve Anayasa'nın 37. maddesinde 'Hiç kimse, kanunen tâbi olduğu mahkemeden başka bir merci önüne çıkarılamaz.' şeklinde ifade edilmiştir."
    }, {
      "question": "Anayasa'ya göre, kamu hizmetine girme hakkına sahip olan kamu görevlileri ile işçi niteliği taşımayan diğer kamu görevlilerinin aylık ve ödenekleri ile ilgili uyuşmazlıkları çözümleyen yargı organı hangisidir?",
      "options": [
        "İş Mahkemeleri",
        "Yüksek Hakem Kurulu",
        "Kamu Görevlileri Hakem Kurulu",
        "Danıştay",
        "Sayıştay"
      ],
      "answer": "Kamu Görevlileri Hakem Kurulu",
      "explanation": "Anayasa'nın 53. maddesi toplu sözleşme hakkını düzenler. Kamu görevlilerinin toplu sözleşmelerinde uyuşmazlık çıkması halinde taraflar Kamu Görevlileri Hakem Kuruluna başvurabilir. Bu Kurulun kararları kesindir ve toplu sözleşme hükmündedir."
    }, {
      "question": "Anayasa'nın 19. maddesine göre, yakalanan veya tutuklanan kişi, tutulma yerine en yakın mahkemeye gönderilmesi için gerekli süre hariç en geç ...... içinde hâkim önüne çıkarılır.",
      "options": [
        "24 saat",
        "36 saat",
        "48 saat",
        "72 saat",
        "12 saat"
      ],
      "answer": "48 saat",
      "explanation": "Anayasa'nın 19. maddesi kişi hürriyeti ve güvenliğini düzenler ve 'Yakalanan veya tutuklanan kişi, tutulma yerine en yakın mahkemeye gönderilmesi için gerekli süre hariç en geç kırksekiz saat... içinde hâkim önüne çıkarılır.' hükmünü içerir. Toplu olarak işlenen suçlarda bu süre dört güne kadar uzatılabilir."
    }, {
      "question": "Anayasa'ya göre, Devlet Denetleme Kurulu kime bağlı olarak görev yapar?",
      "options": [
        "Türkiye Büyük Millet Meclisi Başkanlığına",
        "Adalet Bakanlığına",
        "Cumhurbaşkanlığına",
        "Sayıştay Başkanlığına",
        "Danıştay Başkanlığına"
      ],
      "answer": "Cumhurbaşkanlığına",
      "explanation": "Anayasa'nın 108. maddesi, Devlet Denetleme Kurulunu düzenler ve 'İdarenin hukuka uygunluğunun, düzenli ve verimli şekilde yürütülmesinin ve geliştirilmesinin sağlanması amacıyla, Cumhurbaşkanlığına bağlı olarak kurulan Devlet Denetleme Kurulu, Cumhurbaşkanının isteği üzerine... denetlemeleri yapar.' der."
    }, {
      "question": "Anayasa'ya göre aşağıdakilerden hangisinin Yüce Divan'da yargılanma usulü yoktur?",
      "options": [
        "Cumhurbaşkanı",
        "Bakanlar",
        "Anayasa Mahkemesi Başkanı",
        "Yargıtay Cumhuriyet Başsavcısı",
        "Milletvekilleri"
      ],
      "answer": "Milletvekilleri",
      "explanation": "Anayasa'nın 148. maddesi Yüce Divan'da yargılanacak kişileri sayar. Bunlar arasında Cumhurbaşkanı, Cumhurbaşkanı yardımcıları, bakanlar, yüksek mahkeme başkan ve üyeleri, HSK ve Sayıştay başkan ve üyeleri, Genelkurmay Başkanı ve kuvvet komutanları bulunur. Milletvekilleri, görevleriyle ilgili suçlardan dolayı Yüce Divan'da yargılanmazlar, ancak dokunulmazlıkları kaldırıldığında genel mahkemelerde yargılanırlar."
    }, {
      "question": "Anayasa'ya göre, Milli Güvenlik Kurulunun (MGK) gündemini kim belirler?",
      "options": [
        "Genelkurmay Başkanı",
        "Milli Savunma Bakanı",
        "TBMM Başkanı",
        "Cumhurbaşkanı",
        "İçişleri Bakanı"
      ],
      "answer": "Cumhurbaşkanı",
      "explanation": "Anayasa'nın 118. maddesi MGK'yı düzenler. 'Milli Güvenlik Kurulunun gündemi; Cumhurbaşkanı yardımcıları ve Genelkurmay Başkanının önerileri dikkate alınarak Cumhurbaşkanınca düzenlenir.' der. Ayrıca MGK'ya Cumhurbaşkanı başkanlık eder."
    }, {
      "question": "Anayasa'ya göre, usulüne göre yürürlüğe konulmuş milletlerarası antlaşmalar ...... hükmündedir.",
      "options": [
        "kanun",
        "yönetmelik",
        "Anayasa",
        "tavsiye kararı",
        "genelge"
      ],
      "answer": "kanun",
      "explanation": "Anayasa'nın 90. maddesi, 'Usulüne göre yürürlüğe konulmuş milletlerarası andlaşmalar kanun hükmündedir. Bunlar hakkında Anayasaya aykırılık iddiası ile Anayasa Mahkemesine başvurulamaz.' hükmünü içerir. Hatta temel hak ve özgürlüklere ilişkin antlaşmalar ile kanunlar arasında çelişki olursa antlaşma hükümleri esas alınır."
    }, {
      "question": "Anayasa'ya göre TBMM, üye tamsayısının en az ...... kararıyla seçimlerin yenilenmesine karar verebilir.",
      "options": [
        "salt çoğunluğunun",
        "beşte üçünün",
        "üçte birinin",
        "üçte ikisinin",
        "dörtte üçünün"
      ],
      "answer": "beşte üçünün",
      "explanation": "Anayasa'nın 116. maddesine göre, 'Türkiye Büyük Millet Meclisi, üye tamsayısının beşte üç çoğunluğuyla seçimlerin yenilenmesine karar verebilir. Bu halde Türkiye Büyük Millet Meclisi genel seçimi ile Cumhurbaşkanlığı seçimi birlikte yapılır.'"
    }, {
      "question": "Anayasa'ya göre, Diyanet İşleri Başkanlığı hangi idari yapı içinde yer alır?",
      "options": [
        "Doğrudan Cumhurbaşkanlığına bağlıdır.",
        "Genel idare içinde yer alır.",
        "Mahalli idareler kapsamındadır.",
        "Kültür ve Turizm Bakanlığına bağlıdır.",
        "Kamu kurumu niteliğinde bir meslek kuruluşudur."
      ],
      "answer": "Genel idare içinde yer alır.",
      "explanation": "Anayasa'nın 136. maddesi, 'Genel idare içinde yer alan Diyanet İşleri Başkanlığı, lâiklik ilkesi doğrultusunda, bütün siyasî görüş ve düşünüşlerin dışında kalarak ve milletçe dayanışma ve bütünleşmeyi amaç edinerek, özel kanununda gösterilen görevleri yerine getirir.' hükmünü içerir."
    }, {
      "question": "Siyasi partilerin kapatılması davalarına hangi mahkeme bakar?",
      "options": [
        "Yargıtay Ceza Genel Kurulu",
        "Danıştay",
        "Anayasa Mahkemesi",
        "Yargıtay Cumhuriyet Başsavcılığı",
        "Ağır Ceza Mahkemesi"
      ],
      "answer": "Anayasa Mahkemesi",
      "explanation": "Anayasa'nın 69. maddesi uyarınca, 'Siyasî partilerin kapatılması, Yargıtay Cumhuriyet Başsavcısının açacağı dava üzerine Anayasa Mahkemesince kesin olarak karara bağlanır.'"
    }
  ],
  ataturk: [{
    "question": "Milli Mücadele'nin gerekçesi, amacı ve yöntemi ilk kez ______'da yayımlanan bildiri ile ortaya konulmuştur.",
    "options": [
      "Havza Genelgesi",
      "Erzurum Kongresi",
      "Amasya Genelgesi",
      "Sivas Kongresi",
      "Amasya Görüşmeleri"
    ],
    "answer": "Amasya Genelgesi",
    "explanation": "Bu soru, Kurtuluş Savaşı'nın hazırlık dönemini konu almaktadır. 22 Haziran 1919'da yayımlanan Amasya Genelgesi, 'Vatanın bütünlüğü, milletin bağımsızlığı tehlikededir.' diyerek gerekçeyi; 'Milletin bağımsızlığını, yine milletin azim ve kararı kurtaracaktır.' diyerek de amaç ve yöntemi belirlemiştir. Bu nedenle Kurtuluş Savaşı'nın bir nevi 'ihtilal beyannamesi' olarak kabul edilir."
  }, {
    "question": "Aşağıdakilerden hangisi, toplanış amacı bakımından bölgesel olmasına rağmen aldığı kararlar bakımından ulusal nitelik taşıyan kongredir?",
    "options": [
      "Sivas Kongresi",
      "Alaşehir Kongresi",
      "Balıkesir Kongresi",
      "Erzurum Kongresi",
      "Pozantı Kongresi"
    ],
    "answer": "Erzurum Kongresi",
    "explanation": "Bu soru, Milli Mücadele dönemindeki kongrelerin niteliklerini ayırt etmeyi amaçlar. Erzurum Kongresi, Doğu Anadolu'daki Ermeni ve Rum tehditlerine karşı toplanmış olması nedeniyle bölgeseldir. Ancak 'Milli sınırlar içinde vatan bir bütündür, parçalanamaz.' ve 'Manda ve himaye kabul edilemez.' gibi kararları tüm yurdu ilgilendirdiği için ulusal bir kimlik kazanmıştır."
  }, {
    "question": "I. Saltanatın kaldırılması\\nII. Türk Medeni Kanunu'nun kabulü\\nIII. Tevhid-i Tedrisat Kanunu'nun çıkarılması\\n\\nYukarıda verilen inkılaplar, öncelikli olarak aşağıdaki Atatürk ilkelerinden hangisinin yerleşmesini sağlamaya yöneliktir?",
    "options": [
      "Milliyetçilik",
      "Laiklik",
      "Halkçılık",
      "Devletçilik",
      "İnkılapçılık"
    ],
    "answer": "Laiklik",
    "explanation": "Bu soru, inkılaplar ve ilkeler arasındaki ilişkiyi sorgulamaktadır. Saltanatın kaldırılması din ve devlet işlerinin ayrılmasında ilk adımdır. Medeni Kanun ile hukuk sistemi şeriattan arındırılmıştır. Tevhid-i Tedrisat Kanunu ile eğitim sistemi laikleştirilmiştir. Bu üç büyük inkılap, doğrudan doğruya din ve devlet işlerini birbirinden ayırarak laik düzenin temelini atmıştır."
  }, {
    "question": "Osmanlı Mebusan Meclisi'nin kabul ettiği Misak-ı Milli kararlarına tepki olarak İtilaf Devletleri'nin gerçekleştirdiği olay aşağıdakilerden hangisidir?",
    "options": [
      "Londra Konferansı'nı toplamak",
      "Anadolu'daki isyanları desteklemek",
      "Sevr Antlaşması'nı teklif etmek",
      "Mudanya Ateşkesi'ni imzalamak",
      "İstanbul'u resmen işgal etmek"
    ],
    "answer": "İstanbul'u resmen işgal etmek",
    "explanation": "Bu soru, sebep-sonuç ilişkisini ölçmektedir. 28 Ocak 1920'de Misak-ı Milli'nin ilanı, Türk milletinin bağımsızlık konusundaki kararlılığını dünyaya duyurmuştur. Bu durumdan rahatsız olan İtilaf Devletleri, Mebusan Meclisi'ni dağıtmak ve milli iradeyi kırmak amacıyla 16 Mart 1920'de İstanbul'u resmen işgal etmiş ve meclisi basarak milletvekillerini tutuklamıştır. Bu olay, Ankara'da TBMM'nin açılışını hızlandırmıştır."
  }, {
    "question": "Kurtuluş Savaşı'nda Batı Cephesi'nde kazanılan ______ zaferinden sonra İtilaf Devletleri, TBMM Hükümeti'ni resmen tanıyarak Londra Konferansı'na davet etmişlerdir.",
    "options": [
      "II. İnönü Muharebesi",
      "Sakarya Meydan Muharebesi",
      "I. İnönü Muharebesi",
      "Kütahya-Eskişehir Muharebeleri",
      "Büyük Taarruz"
    ],
    "answer": "I. İnönü Muharebesi",
    "explanation": "Bu soru, askeri başarıların siyasi sonuçlarını sorgulamaktadır. Düzenli ordunun Batı Cephesi'ndeki ilk zaferi olan I. İnönü Muharebesi, hem yurt içinde hem de yurt dışında önemli sonuçlar doğurmuştur. Bu zafer sonucunda İtilaf Devletleri, TBMM'nin askeri ve siyasi gücünü kabul etmek zorunda kalmış ve Sevr'i yumuşatarak kabul ettirmek amacıyla Londra Konferansı'nı düzenlemiştir."
  }, {
    "question": "Atatürk Dönemi'nde özel sermayenin yetersizliği nedeniyle büyük sanayi yatırımlarının, bankaların ve fabrikaların devlet eliyle kurulmasını öngören ekonomik model, ______ ilkesinin bir gereğidir.",
    "options": [
      "Halkçılık",
      "Milliyetçilik",
      "Laiklik",
      "Cumhuriyetçilik",
      "Devletçilik"
    ],
    "answer": "Devletçilik",
    "explanation": "Bu soru, Atatürk ilkelerinden Devletçilik'in tanımını sormaktadır. Özellikle 1929 Dünya Ekonomik Krizi'nden sonra, genç cumhuriyetin kalkınma hamlesini özel sektörün tek başına yapamayacağı anlaşılmıştır. Bu nedenle devlet, planlı bir ekonomi modeli benimseyerek Sümerbank, Etibank gibi kurumları ve demir-çelik, dokuma gibi fabrikaları kurarak ekonomiye öncülük etmiştir. Bu politikaya Devletçilik denir."
  }, {
    "question": "Aşağıdakilerden hangisi 3 Mart 1924 tarihinde gerçekleştirilen inkılaplardan biri değildir?",
    "options": [
      "Halifeliğin kaldırılması",
      "Tevhid-i Tedrisat Kanunu'nun kabulü",
      "Şeriye ve Evkaf Vekaletinin kaldırılması",
      "Erkan-ı Harbiye Vekaletinin kaldırılması",
      "Türk Medeni Kanunu'nun kabulü"
    ],
    "answer": "Türk Medeni Kanunu'nun kabulü",
    "explanation": "Bu soru, belirli bir tarihte yapılan inkılapları bilmeyi gerektirir. 3 Mart 1924, laikleşme yolunda atılan en önemli adımların toplu olarak gerçekleştirildiği bir gündür. Bu tarihte Halifelik, Şeriye ve Evkaf Vekaleti (Din İşleri ve Vakıflar Bakanlığı) ve Erkan-ı Harbiye Vekaleti (Savaş Bakanlığı) kaldırılmış, Tevhid-i Tedrisat Kanunu kabul edilmiştir. Türk Medeni Kanunu ise 17 Şubat 1926'da kabul edilmiştir."
  }, {
    "question": "I. Aşar vergisinin kaldırılması \\nII. Soyadı Kanunu'nun çıkarılması //nIII. Kadınlara seçme ve seçilme hakkının verilmesi\\n\\nYukarıdaki inkılaplardan hangileri doğrudan halkçılık ilkesiyle ilgilidir?",
    "options": [
      "Yalnız I",
      "I ve II",
      "II ve III",
      "Yalnız III",
      "I, II ve III"
    ],
    "answer": "I, II ve III",
    "explanation": "Bu soru, halkçılık ilkesinin farklı alanlardaki uygulamalarını sormaktadır. Aşar vergisinin kaldırılması köylünün üzerindeki ekonomik yükü hafifleterek sosyal adaleti sağladığı için halkçılıktır. Soyadı Kanunu, ayrıcalık belirten unvanları kaldırıp kanun önünde eşitliği getirdiği için halkçılıktır. Kadınlara siyasi haklar tanınması, toplumun yarısını oluşturan kadınları erkeklerle eşit konuma getirdiği için halkçılığın en önemli uygulamalarındandır."
  }, {
    "question": "Lozan Antlaşması'nda çözülemeyen ve daha sonra Türkiye ile İngiltere arasında yapılan 1926 Ankara Antlaşması ile Türkiye'nin aleyhine sonuçlanan konu aşağıdakilerden hangisidir?",
    "options": [
      "Boğazlar Sorunu",
      "Hatay Sorunu",
      "Dış Borçlar",
      "Musul Sorunu",
      "Nüfus Mübadelesi"
    ],
    "answer": "Musul Sorunu",
    "explanation": "Bu soru, Lozan sonrası dış politikayı konu almaktadır. Zengin petrol yatakları nedeniyle İngiltere'nin vazgeçmediği Musul, Lozan'da çözülememiştir. Konu Milletler Cemiyeti'ne taşınmış, ancak İngiltere'nin etkisiyle karar Türkiye aleyhine çıkmıştır. Aynı dönemde çıkan Şeyh Sait İsyanı ile uğraşan Türkiye, 1926 Ankara Antlaşması ile Musul'u İngiliz mandasındaki Irak'a bırakmak zorunda kalmıştır."
  }, {
    "question": "Mustafa Kemal'in 'Siz orada yalnız düşmanı değil, milletin makûs (kötü) talihini de yendiniz.' sözüyle taltif ettiği savaş aşağıdakilerden hangisidir?",
    "options": [
      "I. İnönü Muharebesi",
      "Sakarya Meydan Muharebesi",
      "Büyük Taarruz",
      "II. İnönü Muharebesi",
      "Gediz Taarruzu"
    ],
    "answer": "II. İnönü Muharebesi",
    "explanation": "Bu soru, Atatürk'ün Kurtuluş Savaşı'ndaki komutanlara söylediği özdeyişleri bilmeyi gerektirir. II. İnönü Zaferi üzerine, Batı Cephesi Komutanı İsmet Paşa'ya çektiği tebrik telgrafında bu tarihi sözleri kullanmıştır. Bu zafer, I. İnönü'nün bir tesadüf olmadığını kanıtlamış ve milletin zafere olan inancını pekiştirmiştir."
  }, {
    "question": "Türkiye Cumhuriyeti tarihinde, çok partili hayata geçiş denemeleri sırasında kurulan ilk muhalefet partisi aşağıdakilerden hangisidir?",
    "options": [
      "Serbest Cumhuriyet Fırkası",
      "Milli Kalkınma Partisi",
      "Terakkiperver Cumhuriyet Fırkası",
      "Demokrat Parti",
      "Ahali Cumhuriyet Fırkası"
    ],
    "answer": "Terakkiperver Cumhuriyet Fırkası",
    "explanation": "Bu soru, Türkiye'nin demokrasi tarihini konu almaktadır. Cumhuriyet Halk Fırkası'na karşı ilk organize muhalefet hareketi, 1924 yılında Kazım Karabekir, Ali Fuat Cebesoy, Refet Bele gibi Milli Mücadele'nin önemli komutanları tarafından kurulan Terakkiperver Cumhuriyet Fırkası'dır. Parti, Şeyh Sait İsyanı ile ilişkilendirilerek 1925 yılında kapatılmıştır."
  }, {
    "question": "Temsil Heyeti'nin varlığı ______ ile sona ermiş ve tüm yetkileri yeni kurulan meclise devredilmiştir.",
    "options": [
      "Sivas Kongresi'nin toplanması",
      "Türkiye Büyük Millet Meclisi'nin açılması",
      "Amasya Görüşmeleri'nin yapılması",
      "Cumhuriyetin ilan edilmesi",
      "Saltanatın kaldırılması"
    ],
    "answer": "Türkiye Büyük Millet Meclisi'nin açılması",
    "explanation": "Bu soru, Milli Mücadele'deki yürütme organının evrimini sormaktadır. Erzurum Kongresi'nde kurulan ve Sivas Kongresi'nde tüm yurdu temsil eder hale gelen Temsil Heyeti, bir hükümet gibi çalışmıştır. Ancak 23 Nisan 1920'de Türkiye Büyük Millet Meclisi'nin açılmasıyla birlikte, ulusal egemenliğin tecelli ettiği bu yeni kuruma tüm yetkilerini devrederek görevini tamamlamıştır."
  }, {
    "question": "I. Okuma yazma oranını artırmak  <br>II. Batı kültürüyle entegrasyonu kolaylaştırmak  <br>III. Konuşma dili ile yazı dili arasındaki farkı gidermek<br><br>Yukarıdakilerden hangileri, 1 Kasım 1928'de kabul edilen Harf İnkılabı'nın amaçları arasında yer alır?",
    "options": [
      "Yalnız I",
      "I ve II",
      "II ve III",
      "I ve III",
      "I, II ve III"
    ],
    "answer": "I, II ve III",
    "explanation": "Bu soru, Harf İnkılabı'nın çok yönlü hedeflerini analiz etmeyi gerektirir. Arap harflerinin Türkçe'nin ses yapısına uygun olmaması ve öğrenilmesinin zor olması, okuryazarlığı düşürüyordu. Latin alfabesine geçiş (I) okuryazarlığı artırmayı hedeflemiştir. (II) Modern ve Batı dünyasıyla bilimsel ve kültürel ilişkileri kolaylaştırmıştır. (III) Aynı zamanda, aydınların kullandığı ağır Osmanlıca yazı dili ile halkın konuştuğu Türkçe arasındaki uçurumu kapatmayı amaçlamıştır."
  }, {
    "question": "Atatürk'ün 'Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır.' sözü, onun hangi ilkesine olan sarsılmaz inancını gösterir?",
    "options": [
      "Laiklik",
      "Devletçilik",
      "Halkçılık",
      "Cumhuriyetçilik",
      "Milliyetçilik"
    ],
    "answer": "Cumhuriyetçilik",
    "explanation": "Bu soru, Atatürk'ün sözleri ve ilkeleri arasındaki bağlantıyı kurmayı amaçlar. Bu ünlü söz, Atatürk'ün kendi varlığının gelip geçici olduğunu, ancak halk egemenliğine dayanan ve en ideal yönetim şekli olarak gördüğü Cumhuriyet rejiminin sonsuza kadar yaşayacağına olan inancını ve bu rejimi Türk milletine emanet ettiğini vurgular. Bu, doğrudan Cumhuriyetçilik ilkesinin özüdür."
  }, {
    "question": "Kurtuluş Savaşı'nın askeri safhasını sona erdiren ve diplomatik sürecini başlatan ateşkes antlaşması aşağıdakilerden hangisidir?",
    "options": [
      "Mondros Ateşkes Antlaşması",
      "Ankara Antlaşması",
      "Lozan Barış Antlaşması",
      "Mudanya Ateşkes Antlaşması",
      "Gümrü Antlaşması"
    ],
    "answer": "Mudanya Ateşkes Antlaşması",
    "explanation": "Bu soru, Kurtuluş Savaşı'nın sonunu belirleyen önemli bir belgeyi sormaktadır. Büyük Taarruz'un zaferle sonuçlanmasının ardından, 11 Ekim 1922'de imzalanan Mudanya Ateşkes Antlaşması ile Türk-Yunan savaşı fiilen bitmiştir. Bu antlaşma ile Doğu Trakya, Boğazlar ve İstanbul savaş yapılmadan kurtarılmış ve Lozan Barış Konferansı'nın toplanmasına zemin hazırlanmıştır."
  }, {
    "question": "Cumhuriyetin ilk yıllarında, toplumdaki ayrıcalıklı unvan ve lakapları kaldırarak kanun önünde herkesin eşit olmasını sağlayan inkılap, ______'dur.",
    "options": [
      "Tekke ve Zaviyelerin Kapatılması",
      "Türk Medeni Kanunu",
      "Şapka Kanunu",
      "Soyadı Kanunu",
      "Harf İnkılabı"
    ],
    "answer": "Soyadı Kanunu",
    "explanation": "Bu soru, toplumsal eşitliği hedefleyen bir inkılabı sormaktadır. 21 Haziran 1934'te çıkarılan Soyadı Kanunu ile her vatandaşın bir soyadı taşıması zorunlu hale getirilmiştir. Aynı yıl çıkarılan bir başka kanunla da 'ağa, hacı, hoca, bey, paşa' gibi toplumsal statü ve ayrıcalık belirten unvan ve lakapların kullanılması yasaklanmıştır. Bu durum, doğrudan halkçılık ilkesinin bir gereğidir."
  }, {
    "question": "Aşağıdakilerden hangisi, İkinci İnönü Zaferi'nin sonuçlarından biri değildir?",
    "options": [
      "İtalyanların Anadolu'dan çekilmeye başlaması",
      "Fransızların Zonguldak'tan çekilmesi",
      "Halkın düzenli orduya ve TBMM'ye olan güveninin artması",
      "Mustafa Kemal'in İsmet Paşa'ya tebrik telgrafı çekmesi",
      "Ukrayna ile dostluk antlaşması imzalanması"
    ],
    "answer": "Ukrayna ile dostluk antlaşması imzalanması",
    "explanation": "Bu soru, bir zaferin sonuçlarını detaylı olarak bilmeyi gerektirir. II. İnönü Zaferi, I. İnönü'nün başarısını perçinlemiş, İtilaf Devletleri bloğunda çatlaklara yol açmıştır. İtalya ve Fransa işgal ettikleri bazı bölgelerden çekilmeye başlamış, halkın morali yükselmiştir. Ancak Ukrayna Dostluk Antlaşması, I. İnönü Zaferi'nin ardından imzalanmıştır."
  }, {
    "question": "Misak-ı Milli'ye katılan son toprak parçası olan Hatay'ın 1939 yılında anavatana katılması, Atatürk'ün hangi ilkesinin bir sonucudur?",
    "options": [
      "Laiklik ve Cumhuriyetçilik",
      "Milliyetçilik ve Barışçılık (Dış Politika)",
      "Devletçilik ve Halkçılık",
      "İnkılapçılık ve Laiklik",
      "Sadece Cumhuriyetçilik"
    ],
    "answer": "Milliyetçilik ve Barışçılık (Dış Politika)",
    "explanation": "Bu soru, Atatürk'ün dış politikasını ve ilkelerle bağlantısını sormaktadır. Atatürk, Hatay'ı 'kırk asırlık Türk yurdu' olarak tanımlamış ve anavatana katılması için büyük bir diplomatik mücadele vermiştir. Bu, Türk yurdunun sınırlarına ve Türk nüfusunun haklarına sahip çıkma anlamında milliyetçilik ilkesinin bir yansımasıdır. Sorunun savaş yerine diplomasi ve barışçıl yollarla çözülmesi ise Atatürk'ün 'Yurtta sulh, cihanda sulh' ilkesine dayanan barışçı dış politikasının en güzel örneğidir."
  }, {
    "question": "1921 Anayasası'nda (Teşkilat-ı Esasiye) yapılan ilk ve en önemli değişiklik aşağıdakilerden hangisidir?",
    "options": [
      "Devletin başkentinin Ankara olduğunun belirtilmesi",
      "Devletin yönetim şeklinin Cumhuriyet olduğunun eklenmesi",
      "Devletin dininin İslam olduğunun çıkarılması",
      "Seçmen yaşının düşürülmesi",
      "Başbakanlık makamının oluşturulması"
    ],
    "answer": "Devletin yönetim şeklinin Cumhuriyet olduğunun eklenmesi",
    "explanation": "Bu soru, anayasa tarihini ve rejim değişikliğini konu alır. 29 Ekim 1923'te, 1921 Anayasası'nın 1. maddesine 'Türkiye Devleti’nin hükümet şekli, Cumhuriyettir.' ifadesi eklenmiştir. Bu, anayasada yapılan ilk ve en köklü değişikliktir. Bu değişiklikle yeni devletin adı ve rejimi kesin olarak belirlenmiş, 'devlet başkanlığı' sorunu da Cumhurbaşkanlığı makamı ile çözülmüştür."
  }, {
    "question": "Aşağıdakilerden hangisi Kuva-yi Milliye'nin kurulmasının nedenleri arasında gösterilemez?",
    "options": [
      "Osmanlı ordusunun Mondros Ateşkesi ile terhis edilmesi",
      "İstanbul Hükümeti'nin işgallere karşı tepkisiz kalması",
      "İzmir'in Yunanlılar tarafından işgal edilmesi",
      "TBMM'nin düzenli bir ordu kurma kararı alması",
      "Halkın can ve mal güvenliğini kendi imkanlarıyla koruma isteği"
    ],
    "answer": "TBMM'nin düzenli bir ordu kurma kararı alması",
    "explanation": "Bu soru, Kuva-yi Milliye'nin ortaya çıkış sürecini sorgulamaktadır. Kuva-yi Milliye, işgallere karşı halkın oluşturduğu bölgesel direniş güçleridir. A, B, C ve E şıkları bu direnişin ortaya çıkış nedenleridir. D şıkkındaki 'TBMM'nin düzenli ordu kurma kararı' ise Kuva-yi Milliye'nin bir nedeni değil, sonucudur. Kuva-yi Milliye'nin dağınık yapısı ve disiplinsizliği, düzenli bir ordu kurulmasını zorunlu hale getirmiştir."
  }, {
    "question": "Milli Mücadele Dönemi'nde Doğu Cephesi Komutanı olarak Gümrü Antlaşması'nı imzalayan ve Doğu sınırımızı güvence altına alan komutan ______'dir.",
    "options": [
      "Ali Fuat Cebesoy",
      "İsmet İnönü",
      "Kazım Karabekir",
      "Refet Bele",
      "Fevzi Çakmak"
    ],
    "answer": "Kazım Karabekir",
    "explanation": "Bu soru, Kurtuluş Savaşı'ndaki cepheleri ve komutanları bilmeyi gerektirir. Osmanlı'dan kalan tek düzenli ordu olan 15. Kolordu'nun komutanı Kazım Karabekir, Doğu'da Ermenilere karşı büyük başarılar kazanmıştır. Bu askeri başarı sonucunda 3 Aralık 1920'de Gümrü Antlaşması imzalanmıştır. Bu antlaşma, TBMM'nin imzaladığı ilk uluslararası antlaşmadır ve Doğu sınırını büyük ölçüde güvence altına almıştır."
  }, {
    "question": "I. Millet Mektepleri'nin açılması  <br>II. Türk Tarih Kurumu'nun kurulması  <br>III. Türk Dil Kurumu'nun kurulması<br><br>Yukarıdaki kurumların kurulması, Atatürk'ün hangi iki ilkesini tamamlayıcı niteliktedir?",
    "options": [
      "Laiklik ve Devletçilik",
      "Cumhuriyetçilik ve Halkçılık",
      "Milliyetçilik ve Halkçılık",
      "Devletçilik ve İnkılapçılık",
      "Laiklik ve Milliyetçilik"
    ],
    "answer": "Milliyetçilik ve Halkçılık",
    "explanation": "Bu soru, kurumlar ve ilkeler arasındaki derin bağlantıyı sormaktadır. Türk Tarih ve Dil Kurumları, Türk tarihini ve dilini yabancı etkilerden arındırıp ulusal bir bilinç oluşturmayı hedeflediği için doğrudan Milliyetçilik ile ilgilidir. Millet Mektepleri ise Harf İnkılabı'ndan sonra yeni harfleri halka öğretmek, okuryazarlığı artırmak ve kültürel seviyeyi yükseltmek amacıyla kurulduğu için Halkçılık ilkesinin en önemli uygulamalarındandır."
  }, {
    "question": "Atatürk'ün, Fethi Okyar'a kurdurduğu ve Türkiye Cumhuriyeti'nin ikinci muhalefet partisi denemesi olan siyasi oluşum aşağıdakilerden hangisidir?",
    "options": [
      "Terakkiperver Cumhuriyet Fırkası",
      "Serbest Cumhuriyet Fırkası",
      "Milli Kalkınma Partisi",
      "Demokrat Parti",
      "Ahali Cumhuriyet Fırkası"
    ],
    "answer": "Serbest Cumhuriyet Fırkası",
    "explanation": "Bu soru, çok partili hayata geçiş denemelerini konu alır. 1930 yılında, 1929 Ekonomik Krizi'nin etkilerini ve hükümet politikalarını denetleyecek bir muhalefet ihtiyacı doğmuştur. Atatürk'ün teşvikiyle yakın arkadaşı Fethi Okyar tarafından Serbest Cumhuriyet Fırkası kurulmuştur. Ancak partinin etrafında rejim karşıtlarının toplanması üzerine Fethi Okyar, partiyi kendi isteğiyle feshetmiştir."
  }, {
    "question": "Şapka Kanunu'na muhalefet gerekçesiyle Rize ve İskilip'te çıkan olaylar, aşağıdaki kanunlardan hangisinin uygulanmasına neden olmuştur?",
    "options": [
      "Hıyanet-i Vataniye Kanunu",
      "Teşvik-i Sanayi Kanunu",
      "Men-i Müskirat Kanunu",
      "Takrir-i Sükun Kanunu",
      "Fahri Konsolosluk Kanunu"
    ],
    "answer": "Takrir-i Sükun Kanunu",
    "explanation": "Bu soru, inkılaplara karşı çıkan tepkiler ve alınan önlemlerle ilgilidir. Şeyh Sait İsyanı (1925) sonrasında çıkarılan Takrir-i Sükun (Huzuru Sağlama) Kanunu, hükümete olağanüstü yetkiler vermiştir. Şapka Kanunu'na karşı çıkan isyanlar da bu kanun kapsamında değerlendirilmiş ve İstiklal Mahkemeleri bu bölgelerde görev yaparak isyanları bastırmıştır. Kanun, rejime ve inkılaplara yönelik her türlü muhalefeti engellemeyi amaçlıyordu."
  }, {
    "question": "Atatürk, Nutuk adlı eserinde aşağıdaki hangi zaman aralığında yaşanan olayları anlatmaktadır?",
    "options": [
      "1918-1923",
      "1920-1927",
      "1919-1927",
      "1923-1938",
      "1914-1922"
    ],
    "answer": "1919-1927",
    "explanation": "Bu soru, Atatürk'ün en önemli eseri olan Nutuk'un içeriğini ve kapsamını bilmeyi gerektirir. Nutuk, Atatürk'ün 19 Mayıs 1919'da Samsun'a çıkışıyla başlar ve 1927 yılında Cumhuriyet Halk Partisi'nin ikinci büyük kurultayında yaptığı tarihi konuşma ile sona erer. Bu eser, Milli Mücadele ve Cumhuriyet'in kuruluş yıllarını birinci ağızdan anlatan temel bir kaynaktır."
  }, {
    "question": "Türkiye'nin, Boğazlar üzerindeki tam egemenliğini sağladığı ve Lozan'da kurulan Boğazlar Komisyonu'nu kaldırdığı uluslararası antlaşma ______'dir.",
    "options": [
      "Sadabat Paktı",
      "Balkan Antantı",
      "Ankara Antlaşması",
      "Montrö Boğazlar Sözleşmesi",
      "Lozan Barış Antlaşması"
    ],
    "answer": "Montrö Boğazlar Sözleşmesi",
    "explanation": "Bu soru, Atatürk dönemi dış politikasının en büyük başarılarından birini sormaktadır. Lozan'da Boğazların yönetimi uluslararası bir komisyona bırakılmıştı. Ancak İtalya ve Almanya'nın saldırgan politikaları nedeniyle değişen dünya konjonktürünü iyi değerlendiren Türkiye, konuyu barışçıl yollarla gündeme getirmiş ve 1936'da Montrö Boğazlar Sözleşmesi'ni imzalamıştır. Bu sözleşme ile komisyon kaldırılmış, Boğazların tam kontrolü ve askerileştirilmesi hakkı Türkiye'ye verilmiştir."
  }, {
    "question": "TBMM'ye karşı çıkan isyanları bastırmak ve otoriteyi sağlamak amacıyla çıkarılan ilk kanun aşağıdakilerden hangisidir?",
    "options": [
      "Takrir-i Sükun Kanunu",
      "Teşkilat-ı Esasiye Kanunu",
      "Hıyanet-i Vataniye Kanunu",
      "Nisab-ı Müzakere Kanunu",
      "Men-i İsrafat Kanunu"
    ],
    "answer": "Hıyanet-i Vataniye Kanunu",
    "explanation": "Bu soru, TBMM'nin ilk yıllarındaki yasal düzenlemeleri konu alır. TBMM açıldıktan hemen sonra hem İstanbul Hükümeti'nin hem de İtilaf Devletleri'nin kışkırtmasıyla yurdun dört bir yanında isyanlar çıkmıştır. Meclis, bu isyanları vatana ihanet olarak kabul etmiş ve 29 Nisan 1920'de Hıyanet-i Vataniye Kanunu'nu çıkarmıştır. Bu kanunla kurulan İstiklal Mahkemeleri, isyancıları yargılayarak meclis otoritesinin kurulmasında etkili olmuştur."
  }, {
    "question": "I. Laikliğe aykırı olması  <br>II. Ekonomide ikiliğe yol açması  <br>III. Batı ile ilişkileri zorlaştırması<br><br>Yukarıdakilerden hangileri, Hicri ve Rumi takvim yerine Miladi takvimin kabul edilmesinin nedenlerindendir?",
    "options": [
      "Yalnız I",
      "Yalnız II",
      "I ve III",
      "II ve III",
      "I, II ve III"
    ],
    "answer": "II ve III",
    "explanation": "Bu soru, bir inkılabın gerekçelerini analiz etmeyi gerektirir. Osmanlı Devleti'nde mali işlerde Rumi, günlük hayatta Hicri takvim kullanılıyordu. Bu durum ülke içinde ekonomik ve sosyal hayatta ikiliğe (II) neden oluyordu. Ayrıca, uluslararası ticaretin ve diplomasinin büyük kısmını yürüttüğümüz Batı dünyası Miladi takvim kullandığı için, bu farklılık ilişkileri (III) zorlaştırıyordu. Takvim değişikliğinin temel nedeni laiklikten ziyade, bu pratik ve modernleşme gereklilikleridir."
  }, {
    "question": "Aşağıdaki gelişmelerden hangisi, 'ulusal egemenlik' ilkesinin hayata geçirilmesi yolunda atılmış bir adım olarak değerlendirilemez?",
    "options": [
      "TBMM'nin açılması",
      "Saltanatın kaldırılması",
      "Cumhuriyetin ilanı",
      "Çok partili hayata geçiş denemeleri",
      "Teşvik-i Sanayi Kanunu'nun çıkarılması"
    ],
    "answer": "Teşvik-i Sanayi Kanunu'nun çıkarılması",
    "explanation": "Bu soru, ulusal egemenlik kavramı ile ilgili olmayan seçeneği bulmayı amaçlar. Ulusal egemenlik, yönetme gücünün millete ait olması demektir. TBMM'nin açılması, saltanatın kaldırılması, cumhuriyetin ilanı ve farklı siyasi görüşlerin mecliste temsilini amaçlayan çok partili hayat denemeleri doğrudan bu ilkenin yansımalarıdır. Teşvik-i Sanayi Kanunu ise ekonomik bağımsızlık ve kalkınma ile ilgili olup, doğrudan devletçilik ve milliyetçilik ilkeleriyle ilişkilidir."
  }, {
    "question": "Mustafa Kemal'in başkomutanlık yetkisiyle yönettiği ilk savaş, ______ olup bu savaş aynı zamanda Kurtuluş Savaşı'nın son savunma savaşıdır.",
    "options": [
      "I. İnönü Muharebesi",
      "Büyük Taarruz",
      "Kütahya-Eskişehir Muharebeleri",
      "II. İnönü Muharebesi",
      "Sakarya Meydan Muharebesi"
    ],
    "answer": "Sakarya Meydan Muharebesi",
    "explanation": "Bu soru, Mustafa Kemal'in askeri kariyeri ve savaşların niteliği hakkında bilgi gerektirir. Kütahya-Eskişehir Muharebelerindeki yenilgi üzerine TBMM, 5 Ağustos 1921'de Başkomutanlık Kanunu'nu çıkararak tüm yetkilerini 3 aylığına Mustafa Kemal'e devretmiştir. Mustafa Kemal'in bu yetkiyle yönettiği ilk savaş, Sakarya Meydan Muharebesi'dir. Bu savaş, Türk ordusunun 1683 Viyana bozgunundan beri süregelen geri çekilişini durduran son savunma savaşıdır."
  }, {
    "question": "Osmanlı Devleti, aşağıdaki savaşların hangisinin sonucunda imzaladığı antlaşma ile I. Dünya Savaşı'ndan çekilmiştir?",
    "options": [
      "Çanakkale Savaşı",
      "Filistin-Suriye Cephesi'ndeki yenilgiler",
      "Kafkas Cephesi",
      "Irak Cephesi",
      "Galiçya Cephesi"
    ],
    "answer": "Filistin-Suriye Cephesi'ndeki yenilgiler",
    "explanation": "Bu soru, I. Dünya Savaşı'nın sonunu getiren askeri gelişmeyi sormaktadır. Bulgaristan'ın savaştan çekilmesiyle Osmanlı'nın Almanya ile kara bağlantısı kesilmişti. Aynı dönemde Suriye Cephesi'nde General Allenby komutasındaki İngiliz ordusu karşısında Yıldırım Orduları Grubu'nun ağır bir yenilgi alması, Osmanlı Devleti'ni savunmasız bırakmış ve ateşkes istemeye zorlamıştır. Bu sürecin sonunda Mondros Ateşkes Antlaşması imzalanmıştır."
  }, {
    "question": "I. Kapitülasyonların kaldırılması  <br>II. Düyun-ı Umumiye İdaresi'nin kaldırılması  <br>III. Misak-ı Milli'nin tanınması<br><br>Yukarıdakilerden hangileri, Lozan Barış Antlaşması ile elde edilen kazanımlar arasında yer alır?",
    "options": [
      "Yalnız I",
      "I ve II",
      "II ve III",
      "I ve III",
      "I, II ve III"
    ],
    "answer": "I, II ve III",
    "explanation": "Bu soru, Lozan Antlaşması'nın önemini ve sonuçlarını kavramayı gerektirir. Lozan Antlaşması ile Osmanlı'nın ekonomik bağımsızlığını yok eden kapitülasyonlar ve Düyun-ı Umumiye (Genel Borçlar İdaresi) tamamen kaldırılmıştır. Bu, tam ekonomik bağımsızlığın sağlanmasıdır. Ayrıca antlaşma, Hatay ve Musul hariç büyük ölçüde Misak-ı Milli sınırlarını gerçekleştirmiş ve yeni Türk devletinin bağımsızlığını tüm dünyaya tanıtmıştır. Dolayısıyla her üçü de Lozan'ın önemli kazanımlarıdır."
  }, {
    "question": "Aşağıdaki Atatürk ilkelerinden hangisi, durağanlığı reddederek aklın ve bilimin rehberliğinde sürekli olarak çağdaşlaşmayı ve ilerlemeyi hedefler?",
    "options": [
      "Halkçılık",
      "Laiklik",
      "Milliyetçilik",
      "İnkılapçılık",
      "Devletçilik"
    ],
    "answer": "İnkılapçılık",
    "explanation": "Bu soru, inkılapçılık ilkesinin tanımını ve felsefesini sormaktadır. İnkılapçılık (Devrimcilik), Türk toplumunu çağın gerisinde bırakan kurumları yıkarak yerlerine modern, akılcı ve bilimsel kurumları getirmeyi amaçlar. Sadece yapılan inkılapları korumayı değil, aynı zamanda çağın gereklerine göre sürekli bir gelişim ve değişim içinde olmayı ifade eder. Bu nedenle en dinamik Atatürk ilkesidir."
  }, {
    "question": "Milli Mücadele'ye karşı olan ve Padişah Vahdettin'in onayıyla kurulan, 'Halifelik Ordusu' olarak da bilinen isyancı grup aşağıdakilerden hangisidir?",
    "options": [
      "Anzavur Ayaklanması",
      "Kuva-yi İnzibatiye",
      "Çopur Musa Ayaklanması",
      "Demirci Mehmet Efe Ayaklanması",
      "Konya-Bozkır Ayaklanması"
    ],
    "answer": "Kuva-yi İnzibatiye",
    "explanation": "Bu soru, TBMM'ye karşı çıkan isyanları ayırt etmeyi amaçlar. Kuva-yi İnzibatiye (Hilafet Ordusu), doğrudan İstanbul Hükümeti tarafından, İngilizlerin de desteğiyle, Kuva-yi Milliye'yi ve TBMM'yi ortadan kaldırmak amacıyla kurulmuş resmi bir isyancı güçtür. Diğer isyanlar daha çok yerel nitelikli veya kişisel hırslarla çıkmışken, Kuva-yi İnzibatiye doğrudan merkezi hükümetin organize ettiği bir harekettir."
  }, {
    "question": "'Egemenlik kayıtsız şartsız milletindir.' ilkesi, ilk kez hangi hukuki belgede yer almıştır?",
    "options": [
      "1924 Anayasası",
      "Amasya Genelgesi",
      "1921 Anayasası (Teşkilat-ı Esasiye)",
      "Sivas Kongresi Tüzüğü",
      "Misak-ı Milli"
    ],
    "answer": "1921 Anayasası (Teşkilat-ı Esasiye)",
    "explanation": "Bu soru, ulusal egemenlik ilkesinin anayasal sürece girişini sormaktadır. Kurtuluş Savaşı devam ederken hazırlanan 1921 Anayasası'nın ilk maddesi 'Hâkimiyet bilâkayd u şart milletindir' (Egemenlik kayıtsız şartsız milletindir) şeklindedir. Bu madde, Osmanlı'nın monarşik yapısını hukuken sonlandıran ve yönetme gücünü padişahtan alıp Türk milletine veren devrimci bir nitelik taşır."
  }, {
    "question": "İzmir'in işgalinden sonra halkı işgallere karşı protesto mitingleri ve telgraflarla uyarmaya çağıran ilk belge, Mustafa Kemal tarafından yayımlanan ______'dir.",
    "options": [
      "Amasya Genelgesi",
      "Havza Genelgesi",
      "Erzurum Kongresi Raporu",
      "Sivas Kongresi Beyannamesi",
      "Amasya Protokolü"
    ],
    "answer": "Havza Genelgesi",
    "explanation": "Bu soru, Milli Mücadele'nin örgütlenme aşamalarından ilkini sormaktadır. Mustafa Kemal, Samsun'dan sonra geçtiği Havza'da, 28 Mayıs 1919'da yayımladığı bir genelge ile tüm yurtta işgallerin protesto edilmesini, mitingler düzenlenmesini ve İtilaf Devletleri ile İstanbul Hükümeti'ne protesto telgrafları çekilmesini istemiştir. Bu genelge, milli bilincin uyandırılması yolunda atılan ilk önemli adımdır."
  }, {
    "question": "Türkiye Cumhuriyeti'nin komşularıyla ve bölge ülkeleriyle barışı ve güvenliği sağlamak amacıyla 1937'de İran, Irak ve Afganistan ile imzaladığı saldırmazlık paktı aşağıdakilerden hangisidir?",
    "options": [
      "Balkan Antantı",
      "Kellogg-Briand Paktı",
      "Litvinov Protokolü",
      "Sadabat Paktı",
      "Montrö Sözleşmesi"
    ],
    "answer": "Sadabat Paktı",
    "explanation": "Bu soru, Atatürk dönemi dış politikasında barışı korumaya yönelik ittifakları konu alır. Türkiye, batı sınırını 1934'te Balkan Antantı ile güvence altına aldıktan sonra, doğu sınırını da güvence altına almak için harekete geçmiştir. İtalya'nın Habeşistan'a saldırması gibi gelişmeler üzerine, Türkiye'nin öncülüğünde İran, Irak ve Afganistan'ın katılımıyla 1937'de Tahran'daki Sadabat Sarayı'nda bu pakt imzalanmıştır. Bu, 'Yurtta sulh, cihanda sulh' politikasının bir yansımasıdır."
  }, {
    "question": "Aşağıdakilerden hangisi, Sivas Kongresi'nin Erzurum Kongresi'nden farklarından biridir?",
    "options": [
      "Manda ve himayenin reddedilmesi",
      "Temsil Heyeti'nin seçilmesi",
      "Tüm yararlı cemiyetlerin tek çatı altında birleştirilmesi",
      "Mustafa Kemal'in kongre başkanı olması",
      "Ulusal egemenlikten bahsedilmesi"
    ],
    "answer": "Tüm yararlı cemiyetlerin tek çatı altında birleştirilmesi",
    "explanation": "Bu soru, iki önemli kongreyi karşılaştırma becerisini ölçer. Manda ve himaye Erzurum'da ilk kez, Sivas'ta ise kesin olarak reddedilmiştir. Temsil Heyeti Erzurum'da bölgesel olarak kurulmuş, Sivas'ta ulusal hale getirilmiştir. Ancak Sivas Kongresi'ni Erzurum'dan ayıran en temel ve özgün karar, ülkedeki tüm milli direniş cemiyetlerinin 'Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti' adı altında birleştirilmesidir. Bu karar, Milli Mücadele'yi tek bir merkezden yönetilir hale getirmiştir."
  }, {
    "question": "Kadınlara, 1930'da belediye seçimlerine katılma, 1933'te muhtarlık seçimlerine katılma ve 1934'te ______ hakkının verilmesiyle siyasi haklar tanınma süreci tamamlanmıştır.",
    "options": [
      "mirasta eşit pay alma",
      "istedikleri mesleğe girme",
      "milletvekili seçme ve seçilme",
      "resmi nikah kıyma",
      "boşanma davası açma"
    ],
    "answer": "milletvekili seçme ve seçilme",
    "explanation": "Bu soru, Türk kadınına tanınan siyasi hakların aşamalarını sormaktadır. Atatürk'ün halkçılık ve cumhuriyetçilik ilkeleri doğrultusunda, kadınların toplumsal ve siyasi hayata katılımı hedeflenmiştir. Bu süreç 1930'da belediye, 1933'te muhtarlık seçimleriyle başlamış ve 5 Aralık 1934'te Anayasa'da yapılan değişiklikle kadınlara milletvekili seçme ve seçilme hakkı tanınarak tamamlanmıştır. Bu, dünyadaki pek çok ülkeden daha önce atılmış bir adımdır."
  }, {
    "question": "I. TBMM'nin açılması  <br>II. Saltanatın kaldırılması  <br>III. Cumhuriyetin ilanı<br><br>Yukarıdaki olayların kronolojik sıralaması aşağıdakilerden hangisidir?",
    "options": [
      "I - III - II",
      "II - I - III",
      "III - I - II",
      "I - II - III",
      "II - III - I"
    ],
    "answer": "I - II - III",
    "explanation": "Bu soru, inkılap tarihinin temel olaylarını kronolojik olarak sıralama becerisini ölçer. TBMM, 23 Nisan 1920'de açılmıştır. Saltanat, 1 Kasım 1922'de kaldırılmıştır. Cumhuriyet ise, 29 Ekim 1923'te ilan edilmiştir. Doğru sıralama I, II, III şeklindedir."
  }, {
    "question": "Lozan Barış Antlaşması'na, TBMM Hükümeti adına Dışişleri Bakanı olarak katılan ve görüşmeleri yürüten devlet adamı aşağıdakilerden hangisidir?",
    "options": [
      "Rauf Orbay",
      "Ali Fethi Okyar",
      "Kazım Karabekir",
      "İsmet İnönü",
      "Tevfik Rüştü Aras"
    ],
    "answer": "İsmet İnönü",
    "explanation": "Bu soru, Lozan Konferansı'ndaki Türk heyeti hakkında bilgi gerektirir. Kurtuluş Savaşı'nın Batı Cephesi Komutanı olarak büyük başarılar kazanan İsmet Paşa (İnönü), Mudanya Ateşkesi'ndeki diplomatik başarısının ardından, Lozan'a gönderilecek heyetin başına Dışişleri Bakanı olarak getirilmiştir. Lozan'da kapitülasyonlar ve Misak-ı Milli konularında tavizsiz bir tutum sergileyerek Türk milletinin haklarını savunmuş ve antlaşmayı imzalamıştır."
  }, {
    "question": "Aşağıdakilerden hangisi, Mondros Ateşkes Antlaşması'nın 'İtilaf Devletleri, güvenliklerini tehdit edecek bir durum ortaya çıkarsa herhangi bir stratejik noktayı işgal etme hakkına sahip olacaktır.' şeklindeki en tehlikeli maddesidir?",
    "options": [
      "1. Madde",
      "5. Madde",
      "7. Madde",
      "12. Madde",
      "24. Madde"
    ],
    "answer": "7. Madde",
    "explanation": "Bu soru, Mondros Ateşkesi'nin içeriğini detaylı olarak bilmeyi gerektirir. Antlaşmanın 7. maddesi, İtilaf Devletleri'ne çok geniş ve belirsiz bir işgal hakkı tanımaktaydı. 'Güvenliklerini tehdit' gibi yoruma açık bir ifade kullanarak, Anadolu'nun herhangi bir noktasını keyfi olarak işgal etmelerine hukuki bir zemin hazırlamıştır. Bu madde, Anadolu'nun işgalinin yasal dayanağı olarak kullanılmıştır."
  }, {
    "question": "Atatürk döneminde, 1925 yılında köylünün üzerindeki en ağır vergi yüklerinden biri olan ve üretilen üründen alınan ______ vergisi kaldırılmıştır.",
    "options": [
      "Ağnam",
      "Cizye",
      "Haraç",
      "Avarız",
      "Aşar (Öşür)"
    ],
    "answer": "Aşar (Öşür)",
    "explanation": "Bu soru, Cumhuriyetin ilk yıllarındaki ekonomik ve sosyal reformları konu almaktadır. Aşar ya da Öşür vergisi, Osmanlı'dan beri köylünün ürettiği ürünün onda birini devlete vermesi esasına dayanan bir vergiydi. Toplanmasındaki adaletsizlikler ve köylü üzerindeki ağır yük nedeniyle, halkçılık ilkesi gereği 17 Şubat 1925'te kaldırılmıştır. Bu, tarım kesimini rahatlatan en önemli inkılaplardan biridir."
  }, {
    "question": "I. Ankara'nın başkent olması  <br>II. Halifeliğin kaldırılması  <br>III. Cumhuriyetin ilanı<br><br>Yukarıdaki inkılaplardan hangileri, saltanatın kaldırılmasından sonra gerçekleşmiştir?",
    "options": [
      "Yalnız II",
      "I ve II",
      "II ve III",
      "I ve III",
      "I, II ve III"
    ],
    "answer": "I, II ve III",
    "explanation": "Bu soru, siyasi inkılapların kronolojisini bilmeyi gerektirir. Saltanat 1 Kasım 1922'de kaldırılmıştır. Ankara'nın başkent olması 13 Ekim 1923'te, Cumhuriyetin ilanı 29 Ekim 1923'te ve Halifeliğin kaldırılması 3 Mart 1924'te gerçekleşmiştir. Dolayısıyla her üç gelişme de saltanatın kaldırılmasından sonradır."
  }, {
    "question": "Milli Mücadele'nin kazanılmasından sonra ortaya çıkan 'devlet başkanlığı' ve 'rejim' tartışmalarını sona erdiren gelişme aşağıdakilerden hangisidir?",
    "options": [
      "Saltanatın kaldırılması",
      "Lozan Antlaşması'nın imzalanması",
      "Ankara'nın başkent yapılması",
      "Halifeliğin kaldırılması",
      "Cumhuriyetin ilanı"
    ],
    "answer": "Cumhuriyetin ilanı",
    "explanation": "Bu soru, Cumhuriyetin ilanının neden ve sonuçlarını sorgulamaktadır. Saltanatın kaldırılmasından sonra Meclis Hükümeti sistemi devam etmiş, ancak devletin bir başkanı olmaması ve rejimin adının konmamış olması siyasi bir bunalıma yol açmıştır (Ekim Bunalımı). 29 Ekim 1923'te Cumhuriyetin ilanı ile devletin rejimi 'Cumhuriyet' olarak belirlenmiş ve 'Cumhurbaşkanı' makamı oluşturularak devlet başkanlığı sorunu çözülmüştür."
  }, {
    "question": "Aşağıdaki antlaşmalardan hangisi, TBMM Hükümeti'nin bir Batılı devlet (İtilaf Devleti) tarafından tanındığı ilk antlaşmadır?",
    "options": [
      "Gümrü Antlaşması",
      "Moskova Antlaşması",
      "Kars Antlaşması",
      "Ankara Antlaşması (1921)",
      "Lozan Antlaşması"
    ],
    "answer": "Ankara Antlaşması (1921)",
    "explanation": "Bu soru, TBMM'nin diplomatik tanınma sürecindeki önemli bir adımı sormaktadır. Sakarya Zaferi'nin ardından, Güney Cephesi'nde direnen Türkiye ile Fransa arasında 20 Ekim 1921'de Ankara Antlaşması imzalanmıştır. Bu antlaşma ile Fransa, TBMM Hükümeti'ni resmen tanımış, işgal ettiği topraklardan çekilmiş ve Hatay dışında bugünkü Suriye sınırımız çizilmiştir. Bu, bir İtilaf Devleti ile imzalanan ilk antlaşma olması açısından büyük bir diplomatik zaferdir."
  }, {
    "question": "Mustafa Kemal'in, Milli Mücadele'yi başlatmak üzere 19 Mayıs 1919'da Samsun'a çıkarken sahip olduğu resmi görev ______ idi.",
    "options": [
      "Yıldırım Orduları Grup Komutanı",
      "9. Ordu Müfettişi",
      "Harbiye Nazırı",
      "Genelkurmay Başkanı",
      "Mebusan Meclisi Başkanı"
    ],
    "answer": "9. Ordu Müfettişi",
    "explanation": "Bu soru, Milli Mücadele'nin başlangıcındaki kilit bir bilgiyi sormaktadır. Padişah Vahdettin ve İstanbul Hükümeti, Mustafa Kemal'i, Karadeniz Bölgesi'ndeki Rum çeteleri ile Türk direniş grupları arasındaki çatışmaları sona erdirmek ve asayişi sağlamak üzere çok geniş yetkilerle '9. Ordu Müfettişi' olarak görevlendirmiştir. Ancak Mustafa Kemal, bu resmi görevi Milli Mücadele'yi başlatmak için bir fırsat olarak kullanmıştır."
  }, {
    "question": "Milli Mücadele'nin haklılığını dünya kamuoyuna duyurmak amacıyla Sivas Kongresi'nde çıkarılmasına karar verilen gazetenin adı nedir?",
    "options": [
      "Felah-ı Vatan",
      "Minber",
      "İrade-i Milliye",
      "Tasvir-i Efkâr",
      "Ceride-i Resmiye"
    ],
    "answer": "İrade-i Milliye",
    "explanation": "Sivas Kongresi'nde alınan kararlardan biri de, mücadelenin sesini duyuracak bir gazete çıkarmaktı. Bu amaçla 'İrade-i Milliye' (Milli İrade) adıyla bir gazete çıkarılması kararlaştırılmış ve ilk sayısı Sivas'ta yayımlanmıştır. Temsil Heyeti Ankara'ya geldikten sonra bu gazetenin yerini 'Hakimiyet-i Milliye' almıştır."
  }, {
    "question": "Aşağıdaki inkılaplardan hangisi, diğerlerinden daha sonra gerçekleştirilmiştir?",
    "options": [
      "Saltanatın kaldırılması",
      "Cumhuriyetin ilanı",
      "Tevhid-i Tedrisat Kanunu",
      "Türk Medeni Kanunu'nun kabulü",
      "Soyadı Kanunu'nun çıkarılması"
    ],
    "answer": "Soyadı Kanunu'nun çıkarılması",
    "explanation": "Bu soru, temel inkılapların tarihlerini bilmeyi ve kronolojik sıralama yapmayı gerektirir. Saltanatın kaldırılması (1922), Cumhuriyetin ilanı (1923), Tevhid-i Tedrisat Kanunu (1924) ve Türk Medeni Kanunu'nun kabulü (1926) birbirini takip eden yıllarda gerçekleşmiştir. Soyadı Kanunu ise 1934 yılında çıkarılmıştır ve bu seçenekler arasındaki en geç tarihli inkılaptır."
  }, {
    "question": "Atatürk'ün 'Yurtta sulh, cihanda sulh' (Yurtta barış, dünyada barış) sözü, aşağıdaki alanlardan hangisinde Türkiye Cumhuriyeti'nin temel ilkesi olmuştur?",
    "options": [
      "Eğitim Politikası",
      "Ekonomi Politikası",
      "Hukuk Sistemi",
      "Dış Politika",
      "Sağlık Politikası"
    ],
    "answer": "Dış Politika",
    "explanation": "Bu soru, Atatürk'ün en bilinen özdeyişlerinden birinin hangi politika alanına ait olduğunu sormaktadır. 'Yurtta sulh, cihanda sulh' ilkesi, Türkiye'nin uluslararası ilişkilerde barışçıl, gerçekçi, tam bağımsızlığa saygılı ve başka ülkelerin iç işlerine karışmayan bir tutum benimsemesini ifade eder. Bu ilke, Atatürk dönemi ve sonrası Türk dış politikasının temel direği olmuştur."
  }
  ],
  turkce: [
    {
      question: "Aşağıdaki cümlelerden hangisi doğru yazılmıştır?",
      options: [
        "Kitabı okumaya başladım.",
        "Kitabı okumeye başladım.",
        "Kitabı okumya başladım.",
        "Kitabı okumağa başladım.",
        "Kitabı okumuya başladım."
      ],
      answer: "Kitabı okumaya başladım.",
      explanation: "Mastar eki -mak/-mek'e -ya/-ye hali eki getirilerek 'okumaya' şeklinde yazılır."
    },
    {
      question: "Hangi kelime büyük harfle yazılmalıdır?",
      options: ["pazartesi", "ocak", "türkçe", "matematik", "istanbul"],
      answer: "istanbul",
      explanation: "Özel isimler büyük harfle başlar. İstanbul bir şehir adı olduğu için 'İstanbul' şeklinde yazılır."
    },
    {
      question: "Aşağıdakilerden hangisi birleşik fiildir?",
      options: ["koştu", "gelecek", "yardım etti", "okuyor", "yazdı"],
      answer: "yardım etti",
      explanation: "Yardım etti' bir isim ile yardımcı fiilden oluşan birleşik fiildir."
    },
    {
      question: "Hangi kelimede yazım yanlışı vardır?",
      options: ["düğün", "öğretmen", "büyük", "küçük", "güzel"],
      answer: "Hepsi doğru yazılmış",
      explanation: "Verilen seçeneklerin hepsi doğru yazılmıştır."
    },
    {
      question: "Aşağıdakilerden hangisi ünlü türemesi örneğidir?",
      options: ["beyin", "boyun", "karın", "burun", "ağız"],
      answer: "burun",
      explanation: "Burun kelimesi 'burn' köküne ünlü türemesi ile oluşmuştur."
    },
    {
      question: "Hangi kelimede ünsüz yumuşaması vardır?",
      options: ["kitap", "kitabı", "masa", "kalem", "defter"],
      answer: "kitabı",
      explanation: "Kitap kelimesindeki 'p' sesi 'kitabı'nda 'b'ye yumuşamıştır."
    },
    {
      question: "Aşağıdakilerden hangisi pekiştirme edatıdır?",
      options: ["bile", "dahi", "kadar", "gibi", "için"],
      answer: "bile",
      explanation: "'Bile' bir pekiştirme edatıdır."
    },
    {
      question: "Hangi kelime türemiş kelimedir?",
      options: ["ev", "evli", "su", "ağaç", "göz"],
      answer: "evli",
      explanation: "'Evli' kelimesi 'ev' köküne '-li' eki getirilerek türetilmiştir."
    },
    {
      question: "Aşağıdakilerden hangisi fiilimsidir?",
      options: ["koşan", "güzel", "masa", "kalem", "beyaz"],
      answer: "koşan",
      explanation: "'Koşan' kelimesi -an/-en sıfat-fiil ekiyle oluşturulmuş bir fiilimsidir."
    },
    {
      question: "Hangi cümlede nesne yoktur?",
      options: ["Çocuk oyun oynadı.", "Ali kitap okudu.", "Kuş uçtu.", "Anne yemek pişirdi.", "Öğrenci ders çalıştı."],
      answer: "Kuş uçtu.",
      explanation: "'Kuş uçtu' cümlesinde nesne yoktur, geçişsiz fiil kullanılmıştır."
    },
    {
      question: "Aşağıdakilerden hangisi zamir cümlesidir?",
      options: ["O geldi.", "Güzel bir gün.", "Ne kadar mutlu!", "Evde kimse yok.", "Yarın hava güzel olacak."],
      answer: "O geldi.",
      explanation: "'O geldi' cümlesinde özne zamir olduğu için zamir cümlesidir."
    },
    {
      question: "Hangi kelimede ünlü daralması vardır?",
      options: ["demek", "diyor", "yapmak", "okuyor", "gelmek"],
      answer: "diyor",
      explanation: "'De-' kökündeki 'e' sesi 'diyor'da 'i'ye daralır."
    },
    {
      question: "Aşağıdakilerden hangisi isim tamlamasıdır?",
      options: ["güzel çocuk", "Ali'nin kitabı", "çok güzel", "hızla koştu", "bugün geldi"],
      answer: "Ali'nin kitabı",
      explanation: "'Ali'nin kitabı' belirtili isim tamlamasıdır."
    },
    {
      question: "Hangi kelime basit kelimedir?",
      options: ["okul", "öğretmenlik", "güzellik", "kitaplık", "çocukluk"],
      answer: "okul",
      explanation: "'Okul' herhangi bir ek almamış basit kelimedir."
    },
    {
      question: "Aşağıdakilerden hangisi şimdiki zaman ekidir?",
      options: ["-di", "-acak", "-yor", "-mış", "-sa"],
      answer: "-yor",
      explanation: "'-yor' şimdiki zaman ekidir."
    },
    {
      question: "Hangi cümlede dolaylı anlatım vardır?",
      options: ["Ali geldi.", "Mehmet çalışıyor.", "Ayşe kitap okumuş.", "Fatma uyudu.", "Ahmet koşuyor."],
      answer: "Ayşe kitap okumuş.",
      explanation: "'-mış' eki dolaylı anlatım bildiren geçmiş zaman ekidir."
    },
    {
      question: "Aşağıdakilerden hangisi emir kipidir?",
      options: ["geldi", "gelecek", "geliyor", "gel", "gelmiş"],
      answer: "gel",
      explanation: "'Gel' emir kipi çekimidir."
    },
    {
      question: "Hangi kelimede ünlü uyumu bozuktur?",
      options: ["masalar", "kitaplar", "kalemler", "defterler", "elma"],
      answer: "defterler",
      explanation: "'Defterler' kelimesinde ünlü uyumu bozuktur, 'deftarlar' olmalıdır."
    },
    {
      question: "Aşağıdakilerden hangisi soru zamiridir?",
      options: ["bu", "şu", "o", "kim", "ben"],
      answer: "kim",
      explanation: "'Kim' soru zamiridir."
    },
    {
      question: "Hangi cümlede zarf tümleci vardır?",
      options: ["Ali geldi.", "Çocuk hızla koştu.", "Kitap masada.", "Ders çalıştı.", "Yemek yedi."],
      answer: "Çocuk hızla koştu.",
      explanation: "'Hızla' kelimesi zarf tümleci görevindedir."
    }
  ],
  5902: [
    {
      question: "5902 sayılı Afet ve Acil Durum Yönetimi Hakkında Kanun hangi yılda yürürlüğe girmiştir?",
      options: ["2009", "2010", "2011", "2012", "2013"],
      answer: "2009",
      explanation: "5902 sayılı kanun 15 Mayıs 2009 tarihinde yürürlüğe girmiştir."
    },
    {
      question: "AFAD'ın tam adı nedir?",
      options: [
        "Afet ve Acil Durum Yönetimi Başkanlığı",
        "Afet ve Acil Durum Arama ve Kurtarma Başkanlığı",
        "Afet ve Acil Durum Müdahale Başkanlığı",
        "Afet ve Acil Durum Koordinasyon Başkanlığı",
        "Afet ve Acil Durum Planlama Başkanlığı"
      ],
      answer: "Afet ve Acil Durum Yönetimi Başkanlığı",
      explanation: "5902 sayılı kanunun 3. maddesine göre AFAD'ın tam adı 'Afet ve Acil Durum Yönetimi Başkanlığı'dır."
    },
    {
      question: "Afet yönetimi kaç aşamadan oluşur?",
      options: ["2", "3", "4", "5", "6"],
      answer: "4",
      explanation: "5902 sayılı kanunun 3. maddesine göre afet yönetimi 4 aşamadan oluşur: Zarar azaltma, hazırlık, müdahale ve iyileştirme."
    },
    {
      question: "AFAD hangi bakanlığa bağlıdır?",
      options: ["İçişleri Bakanlığı", "Sağlık Bakanlığı", "Milli Savunma Bakanlığı", "Çevre Bakanlığı", "Adalet Bakanlığı"],
      answer: "İçişleri Bakanlığı",
      explanation: "5902 sayılı kanunun 7. maddesine göre AFAD İçişleri Bakanlığı'na bağlıdır."
    },
    {
      question: "Afet ve acil durum tanımı hangi maddede yapılmıştır?",
      options: ["Madde 2", "Madde 3", "Madde 4", "Madde 5", "Madde 6"],
      answer: "Madde 3",
      explanation: "5902 sayılı kanunun 3. maddesinde afet ve acil durum tanımları yapılmıştır."
    },
    {
      question: "AFAD Başkanı kim tarafından atanır?",
      options: ["Cumhurbaşkanı", "İçişleri Bakanı", "Başbakan", "TBMM", "Bakanlar Kurulu"],
      answer: "Cumhurbaşkanı",
      explanation: "5902 sayılı kanunun 7. maddesine göre AFAD Başkanı Cumhurbaşkanı tarafından atanır."
    },
    {
      question: "İl Afet ve Acil Durum Müdürlüklerinin kurulması hangi maddede düzenlenmiştir?",
      options: ["Madde 8", "Madde 9", "Madde 10", "Madde 11", "Madde 12"],
      answer: "Madde 9",
      explanation: "5902 sayılı kanunun 9. maddesinde İl Afet ve Acil Durum Müdürlüklerinin kurulması düzenlenmiştir."
    },
    {
      question: "Afet ve acil durum planları kaç yılda bir gözden geçirilir?",
      options: ["1 yıl", "2 yıl", "3 yıl", "4 yıl", "5 yıl"],
      answer: "2 yıl",
      explanation: "5902 sayılı kanunun 15. maddesine göre afet ve acil durum planları 2 yılda bir gözden geçirilir."
    },
    {
      question: "AFAD'ın görevleri hangi maddede sayılmıştır?",
      options: ["Madde 6", "Madde 7", "Madde 8", "Madde 9", "Madde 10"],
      answer: "Madde 8",
      explanation: "5902 sayılı kanunun 8. maddesinde AFAD'ın görevleri sayılmıştır."
    },
    {
      question: "Ulusal Deprem Araştırma Programı hangi madde ile düzenlenmiştir?",
      options: ["Madde 16", "Madde 17", "Madde 18", "Madde 19", "Madde 20"],
      answer: "Madde 17",
      explanation: "5902 sayılı kanunun 17. maddesinde Ulusal Deprem Araştırma Programı düzenlenmiştir."
    },
    {
      question: "Afet bölgelerinde yapı denetimi zorunluluğu hangi maddede düzenlenmiştir?",
      options: ["Madde 18", "Madde 19", "Madde 20", "Madde 21", "Madde 22"],
      answer: "Madde 21",
      explanation: "5902 sayılı kanunun 21. maddesinde afet bölgelerinde yapı denetimi zorunluluğu düzenlenmiştir."
    },
    {
      question: "Afet sigortaları hangi madde ile düzenlenmiştir?",
      options: ["Madde 22", "Madde 23", "Madde 24", "Madde 25", "Madde 26"],
      answer: "Madde 23",
      explanation: "5902 sayılı kanunun 23. maddesinde afet sigortaları düzenlenmiştir."
    },
    {
      question: "AFAD personelinin eğitimi hangi maddede düzenlenmiştir?",
      options: ["Madde 24", "Madde 25", "Madde 26", "Madde 27", "Madde 28"],
      answer: "Madde 26",
      explanation: "5902 sayılı kanunun 26. maddesinde AFAD personelinin eğitimi düzenlenmiştir."
    },
    {
      question: "Afet ve acil durum rezerv fonu hangi maddede düzenlenmiştir?",
      options: ["Madde 27", "Madde 28", "Madde 29", "Madde 30", "Madde 31"],
      answer: "Madde 29",
      explanation: "5902 sayılı kanunun 29. maddesinde afet ve acil durum rezerv fonu düzenlenmiştir."
    },
    {
      question: "Koordinasyon kurulları hangi maddede düzenlenmiştir?",
      options: ["Madde 10", "Madde 11", "Madde 12", "Madde 13", "Madde 14"],
      answer: "Madde 12",
      explanation: "5902 sayılı kanunun 12. maddesinde koordinasyon kurulları düzenlenmiştir."
    },
    {
      question: "Afet ve acil durum eğitimi hangi maddede düzenlenmiştir?",
      options: ["Madde 14", "Madde 15", "Madde 16", "Madde 17", "Madde 18"],
      answer: "Madde 16",
      explanation: "5902 sayılı kanunun 16. maddesinde afet ve acil durum eğitimi düzenlenmiştir."
    },
    {
      question: "Afet ve acil durumda mali yardım hangi maddede düzenlenmiştir?",
      options: ["Madde 24", "Madde 25", "Madde 26", "Madde 27", "Madde 28"],
      answer: "Madde 28",
      explanation: "5902 sayılı kanunun 28. maddesinde afet ve acil durumda mali yardım düzenlenmiştir."
    },
    {
      question: "AFAD'ın yetkileri hangi maddede düzenlenmiştir?",
      options: ["Madde 6", "Madde 7", "Madde 8", "Madde 9", "Madde 10"],
      answer: "Madde 7",
      explanation: "5902 sayılı kanunun 7. maddesinde AFAD'ın yetkileri düzenlenmiştir."
    },
    {
      question: "Afet bölgesi ilan etme yetkisi kime aittir?",
      options: ["AFAD Başkanı", "İçişleri Bakanı", "Bakanlar Kurulu", "Cumhurbaşkanı", "Vali"],
      answer: "Bakanlar Kurulu",
      explanation: "5902 sayılı kanunun 10. maddesine göre afet bölgesi ilan etme yetkisi Bakanlar Kurulu'na aittir."
    },
    {
      question: "5902 sayılı kanunun yürürlük maddesi kaçıncı maddedir?",
      options: ["Madde 32", "Madde 33", "Madde 34", "Madde 35", "Madde 36"],
      answer: "Madde 35",
      explanation: "5902 sayılı kanunun 35. maddesi yürürlük maddesidir."
    }
  ]
}






