export interface District {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  priority: 1 | 2 | 3;
  content: {
    intro: string;
    commercialAreas: string[];
    keyStreets: string[];
    serviceHighlight: string;
    faq: Array<{ question: string; answer: string }>;
  };
  coordinates: { lat: number; lng: number };
}

export const districts: District[] = [
  // ============================================================
  // PRIORITY 1 — Detailed content (11 districts)
  // ============================================================
  {
    slug: 'kagithane-tabelaci',
    name: 'Kağıthane',
    title: 'Kağıthane Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Kağıthane'de profesyonel tabela imalatı ve montaj hizmeti. Kutu harf, ışıklı tabela, totem tabela ve cephe giydirme. 20 yillik tecrube, ücretsiz keşif. \u260E 0531 618 16 72",
    h1: 'Kağıthane Tabelacı \u2014 Profesyonel Tabela İmalatı',
    priority: 1,
    content: {
      intro: `Kağıthane, İstanbul'un en hizli gelişen ilçelerinden biri olarak binlerce işletmeye ev sahipliği yapmaktadir. Özellikle Cendere Vadisi'ndeki yeni ofis kompleksleri, Hamidiye ve Çağlayan bölgesindeki ticari merkezler ve Şirintepe-Nurtepe aksindaki sanayi alanlari, profesyonel tabela çözümlerine surekli ihtiyac duymaktadir.\n\nA2 Reklam olarak merkez ofisimiz Kağıthane'de yer almaktadir. Bu sayede ilçedeki projelere en hizli sekilde müdahale edebiliyor, ücretsiz keşif hizmetimizi ayni gun sunabiliyoruz. 2005 yilindan bu yana 2.500'den fazla projeyi başarıyla tamamladik.\n\nKağıthane'deki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Her projede tasarımdan üretime, montajdan bakima kadar tam entegre bir hizmet anlayisiyla çalışıyoruz.`,
      commercialAreas: [
        'Cendere Vadisi',
        'Hamidiye Caddesi',
        'Çağlayan',
        'Şirintepe Sanayi',
        'Nurtepe',
        'Merkez Mahallesi',
      ],
      keyStreets: [
        'Cendere Caddesi',
        'Hamidiye Caddesi',
        'Darülaceze Caddesi',
        'Sadabad Caddesi',
      ],
      serviceHighlight:
        "Merkez ofisimiz Kağıthane'de olduğu için ayni gun ücretsiz keşif ve en hizli montaj süresi",
      faq: [
        {
          question: "Kağıthane'de tabela yaptırmak için belediye izni gerekli mi?",
          answer:
            "Evet, Kağıthane Belediyesi Imar Mudurlugu'nden ilan ve reklam izni alinmasi gerekir. A2 Reklam olarak tum izin süreçlerinde musterilerimize destek sağlıyoruz. Izin süreci genellikle 5-10 is gunu surmektedir.",
        },
        {
          question: "Kağıthane'de tabela imalat fiyatları ne kadar?",
          answer:
            "Tabela fiyatları; tabela turune, boyutuna, kullanilan malzemeye ve montaj kosullarina gore degisir. Kutu harf tabela 15.000\u20BA'den, ışıklı tabela 8.000\u20BA'den, totem tabela ise 25.000\u20BA'den baslayan fiyatlarla sunulmaktadir. Ücretsiz keşif ve fiyat teklifi için bizi arayın.",
        },
        {
          question: "Kağıthane'de ayni gun tabela montaji yapiliyor mu?",
          answer:
            "Merkez ofisimiz Kağıthane'de olduğu için basit montaj islemlerini ayni gun gerceklestirebiliyoruz. Buyuk projeler için genellikle 3-7 is gunu üretim süresi gerekmektedir.",
        },
        {
          question: "Kağıthane Cendere Vadisi'nde tabela hizmeti veriyor musunuz?",
          answer:
            "Evet, Cendere Vadisi'ndeki yeni ofis kompleksleri ve AVM'ler için ozel kurumsal tabela çözümleri sunuyoruz. Plaza tabelaları, yönlendirme sistemleri ve cephe giydirme projelerimizle bölgedeki bircok işletmeye hizmet verdik.",
        },
        {
          question: "A2 Reklam'in Kağıthane'deki adresi nerede?",
          answer:
            "A2 Reklam merkez ofisimiz: Şirintepe, Acelya Sokagi Ugur Apt No:4/a, 34415 Kağıthane/İstanbul. Hafta ici 09:00-18:00 arasi ziyaret edebilirsiniz.",
        },
      ],
    },
    coordinates: { lat: 41.082, lng: 28.973 },
  },
  {
    slug: 'sisli-tabelaci',
    name: 'Şişli',
    title: 'Şişli Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Şişli'de profesyonel tabela imalatı. Mecidiyeköy, Bomonti, Nişantaşı bölgelerinde kutu harf, ışıklı tabela, totem ve cephe giydirme. \u260E 0531 618 16 72",
    h1: 'Şişli Tabelacı \u2014 Kurumsal Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Şişli, İstanbul'un en prestijli ticaret merkezlerinden biridir. Mecidiyeköy'deki is kuleleri, Bomonti'deki yeni karma kullanim projeleri, Nişantaşı ve Osmanbey'deki luks perakende magazalari, tabela sektorunde yüksek kalite standartlari gerektirmektedir.\n\nA2 Reklam olarak Şişli bölgesindeki işletmelere kurumsal kimliklerine uygun, estetik ve dayanikli tabela çözümleri sunuyoruz. Plaza giris tabelaları, yönlendirme sistemleri, magaza cephe tabelaları ve dijital baskı uygulamalarinda uzmaniz.\n\nKağıthane'deki merkez ofisimiz Şişli'ye sadece 10 dakika mesafede olduğundan, bölgedeki projelere hizli müdahale edebiliyoruz. Mecidiyeköy, Esentepe, Gayrettepe, Fulya, Bomonti ve Nişantaşı'nda yuzlerce projeyi başarıyla tamamladik.`,
      commercialAreas: [
        'Mecidiyeköy Is Kuleleri',
        'Bomonti',
        'Nişantaşı',
        'Osmanbey',
        'Esentepe',
        'Gayrettepe',
        'Fulya',
      ],
      keyStreets: [
        'Büyükdere Caddesi',
        'Halaskargazi Caddesi',
        'Abide-i Hurriyet Caddesi',
        'Rumeli Caddesi',
      ],
      serviceHighlight:
        'Kurumsal plaza tabelaları, yönlendirme sistemleri ve luks magaza cephe uygulamalari',
      faq: [
        {
          question: "Şişli'de plaza tabelasi yaptırmak istiyorum, surec nasil isliyor?",
          answer:
            'Plaza tabela projelerinde once ücretsiz keşif yapiyoruz. Bina yonetimi ile koordinasyon, belediye izin süreci, tasarım onayi ve üretim asamalarinin tamaminda size eslik ediyoruz. Ortalama sure 2-4 haftadir.',
        },
        {
          question: "Mecidiyeköy'de tabela montaji için trafik izni gerekli mi?",
          answer:
            "Büyükdere Caddesi gibi ana arterlerde montaj çalışmasi için IBB'den çalışma izni alinmasi gerekebilir. Bu süreci sizin adiniza takip ediyoruz.",
        },
        {
          question: "Şişli'de tabela fiyatları diger ilçelere gore farkli mi?",
          answer:
            'Tabela fiyatları ilçeye gore degil, tabela turune, boyutuna ve montaj kosullarina gore belirlenir. Şişli\'deki bazi binalarda vinc veya asansor kullanimi gerekebilir \u2014 bu durumlarda montaj maliyeti ek olarak yansir.',
        },
      ],
    },
    coordinates: { lat: 41.0602, lng: 28.9877 },
  },
  {
    slug: 'beyoglu-tabelaci',
    name: 'Beyoğlu',
    title: 'Beyoğlu Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Beyoğlu'nda tabela imalatı. Taksim, Karaköy, Galata, Cihangir bölgelerinde ışıklı tabela, kutu harf, magaza tabelasi. \u260E 0531 618 16 72",
    h1: 'Beyoğlu Tabelacı \u2014 Tarihi Dokuya Uygun Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Beyoğlu, İstanbul'un kultur ve eglence merkezi olmasinin yani sira yogun ticari faaliyetlerin surdugu bir ilçedir. İstiklal Caddesi'ndeki magazalar, Karaköy'deki butik dukkanlar, Galata bölgesindeki cafe ve restoranlar, tabelacılikta ozel estetik hassasiyet gerektirmektedir.\n\nBeyoğlu'nda tabela çalışmasi yaparken tarihi dokunun korunmasi buyuk önem tasir. Beyoğlu Belediyesi ve Koruma Kurulu'nun tabela duzenlemeleri diger ilçelere gore daha sikidir. A2 Reklam olarak bu duzenlemelere tam uyumlu, estetik ve dikkat cekici tabela çözümleri uretiyoruz.\n\nVintage tarzi ışıklı tabelalar, el yapimi kutu harf uygulamalari, cam uzeri folyo baskılar ve neon tabela alternatifleri gibi Beyoğlu'na ozgu çözümlerimizle fark yaratiyoruz.`,
      commercialAreas: [
        'İstiklal Caddesi',
        'Karaköy',
        'Galata',
        'Cihangir',
        'Taksim Meydani',
        'Asmalimescit',
        'Tophane',
      ],
      keyStreets: [
        'İstiklal Caddesi',
        'Kemeraltı Caddesi',
        'Bankalar Caddesi',
        'Galip Dede Caddesi',
      ],
      serviceHighlight:
        'Tarihi dokuya uygun, Koruma Kurulu onayli tabela tasarımlari ve vintage uygulamalar',
      faq: [
        {
          question: "Beyoğlu İstiklal Caddesi'nde tabela izni almak zor mu?",
          answer:
            'İstiklal Caddesi, SIT alani içinde olduğu için tabela izni Koruma Kurulu onayi gerektirir. Boyut, renk ve malzeme kisitlamalari mevcuttur. A2 Reklam olarak bu süreci deneyimlerimizle kolaylastiriyoruz.',
        },
        {
          question: "Karaköy'de butik magazam için nasil tabela onerirsiniz?",
          answer:
            'Karaköy bölgesinde vintage tarzi asma tabelalar, bakir veya pirinc kutu harf uygulamalari ve cam folyo baskılar cok tercih ediliyor. İşletmenizin konseptine uygun tasarım onerileri için ücretsiz keşif yapabiliriz.',
        },
      ],
    },
    coordinates: { lat: 41.037, lng: 28.977 },
  },
  {
    slug: 'besiktas-tabelaci',
    name: 'Beşiktaş',
    title: 'Beşiktaş Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Beşiktaş'ta tabela imalatı. Levent, Etiler, Bebek, Ortaköy bölgelerinde kurumsal tabela, plaza tabelasi, kutu harf. \u260E 0531 618 16 72",
    h1: 'Beşiktaş Tabelacı \u2014 Kurumsal ve Ticari Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Beşiktaş, İstanbul'un en önemli is ve finans merkezlerinden biridir. Levent ve Maslak'taki is kuleleri, Etiler ve Bebek'teki luks perakende, Ortaköy ve Arnavutköy sahilindeki butik işletmeler \u2014 her biri farkli tabela ihtiyaclarina sahiptir.\n\nA2 Reklam olarak Beşiktaş bölgesinde kurumsal kimlige uygun plaza tabelaları, yönlendirme sistemleri, magaza cephe tabelaları ve dijital baskı çözümleri sunuyoruz. Levent'teki is kulelerinden Bebek sahilindeki butik dukkanlara kadar genis bir yelpazede hizmet veriyoruz.\n\nKağıthane'den Beşiktaş'a erişim oldukca kolaydir. Büyükdere Caddesi uzerinden 15 dakikada projelerinize ulasabiliyoruz.`,
      commercialAreas: [
        'Levent Is Kuleleri',
        'Maslak',
        'Etiler',
        'Bebek',
        'Ortaköy',
        'Akaretler',
        'Beşiktaş Carsi',
      ],
      keyStreets: [
        'Büyükdere Caddesi',
        'Barbaros Bulvari',
        'Nispetiye Caddesi',
        'Cevdetpasa Caddesi',
      ],
      serviceHighlight:
        'Levent-Maslak is kuleleri için kurumsal tabela ve yönlendirme sistemleri',
      faq: [
        {
          question: "Levent'te is kulesi tabelasi yaptırmak istiyorum, ne gerekiyor?",
          answer:
            'Is kulesi tabela projeleri için bina yonetimi onayi, belediye ilan-reklam izni ve gerektiginde IBB çalışma izni alinmasi gerekir. Tum süreçleri sizin adiniza yonetiyoruz.',
        },
        {
          question: "Beşiktaş'ta tabela montaji için vinc gerekli mi?",
          answer:
            "Levent ve Maslak'taki yüksek binalarda vinc veya platform arac kullanimi genellikle gereklidir. Vinc operasyonunu ve gerekli izinleri organizasyona dahil ediyoruz.",
        },
      ],
    },
    coordinates: { lat: 41.043, lng: 29.007 },
  },
  {
    slug: 'kadikoy-tabelaci',
    name: 'Kadıköy',
    title: 'Kadıköy Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Kadıköy'de tabela imalatı. Moda, Bagdat Caddesi, Fenerbahçe, Caferaga bölgelerinde ışıklı tabela, kutu harf, magaza tabelasi. \u260E 0531 618 16 72",
    h1: 'Kadıköy Tabelacı \u2014 Anadolu Yakasi Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Kadıköy, Anadolu Yakasi'nin en canli ticaret ve kultur merkezidir. Bagdat Caddesi'ndeki marka magazalar, Moda ve Caferaga'daki butik işletmeler, Kozyatağı'ndaki is merkezleri ve Fenerbahçe sahilindeki kafeler \u2014 her biri kendine ozgu tabela ihtiyacina sahiptir.\n\nA2 Reklam olarak Anadolu Yakasi'ndaki projelerimize de Kağıthane merkezimizden hizmet veriyoruz. Kopru ve Marmaray baglantisi sayesinde Kadıköy'deki işletmelere hizli ve ekonomik çözümler sunabiliyoruz.\n\nKadıköy'de magaza tabelaları, cafe-restoran tabelaları, ofis kapi isimlikleri ve arac giydirme hizmetlerimiz yogun talep gormektedir.`,
      commercialAreas: [
        'Bagdat Caddesi',
        'Moda',
        'Caferaga',
        'Kozyatağı',
        'Fenerbahçe',
        'Göztepe',
        'Erenköy',
      ],
      keyStreets: [
        'Bagdat Caddesi',
        'Moda Caddesi',
        'Söğütlüçeşme Caddesi',
        'Fahrettin Kerim Gokay Caddesi',
      ],
      serviceHighlight:
        'Bagdat Caddesi magaza tabelaları ve Moda butik işletme çözümleri',
      faq: [
        {
          question:
            "Kadıköy'de tabela yaptırmak istiyorum, Avrupa yakasindan mi geliyorsunuz?",
          answer:
            "Evet, merkezimiz Kağıthane'de ama Kadıköy ve tum Anadolu Yakasi'na duzenli hizmet veriyoruz. Keşif ve montaj ekiplerimiz bölgeye ulasimda sorun yasamiyor.",
        },
        {
          question: "Bagdat Caddesi'nde tabela kurallari var mi?",
          answer:
            "Bagdat Caddesi'nde belediyenin tabela boyutu ve aydinlatma ile ilgili belirli duzenlemeleri mevcuttur. Uygun tabela tipini birlikte belirliyoruz.",
        },
      ],
    },
    coordinates: { lat: 40.9818, lng: 29.0292 },
  },
  {
    slug: 'bakirkoy-tabelaci',
    name: 'Bakırköy',
    title: 'Bakırköy Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Bakırköy'de tabela imalatı. Ataköy, Yeşilköy, Florya bölgelerinde kutu harf, ışıklı tabela, cephe giydirme. \u260E 0531 618 16 72",
    h1: 'Bakırköy Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Bakırköy, İstanbul'un koklu ticaret merkezlerinden biridir. Bakırköy carsisi, Ataköy'deki AVM ve rezidanslar, Yeşilköy ve Florya'daki işletmeler surekli tabela ihtiyaci olan bölgelerdir.\n\nA2 Reklam olarak Bakırköy ve cevre bölgelerde kutu harf, ışıklı tabela, totem tabela, cephe giydirme ve dijital baskı hizmetleri sunuyoruz. E-5 uzerindeki kolay erişim sayesinde bölgeye hizli müdahale edebiliyoruz.`,
      commercialAreas: [
        'Bakırköy Carsi',
        'Ataköy',
        'Yeşilköy',
        'Florya',
        'Capacity AVM',
        'Galleria',
      ],
      keyStreets: ['İstanbul Caddesi', 'Sakizagaci Caddesi', 'Ataköy Bulvari'],
      serviceHighlight:
        'AVM, rezidans ve havalimani bölgesi kurumsal tabela projeleri',
      faq: [
        {
          question: "Bakırköy'de ne tur tabelalar yaptiriliyor?",
          answer:
            "Bakırköy'de en cok kutu harf tabela, ışıklı cephe tabelasi ve totem tabela talep edilmektedir. Ataköy bölgesinde ise plaza ve AVM tabela projeleri on plana cikar.",
        },
      ],
    },
    coordinates: { lat: 40.9808, lng: 28.8772 },
  },
  {
    slug: 'atasehir-tabelaci',
    name: 'Ataşehir',
    title: 'Ataşehir Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Ataşehir'de tabela imalatı. Finans Merkezi, Ataşehir Bulvari, Küçükbakkalkoy bölgelerinde kurumsal tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Ataşehir Tabelacı \u2014 Finans Merkezi Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Ataşehir, İstanbul Finans Merkezi'nin (IFM) konumuyla birlikte İstanbul'un yeni is merkezlerinden biri haline gelmistir. Ataşehir Bulvari uzerindeki is merkezleri, Küçükbakkalkoy sanayi bölgesi ve Bati Ataşehir'deki konut-ticaret karma alanlari yogun tabela talebi oluşturmaktadir.\n\nA2 Reklam olarak Ataşehir'deki projelere Kağıthane merkezimizden hizmet veriyoruz. Kurumsal plaza tabelaları, yönlendirme sistemleri, magaza tabelaları ve dijital baskı çözümlerimizle bölgedeki işletmelerin ihtiyaclarini karsiliyoruz.`,
      commercialAreas: [
        'İstanbul Finans Merkezi',
        'Ataşehir Bulvari',
        'Küçükbakkalkoy',
        'Bati Ataşehir',
        'Brandium AVM',
      ],
      keyStreets: [
        'Ataşehir Bulvari',
        'Küçükbakkalkoy Caddesi',
        'Kayisdagi Caddesi',
      ],
      serviceHighlight:
        'İstanbul Finans Merkezi ve is kuleleri için kurumsal tabela projeleri',
      faq: [
        {
          question: "Ataşehir Finans Merkezi'nde tabela yapiyor musunuz?",
          answer:
            'Evet, IFM ve cevresindeki is kulelerinde plaza tabelasi, yönlendirme sistemleri ve ic mekan tabela çözümleri sunuyoruz.',
        },
      ],
    },
    coordinates: { lat: 40.9923, lng: 29.1244 },
  },
  {
    slug: 'basaksehir-tabelaci',
    name: 'Başakşehir',
    title: 'Başakşehir Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Başakşehir'de tabela imalatı. İkitelli OSB, Başakşehir Merkez, Kayabaşı bölgelerinde kutu harf, totem tabela, sanayi tabelasi. \u260E 0531 618 16 72",
    h1: 'Başakşehir Tabelacı \u2014 Sanayi ve Ticari Tabela Çözümleri',
    priority: 1,
    content: {
      intro: `Başakşehir, İstanbul'un en buyuk organize sanayi bölgesi olan İkitelli OSB'ye ev sahipliği yapmaktadir. Binlerce fabrika, atolye ve showroom'un bulundugu bu bölge, İstanbul'un en yogun tabela talebinin olduğu alanlardan biridir.\n\nA2 Reklam olarak Başakşehir ve İkitelli OSB'deki işletmelere sanayi tabelasi, fabrika cephe giydirme, totem tabela, kutu harf ve yönlendirme tabelasi hizmetleri sunuyoruz. Kağıthane'den TEM otoyolu uzerinden kolay erişim sağlıyoruz.\n\nBaşakşehir Merkez'deki yeni AVM'ler ve konut projelerindeki ticari alanlar da tabela talebinin yogun olduğu bölgeler arasindadir.`,
      commercialAreas: [
        'İkitelli OSB',
        'Başakşehir Merkez',
        'Kayabaşı',
        'Basak Konutlari',
        'Onurkent',
      ],
      keyStreets: [
        'İkitelli Caddesi',
        'Başakşehir Bulvari',
        'Kayabaşı Bulvari',
      ],
      serviceHighlight:
        'İkitelli OSB sanayi tabelaları, fabrika cephe giydirme ve buyuk totem projeler',
      faq: [
        {
          question:
            "İkitelli OSB'de tabela yaptırmak için OSB yonetiminden izin gerekli mi?",
          answer:
            'Evet, İkitelli OSB\'de tabela montaji için OSB yonetiminin belirledigi kurallara uyulmasi gerekir. Boyut ve konum kisitlamalari mevcuttur. Sureci sizin adiniza takip ediyoruz.',
        },
        {
          question: "Başakşehir'de fabrika tabelasi ne kadara mal olur?",
          answer:
            "Fabrika tabelaları boyut ve malzemeye gore 20.000\u20BA ile 150.000\u20BA+ arasinda degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.",
        },
      ],
    },
    coordinates: { lat: 41.0945, lng: 28.8042 },
  },
  {
    slug: 'bahcelievler-tabelaci',
    name: 'Bahçelievler',
    title: 'Bahçelievler Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Bahçelievler'de tabela imalatı. Yenibosna, Soganli, Kocasinan bölgelerinde ışıklı tabela, kutu harf, cephe tabelasi. \u260E 0531 618 16 72",
    h1: 'Bahçelievler Tabelacı \u2014 Profesyonel Tabela Hizmetleri',
    priority: 1,
    content: {
      intro: `Bahçelievler, E-5 ve TEM otoyollarinin kesisim noktasinda yer alan stratejik konumuyla İstanbul'un en yogun ticari bölgelerinden biridir. Yenibosna'daki oteller ve is merkezleri, Soganli ve Kocasinan'daki ticari alanlar surekli tabela ihtiyaci dogurmaktadir.\n\nA2 Reklam olarak Bahçelievler'deki işletmelere ışıklı tabela, kutu harf, cephe tabelasi, totem tabela ve arac giydirme hizmetleri sunuyoruz. E-5 ve TEM erişimi sayesinde bölgeye hizli ulasim sağlıyoruz.`,
      commercialAreas: [
        'Yenibosna',
        'Soganli',
        'Kocasinan',
        'Bahçelievler Merkez',
        'Çobançeşme',
      ],
      keyStreets: [
        'Adnan Kahveci Bulvari',
        'Eski Londra Asfalti',
        'Bahçelievler Caddesi',
      ],
      serviceHighlight:
        'Yenibosna otel ve is merkezi tabelaları, E-5 uzeri cephe uygulamalari',
      faq: [
        {
          question: "Bahçelievler'de tabela yaptırmak ne kadar surer?",
          answer:
            'Tabela turune gore üretim süresi 3-10 is gunu arasinda degisir. Montaj genellikle 1 gun içinde tamamlanir. Acil projeler için hizlandirilmis üretim secenegimiz mevcuttur.',
        },
      ],
    },
    coordinates: { lat: 41.0023, lng: 28.8596 },
  },
  {
    slug: 'beylikduzu-tabelaci',
    name: 'Beylikdüzü',
    title: 'Beylikdüzü Tabelacı | A2 Reklam \u2014 Tabela İmalatı ve Montaj',
    metaDescription:
      "Beylikdüzü'nde tabela imalatı. Beylikdüzü OSB, TUYAP, E-5 uzeri bölgelerde kutu harf, totem tabela, sanayi tabelasi. \u260E 0531 618 16 72",
    h1: 'Beylikdüzü Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 1,
    content: {
      intro: `Beylikdüzü, son yillarda hizla buyuyen ticari ve konut alanlariyla İstanbul'un gelişen ilçelerinden biridir. Beylikdüzü OSB, TUYAP fuar alani cevresi ve E-5 uzerindeki ticari merkezler yogun tabela talebinin olduğu bölgelerdir.\n\nA2 Reklam olarak Beylikdüzü'ndeki işletmelere kutu harf, ışıklı tabela, totem tabela, cephe giydirme ve dijital baskı hizmetleri sunuyoruz. TEM otoyolu baglantisiyla bölgeye rahat erişim sağlıyoruz.`,
      commercialAreas: [
        'Beylikdüzü OSB',
        'TUYAP',
        'Beylikdüzü Migros AVM',
        'Marmara Park',
        'BeylikLife',
      ],
      keyStreets: ['Adnan Kahveci Bulvari', 'Yakuplu Caddesi'],
      serviceHighlight: 'Beylikdüzü OSB sanayi tabelaları ve AVM projeleri',
      faq: [
        {
          question: "Beylikdüzü'nde tabela montaji yapiyor musunuz?",
          answer:
            'Evet, Beylikdüzü ve cevre ilçelere duzenli hizmet veriyoruz. Ücretsiz keşif sonrasi projenize basliyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0027, lng: 28.6407 },
  },

  // ============================================================
  // PRIORITY 2 — Shorter intros, 2 FAQs (10 districts)
  // ============================================================
  {
    slug: 'fatih-tabelaci',
    name: 'Fatih',
    title: 'Fatih Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Fatih'te profesyonel tabela imalatı ve montaj. Tarihi yarimada, Laleli, Aksaray ticari bölgeleri. \u260E 0531 618 16 72",
    h1: 'Fatih Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Fatih, İstanbul'un tarihi yarimadasi olarak asirlardir ticaretin kalbi olan bir ilçedir. Laleli bölgesi basli basina devasa bir tekstil ve otelcilik merkezi niteligindedir; yuzlerce tekstil magazasi, toptan satis showroom'u ve butik otel burada faaliyet gostermektedir. Aksaray ise carsisi, ofisleri ve cok sayida ticari işletmesiyle Fatih'in bir diger yogun ticaret noktasidir. Eminonu ve Sirkeci cevresindeki toptan ticaret hanlari, Mercan ve Tahtakale'deki geleneksel esnaf dukkanlari, Sultanahmet bölgesindeki turizm odakli restoranlar, kafeler ve hediyelik esya magazalari surekli tabela ihtiyaci dogurmaktadir.\n\nVatan Caddesi uzerindeki buyuk magaza ve showroom'lar, Fevzipasa Caddesi'ndeki ticari işletmeler ve Unkapani bölgesindeki matbaa ve ambalaj firmalari da Fatih'in ticari dokusunu zenginlestiren onemli alanlardandir. Bu denli farkli sektorlerden işletmenin bir arada bulundugu Fatih'te, her sektore ozel tabela çözümü gereklidir.\n\nA2 Reklam olarak merkez ofisimiz Kağıthane'den Fatih'e Haliç uzerinden dakikalar içinde ulasiyoruz. Fatih bölgesindeki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Tarihi yarimadanin ozel dokusuna uygun, belediye ve koruma kurulu duzenlemelerine uyumlu tabela tasarımlari uretiyoruz. Laleli'deki otellerden Eminonu'ndeki hanlara, Sultanahmet'teki restoranlara kadar her olcekte projeyi deneyimli ekibimizle tamamliyoruz.`,
      commercialAreas: [
        'Laleli Tekstil Bölgesi',
        'Aksaray Ticaret Merkezi',
        'Eminönü Toptan Ticaret',
        'Sultanahmet Turizm Bölgesi',
        'Mercan ve Tahtakale Hanlari',
        'Vatan Caddesi',
        'Unkapani',
      ],
      keyStreets: [
        'Vatan Caddesi',
        'Fevzipasa Caddesi',
        'Millet Caddesi',
        'Ragip Gumuspala Caddesi',
      ],
      serviceHighlight:
        'Tarihi yarimada, Laleli tekstil otelleri, Eminonu toptan ticaret, Sultanahmet turizm bölgesi',
      faq: [
        {
          question: "Fatih'te tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Fatih'te tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Kutu harf, ışıklı tabela ve totem tabela seceneklerimiz için ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Laleli'deki otelim için dis cephe tabelasi yaptırmak istiyorum, neler yapabilirsiniz?",
          answer:
            "Laleli bölgesindeki oteller için kutu harf cephe tabelasi, ışıklı totem tabela, giris yonlendirme tabelaları ve arac giydirme hizmeti sunuyoruz. Otel konseptinize uygun tasarım, belediye izin süreci destegi ve montaj dahil komple çözüm sağlıyoruz. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
        {
          question: "Fatih Belediyesi tabela izin süreci nasil isliyor?",
          answer:
            "Fatih, tarihi yarimada icinde yer aldigi için bazi bölgelerde Koruma Kurulu onayi da gerekebilir. Standart ilan-reklam izni Fatih Belediyesi Imar Mudurlugu'nden alinir. A2 Reklam olarak tum izin süreçlerinde musterilerimize destek sağlıyoruz ve uygun tabela boyut-malzeme seçiminde yonlendirme yapiyoruz.",
        },
      ],
    },
    coordinates: { lat: 41.0186, lng: 28.9497 },
  },
  {
    slug: 'uskudar-tabelaci',
    name: 'Üsküdar',
    title: 'Üsküdar Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Üsküdar'da profesyonel tabela imalatı ve montaj. Anadolu Yakasi sahil, Altunizade is merkezi. \u260E 0531 618 16 72",
    h1: 'Üsküdar Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Üsküdar, Anadolu Yakasi'nin hem tarihi hem de ticari acidan en degerli ilçelerinden biridir. Altunizade bölgesi, Capitol AVM ve cevresindeki is merkezleriyle Üsküdar'in en yogun ticaret noktalarindan birini olusturmaktadir. Acibadem ve Kosuyolu semtleri saglik kuruluslari, klinikler ve perakende magazalarla dolu olup surekli profesyonel tabela talebi yaratmaktadir. Cengelköy sahili boyunca sıralanan restoranlar, kafeler ve butik isletmeler ise zarif ve estetik tabela çözümlerine ihtiyac duymaktadir.\n\nÜsküdar merkez carsisi, Hakimiyet-i Milliye Caddesi ve cevresi yogun esnaf ve ticaret faaliyetine ev sahipliği yapar. Burasi kucuk esnaftan buyuk magaza zincirlerine kadar genis bir işletme yelpazesini barindirmaktadir. Kisiklı Caddesi uzerindeki magaza ve ofisler, Bulgurlu ve Çamlica bölgesindeki yeni konut projelerinin zemin kat ticari alanlari da Üsküdar'in buyuyen tabela pazarini beslemektedir.\n\nA2 Reklam olarak merkez ofisimiz Kağıthane'den 15 Temmuz Sehitler Koprusu ve Marmaray baglantisiyla Üsküdar'a hizla ulasiyoruz. Üsküdar bölgesindeki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Altunizade'deki plaza tabelalarindan Cengelköy sahilindeki restoran tabelarina kadar farkli ihtiyaclara profesyonel çözümler uretiyoruz.`,
      commercialAreas: [
        'Altunizade Is Merkezi',
        'Acibadem',
        'Kosuyolu',
        'Cengelköy Sahil',
        'Üsküdar Merkez Carsi',
        'Kisiklı Caddesi',
        'Bulgurlu',
      ],
      keyStreets: [
        'Hakimiyet-i Milliye Caddesi',
        'Kisiklı Caddesi',
        'Nuhkuyusu Caddesi',
        'Cengelköy Caddesi',
      ],
      serviceHighlight:
        'Altunizade is merkezleri, Acibadem, Cengelköy sahil, Üsküdar merkez carsi',
      faq: [
        {
          question: "Üsküdar'da tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Üsküdar'da tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Altunizade'deki is merkezim için kurumsal tabela yaptırmak istiyorum, hangi hizmetleri sunuyorsunuz?",
          answer:
            "Altunizade bölgesindeki is merkezleri ve plazalar için kurumsal kimlige uygun kutu harf tabelalar, giris yonlendirme sistemleri, kat rehberi panolari ve dis cephe tabelasi çözümleri sunuyoruz. Bina yonetimiyle koordineli çalışarak izin sürecini de yonetiyoruz.",
        },
        {
          question: "Üsküdar'a Avrupa Yakasi'ndan tabela montaji için gelebiliyor musunuz?",
          answer:
            "Evet, merkez ofisimiz Kağıthane'dedir ve 15 Temmuz Sehitler Koprusu ile Marmaray sayesinde Üsküdar'a cok hizli ulasiyoruz. Bölgede duzenlı olarak tabela montaj ve bakim çalışmalari gerceklestiriyoruz. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
      ],
    },
    coordinates: { lat: 41.0234, lng: 29.0153 },
  },
  {
    slug: 'umraniye-tabelaci',
    name: 'Ümraniye',
    title: 'Ümraniye Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Ümraniye'de profesyonel tabela imalatı ve montaj. Sanayi bölgesi, Ümraniye Carsi, Alemdağ Caddesi. \u260E 0531 618 16 72",
    h1: 'Ümraniye Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Ümraniye, Anadolu Yakasi'nin en buyuk sanayi ve ticaret merkezlerinden biri olarak binlerce işletmeye ev sahipliği yapmaktadir. Dudullu Organize Sanayi Bölgesi (OSB) ve Yukari Dudullu'daki fabrikalar, imalathaneler ve lojistik firmalari, buyuk olcekli sanayi tabelasi, cephe giydirme ve yonlendirme tabelasi ihtiyaclarini surekli canli tutmaktadir. Alemdağ Caddesi, Ümraniye'nin ana ticaret arteri olarak iki yanindan sıralanan magazalar, restoranlar ve hizmet sektoru işletmeleriyle yogun bir tabela talebi olusturmaktadir.\n\nÜmraniye Carsi bölgesi, geleneksel esnafin yanı sira modern magaza zincirleri, banka subeleri ve ofislerle dolup tasmaktadir. Çakmak Caddesi ve Ataturk Caddesi uzerindeki ticari işletmeler de profesyonel tabela çözümlerine ihtiyac duyan onemli noktalardir. Ümraniye'nin son yillarda hizla gelisen yüzüyle birlikte yeni AVM'ler, is merkezleri ve karma kullanim projeleri de bölgedeki tabela talebini artirmistir.\n\nA2 Reklam olarak Ümraniye bölgesindeki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Dudullu OSB'deki fabrikalarin dis cephe tabelalarindan Alemdağ Caddesi uzerindeki magaza tabelarina kadar genis bir yelpazede hizmet veriyoruz. Kağıthane merkezimizden FSM Koprusu baglantisiyla Ümraniye'ye hizli erişim sağlıyoruz.`,
      commercialAreas: [
        'Dudullu OSB',
        'Yukari Dudullu Sanayi',
        'Ümraniye Carsi',
        'Alemdağ Caddesi',
        'Çakmak Mahallesi',
        'Ataturk Mahallesi',
      ],
      keyStreets: [
        'Alemdağ Caddesi',
        'Çakmak Caddesi',
        'Ataturk Caddesi',
        'Tavukcuyolu Caddesi',
      ],
      serviceHighlight:
        'Dudullu OSB sanayi tabelaları, Alemdağ Caddesi magaza tabelaları, Ümraniye Carsi',
      faq: [
        {
          question: "Ümraniye'de tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Ümraniye'de tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Dudullu OSB'deki fabrikam için sanayi tabelasi yaptırmak istiyorum, ne sunuyorsunuz?",
          answer:
            "Dudullu OSB bölgesindeki fabrikalara dis cephe kutu harf tabela, totem tabela, yonlendirme tabelaları, fabrika giris tabelasi ve arac giydirme hizmetleri sunuyoruz. Sanayi bölgesinin gerekliliklerine uygun dayanikli malzemeler kullaniyoruz. Ücretsiz keşif için 0531 618 16 72 numarasini arayabilirsiniz.",
        },
        {
          question: "Ümraniye'de tabela montaji için belediye izni gerekli mi?",
          answer:
            "Evet, Ümraniye Belediyesi'nden ilan ve reklam izni alinmasi gerekmektedir. OSB alanlari için ayrica OSB yonetiminin onayı da gerekebilir. A2 Reklam olarak tum izin süreçlerinde musterilerimize rehberlik ediyoruz.",
        },
      ],
    },
    coordinates: { lat: 41.0266, lng: 29.0936 },
  },
  {
    slug: 'maltepe-tabelaci',
    name: 'Maltepe',
    title: 'Maltepe Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Maltepe'de profesyonel tabela imalatı ve montaj. E-5 uzeri ticaret, Maltepe sahil. \u260E 0531 618 16 72",
    h1: 'Maltepe Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Maltepe, E-5 (D-100) otoyolu uzerindeki yogun ticari yasami ve sahil seridindeki canli isletmeleriyle Anadolu Yakasi'nin en dinamik ilçelerinden biridir. E-5 uzerinde sıralanan buyuk magazalar, mobilya showroom'lari, oto galerileri ve market zincirleri dis cepheden gorulebilen dikkat cekici tabela çözümlerine surekli ihtiyac duymaktadir. Maltepe sahil parki ve cevresindeki restoran, kafe ve eglence mekanlari ise estetik ve modern tabela tasarımlari talep etmektedir.\n\nCevizli bölgesi, kucuk sanayi siteleri ve ticari isletmeleriyle Maltepe'nin onemli ticaret noktalarindan birini olusturmaktadir. Basibuyuk semtindeki sanayi alanlari ve imalathaneler de buyuk olcekli sanayi tabelasi, fabrika cephe giydirme ve yonlendirme tabelasi ihtiyaci yaratmaktadir. Bagdat Caddesi'nin Maltepe'ye uzanan bolumu ise luks perakende ve butik magazalarla ticari canliligini surdurmektedir. Dragos ve Idealtepe sahilindeki isletmeler, Maltepeliler Caddesi ve Feyzullah Caddesi uzerindeki dukkanlar da bölgenin yogun ticari dokusuna katkida bulunmaktadir.\n\nA2 Reklam olarak Maltepe bölgesindeki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. E-5 uzerindeki showroom'larin buyuk olcekli cephe tabelalarindan sahildeki restoranlarin zarif tabela tasarımlarina kadar her projeye çözüm uretiyoruz. Kağıthane merkezimizden Marmaray ve E-5 baglantisiyla Maltepe'ye rahat ulasim sağlıyoruz.`,
      commercialAreas: [
        'E-5 Uzeri Ticaret Aksi',
        'Maltepe Sahil',
        'Cevizli Ticaret Bölgesi',
        'Basibuyuk Sanayi',
        'Bagdat Caddesi (Maltepe)',
        'Dragos ve Idealtepe',
      ],
      keyStreets: [
        'Bagdat Caddesi',
        'Maltepeliler Caddesi',
        'Feyzullah Caddesi',
        'E-5 (D-100) Yan Yol',
      ],
      serviceHighlight:
        'E-5 uzeri buyuk cephe tabelaları, Maltepe sahil, Cevizli ve Basibuyuk sanayi bölgeleri',
      faq: [
        {
          question: "Maltepe'de tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Maltepe'de tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "E-5 uzerindeki showroom'um için buyuk cephe tabelasi yaptırmak istiyorum, mumkun mu?",
          answer:
            "E-5 uzerindeki isletmeler için buyuk olcekli kutu harf cephe tabelaları, ışıklı totem tabelalar ve dijital baskı cephe giydirme uygulamalari yapiyoruz. Otoyoldan gorunurlugu en ust duzeye cikaran tasarımlar oneriyoruz. Vinc destekli montaj hizmetimiz de mevcuttur. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
        {
          question: "Maltepe sahildeki restoranim için dis mekan tabelasi onerileriniz nelerdir?",
          answer:
            "Sahil bölgesindeki restoranlar için ruzgar ve nem kosullarina dayanikli paslanmaz kutu harf tabelalar, LED ışıklı tabelalar ve cam folyo uygulamalari oneriyoruz. Deniz havasina dayanikli malzemeler kullanarak uzun omurlu çözümler sunuyoruz.",
        },
      ],
    },
    coordinates: { lat: 40.9340, lng: 29.1305 },
  },
  {
    slug: 'esenyurt-tabelaci',
    name: 'Esenyurt',
    title: 'Esenyurt Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Esenyurt'ta profesyonel tabela imalatı ve montaj. Yogun ticari alan, Esenyurt Otogar cevresi. \u260E 0531 618 16 72",
    h1: 'Esenyurt Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Esenyurt, 1 milyonu askin nufusuyla İstanbul'un en kalabalik ilçesidir ve yogun ticari faaliyetlere ev sahipliği yapmaktadir. İlçe merkezindeki binlerce işletme, Kiraç sanayi bölgesindeki fabrikalar ve atolyeler, Esenyurt Otogar cevresi ve yeni konut projelerindeki dukkanlar surekli tabela ihtiyaci dogurmaktadir. Her gun yeni isletmelerin acildigi Esenyurt'ta tabela talebi hic durmamaktadir.\n\nDogan Arasli Bulvari, Esenyurt'un ana ticaret arteri olarak iki yanindan sıralanan magazalar, bankalar ve restoran zincirleriyle cok yogun bir tabela ihtiyaci yaratmaktadir. Fatih Mahallesi'ndeki ticaret merkezleri, Haramidere aksindaki sanayi isletmeleri ve Esenkent bölgesindeki yeni ticari alanlar bölgenin tabela talebini besleyen diger onemli noktalardir. Özellikle E-5 cepheli isletmeler buyuk olcekli cephe tabelasi ve totem tabela tercih etmektedir.\n\nA2 Reklam olarak Esenyurt'taki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. E-5 ve TEM otoyolu baglantisiyla Kağıthane merkezimizden bölgeye hizli erişim sağlıyoruz. Kucuk esnaf dukkanindan buyuk fabrika cephesine, AVM magaza tabelasindan sanayi yonlendirme levhalarina kadar her olcekte projeyi deneyimli ekibimizle tamamliyoruz.`,
      commercialAreas: [
        'Esenyurt Merkez',
        'Esenyurt Otogar Cevresi',
        'Kiraç Sanayi Bölgesi',
        'Dogan Arasli Bulvari',
        'Haramidere Sanayi',
        'Fatih Mahallesi Ticaret Merkezi',
      ],
      keyStreets: [
        'Dogan Arasli Bulvari',
        'Ataturk Caddesi',
        'Bahar Caddesi',
        'Kiraç Yolu',
      ],
      serviceHighlight:
        'Esenyurt merkez ticari alan, Kiraç sanayi, Otogar cevresi, Haramidere',
      faq: [
        {
          question: "Esenyurt'ta tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Esenyurt'ta tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Esenyurt'ta yeni acilan dukkanim için komple tabela çözümü sunuyor musunuz?",
          answer:
            "Evet, yeni acilan işletmeler için dis cephe tabelasi, ışıklı kutu harf, cam folyo uygulamasi, ic mekan yonlendirme ve arac giydirme dahil komple tabela paketi sunuyoruz. Tasarımdan montaja kadar tum süreci yonetiyoruz. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
        {
          question: "Kiraç sanayi bölgesindeki fabrikam için sanayi tabelasi yaptırabilir miyim?",
          answer:
            "Kiraç sanayi bölgesindeki fabrikalara dis cephe kutu harf tabela, totem tabela, fabrika giris tabelasi, yonlendirme levhalari ve arac giydirme hizmetleri sunuyoruz. Sanayi bölgesi kosullarina uygun dayanikli malzemeler kullaniyoruz.",
        },
      ],
    },
    coordinates: { lat: 41.0333, lng: 28.6769 },
  },
  {
    slug: 'bagcilar-tabelaci',
    name: 'Bağcılar',
    title: 'Bağcılar Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Bağcılar'da profesyonel tabela imalatı ve montaj. Güneşli sanayi bölgesi, Mahmutbey. \u260E 0531 618 16 72",
    h1: 'Bağcılar Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Bagcılar, Güneşli sanayi bölgesi, Mahmutbey is merkezleri ve ISTOC Ticaret Merkezi ile İstanbul'un en yogun ticari ilçelerinden biridir. Binlerce kucuk ve orta olcekli işletme, fabrika, atolye ve showroom profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. İlçenin genis ticari yelpazesi her sektorden tabela talebi yaratmaktadir.\n\nBagcılar Meydani cevresindeki perakende magazalar ve esnaf dukkanlari, Güneşli Basin Ekspres aksindaki is kuleleri ve kurumsal ofisler, Mahmutbey Caddesi uzerindeki buyuk magaza zincirleri bölgenin tabela talebini besleyen baslica alanlardandir. ISTOC Ticaret Merkezi'ndeki yuzlerce toptan satis magazasi buyuk ebatli tabela ve yonlendirme sistemlerine ihtiyac duymaktadir. Kirazli bölgesindeki sanayi tesisleri, Yeni Mahalle'deki ticari isletmeler ve Fevzi Cakmak Caddesi uzerindeki dukkanlar da Bagcılar'in tabela pazarini canli tutan onemli noktalardir.\n\nA2 Reklam olarak Bagcılar'daki işletmelere kutu harf tabela, ışıklı tabela, sanayi tabelasi, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. TEM otoyolu baglantisiyla Kağıthane merkezimizden Bagcılar'a 15 dakikada ulasiyoruz. Güneşli'deki ofis kulelerinden ISTOC'taki showroom'lara, Mahmutbey'deki fabrikalara kadar her olcekte projeyi deneyimli ekibimizle tamamliyoruz.`,
      commercialAreas: [
        'Güneşli Sanayi Bölgesi',
        'Mahmutbey Is Merkezleri',
        'ISTOC Ticaret Merkezi',
        'Bagcılar Meydani',
        'Basin Ekspres Aksi',
        'Kirazli Sanayi',
      ],
      keyStreets: [
        'Mahmutbey Caddesi',
        'Basin Ekspres Yolu',
        'Ataturk Caddesi',
        'Baglar Caddesi',
      ],
      serviceHighlight:
        'Güneşli sanayi, Mahmutbey, ISTOC Ticaret Merkezi, Basin Ekspres is kuleleri',
      faq: [
        {
          question: "Bağcılar'da tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Bağcılar'da tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "ISTOC'taki magazam için tabela ve yonlendirme sistemi yaptırabilir miyim?",
          answer:
            "ISTOC Ticaret Merkezi'ndeki magazalar için kutu harf cephe tabelasi, ic mekan yonlendirme panolari, dijital baskı ve totem tabela çözümleri sunuyoruz. Ticaret merkezinin kendi tabela yonetmeligine uygun tasarımlar hazırlıyoruz.",
        },
        {
          question: "Basin Ekspres'teki ofisimiz için kurumsal tabela çözümü ariyoruz, yardimci olabilir misiniz?",
          answer:
            "Basin Ekspres aksindaki is kuleleri ve ofis binalari için kurumsal kimlige uygun plaza tabelaları, giris yonlendirme sistemleri, kat rehberi panolari ve dis cephe kutu harf tabelalar uretiyoruz. Bina yonetimiyle koordineli çalışarak izin sürecini de yonetiyoruz. 0531 618 16 72 numarasindan bize ulasabilirsiniz.",
        },
      ],
    },
    coordinates: { lat: 41.0393, lng: 28.8572 },
  },
  {
    slug: 'gaziosmanpasa-tabelaci',
    name: 'Gaziosmanpaşa',
    title: 'Gaziosmanpaşa Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Gaziosmanpaşa'da profesyonel tabela imalatı ve montaj. Küçükköy, Karadeniz Mahallesi. \u260E 0531 618 16 72",
    h1: 'Gaziosmanpaşa Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Gaziosmanpasa, Küçükköy, Karadeniz Mahallesi, Baglarbasi ve Karlitepe gibi yogun nufuslu bölgeleriyle İstanbul'un en hareketli ilçelerinden biridir. İlçe genelinde yogun sekilde devam eden kentsel donusum projeleri, yeni yapilarin ve ticari alanlarin surekli ortaya cikmasiyla tabela talebini her gecen gun artirmaktadir. Eski binalarin yerini alan modern konut ve is merkezleri, cephe tabelasi ve yonlendirme sistemi ihtiyaclarini beraberinde getirmektedir.\n\nGaziosmanpasa Meydani cevresindeki perakende magazalar ve banka subeleri, Küçükköy Caddesi uzerindeki ticari işletmeler ve esnaf dukkanlari, Baglarbasi'ndaki market zincirleri ve Karadeniz Mahallesi'ndeki yogun ticari faaliyet bölgenin tabela ihtiyacini besleyen baslica alanlardandir. Yeni acilan rezidans projelerinin zemin katlarindaki dukkanlar, restoran zincirleri ve saglik merkezleri de modern ve dikkat cekici tabela çözümlerine ihtiyac duymaktadir.\n\nA2 Reklam olarak Gaziosmanpasa'daki işletmelere kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Kağıthane'ye komsu olan ilçeye merkez ofisimizden 10-15 dakika içinde ulasabiliyoruz. Bu yakinlik avantajimizla ayni gun ücretsiz keşif ve en hizli montaj suresini garanti ediyoruz.`,
      commercialAreas: [
        'Küçükköy Ticaret Bölgesi',
        'Karadeniz Mahallesi',
        'Baglarbasi',
        'Gaziosmanpasa Meydani',
        'Yeni Kentsel Donusum Alanlari',
        'Karlitepe',
      ],
      keyStreets: [
        'Küçükköy Caddesi',
        'Merkez Mahallesi Caddesi',
        'Çukurçesme Caddesi',
        'Barbaros Caddesi',
      ],
      serviceHighlight:
        'Küçükköy, Karadeniz Mahallesi, kentsel donusum projeleri, Baglarbasi',
      faq: [
        {
          question: "Gaziosmanpaşa'da tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Gaziosmanpaşa'da tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Kentsel donusum kapsaminda yeni binamiz için tabela çözümü ariyoruz, yardimci olabilir misiniz?",
          answer:
            "Gaziosmanpaşa'daki kentsel donusum projelerinde yeni binalarin cephe tabelaları, giris yonlendirme sistemleri, site tanitim totem tabelaları ve magaza tabelaları için komple çözüm sunuyoruz. Insaat asamasindan itibaren projelendirme yaparak zamaninda teslim sağlıyoruz.",
        },
        {
          question: "Gaziosmanpaşa'ya Kağıthane'den ne kadar surede ulasiyorsunuz?",
          answer:
            "Gaziosmanpaşa, Kağıthane'ye komsu ilçe oldugundan merkez ofisimizden 10-15 dakika içinde bölgeye ulasabiliyoruz. Bu yakinlik sayesinde ayni gun ücretsiz keşif ve hizli montaj imkani sunuyoruz. 0531 618 16 72 numarasindan bize ulasabilirsiniz.",
        },
      ],
    },
    coordinates: { lat: 41.0653, lng: 28.9170 },
  },
  {
    slug: 'eyupsultan-tabelaci',
    name: 'Eyüpsultan',
    title: 'Eyüpsultan Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Eyüpsultan'da profesyonel tabela imalatı ve montaj. Alibeyköy, Rami Kisla, Sanayi alanlari. \u260E 0531 618 16 72",
    h1: 'Eyüpsultan Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Eyupsultan, Alibeyköy sanayi bölgesi, Rami Kisla cevresi ve Gokturk'teki yeni yerlesim alanlariyla İstanbul'un en cesitli ticari yapiya sahip ilçelerinden biridir. Alibeyköy'deki imalathaneler, matbaacilar ve sanayi atolyeleri buyuk olcekli sanayi tabelasi ve cephe giydirme projeleri talep ederken, Gokturk'teki luks konut projelerindeki ticari alanlar modern magaza tabelaları ve kurumsal yonlendirme sistemleri gerektirmektedir.\n\nRami Kisla Caddesi uzerindeki mobilya ve tekstil showroom'lari, Topcular Caddesi'ndeki esnaf isletmeleri, Pierre Loti Tepesi cevresindeki turizm odakli kafeler ve Eyup Sultan Camii bölgesindeki hediyelik esya dukkanlari ilçenin tabela ihtiyacini artiran baslica alanlardandir. Defterdar'daki kentsel donusum projeleri de yeni isletmelerin acilmasiyla tabela talebini surekli beslemektedir. Silahtar Caddesi ve Bahariye aksindaki ticari isletmeler de bölgenin yogun ticari dokusunu tamamlamaktadir.\n\nA2 Reklam olarak Eyupsultan'daki işletmelere kutu harf tabela, ışıklı tabela, sanayi tabelasi, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Kağıthane'ye komsu olan ilçeye merkez ofisimizden dakikalar içinde ulasiyoruz. Bu yakinlik avantajimizla ayni gun ücretsiz keşif ve en hizli montaj suresini sunabiliyoruz.`,
      commercialAreas: [
        'Alibeyköy Sanayi Bölgesi',
        'Rami Kisla Cevresi',
        'Gokturk Yeni Yerlesim',
        'Topcular Caddesi',
        'Defterdar Kentsel Donusum',
        'Pierre Loti Bölgesi',
      ],
      keyStreets: [
        'Rami Kisla Caddesi',
        'Topcular Caddesi',
        'Eyup Sultan Caddesi',
        'Alibeyköy Caddesi',
      ],
      serviceHighlight:
        'Alibeyköy sanayi, Rami Kisla, Gokturk yeni yerlesim, Defterdar kentsel donusum',
      faq: [
        {
          question: "Eyüpsultan'da tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Eyüpsultan'da tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Alibeyköy'deki fabrikam için sanayi tabelasi ve cephe giydirme yaptırmak istiyorum, hizmetleriniz nelerdir?",
          answer:
            "Alibeyköy sanayi bölgesindeki fabrikalara dis cephe kutu harf tabela, totem tabela, fabrika giris tabelasi, yonlendirme levhalari ve arac giydirme hizmetleri sunuyoruz. Sanayi kosullarina uygun dayanikli malzemeler ve profesyonel montaj hizmeti sağlıyoruz.",
        },
        {
          question: "Gokturk bölgesindeki yeni magazam için tabela çözümü ariyorum, ne onerirsiniz?",
          answer:
            "Gokturk'teki modern konut ve ticari projelere uygun kurumsal tabela çözümleri sunuyoruz. Kutu harf cephe tabelasi, ışıklı tabela, cam folyo uygulamasi ve totem tabela seceneklerimiz mevcuttur. Bölgenin estetik yapisina uygun tasarımlar hazırlıyoruz. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
      ],
    },
    coordinates: { lat: 41.0485, lng: 28.9343 },
  },
  {
    slug: 'sariyer-tabelaci',
    name: 'Sarıyer',
    title: 'Sarıyer Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Sarıyer'de profesyonel tabela imalatı ve montaj. Maslak is kuleleri, İstinye, Tarabya. \u260E 0531 618 16 72",
    h1: 'Sarıyer Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Sariyer, Maslak is kuleleri, Istinye Park AVM, Maslak 1453 ve Tarabya sahilindeki luks isletmeleriyle İstanbul'un en prestijli ilçelerinden biridir. Buyukdere Caddesi'nin Maslak uzantisindaki finans ve teknoloji sirketleri, kurumsal plaza tabelaları ve yonlendirme sistemlerine surekli ihtiyac duymaktadir. Maslak 1453 karma kullanim projesindeki magazalar ve ofisler de modern tabela çözümleri talep etmektedir.\n\nIstinye Park AVM cevresi ve Emirgan sahilindeki butik restoranlar estetik ve dikkat cekici tabela çözümleri gerektirirken, Tarabya ve Yenikoy'deki sahil isletmeleri deniz kosullarina dayanikli malzemelerle uretilen ozel tabelalar istemektedir. Darussafaka Caddesi ve Buyukdere aksindaki ticari işletmeler, Bahcekoy ve Demircikoy bölgesindeki isletmeler de Sariyer'in tabela talebini besleyen diger onemli noktalardir. Rumeli Hisari cevresi ve Bebek-Sariyer sahil seridindeki butik dukkanlar da estetik tabela tasarımlarina ihtiyac duymaktadir.\n\nA2 Reklam olarak Sariyer bölgesindeki işletmelere kurumsal plaza tabelaları, magaza cephe tabelaları, yonlendirme sistemleri, kutu harf tabela, ışıklı tabela, cephe giydirme ve dijital baskı hizmetleri sunuyoruz. Kağıthane merkezimizden Buyukdere Caddesi uzerinden Maslak'a 10 dakikada, Istinye ve Tarabya'ya 20 dakikada ulasiyoruz. Luks magaza tabelalarindan is kulesi projelerine kadar genis bir yelpazede hizmet veriyoruz.`,
      commercialAreas: [
        'Maslak Is Kuleleri',
        'Maslak 1453',
        'Istinye Park AVM',
        'Tarabya Sahil',
        'Emirgan',
        'Yenikoy',
        'Darussafaka',
      ],
      keyStreets: [
        'Büyükdere Caddesi (Maslak)',
        'Darussafaka Caddesi',
        'Tarabya Bayiri Caddesi',
        'Istinye Caddesi',
      ],
      serviceHighlight:
        'Maslak is kuleleri, Maslak 1453, Istinye Park, Tarabya sahil, Emirgan',
      faq: [
        {
          question: "Sarıyer'de tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Sarıyer'de tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Maslak'taki is kulesindeki ofisimiz için kurumsal tabela çözümü ariyoruz, neler sunuyorsunuz?",
          answer:
            "Maslak bölgesindeki is kuleleri için kurumsal kimlige uygun plaza giris tabelaları, kat yonlendirme panolari, resepsiyon arkasi kutu harf uygulamalari ve dis cephe tabelaları uretiyoruz. Bina yonetimiyle koordineli çalışarak izin sürecini de yonetiyoruz. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
        {
          question: "Tarabya sahilindeki restoranim için deniz kosullarina dayanikli tabela yapabiliyor musunuz?",
          answer:
            "Evet, Tarabya ve Sariyer sahil seridindeki isletmeler için tuzlu su, ruzgar ve nem kosullarina dayanikli paslanmaz celik kutu harf tabelalar, aluminyum kompozit cephe giydirme ve UV dayanikli dijital baskı çözümleri sunuyoruz. Deniz kenarindaki isletmelere ozel uzun omurlu malzemeler kullaniyoruz.",
        },
      ],
    },
    coordinates: { lat: 41.1667, lng: 29.0500 },
  },
  {
    slug: 'pendik-tabelaci',
    name: 'Pendik',
    title: 'Pendik Tabelacı | A2 Reklam \u2014 Tabela İmalatı',
    metaDescription:
      "Pendik'te profesyonel tabela imalatı ve montaj. Sabiha Gokcen cevresi, Pendik OSB. \u260E 0531 618 16 72",
    h1: 'Pendik Tabelacı \u2014 Profesyonel Tabela Çözümleri',
    priority: 2,
    content: {
      intro: `Pendik, Sabiha Gokcen Havalimani cevresi, Pendik OSB, Kurtkoy ve Kaynarca bölgeleriyle İstanbul'un Anadolu Yakasi'ndaki en onemli sanayi ve ticaret merkezlerinden biridir. Havalimani cevresindeki oteller, rent-a-car firmalari, lojistik sirketleri ve kargo depolari kurumsal tabela çözümlerine surekli ihtiyac duymaktadir. Turkiye'nin en yogun havalimani bölgesi olarak burada gorunurluk hayati önem tasimaktadir.\n\nPendik OSB'deki yuzlerce fabrika ve atolye buyuk olcekli sanayi tabelasi, cephe giydirme ve totem tabela talep ederken, Kurtkoy'deki hizla buyuyen yeni konut projelerindeki ticari alanlar ve Kaynarca Caddesi uzerindeki magazalar modern ışıklı tabela ve kutu harf projeleri gerektirmektedir. Pendik sahilindeki kafeler ve restoranlar estetik tabela çözümlerine ilgi gostermektedir. Yenisehir Mahallesi'ndeki ticari isletmeler ve Ankara Caddesi uzerindeki dukkanlar da bölgenin tabela talebini canli tutan onemli noktalardir.\n\nA2 Reklam olarak Pendik'teki işletmelere sanayi tabelasi, kutu harf tabela, ışıklı tabela, totem tabela, cephe giydirme, arac giydirme ve dijital baskı hizmetleri sunuyoruz. Marmaray, E-5 ve TEM otoyolu baglantisiyla Kağıthane merkezimizden bölgeye duzenli hizmet veriyoruz. Havalimani otellerinden fabrika cephelerine, Kurtkoy'deki yeni magaza tabelalarindan Kaynarca'daki esnaf dukkanlarına kadar her olcekte projeyi deneyimli ekibimizle tamamliyoruz.`,
      commercialAreas: [
        'Sabiha Gokcen Havalimani Cevresi',
        'Pendik OSB',
        'Kurtkoy Ticaret Bölgesi',
        'Kaynarca Caddesi',
        'Pendik Sahil',
        'Yenisehir Mahallesi',
      ],
      keyStreets: [
        'Kaynarca Caddesi',
        'Ankara Caddesi',
        'Batı Caddesi',
        'Kurtkoy Yolu',
      ],
      serviceHighlight:
        'Sabiha Gokcen Havalimani cevresi, Pendik OSB, Kurtkoy, Kaynarca',
      faq: [
        {
          question: "Pendik'te tabela projesi nasil baslar?",
          answer:
            'Ücretsiz keşif için bizi aramaniz yeterli. Ekibimiz yerinize gelerek olcum alir, ihtiyac analizi yapar ve size en uygun tabela çözümunu teklif eder.',
        },
        {
          question: "Pendik'te tabela fiyatları ne kadar?",
          answer:
            'Fiyatlar tabela turune, boyutuna ve malzemeye gore degisir. Ücretsiz keşif sonrasi detayli fiyat teklifi sunuyoruz.',
        },
        {
          question: "Sabiha Gokcen Havalimani yakinindaki otelim için tabela çözümü ariyorum, ne sunuyorsunuz?",
          answer:
            "Havalimani cevresindeki oteller için kurumsal cephe tabelasi, ışıklı totem tabela, giris yonlendirme sistemleri, ic mekan tabela ve arac giydirme hizmetleri sunuyoruz. 7/24 acik tesisler için enerji verimli LED aydinlatmali tabela çözümleri oneriyoruz. 0531 618 16 72 numarasindan ücretsiz keşif randevusu alabilirsiniz.",
        },
        {
          question: "Pendik OSB'deki fabrikam için dis cephe ve yonlendirme tabelasi yaptırmak istiyorum, mumkun mu?",
          answer:
            "Pendik OSB'deki fabrikalara dis cephe kutu harf tabela, totem tabela, fabrika giris tabelasi, alan ici yonlendirme levhalari, guvenlik uyari tabelaları ve arac giydirme hizmetleri sunuyoruz. OSB yonetmeligi ve belediye izin süreclerinde musterilerimize rehberlik ediyoruz.",
        },
      ],
    },
    coordinates: { lat: 40.8750, lng: 29.2333 },
  },

  // ============================================================
  // PRIORITY 3 — Minimal content, 1 FAQ (19 districts)
  // ============================================================
  {
    slug: 'adalar-tabelaci',
    name: 'Adalar',
    title: 'Adalar Tabelacı | A2 Reklam',
    metaDescription:
      "Adalar'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Adalar Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Adalar, İstanbul'un Anadolu Yakasi'nda Marmara Denizi'ndeki dort buyuk adadan olusan essiz bir ilçedir. Buyukada, Heybeliada, Burgazada ve Kınalıada'da bulunan butik oteller, sahil kafeleri, restoranlar ve hediyelik esya dukkanları, deniz tasimacılığı ile ulasilan bu bolgede profesyonel tabela çözümlerine ihtiyac duymaktadir. Ozellikle yaz sezonunda yogunlasan turizm faaliyetleri, işletmelerin gorünurlugunu artirmak icin kaliteli tabela yatirimini zorunlu kilmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Adalar'a ozel lojistik planlama ile hizmet veriyoruz. Kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme projelerinizde deniz tasimacılığına uygun paketleme ve montaj ekibiyle adalardaki işletmenize profesyonel çözümler sunuyoruz. Ucretsiz kesif ve fiyat teklifi icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Büyükada Çarşı', 'Heybeliada İskele', 'Burgazada Merkez'],
      keyStreets: ['Büyükada Çankaya Caddesi', 'Heybeliada İskele Caddesi'],
      serviceHighlight: 'Adalara ozel lojistik planlama ile tabela imalat ve montaj',
      faq: [
        {
          question: "Adalar'a tabela montaji yapiyor musunuz?",
          answer:
            'Evet, ozel lojistik planlama ile Adalar\'daki işletmelere de tabela hizmeti veriyoruz. Deniz tasimacılığına uygun paketleme ve montaj ekibiyle Buyukada, Heybeliada ve diger adalara duzenli servis sağlıyoruz. Detaylar için bizi arayın.',
        },
        {
          question: "Adalar'daki butik oteller icin ne tur tabela yapiyorsunuz?",
          answer:
            'Adalardaki butik oteller icin kutu harf tabela, ışıklı tabela, yonlendirme tabelaları ve cephe giydirme hizmetleri sunuyoruz. Ada dokusuna uygun estetik tasarimlar ile otel girisleri ve bahce alanlari icin ozel çözümler uretiyoruz.',
        },
      ],
    },
    coordinates: { lat: 40.8761, lng: 29.0901 },
  },
  {
    slug: 'arnavutkoy-tabelaci',
    name: 'Arnavutköy',
    title: 'Arnavutköy Tabelacı | A2 Reklam',
    metaDescription:
      "Arnavutköy'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Arnavutköy Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Arnavutköy, İstanbul'un Avrupa Yakasi'nda 3. Havalimanı'na yakinligiyla son yillarda buyuk bir donusum yasayan ilçedir. Hadimkoy sanayi bolgesi, hizla yukselen yeni konut projeleri ve havalimanı cevresindeki ticari yatirimlar, bolgeye her gecen gun yeni işletmeler kazandirmaktadir. Fabrikalar, lojistik firmalari, insaat sirketleri, perakende magazalar ve yeni acilan restoran zincirleri profesyonel tabela çözümlerine artan bir talep gostermektedir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Arnavutköy'e duzenli hizmet veriyoruz. Hadimkoy sanayideki fabrikalara buyuk ebatli sanayi tabelasi, yeni acilan konut projelerinin yakinindaki ticari alanlara kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri sunuyoruz. Ucretsiz kesif ve fiyat teklifi icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Hadımköy Sanayi', 'İstanbul Havalimanı Çevresi', 'Arnavutköy Merkez'],
      keyStreets: ['Hadımköy Yolu', 'Arnavutköy Merkez Caddesi'],
      serviceHighlight: 'Hadimkoy sanayi ve yeni yerlesim alanlarina hizli tabela hizmeti',
      faq: [
        {
          question: "Arnavutköy'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Arnavutköy ve cevresine duzenli hizmet veriyoruz. Hadimkoy sanayi bolgesi, ilce merkezi ve havalimanı cevresindeki tum isletmelere ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Arnavutköy Hadimkoy'deki fabrikalar icin ne tur tabela yapiyorsunuz?",
          answer:
            'Hadimkoy sanayideki fabrika ve atolyeler icin buyuk ebatli kutu harf tabela, ışıklı cephe tabelasi, totem tabela ve sanayi yonlendirme tabelaları imal ediyoruz. Dayanikli malzemelerle uzun omurlu çözümler sunuyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.1853, lng: 28.7394 },
  },
  {
    slug: 'avcilar-tabelaci',
    name: 'Avcılar',
    title: 'Avcılar Tabelacı | A2 Reklam',
    metaDescription:
      "Avcılar'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Avcılar Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Avcılar, İstanbul'un Avrupa Yakasi'nda E-5 otoyolu uzerindeki yogun ticari hayati, universite kampusleri ve Ambarli Limani yakinligiyla onemli bir ilce konumundadir. E-5 uzerindeki magaza ve showroomlar, universite cevresindeki kafe, restoran ve ogrenci isletmeleri, Ambarli Limani bolgelerindeki lojistik ve ticaret firmalari profesyonel tabela çözümlerine surekli ihtiyac duymaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Avcılar'a duzenli hizmet sunuyoruz. E-5 cephesindeki isletmelere buyuk ebatli kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Universite cevresindeki kucuk isletmelere de uygun fiyatli ve modern magaza tabelasi ve dijital baski hizmetleri sağlıyoruz. Ucretsiz kesif ve fiyat teklifi icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['E-5 Üzeri Ticaret Alanı', 'Üniversite Çevresi', 'Ambarlı Limanı Bölgesi'],
      keyStreets: ['E-5 Avcılar Mevkii', 'Avcılar Merkez Caddesi'],
      serviceHighlight: 'E-5 cephesi ve universite cevresindeki isletmelere ozel tabela çözümleri',
      faq: [
        {
          question: "Avcılar'da tabela yaptirabilir miyim?",
          answer:
            'Evet, Avcılar ve cevresine duzenli hizmet veriyoruz. E-5 uzerindeki magazalar, universite cevresi ve Ambarli bolgesi dahil tum Avcılar\'a ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Avcılar E-5 uzerindeki dukkanimiz icin ne tur tabela onerirsiniz?",
          answer:
            'E-5 gibi yogun trafik akisina sahip caddelerde gorünurluk icin buyuk ebatli ışıklı kutu harf tabela ve totem tabela en etkili çözümlerdir. Cephe giydirme ile de magaza cephenizi tamamen markalaştırabiliriz.',
        },
      ],
    },
    coordinates: { lat: 40.9796, lng: 28.7218 },
  },
  {
    slug: 'bayrampasa-tabelaci',
    name: 'Bayrampaşa',
    title: 'Bayrampaşa Tabelacı | A2 Reklam',
    metaDescription:
      "Bayrampaşa'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Bayrampaşa Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Bayrampaşa, İstanbul'un Avrupa Yakasi'nda Cevizlibag ticaret bolgesi, Forum İstanbul AVM ve cevresindeki yogun ticari hayatiyla one cikan bir ilcedir. Tekstil atolyeleri, toptan ticaret magazalari, restoran ve kafeler ile kucuk sanayi isletmeleri bolgenin baslica tabela ihtiyaci duyan sektorleridir. Ozellikle E-5 otoyoluna yakin konumu sayesinde isletmelerin gorünurlugu buyuk onem tasimaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Bayrampaşa'ya kisa surede ulasim sağlıyoruz. Cevizlibag cevresindeki ticari isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme hizmetleri sunuyoruz. Tekstil atolyeleri icin sanayi tabelasi, AVM cevresindeki magazalar icin kurumsal tabela çözümleri uretiyoruz. Ucretsiz kesif ve fiyat teklifi icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Cevizlibağ Ticaret Bölgesi', 'Forum İstanbul AVM Çevresi', 'Yıldırım Mahallesi'],
      keyStreets: ['Cevizlibağ Caddesi', 'Abdi İpekçi Caddesi'],
      serviceHighlight: 'Cevizlibag ticaret bolgesi ve Forum İstanbul cevresine hizli tabela hizmeti',
      faq: [
        {
          question: "Bayrampaşa'da tabela yaptirabilir miyim?",
          answer:
            'Evet, Bayrampaşa ve cevresine duzenli hizmet veriyoruz. Cevizlibag, Forum İstanbul cevresi ve tum Bayrampaşa\'ya ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Bayrampaşa'daki tekstil atolyeleri icin tabela yapıyor musunuz?",
          answer:
            'Evet, Bayrampaşa\'daki tekstil atolyeleri ve imalathaneler icin sanayi tabelasi, kutu harf tabela, ışıklı cephe tabelasi ve yonlendirme tabelaları uretiyoruz. Dayanikli ve ekonomik çözümler sunuyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0394, lng: 28.9119 },
  },
  {
    slug: 'beykoz-tabelaci',
    name: 'Beykoz',
    title: 'Beykoz Tabelacı | A2 Reklam',
    metaDescription:
      "Beykoz'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Beykoz Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Beykoz, İstanbul'un Anadolu Yakasi'nda Bogaz kiyisindaki essiz konumuyla prestijli bir ilce konumundadir. Kavacik is merkezlerindeki ofis ve plazalar, Riva bolgesindeki turizm ve dogal yasam isletmeleri, Pasabahce sahilindeki kafe, restoran ve hediyelik esya dukkanları profesyonel tabela çözümlerine ihtiyac duymaktadir. Bolgenin dogal dokusuna uygun estetik tabela tasarimlari buyuk onem tasimaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Beykoz'a duzenli hizmet veriyoruz. Kavacik'taki kurumsal firmalar icin plaza tabelaları, Riva ve Pasabahce'deki isletmeler icin kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri sunuyoruz. Bolgenin mimarisine uygun ozel tasarim tabela projeleriyle Beykoz'daki isletmelerin gorünurlugunu artiriyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Kavacık İş Merkezleri', 'Riva', 'Paşabahçe Sahil'],
      keyStreets: ['Kavacık Kavşağı', 'Beykoz Caddesi', 'Paşabahçe Caddesi'],
      serviceHighlight: 'Kavacik is merkezleri ve Bogaz sahilindeki isletmelere kurumsal tabela çözümleri',
      faq: [
        {
          question: "Beykoz'da tabela yaptirabilir miyim?",
          answer:
            'Evet, Beykoz ve cevresine duzenli hizmet veriyoruz. Kavacik, Riva, Pasabahce ve Beykoz merkez dahil tum bolgeye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Beykoz Kavacik'taki is merkezleri icin ne tur tabela yapiyorsunuz?",
          answer:
            'Kavacik\'taki is merkezleri ve plazalar icin kurumsal kutu harf tabela, ışıklı giris tabelaları, yonlendirme sistemleri ve bina cephesi giydirme projeleri uretiyoruz. Profesyonel kurumsal kimlik çözümleri sunuyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.1322, lng: 29.1000 },
  },
  {
    slug: 'buyukcekmece-tabelaci',
    name: 'Büyükçekmece',
    title: 'Büyükçekmece Tabelacı | A2 Reklam',
    metaDescription:
      "Büyükçekmece'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Büyükçekmece Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Büyükçekmece, İstanbul'un Avrupa Yakasi'nda E-5 otoyolu uzerindeki ticari alanlari, Kumburgaz sahil seridindeki turizm isletmeleri ve hizla buyuyen yeni yerlesim alanlariyla dikkat ceken bir ilcedir. Sahildeki restoran, otel ve kafelerin yani sira E-5 uzerindeki magazalar, showroomlar ve ticari isletmeler profesyonel tabela çözümlerine ihtiyac duymaktadir. Yeni konut projelerinin cevresinde acilan dukkanlar da bolgenin tabela talebini artirmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Büyükçekmece'ye duzenli hizmet sunuyoruz. E-5 cephesindeki isletmelere buyuk ebatli kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Kumburgaz sahilindeki turizm isletmelerine de mevsimlik ve kalici tabela hizmetleri sağlıyoruz. Ucretsiz kesif ve fiyat teklifi icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['E-5 Üzeri Ticaret Alanı', 'Kumburgaz Sahil', 'Büyükçekmece Merkez'],
      keyStreets: ['E-5 Büyükçekmece Mevkii', 'Kumburgaz Sahil Yolu'],
      serviceHighlight: 'E-5 aksı ve Kumburgaz sahilindeki isletmelere ozel tabela çözümleri',
      faq: [
        {
          question: "Büyükçekmece'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Büyükçekmece ve cevresine duzenli hizmet veriyoruz. E-5 uzerindeki magazalar, Kumburgaz sahili ve yeni yerlesim alanlari dahil tum bolgeye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Büyükçekmece sahilindeki restoranlar icin ne tur tabela onerirsiniz?",
          answer:
            'Sahil seridindeki restoran ve kafeler icin ışıklı kutu harf tabela, dis mekan totem tabela ve cephe giydirme en etkili çözümlerdir. Deniz havasina dayanikli malzemeler kullanarak uzun omurlu tabelalar uretiyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0239, lng: 28.5850 },
  },
  {
    slug: 'catalca-tabelaci',
    name: 'Çatalca',
    title: 'Çatalca Tabelacı | A2 Reklam',
    metaDescription:
      "Çatalca'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Çatalca Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Çatalca, İstanbul'un Avrupa Yakasi'nin en batisinda yer alan, tarim ve sanayi faaliyetlerinin bir arada yurutuldugu genis bir ilcedir. Çatalca Merkez'deki esnaf ve ticari isletmeler, Karacakoy sanayi bolgesindeki fabrika ve atolyeler ile bolgedeki tarim isletmeleri profesyonel tabela çözümlerine ihtiyac duymaktadir. Ilcenin kirsal karakterine ragmen sanayi alanlari onemli bir tabela potansiyeli tasimaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Çatalca'ya ozel planlama ile hizmet veriyoruz. Karacakoy sanayideki fabrikalara buyuk ebatli sanayi tabelasi, ilce merkezindeki esnafa kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri sunuyoruz. Tarim isletmeleri icin de dis mekan dayanikli tabela ve yonlendirme tabelaları uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Çatalca Merkez', 'Karacaköy Sanayi', 'Çatalca Çarşı'],
      keyStreets: ['Çatalca Merkez Caddesi', 'Karacaköy Yolu'],
      serviceHighlight: 'Çatalca Merkez ve Karacakoy sanayi bolgesine ozel tabela çözümleri',
      faq: [
        {
          question: "Çatalca'ya tabela montaji yapiyor musunuz?",
          answer:
            'Evet, Çatalca ve cevresine ozel planlama ile hizmet veriyoruz. Karacakoy sanayi, ilce merkezi ve cevre koylere ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Çatalca'daki sanayi isletmeleri icin hangi tabela turlerini yapiyorsunuz?",
          answer:
            'Çatalca\'daki fabrika ve sanayi tesisleri icin buyuk ebatli kutu harf tabela, ışıklı cephe tabelasi, totem tabela ve sanayi yonlendirme levhalari uretiyoruz. Dis mekan kosullarına dayanikli malzemeler kullaniyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.1437, lng: 28.4603 },
  },
  {
    slug: 'cekmekoy-tabelaci',
    name: 'Çekmeköy',
    title: 'Çekmeköy Tabelacı | A2 Reklam',
    metaDescription:
      "Çekmeköy'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Çekmeköy Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Çekmeköy, İstanbul'un Anadolu Yakasi'nda hizla buyuyen konut projeleri ve gelişen ticaret alanlariyla dikkat ceken bir ilcedir. Alemdag aksindaki magazalar, kafe ve restoranlar, yeni yerlesim bolgelerinin cevresinde acilan ticari isletmeler ve Omerli Baraji cevresindeki dogal yasam isletmeleri profesyonel tabela çözümlerine artan bir talep gostermektedir. Bolgenin genclesen nufusu modern ve estetik tabela tasarimlarini zorunlu kilmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Çekmeköy'e duzenli hizmet sunuyoruz. Alemdag cevresindeki ticari isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Yeni konut projeleri cevresinde acilan dukkan ve magazalar icin de uygun fiyatli tabela secenekleri sağlıyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Alemdağ Aksı', 'Çekmeköy Merkez', 'Ömerli Çevresi'],
      keyStreets: ['Alemdağ Caddesi', 'Çekmeköy Merkez Yolu'],
      serviceHighlight: 'Alemdag aksi ve yeni yerlesim alanlarina modern tabela çözümleri',
      faq: [
        {
          question: "Çekmeköy'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Çekmeköy ve cevresine duzenli hizmet veriyoruz. Alemdag, Omerli cevresi ve tum Çekmeköy\'e ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Çekmeköy'deki yeni acilan dukkanlar icin hangi tabela turunu onerirsiniz?",
          answer:
            'Yeni acilan dukkanlar icin kutu harf tabela ve ışıklı tabela en etkili çözümlerdir. Magaza cephesinin boyutuna gore ozel tasarim yapıyor, kurumsal kimliginize uygun tabela uretiyoruz. Cephe giydirme ile tam marka gorünumu sağlıyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0333, lng: 29.1833 },
  },
  {
    slug: 'esenler-tabelaci',
    name: 'Esenler',
    title: 'Esenler Tabelacı | A2 Reklam',
    metaDescription:
      "Esenler'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Esenler Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Esenler, İstanbul'un Avrupa Yakasi'nda Buyuk İstanbul Otogar'ina ev sahipliği yapan, yogun ticari faaliyetlerin yasandigi bir ilcedir. Otogar cevresindeki oteller, lokantalar ve ticari isletmeler, Menderes Caddesi uzerindeki magazalar ve tekstil imalat atolyeleri profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Bolgenin yuksek yaya ve arac trafigi, isletmelerin gorünurlugunu artirmak icin dikkat cekici tabela yatirimini zorunlu kilmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Esenler'e kisa surede ulasim sağlıyoruz. Otogar cevresindeki isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme hizmetleri sunuyoruz. Menderes Caddesi uzerindeki magazalara da kurumsal tabela ve dijital baski çözümleri uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Otogar Çevresi', 'Menderes Caddesi', 'Esenler Merkez'],
      keyStreets: ['Menderes Caddesi', 'Otogar Bağlantı Yolu'],
      serviceHighlight: 'Otogar cevresi ve Menderes Caddesi isletmelerine hizli tabela hizmeti',
      faq: [
        {
          question: "Esenler'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Esenler ve cevresine duzenli hizmet veriyoruz. Otogar cevresi, Menderes Caddesi ve tum Esenler\'e ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Esenler Otogar cevresindeki otelimiz icin ne tur tabela onerirsiniz?",
          answer:
            'Otogar cevresindeki oteller icin gece ve gunduz gorünur ışıklı kutu harf tabela, giris totem tabelasi ve bina cephesi giydirme en etkili çözümlerdir. Yuksek yaya trafiginde dikkat cekici tasarimlar uretiyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0436, lng: 28.8750 },
  },
  {
    slug: 'gungoren-tabelaci',
    name: 'Güngören',
    title: 'Güngören Tabelacı | A2 Reklam',
    metaDescription:
      "Güngören'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Güngören Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Güngören, İstanbul'un Avrupa Yakasi'nda Merter tekstil merkezine yakinligi ve kucuk sanayi isletmeleriyle yogun ticari faaliyetlerin yasandigi bir ilcedir. Merter'deki tekstil showroomlari, Gunestepe bolgesindeki imalat atolyeleri ve perakende magazalar, kucuk sanayi sitelerindeki imalat ve ticaret isletmeleri profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Bolgenin yogun is trafigi, isletmelerin tabela ile gorünurluk saglamasini zorunlu kilmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Güngören'e kisa surede ulasim sağlıyoruz. Merter tekstil cevresindeki showroomlara kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme hizmetleri sunuyoruz. Gunestepe ve kucuk sanayi bolgesindeki imalathanelere de dayanikli sanayi tabelasi çözümleri uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Merter Tekstil', 'Güneştepe', 'Güngören Küçük Sanayi'],
      keyStreets: ['Merter Caddesi', 'Güneştepe Yolu'],
      serviceHighlight: 'Merter tekstil cevresi ve kucuk sanayi bolgesine ozel tabela çözümleri',
      faq: [
        {
          question: "Güngören'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Güngören ve cevresine duzenli hizmet veriyoruz. Merter, Gunestepe ve tum Güngören\'e ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Güngören Merter'deki tekstil showroomumuz icin tabela yapıyor musunuz?",
          answer:
            'Evet, Merter\'deki tekstil showroom ve magazalar icin kutu harf tabela, ışıklı cephe tabelasi ve cam giydirme çözümleri uretiyoruz. Kurumsal kimliginize uygun, dikkat cekici tabela tasarimlari yapiyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0200, lng: 28.8833 },
  },
  {
    slug: 'kartal-tabelaci',
    name: 'Kartal',
    title: 'Kartal Tabelacı | A2 Reklam',
    metaDescription:
      "Kartal'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Kartal Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Kartal, İstanbul'un Anadolu Yakasi'nda E-5 otoyolu uzerindeki ticari alanlari, Kartal sahil seridi ve Kordonboyu'ndaki isletmeleriyle dinamik bir ilce konumundadir. E-5 cephesindeki magazalar ve showroomlar, Kordonboyu'ndaki restoran ve kafeler, Soganlık sanayi bolgesindeki imalat isletmeleri profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Kentsel donusum projeleriyle birlikte bolgeye yeni ticari alanlar da eklenmektedir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Kartal'a duzenli hizmet sunuyoruz. E-5 uzerindeki isletmelere buyuk ebatli kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Kordonboyu sahilindeki isletmelere estetik tabela tasarimlari, Soganlık sanayideki firmalara da dayanikli sanayi tabelasi hizmetleri sağlıyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['E-5 Üzeri Kartal', 'Kartal Sahil / Kordonboyu', 'Soğanlık Sanayi'],
      keyStreets: ['E-5 Kartal Mevkii', 'Kordonboyu Caddesi', 'Soğanlık Yolu'],
      serviceHighlight: 'E-5 cephesi, Kordonboyu sahil ve Soganlık sanayi bolgesine tabela hizmeti',
      faq: [
        {
          question: "Kartal'da tabela yaptirabilir miyim?",
          answer:
            'Evet, Kartal ve cevresine duzenli hizmet veriyoruz. E-5 uzerindeki magazalar, Kordonboyu sahili ve Soganlık sanayi dahil tum Kartal\'a ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Kartal Soganlık sanayideki fabrikamiz icin ne tur tabela yapiyorsunuz?",
          answer:
            'Soganlık sanayi bolgesindeki fabrika ve isletmeler icin buyuk ebatli kutu harf tabela, ışıklı cephe tabelasi, totem tabela ve sanayi yonlendirme levhalari uretiyoruz. Dis mekan kosullarına dayanikli, uzun omurlu malzemeler kullaniyoruz.',
        },
      ],
    },
    coordinates: { lat: 40.8898, lng: 29.1856 },
  },
  {
    slug: 'kucukcekmece-tabelaci',
    name: 'Küçükçekmece',
    title: 'Küçükçekmece Tabelacı | A2 Reklam',
    metaDescription:
      "Küçükçekmece'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Küçükçekmece Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Küçükçekmece, İstanbul'un Avrupa Yakasi'nda E-5 otoyolu aksindaki yogun ticari hayati, Halkali, Atakent ve Sefakoy gibi genis yerlesim alanlariyla onemli bir ilce konumundadir. E-5 cephesindeki buyuk magazalar ve showroomlar, Halkali'daki ticaret merkezleri, Atakent'teki perakende isletmeleri ve Sefakoy cevresindeki dukkanlar profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Yogun nufusu ve genis ticari potansiyeliyle bolge, tabela sektorunde onemli bir pazardir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Küçükçekmece'ye duzenli hizmet sunuyoruz. E-5 aksindaki isletmelere buyuk ebatli kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Halkali, Atakent ve Sefakoy'deki magazalara da kurumsal tabela ve dijital baski hizmetleri sağlıyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['E-5 Aksı', 'Halkalı', 'Atakent', 'Sefaköy'],
      keyStreets: ['E-5 Küçükçekmece Mevkii', 'Halkalı Caddesi', 'Sefaköy Yolu'],
      serviceHighlight: 'E-5 aksi, Halkali, Atakent ve Sefakoy isletmelerine ozel tabela çözümleri',
      faq: [
        {
          question: "Küçükçekmece'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Küçükçekmece ve cevresine duzenli hizmet veriyoruz. E-5 aksi, Halkali, Atakent, Sefakoy dahil tum ilceye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Küçükçekmece Halkali'daki magazamiz icin ne tur tabela onerirsiniz?",
          answer:
            'Halkali gibi yogun yaya ve arac trafigine sahip bolgelerde kutu harf tabela ve ışıklı tabela en etkili çözümlerdir. Magaza cephenize uygun totem tabela ve cephe giydirme ile gorünurlugunuzu en ust duzeye cikarabilirsiniz.',
        },
      ],
    },
    coordinates: { lat: 41.0000, lng: 28.7833 },
  },
  {
    slug: 'sancaktepe-tabelaci',
    name: 'Sancaktepe',
    title: 'Sancaktepe Tabelacı | A2 Reklam',
    metaDescription:
      "Sancaktepe'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Sancaktepe Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Sancaktepe, İstanbul'un Anadolu Yakasi'nda hizla buyuyen yeni yerlesim alanlari ve gelişen ticaret merkezleriyle dikkat ceken bir ilcedir. Samandira bolgesindeki sanayi isletmeleri, Sarigazi'deki ticari magazalar ve carsı, yeni konut projelerinin cevresinde acilan dukkanlar profesyonel tabela çözümlerine artan bir talep gostermektedir. Bolgenin hizli kentlesme sureci, her gun yeni acilan isletmelerin tabela ihtiyacini artirmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Sancaktepe'ye duzenli hizmet sunuyoruz. Samandira'daki sanayi isletmelerine dayanikli sanayi tabelasi, Sarigazi ticaret bolgesine kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Yeni yerlesim alanlarindaki isletmelere de uygun fiyatli tabela secenekleri sağlıyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Samandıra Sanayi', 'Sarıgazi Ticaret', 'Sancaktepe Merkez'],
      keyStreets: ['Sarıgazi Caddesi', 'Samandıra Yolu'],
      serviceHighlight: 'Samandira sanayi ve Sarigazi ticaret bolgesine ozel tabela çözümleri',
      faq: [
        {
          question: "Sancaktepe'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Sancaktepe ve cevresine duzenli hizmet veriyoruz. Samandira, Sarigazi ve tum Sancaktepe\'ye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Sancaktepe'deki yeni acilan magazamiz icin tabela suresi ne kadar?",
          answer:
            'Yeni acilan magazalar icin genellikle 5-10 is gunu icerisinde tasarim, uretim ve montaj surecini tamamliyoruz. Acil projelerde daha kisa surede teslimat mumkundur. Kutu harf tabela, ışıklı tabela ve cephe giydirme hizmetleri sunuyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0000, lng: 29.2333 },
  },
  {
    slug: 'silivri-tabelaci',
    name: 'Silivri',
    title: 'Silivri Tabelacı | A2 Reklam',
    metaDescription:
      "Silivri'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Silivri Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Silivri, İstanbul'un Avrupa Yakasi'nin en batisinda konumlanan, sahil turizmi, tarim isletmeleri ve sanayi alanlariyla cok yonlu bir ilcedir. Silivri Merkez'deki esnaf ve ticari isletmeler, sahil seridindeki restoran, otel ve turizm tesisleri, Selimpasa sanayi bolgesindeki fabrika ve atolyeler profesyonel tabela çözümlerine ihtiyac duymaktadir. Ozellikle yaz sezonunda artan turizm faaliyetleri, sahil isletmelerinin tabela talebini yukselten onemli bir faktor olmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Silivri'ye ozel planlama ile hizmet veriyoruz. Ilce merkezindeki esnafa kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme, sahildeki turizm isletmelerine mevsimlik ve kalici tabela çözümleri, Selimpasa sanayideki firmalara dayanikli sanayi tabelasi uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Silivri Merkez', 'Silivri Sahil Seridi', 'Selimpaşa Sanayi'],
      keyStreets: ['Silivri Merkez Caddesi', 'Sahil Yolu', 'Selimpaşa Sanayi Yolu'],
      serviceHighlight: 'Silivri Merkez, sahil turizm ve Selimpasa sanayi bolgesine tabela hizmeti',
      faq: [
        {
          question: "Silivri'ye tabela montaji yapiyor musunuz?",
          answer:
            'Evet, Silivri ve cevresine ozel planlama ile hizmet veriyoruz. Ilce merkezi, sahil seridi ve Selimpasa sanayi bolgesi dahil tum Silivri\'ye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Silivri sahilindeki restoranımız icin dis mekan tabelasi yapıyor musunuz?",
          answer:
            'Evet, Silivri sahilindeki restoran ve kafeler icin deniz havasina dayanikli ışıklı kutu harf tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Tuzlu havaya karsi ozel kaplamali malzemeler kullaniyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0733, lng: 28.2467 },
  },
  {
    slug: 'sultanbeyli-tabelaci',
    name: 'Sultanbeyli',
    title: 'Sultanbeyli Tabelacı | A2 Reklam',
    metaDescription:
      "Sultanbeyli'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Sultanbeyli Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Sultanbeyli, İstanbul'un Anadolu Yakasi'nda yogun nufusu ve hareketli ticari hayatiyla dinamik bir ilce konumundadir. Fatih Caddesi uzerindeki ticari isletmeler, yeni acilan dukkanlar ve perakende magazalar, bolgedeki restoran, kafe ve hizmet sektoru isletmeleri profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Kentsel donusum sureciyle birlikte yenilenen caddelerde modern tabela tasarimlari buyuk onem kazanmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Sultanbeyli'ye duzenli hizmet sunuyoruz. Fatih Caddesi ve cevresindeki isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Yeni acilan dukkanlara uygun fiyatli magaza tabelasi, mevcut isletmelere tabela yenileme ve bakim hizmetleri sağlıyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Fatih Caddesi Ticaret', 'Sultanbeyli Merkez', 'Sultanbeyli Çarşı'],
      keyStreets: ['Fatih Caddesi', 'Sultanbeyli Merkez Caddesi'],
      serviceHighlight: 'Fatih Caddesi ticareti ve yeni acilan dukkanlara uygun fiyatli tabela çözümleri',
      faq: [
        {
          question: "Sultanbeyli'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Sultanbeyli ve cevresine duzenli hizmet veriyoruz. Fatih Caddesi ve tum Sultanbeyli\'ye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Sultanbeyli'de yeni actigimiz dukkan icin uygun fiyatli tabela var mi?",
          answer:
            'Evet, yeni acilan dukkanlar icin butceye uygun kutu harf tabela, ışıklı tabela ve magaza tabelasi secenekleri sunuyoruz. Her butceye uygun çözümler uretiyoruz. Ucretsiz kesif ve fiyat teklifi icin bizi arayin.',
        },
      ],
    },
    coordinates: { lat: 40.9592, lng: 29.2631 },
  },
  {
    slug: 'sultangazi-tabelaci',
    name: 'Sultangazi',
    title: 'Sultangazi Tabelacı | A2 Reklam',
    metaDescription:
      "Sultangazi'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Sultangazi Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Sultangazi, İstanbul'un Avrupa Yakasi'nda yogun nufusu ve hareketli perakende ticaretiyle dinamik bir ilce konumundadir. Cebeci bolgesindeki ticari alanlar, Esentepe'deki magazalar ve esnaf, kentsel donusum projeleriyle yenilenen caddelerdeki yeni dukkanlar profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Bolgenin hizli nufus artisi ve kentsel donusum sureci, isletmelerin gorünurlugunu artirmak icin modern tabela yatirimini zorunlu kilmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Sultangazi'ye kisa surede ulasim sağlıyoruz. Cebeci ve Esentepe bolgelerindeki isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri sunuyoruz. Kentsel donusum alanlarina tasinan yeni isletmelere de uygun fiyatli tabela secenekleri uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Cebeci', 'Esentepe', 'Sultangazi Merkez'],
      keyStreets: ['Cebeci Caddesi', 'Esentepe Yolu'],
      serviceHighlight: 'Cebeci, Esentepe ve kentsel donusum bolgelerine hizli tabela hizmeti',
      faq: [
        {
          question: "Sultangazi'de tabela yaptirabilir miyim?",
          answer:
            'Evet, Sultangazi ve cevresine duzenli hizmet veriyoruz. Cebeci, Esentepe ve tum Sultangazi\'ye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Sultangazi'deki kentsel donusum bolgelerinde tabela hizmeti veriyor musunuz?",
          answer:
            'Evet, kentsel donusum projeleriyle yenilenen cadde ve sokaklardaki yeni isletmelere kutu harf tabela, ışıklı tabela ve cephe giydirme hizmetleri sunuyoruz. Yeni binalara uygun modern tabela tasarimlari uretiyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.1042, lng: 28.8667 },
  },
  {
    slug: 'sile-tabelaci',
    name: 'Şile',
    title: 'Sile Tabelacı | A2 Reklam',
    metaDescription:
      "Sile'de tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Sile Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Şile, İstanbul'un Anadolu Yakasi'nda Karadeniz kiyisindaki essiz sahil seridi, butik otelleri ve dogal guzelliklerle dolu bir ilcedir. Şile Merkez'deki esnaf ve ticari isletmeler, sahildeki restoran, kafe ve butik oteller, yaz sezonunda yogunlasan turizm isletmeleri profesyonel tabela çözümlerine ihtiyac duymaktadir. Bolgenin dogal dokusuna uygun, estetik ve cevre dostu tabela tasarimlari buyuk onem tasimaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Şile'ye ozel planlama ile hizmet veriyoruz. Şile Merkez'deki isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri sunuyoruz. Sahildeki butik otel ve restoranlara dis mekan dayanikli, Karadeniz iklimine uygun malzemelerle tabela uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Şile Merkez', 'Şile Sahil Seridi', 'Ağva'],
      keyStreets: ['Şile Merkez Caddesi', 'Sahil Yolu'],
      serviceHighlight: 'Şile Merkez ve sahildeki turizm isletmelerine ozel tabela çözümleri',
      faq: [
        {
          question: "Şile'ye tabela montaji yapiyor musunuz?",
          answer:
            'Evet, Şile ve cevresine ozel planlama ile hizmet veriyoruz. Ilce merkezi, sahil seridi ve Agva dahil tum bolgeye ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Şile'deki butik otelimiz icin ne tur tabela onerirsiniz?",
          answer:
            'Şile\'deki butik oteller icin dogal dokuya uygun kutu harf tabela, ışıklı giris tabelasi ve yonlendirme tabelaları uretiyoruz. Karadeniz iklimine dayanikli malzemeler kullanarak uzun omurlu ve estetik çözümler sunuyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.1750, lng: 29.6136 },
  },
  {
    slug: 'tuzla-tabelaci',
    name: 'Tuzla',
    title: 'Tuzla Tabelacı | A2 Reklam',
    metaDescription:
      "Tuzla'da tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Tuzla Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Tuzla, İstanbul'un Anadolu Yakasi'nda Tuzla Organize Sanayi Bolgesi, Aydinli sanayi alanlari, tersaneler ve gemi sanayisiyle Turkiye'nin en onemli sanayi merkezlerinden biridir. OSB'deki fabrikalar, Aydinli'daki imalat atolyeleri, tersane bolgesindeki gemi insaat firmalari ve lojistik isletmeleri profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Bolgenin agir sanayi karakteri, dis mekan kosullarına dayanikli ve buyuk ebatli tabela çözümlerini gerektirmektedir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Tuzla'ya duzenli hizmet sunuyoruz. Tuzla OSB ve Aydinli sanayideki fabrikalara buyuk ebatli kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri uretiyoruz. Tersane bolgesindeki isletmelere de dis mekan dayanikli sanayi tabelasi ve yonlendirme sistemleri sağlıyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Tuzla OSB', 'Aydınlı Sanayi', 'Tersaneler Bölgesi'],
      keyStreets: ['Tuzla OSB Yolu', 'Aydınlı Sanayi Caddesi', 'Tersaneler Caddesi'],
      serviceHighlight: 'Tuzla OSB, Aydinli sanayi ve tersane bolgesine ozel sanayi tabela çözümleri',
      faq: [
        {
          question: "Tuzla'da tabela yaptirabilir miyim?",
          answer:
            'Evet, Tuzla ve cevresine duzenli hizmet veriyoruz. Tuzla OSB, Aydinli sanayi ve tersaneler bolgesi dahil tum Tuzla\'ya ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Tuzla OSB'deki fabrikamiz icin ne tur tabela yapiyorsunuz?",
          answer:
            'Tuzla OSB\'deki fabrika ve sanayi tesisleri icin buyuk ebatli kutu harf tabela, ışıklı cephe tabelasi, totem tabela, sanayi yonlendirme levhalari ve bina giydirme projeleri uretiyoruz. Agir sanayi kosullarina dayanikli ozel malzemeler kullaniyoruz.',
        },
      ],
    },
    coordinates: { lat: 40.8167, lng: 29.3000 },
  },
  {
    slug: 'zeytinburnu-tabelaci',
    name: 'Zeytinburnu',
    title: 'Zeytinburnu Tabelacı | A2 Reklam',
    metaDescription:
      "Zeytinburnu'nda tabela imalatı ve montaj. Profesyonel tabela çözümleri. \u260E 0531 618 16 72",
    h1: 'Zeytinburnu Tabelacı \u2014 Tabela İmalatı ve Montaj',
    priority: 3,
    content: {
      intro: `Zeytinburnu, İstanbul'un Avrupa Yakasi'nda Merter-Topkapi aksindaki yogun ticaret hayati, tekstil ve deri sektorundeki isletmeleriyle onemli bir ilce konumundadir. E-5 cephesindeki buyuk magazalar ve showroomlar, Merter'e yakin tekstil atolyeleri, deri isletmeleri ve toptan ticaret merkezleri profesyonel tabela çözümlerine surekli ihtiyac duymaktadir. Bolgenin merkezi konumu ve yogun trafigi, isletmelerin dikkat cekici tabelalarla gorünurluk saglamasini zorunlu kilmaktadir.\n\nA2 Reklam olarak Kağıthane'deki merkez ofisimizden Zeytinburnu'na kisa surede ulasim sağlıyoruz. Merter-Topkapi aksindaki isletmelere kutu harf tabela, ışıklı tabela, totem tabela ve cephe giydirme çözümleri sunuyoruz. E-5 cephesindeki magazalara buyuk ebatli tabela, tekstil ve deri sektorundeki firmalara kurumsal tabela çözümleri uretiyoruz. Ucretsiz kesif icin 0531 618 16 72 numarasından bize ulasabilirsiniz.`,
      commercialAreas: ['Merter-Topkapı Aksı', 'E-5 Cephesi', 'Zeytinburnu Tekstil / Deri Bölgesi'],
      keyStreets: ['E-5 Zeytinburnu Mevkii', 'Merter-Topkapı Yolu'],
      serviceHighlight: 'Merter-Topkapi aksi ve E-5 cephesindeki isletmelere ozel tabela çözümleri',
      faq: [
        {
          question: "Zeytinburnu'nda tabela yaptirabilir miyim?",
          answer:
            'Evet, Zeytinburnu ve cevresine duzenli hizmet veriyoruz. Merter-Topkapi aksi, E-5 cephesi ve tum Zeytinburnu\'na ücretsiz keşif yapiyoruz.',
        },
        {
          question: "Zeytinburnu'ndaki tekstil magazamiz icin ne tur tabela onerirsiniz?",
          answer:
            'Tekstil magazalari icin kurumsal kutu harf tabela, ışıklı cephe tabelasi ve cam giydirme en etkili çözümlerdir. E-5 cephesindeki magazalar icin uzak mesafeden okunabilir buyuk ebatli tabela tasarimlari da uretiyoruz.',
        },
      ],
    },
    coordinates: { lat: 41.0039, lng: 28.9017 },
  },
];
