export interface MaterialRow {
  name: string;
  durability: string;
  lighting: string;
  priceRange: string;
}

export interface Sector {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  icon: string;
  content: {
    intro: string;
    benefits: string[];
    popularTypes: Array<{ name: string; description: string }>;
    faq: Array<{ question: string; answer: string }>;
  };
  relatedServices: string[];
  materialTable?: MaterialRow[];
}

export const sectors: Sector[] = [
  {
    slug: 'berber-tabelasi',
    name: 'Berber Tabelasi',
    title: 'Berber Tabelasi | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul berber tabelası imalatı: döner ışıklı, LED ve kutu harf berber tabelaları. A2 Reklam profesyonel çözümler. ✆ 0531 618 16 72',
    h1: 'Berber Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '💈',
    content: {
      intro: `Berber dükkânınızın sokaktan fark edilmesi, yeni müşteri kazanmanın ilk adımıdır. Klasik döner ışıklı berber tabelalarından modern LED kutu harf uygulamalarına kadar geniş bir yelpazede hizmet sunan A2 Reklam, Kağıthane merkezli atölyesinde İstanbul’un dört bir yanındaki berber salonlarına özel tabela çözümleri üretmektedir. Fatih, Beyoğlu, Beşiktaş ve Kadıköy gibi yoğun yürüyüş trafiğinin olduğu ilçelerde berber tabelası seçimi işletmenin başarısında doğrudan belirleyici rol oynar. Döner ışıklı berber tabelası, dünya genelinde berber dükkânlarının simgesi haline gelmiş olup kırmızı-beyaz-mavi renkli dönen silindir yapısıyla uzaktan dikkat çeker. A2 Reklam olarak bu klasik tabelanın yanı sıra paslanmaz çelik kutu harf, neon LED yazı ve pleksi ışıklı pano gibi modern alternatifleri de üretiyoruz. Kullandığımız malzemeler UV dayanımlı ve dış mekan koşullarına uygun seçilmekte, LED modüller ise enerji tasarrufu sağlayarak uzun ömürlü aydınlatma sunmaktadır. İstanbul Büyükşehir Belediyesi tabela yönetmeliğine uygun ölçü ve tasarım ile belediye izin süreçlerinde de müşterilerimize destek veriyoruz. Profesyonel montaj ekibimiz tabela kurulumunu hızlı ve güvenli şekilde gerçekleştirirken, satış sonrası bakım ve teknik servis hizmetimizle de yanınızdayız. Berber tabelası yaptırırken dikkat edilmesi gereken en önemli unsurlar; tabelanın sokak seviyesinden görünürlüğü, gece aydınlatma performansı ve belediye yönetmeliğine uygunluğudur. Doğru malzeme seçimi tabelanızın ömrünü uzatırken bakım maliyetlerini de minimuma indirir. A2 Reklam olarak her bütçeye uygun berber tabelası çözümleri sunuyor, ücretsiz keşif hizmetimizle ihtiyacınızı yerinde değerlendiriyoruz.`,
      benefits: [
        'Klasik döner ışıklı berber tabelası ile sokaktan anında fark edilme',
        'LED aydınlatma ile düşük enerji tüketimi ve uzun ömür',
        'UV dayanımlı malzeme ile renk solmasına karşı koruma',
        'Belediye yönetmeliğine uygun ölçü ve tasarım',
        'Ücretsiz keşif ve montaj hizmeti',
      ],
      popularTypes: [
        {
          name: 'Döner Işıklı Berber Tabelası',
          description:
            'Geleneksel kırmızı-beyaz-mavi dönen silindir yapısıyla berber dükkânlarının vazgeçilmez simgesi. Uzaktan görünürlük sağlar.',
        },
        {
          name: 'Kutu Harf Berber Tabelası',
          description:
            'Paslanmaz çelik veya galvaniz gövde üzerine LED aydınlatmalı üç boyutlu harfler. Modern ve şık görünüm sunar.',
        },
        {
          name: 'Neon LED Berber Tabelası',
          description:
            'Esnek neon LED şeritle oluşturulan özel tasarım yazı ve şekiller. Gece görünürlüğü yüksektir ve dekoratif bir etki yaratır.',
        },
      ],
      faq: [
        {
          question: 'Berber tabelası fiyatları ne kadar?',
          answer:
            'Berber tabelası fiyatları tabela türü, boyut ve malzemeye göre değişir. Döner ışıklı berber tabelaları ekonomik seçenekler arasında yer alırken, paslanmaz kutu harf tabelalar fiyat olarak biraz daha yüksektir. Ücretsiz keşif ve fiyat teklifi için bizi arayın.',
        },
        {
          question: 'Berber tabelası montajı ne kadar sürer?',
          answer:
            'Standart bir berber tabelası montajı genellikle 1-2 saat içinde tamamlanır. Üretim süreci tabela türüne göre 3-7 iş günü arasında değişmektedir.',
        },
        {
          question: 'Berber tabelası için belediye izni gerekiyor mu?',
          answer:
            'İstanbul’da iş yeri tabelaları için ilçe belediyesinden ilan-reklam ruhsatı alınması gerekmektedir. A2 Reklam olarak belediye başvuru sürecinde size yardımcı oluyoruz.',
        },
        {
          question: 'Döner ışıklı berber tabelası ne kadar elektrik harcar?',
          answer:
            'Modern LED motorlu döner berber tabelaları oldukça düşük enerji tüketir. Ortalama bir model aylık 5-10 TL arasında elektrik masrafı oluşturur.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'paslanmaz-harfler', 'fener-tabela'],
    materialTable: [
      { name: 'Döner Işıklı (Barber Pole)', durability: '5-8 yıl', lighting: 'LED motorlu', priceRange: '₺3.500 – ₺12.000' },
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺8.000 – ₺25.000' },
      { name: 'Neon Flex Tabela', durability: '5+ yıl', lighting: 'Neon efekt LED', priceRange: '₺5.000 – ₺18.000' },
      { name: 'Kompozit Panel', durability: '10+ yıl', lighting: 'LED spot (opsiyonel)', priceRange: '₺3.000 – ₺10.000' },
    ],
  },
  {
    slug: 'kuafor-tabelasi',
    name: 'Kuaför Tabelası',
    title: 'Kuaför Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul kuaför ve güzellik salonu tabelası imalatı. LED ışıklı, neon ve cam folyo uygulamaları. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Kuaför Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '✂️',
    content: {
            intro:
        'Kuaför ve güzellik salonları için tabela tasarımı, salonunuzun konseptini ve hedef kitlenizi doğrudan yansıtan kritik bir yatırımdır. İstanbul’un Nişantaşı, Bağdat Caddesi, İstiklal Caddesi gibi moda ve güzellik sektörünün yoğunlaştığı bölgelerinde faaliyet gösteren kuaför salonları için görsel kimlik ön plana çıkmaktadır. A2 Reklam olarak ışıklı kutu harf tabelalar, estetik cam folyo uygulamaları, neon LED yazılar ve modern cephe giydirme projeleriyle kuaför salonlarınıza özel çözümler sunuyoruz. Kadın kuaförü, erkek kuaförü ve unisex salonlar için farklı tasarım dilleri geliştiriyoruz. Kullandığımız akrilik pleksi, paslanmaz çelik ve kompozit panel gibi malzemeler dış mekan koşullarına dayanıklı olup yıllarca ilk günkü görüntüsünü korur. Vitrin camına uygulanan buzlu cam folyo ve dijital baskı folyo ile salonunuzun hem iç hem dış görünümünü zenginleştirebilirsiniz. LED aydınlatma sistemlerimiz gece saatlerinde de salonunuzun görünürlüğünü artırır. Kuaför salonlarının yoğun rekabet ortamında öne çıkabilmesi için tabelanın tasarımı kadar kalitesi de önem taşır. Renk uyumu, yazı karakteri seçimi ve aydınlatma tipi salonunuzun hedef kitlesine göre belirlenmelidir. Bakırköy, Şişli ve Ümraniye gibi nüfus yoğunluğunun yüksek olduğu ilçelerde ise fener tabela ek görünürlük sağlar. Salonunuzun tasarım konseptine uygun tabela renk paleti seçimi, yazı karakteri ve aydınlatma türü konusunda ücretsiz danışmanlık veriyoruz. Kağıthane atölyemizde kendi bünyemizde üretim yaparak hem kaliteyi kontrol altında tutuyor hem de rekabetçi fiyatlar sunuyoruz. İstanbul genelinde ücretsiz keşif, ölçü alma ve profesyonel montaj hizmeti sunuyoruz.',
      benefits: [
        'Salonunuzun konseptine uygun özel tasarım Salonunuzun tasarım konseptine uygun tabela renk paleti seçimi, yazı karakteri ve aydınlatma türü konusunda ücretsiz danışmanlık veriyoruz. Kağıthane atölyemizde kendi bünyemizde üretim yaparak hem kaliteyi kontrol altında tutuyor hem de rekabetçi fiyatlar sunuyoruz.',
        'LED aydınlatma ile gece-gündüz görünürlük',
        'Cam folyo uygulaması ile vitrin estetiği',
        'Paslanmaz çelik ve akrilik ile uzun ömürlü yapı',
        'Hızlı üretim ve profesyonel montaj',
      ],
      popularTypes: [
        {
          name: 'Işıklı Kutu Harf Tabela',
          description:
            'Paslanmaz veya galvaniz kasadan üretilen, içten LED aydınlatmalı üç boyutlu harfler. Kuaför salonlarına modern ve prestijli bir görünüm kazandırır.',
        },
        {
          name: 'Cam Folyo Uygulaması',
          description:
            'Vitrin camına uygulanan buzlu cam, dijital baskı veya kesim folyo. Hem dekoratif hem de bilgilendirici işlev görür.',
        },
        {
          name: 'Neon LED Tabela',
          description:
            'Esnek silikon neon LED ile özel yazı ve logo tasarımları. Özellikle iç mekânda Instagram köşesi ve dekoratif amaçlı kullanılır.',
        },
      ],
      faq: [
        {
          question: 'Kuaför tabelası yaptırmak ne kadar tutar?',
          answer:
            'Fiyat; tabela boyutu, malzeme ve aydınlatma türüne göre değişir. Basit bir ışıklı tabela ile kapsamlı bir cephe giydirme projesi arasında önemli fark olabilir. Net fiyat için ücretsiz keşif talep edin.',
        },
        {
          question: 'Cam folyo uygulaması ne kadar dayanır?',
          answer:
            'Kaliteli cam folyolar dış mekânda 3-5 yıl, iç mekânda ise 7 yıla kadar dayanıklılık gösterir. Düzgün uygulama ve bakım ömürü uzatır.',
        },
        {
          question: 'Kuaför tabelası tasarımında nelere dikkat edilmeli?',
          answer:
            'Salon konseptinize uygun renk paleti, okunaklı yazı karakteri ve yeterli aydınlatma ön planda olmalıdır. A2 Reklam olarak ücretsiz tasarım desteği sunuyoruz.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'paslanmaz-harfler', 'cephe-tabela'],
    materialTable: [
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺10.000 – ₺30.000' },
      { name: 'Neon Flex Tabela', durability: '5+ yıl', lighting: 'Neon efekt LED', priceRange: '₺6.000 – ₺20.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺8.000 – ₺22.000' },
      { name: 'Cam Folyo + LED Spot', durability: '5-7 yıl', lighting: 'Harici LED spot', priceRange: '₺3.000 – ₺8.000' },
    ],
  },
  {
    slug: 'eczane-tabelasi',
    name: 'Eczane Tabelası',
    title: 'Eczane Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul eczane tabelası ve LED eczane haçı imalatı. Nöbetçi eczane panosu, eczane kreşi. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Eczane Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '💊',
    content: {
      intro: `Eczaneler, sağlık sektörünün en önemli halkası olarak 7/24 görünür ve ulaşılabilir olmalıdır. LED eczane haçı, ışıklı cephe tabelası ve nöbetçi eczane panosu gibi ürünler eczanenizin görünürlüğünü en üst düzeye taşır. A2 Reklam olarak İstanbul’un Fatih, Üsküdar, Bakırköy, Pendik ve Şişli gibi nüfus yoğunluğunun yüksek olduğu ilçelerinde yüzlerce eczane tabelası projesi gerçekleştirdik. Eczane kreşi olarak da bilinen yeşil haç tabelası, Türk Eczacıları Birliği standartlarına uygun üretilmeli ve LED aydınlatma ile gece saatlerinde de net görülebilir olmalıdır. Üretimimizde kullandığımız yüksek parıltılı LED modüller 100 metreden bile fark edilebilen parlaklık sunar. Nöbetçi eczane panosu ile vatandaşların gece saatlerinde en yakın nöbetçi eczaneyi kolayca bulmalarını sağlayabilirsiniz. Ayrıca dijital LED ekranlı eczane tabelaları ile sağlık bilgilendirmeleri ve kampanya duyuruları da yapabilirsiniz. Tüm ürünlerimiz IP65 su geçirmezlik sınıfında üretilmekte ve açık hava koşullarına tam dayanıklılık sağlamaktadır. Eczane tabelası yaptırırken dikkat edilmesi gereken en önemli unsur, haç tabelasının belediye yönetmeliğine uygun boyutlarda olması ve eczanenin cephesine orantılı yerleştirilmesidir. A2 Reklam olarak eczane cephesinin tamamını kapsayan projeler de üretebiliyoruz; ışıklı kutu harf ile eczane adı, altında LED haç ve yanında nöbetçi panosu bir bütün olarak tasarlanabilir. Eczane sahiplerine ücretsiz keşif ve tasarım desteği sunuyor, belediye ruhsat başvurusunda da yardımcı oluyoruz. Kağıthane atölyemizde kendi bünyemizde üretim yaparak aracı maliyetlerini ortadan kaldırıyor ve uygun fiyatlı çözümler sunuyoruz.`,
      benefits: [
        '7/24 görünür LED eczane haçı',
        'Türk Eczacıları Birliği standartlarına uygunluk',
        'Nöbetçi eczane panosu entegrasyonu',
        'IP65 su geçirmez dış mekan dayanıklılığı',
        'Yüksek parıltılı LED ile 100 metreden görünürlük',
      ],
      popularTypes: [
        {
          name: 'LED Eczane Haçı',
          description:
            'Yeşil LED aydınlatmalı eczane haç tabelası. Tek veya çift yüzlü seçenekleriyle gece-gündüz görünürlük sağlar.',
        },
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Eczane adı ve logosu içeren ışıklı kutu harf veya light box tabela. Cephenin tamamını kaplayan tasarımlar mevcuttur.',
        },
        {
          name: 'Nöbetçi Eczane Panosu',
          description:
            'Bölgedeki nöbetçi eczane bilgilerini gösteren ışıklı pano. Değiştirilebilir baskı sistemiyle güncel bilgi sunumu sağlanır.',
        },
      ],
      faq: [
        {
          question: 'Eczane haç tabelası fiyatı ne kadar?',
          answer:
            'LED eczane haçı fiyatı; boyut, LED kalitesi ve tek/çift yüz seçimine göre değişir. Detaylı fiyat bilgisi için A2 Reklam’ı arayın.',
        },
        {
          question: 'Eczane tabelası için özel bir izin gerekiyor mu?',
          answer:
            'İlçe belediyesinden ilan-reklam ruhsatı gereklidir. Ayrıca Türk Eczacıları Birliği’nin tabela boyutu ve renk standartlarına uyulması zorunludur.',
        },
        {
          question: 'LED eczane haçı ne kadar elektrik tüketir?',
          answer:
            'Modern LED eczane haçları oldukça düşük enerji tüketir. Orta boy bir haç tabela aylık yaklaşık 10-20 TL elektrik masrafı oluşturur.',
        },
        {
          question: 'Nöbetçi eczane panosu zorunlu mu?',
          answer:
            'Nöbetçi eczane bilgilendirme panosu yasal bir zorunluluk olmasa da vatandaş memnuniyetini artıran ve eczanenize olan güveni güçlendiren önemli bir uygulamadır.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'fener-tabela', 'cephe-tabela'],
    materialTable: [
      { name: 'LED Haç Tabela (Tek Renk)', durability: '7-10 yıl', lighting: 'Yeşil LED', priceRange: '₺8.000 – ₺25.000' },
      { name: 'LED Haç (Çift Renkli)', durability: '7-10 yıl', lighting: 'Yeşil + Kırmızı LED', priceRange: '₺12.000 – ₺35.000' },
      { name: 'Animasyonlu Haç Tabela', durability: '7-10 yıl', lighting: 'RGB LED programlanabilir', priceRange: '₺28.000 – ₺75.000' },
      { name: 'LED Kutu Harf (Eczane Adı)', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺10.000 – ₺30.000' },
    ],
  },
  {
    slug: 'cafe-restoran-tabelasi',
    name: 'Cafe & Restoran Tabelası',
    title: 'Cafe & Restoran Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul cafe ve restoran tabelası imalatı. Ahşap, neon, menü panosu ve ışıklı cephe tabelaları. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Cafe & Restoran Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '☕',
    content: {
      intro: `Cafe ve restoranların başarısında yemek kalitesi kadar mekân atmosferi ve dış görünüm de belirleyici rol oynar. Kadiköy Moda, Beyoğlu, Bebek, Karakoy ve Balık Pazarı gibi İstanbul’un gastronomi merkezi sayılan semtlerinde tabela tasarımı işletmenin ruhuyla örtüşmelidir. A2 Reklam olarak vintage ahşap görünümlü tabelalar, neon LED yazılar, ışıklı menü panoları ve dikkat çekici cephe giydirme projeleri ile cafe ve restoranlara özel çözümler üretiyoruz. Ahşap görünümlü tabelalarımız gerçek ahşap dokusunu andiran kompozit malzemeden üretildiği için hem estetik hem dayanıklıdır. Neon LED tabelalar özellikle akşam saatlerinde müşteri çekme konusunda son derece etkilidir ve sosyal medyada paylaşılabilir görseller oluşturur. Menü panolarımız değiştirilebilir baskı sistemi veya dijital ekran seçeneğiyle sunulmaktadır. Dış mekân tabela uygulamalarında su geçirmez malzeme ve UV dayanımlı baskı teknolojisi kullanıyoruz. Teras alanı, bahçe düzeni ve cadde cephesi için farklı çözümler üretebiliyoruz. Cafe ve restoran tabelası yaptırırken işletmenizin konseptiyle uyumlu bir tasarım dili oluşturmak esastır. Endüstriyel tarz mekanlar için metal ve ahşap kombinasyonlu tabelalar, minimalist kafeler için sade kutu harf çözümleri ve bohem tarz mekanlar için el yazısı efektli neon LED yazılar tercih edilmektedir. A2 Reklam olarak teras alanı, bahçe girişi ve cadde cephesi için ayrı ayrı tabela çözümleri üretebiliyoruz. İstanbul A2 Reklam olarak Kağıthane atölyemizde cafe ve restoran tabelalarını kendi bünyemizde üretiyoruz. İşletme sahiplerine ücretsiz keşif, tasarım danışmanlığı ve hızlı montaj hizmeti sunarak açılış sürecinde zaman kaybı yaşanmamasını sağlıyoruz. İstanbul’un hızla büyüyen gastronomi sahnesinde markanızı doğru konumlandırmak için profesyonel tabela desteği almak önemli bir avantajdır. Ücretsiz keşif ve tasarım danışmanlığı hizmetimizle yanınızdayız.`,
      benefits: [
        'İşletme konseptine uygun özel tasarım dili',
        'Neon LED ile sosyal medya dostu görsellik',
        'Değiştirilebilir menü panosu sistemi',
        'Dış mekâna dayanıklı UV korumalı malzeme',
        'Vintage, modern ve endüstriyel tarza uygun seçenekler',
        'Hızlı üretim ve montaj süreci',
      ],
      popularTypes: [
        {
          name: 'Ahşap Görünümlü Tabela',
          description:
            'Doğal ahşap dokusunu andiran kompozit malzeme üzerine CNC kesim veya kabartma yazı. Rustik ve vintage konseptler için idealdir.',
        },
        {
          name: 'Neon LED Yazı',
          description:
            'Esnek silikon neon LED ile özel yazı ve logo tasarımları. Akşam saatlerinde etkileyici bir atmosfer oluşturur.',
        },
        {
          name: 'Menü Panosu',
          description:
            'Değiştirilebilir baskı veya dijital ekranlı menü panoları. Günlük menü değişikliklerini kolaylıkla yansıtabilirsiniz.',
        },
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'LED aydınlatmalı kutu harf veya light box cephe tabelası. Cadde üzerinden uzak mesafeden görünürlük sağlar.',
        },
      ],
      faq: [
        {
          question: 'Cafe tabelası yaptırmak ne kadara mal olur?',
          answer:
            'Cafe tabelası fiyatı boyut, malzeme ve tasarım karmaşıklığına göre değişir. Basit bir neon yazıdan kapsamlı bir cephe projesine kadar geniş bir fiyat aralığı mevcuttur.',
        },
        {
          question: 'Dış mekân tabelası yağmura dayanıklı mı?',
          answer:
            'Evet, tüm dış mekân tabelalarımız IP65 koruma sınıfında, su geçirmez malzemelerle üretilmektedir.',
        },
        {
          question: 'Menü panosu içeriği nasıl değiştirilir?',
          answer:
            'Değiştirilebilir baskılı panolarda ön kapağı açarak baskıyı kolayca güncelleyebilirsiniz. Dijital ekranlı modellerde ise USB veya uzaktan bağlantı ile içerik yönetimi yapılır.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'cephe-tabela', 'fener-tabela', 'yonlendirme'],
    materialTable: [
      { name: 'Neon LED Tabela', durability: '5+ yıl', lighting: 'Neon flex LED', priceRange: '₺5.000 – ₺25.000' },
      { name: 'Ahşap Tabela (Emprenye)', durability: '5-10 yıl', lighting: 'Harici LED spot', priceRange: '₺6.000 – ₺18.000' },
      { name: 'Paslanmaz Kutu Harf', durability: '15+ yıl', lighting: 'Halo LED aydınlatma', priceRange: '₺15.000 – ₺50.000' },
      { name: 'Fener Tabela', durability: '10+ yıl', lighting: 'Dahili LED panel', priceRange: '₺4.000 – ₺15.000' },
    ],
  },
  {
    slug: 'market-tabelasi',
    name: 'Market Tabelası',
    title: 'Market Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul market ve süpermarket tabelası imalatı. Işıklı cephe, totem ve fiyat panoları. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Market Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🛒',
    content: {
      intro: `Market, bakkal ve süpermarket işletmeleri için tabela; müşteri çekmenin ve mahallede bilinirlik kazanmanın en etkili yoludur. İstanbul’un Esenyurt, Bağcılar, Esenler, Küçükçekmece ve Ümraniye gibi yoğun nüfuslu ilçelerinde her köşede birden fazla market bulunmaktadır ve bu rekabet ortamında fark edilmek hayati önemdedir. A2 Reklam olarak ışıklı cephe tabelaları, totem tabelalar, fiyat panoları ve raf etiketleri gibi market işletmelerine özel komple çözümler sunuyoruz. Büyük ebat cephe tabelalarımız uzak mesafeden dikkat çekerken, market girişinde konumlandırılan totem tabelalar araç trafiğinden de görünürlük sağlar. Kullandığımız kompozit panel ve galvaniz sac malzemeler dış mekan koşullarına dayaniklı olup paslanmaya karşı korumalıdır. LED aydınlatma sistemlerimiz gece saatlerinde de marketinizin görülebilir olmasını sağlar. Fiyat panoları ve kampanya duyuru tabelaları ile müşterilerinizi promosyonlardan haberdar edebilirsiniz. İşletme sahibi olarak tek yapmanız gereken bizi aramak; gerisini A2 Reklam halleder. Market tabelası seçiminde dikkat edilmesi gereken en önemli unsurlar; tabelanın cadde üzerinden okunabilirliği, gece aydınlatma kalitesi ve hava koşullarına dayanıklılığıdır. Zincir marketler için kurumsal standartlara uygun seri üretim yapabiliyoruz. Bağımsız market ve bakkal işletmeleri için ise özel tasarım ve ekonomik çözümler sunuyoruz. A2 Reklam olarak Kağıthane atölyemizde kendi bünyemizde üretim gerçekleştiriyor, aracı maliyetlerini ortadan kaldırarak uygun fiyatlı tabelalar sunuyoruz. Ücretsiz keşif hizmetimizle ihtiyacınızı yerinde değerlendirip size en uygun çözümü öneriyoruz. Ayrıca market içerisinde raf etiketleme sistemleri, departman yönlendirme tabelaları ve kasa üstü aydınlatmalı panolar da üretim kapsamımız dahilindedir. Marketinizin tüm görsel iletişim ihtiyacını tek elden karşılıyoruz.`,
      benefits: [
        'Büyük ebat ışıklı cephe ile uzaktan görünürlük',
        'Totem tabela ile araç trafiğinden dikkat çekme',
        'Değiştirilebilir kampanya ve fiyat panoları',
        'Paslanmaya karşı korumalı dayanıklı malzeme',
        'Ekonomik LED aydınlatma sistemi',
      ],
      popularTypes: [
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Market adı ve logosu içeren büyük ebat ışıklı tabela. Kompozit panel veya alumınyum kasa üzerine LED aydınlatma.',
        },
        {
          name: 'Totem Tabela',
          description:
            'Market girişine veya yol kenarına dikilen direk üzeri tabela. Araç trafiğinden görülebilir yükseklikte üretilir.',
        },
        {
          name: 'Fiyat ve Kampanya Panosu',
          description:
            'Değiştirilebilir baskı veya dijital ekranlı fiyat panoları. Günlük kampanya ve indirimleri duyurmak için idealdir.',
        },
      ],
      faq: [
        {
          question: 'Market tabelası ne kadara mal olur?',
          answer:
            'Market tabelası fiyatı boyut ve malzemeye göre değişir. Küçük bir bakkal tabelası ile büyük bir süpermarket cephe projesi arasında önemli fiyat farkı olabilir.',
        },
        {
          question: 'Totem tabela için belediye izni gerekli mi?',
          answer:
            'Evet, kaldırım veya yol kenarına dikilecek totem tabelalar için ilçe belediyesinden ruhsat alınması gerekmektedir. A2 Reklam bu süreçte size yardımcı olur.',
        },
        {
          question: 'Mevcut tabela üzerine yeni giydirme yapılabilir mi?',
          answer:
            'Evet, mevcut tabela kasası uygunsa üzerine yeni baskılı folyo veya kompozit panel giydirme yaparak maliyetten tasarruf sağlanabilir.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'totem', 'cephe-tabela'],
    materialTable: [
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺10.000 – ₺35.000' },
      { name: 'Vinil Baskı Panel', durability: '5-7 yıl', lighting: 'LED spot (opsiyonel)', priceRange: '₺5.000 – ₺15.000' },
      { name: 'Totem Tabela', durability: '15+ yıl', lighting: 'Dahili LED', priceRange: '₺25.000 – ₺80.000' },
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺12.000 – ₺40.000' },
    ],
  },
  {
    slug: 'dis-klinigi-tabelasi',
    name: 'Diş Kliniği Tabelası',
    title: 'Diş Kliniği Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul diş kliniği ve diş hekimi tabelası imalatı. Paslanmaz harf, ışıklı tabela ve yönlendirme. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Diş Kliniği Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🦷',
    content: {
      intro: `Diş kliniklerinin profesyonel ve güven veren bir imaj oluşturması, hasta kazanımında tabela tasarımından geçer. İstanbul’un Şişli, Bakırköy, Ataşehir, Maltepe ve Beşiktaş gibi sağlık hizmetlerinin yoğunlaştığı ilçelerinde diş klinikleri ciddi bir rekabet ortamındadır. A2 Reklam olarak diş kliniklerine özel paslanmaz çelik kutu harf tabelalar, ışıklı cephe panoları, kapı isimlik sistemleri ve iç mekân yönlendirme tabelaları üretiyoruz. Sağlık sektöründe güven, hijyen ve profesyonellik algısı ön planda olduğundan tabela malzemesi ve tasarımında sade, şık ve temiz hatlar tercih edilmektedir. Paslanmaz çelik harfler bu algıyı destekleyen en etkili malzeme olup ışıklı veya ışıksız seçenekleriyle sunulmaktadır. Klinik içerisinde hasta yönlendirme panoları, oda numaralandırma ve bekleme alanı bilgilendirme tabelaları da hizmet kapsamımız dahilindedir. Sağlık Bakanlığı düzenlemelerine uygun tabela tasarımı konusunda deneyim sahibiyiz. Üretimden montaja kadar tüm süreci yönetiyor, size anahtar teslim hizmet sunuyoruz. Diş kliniklerinde hasta güvenini artırmak için tabela tasarımında temiz, modern ve profesyonel bir görsel dil kullanılmalıdır. Beyaz, mavi ve gümüş tonları sağlık sektöründe en çok tercih edilen renklerdir. Klinik girişindeki tabela kadar iç mekandaki hasta yönlendirme sistemi de önem taşır; bekleme alanından tedavi odalarına kadar net bir yönlendirme hastanın deneyimini olumlu etkiler. A2 Reklam olarak diş kliniklerine anahtar teslim tabela çözümleri sunuyor, tasarımdan montaja kadar tüm süreci yönetiyoruz. Ücretsiz keşif ve Sağlık Bakanlığı düzenlemelerine uygun tasarım danışmanlığı hizmetimiz mevcuttur.`,
      benefits: [
        'Paslanmaz çelik ile profesyonel ve hijyenik görünüm',
        'Sağlık Bakanlığı düzenlemelerine uygun tasarım',
        'İç mekân hasta yönlendirme sistemi',
        'Sade ve güven veren şık tasarım dili',
        'LED aydınlatma ile gece görünürlüğü',
      ],
      popularTypes: [
        {
          name: 'Paslanmaz Kutu Harf Tabela',
          description:
            'Paslanmaz çelik gövde üzerine LED aydınlatmalı üç boyutlu harfler. Diş kliniklerine prestijli ve sağlam bir görünüm kazandırır.',
        },
        {
          name: 'Işıklı Light Box Tabela',
          description:
            'Akrilik yüzeyli, içten LED aydınlatmalı kutu tabela. Klinik adı ve logosu homojen bir ışıkla aydınlatılır.',
        },
        {
          name: 'Yönlendirme ve Kapı İsimlik',
          description:
            'Klinik içerisinde hasta yönlendirme panoları ve hekim oda isimlik sistemleri. Hastaların kolaylıkla yön bulmasını sağlar.',
        },
      ],
      faq: [
        {
          question: 'Diş kliniği tabelası için hangi malzeme uygundur?',
          answer:
            'Paslanmaz çelik ve akrilik en çok tercih edilen malzemelerdir. Hijyenik görüntüleri ve uzun ömürleri nedeniyle sağlık sektörü için idealdir.',
        },
        {
          question: 'Sağlık Bakanlığı tabela kısıtlaması var mı?',
          answer:
            'Sağlık tesisleri için tabela boyutu, içerik ve tasarım konusunda Sağlık Bakanlığı’nın belirli düzenlemeleri vardır. A2 Reklam bu kurallara uygun üretim yapar.',
        },
        {
          question: 'Diş kliniği tabelası üretim süresi ne kadardır?',
          answer:
            'Üretim süresi tabela türüne göre 5-10 iş günü arasında değişir. Acil talepler için hızlandırılmış üretim seçeneği de mevcuttur.',
        },
      ],
    },
    relatedServices: ['paslanmaz-harfler', 'isikli-tabela', 'yonlendirme', 'kapi-isimlik'],
    materialTable: [
      { name: 'Paslanmaz Kutu Harf', durability: '15+ yıl', lighting: 'Halo LED aydınlatma', priceRange: '₺12.000 – ₺35.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺8.000 – ₺25.000' },
      { name: 'Cam Folyo + LED Şerit', durability: '5-7 yıl', lighting: 'LED şerit aydınlatma', priceRange: '₺4.000 – ₺12.000' },
      { name: 'Pleksi Kapı İsimlik', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺2.000 – ₺6.000' },
    ],
  },
  {
    slug: 'otel-tabelasi',
    name: 'Otel Tabelası',
    title: 'Otel Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul otel ve apart otel tabelası imalatı. Çatı tabelası, giriş tabelaları ve yönlendirme sistemleri. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Otel Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🏨',
    content: {
      intro: `Otel ve konaklama tesisleri için tabela sistemi, misafirlerin ilk izlenimini belirleyen ve tesisin prestijini yansıtan kritik bir unsurdur. İstanbul’un Sultanahmet, Taksim, Levent, Şişli ve Kadıköy gibi turistik ve iş merkezlerinde yer alan oteller için etkileyici bir tabela sistemi olmazsa olmazdır. A2 Reklam olarak çatı tabelaları, giriş cephe tabelaları, lobi yönlendirme panoları ve oda numaralandırma sistemleri ile otel ve apart otellere kapsamlı tabela çözümleri sunuyoruz. Çatı tabelalarımız yüksek parıltılı LED aydınlatma ile gece saatlerinde de uzak mesafeden görülebilir. Paslanmaz çelik ve bron harfler tesisin lüks ve kaliteli algısını güçlendirir. İç mekân yönlendirme sistemleri; resepsiyon, restoran, toplantı salonu, asansör ve acil çıkış gibi alanlar için uluslararası standartlarda tasarlanır. Oda numaralandırma ve kapı isimlik sistemlerimiz otelin genel konseptine uyumlu malzeme ve tasarımla üretilir. Rüzgar ve deprem yükü hesaplamaları yapılarak çatı ve cephe tabelalarının güvenliği sağlanır. Anahtar teslim proje yönetimi ile müşterilerimizin sadece misafirlerine odaklanmasını sağlıyoruz. Otel tabelası yatırımında markanın konumlandırması ve hedef kitlesi belirleyici rol oynar. Butik oteller için el işçiliği detayları barındıran özel tabelalar, zincir oteller için kurumsal standartlara uygun seri üretim ve lüks segment oteller için bronz ve altın kaplama harf çözümleri sunabiliyoruz. Sultanahmet bölgesindeki tarihi dokunun korunması gereken yapılarda özel montaj teknikleri uyguluyoruz. A2 Reklam olarak projenin başından sonuna kadar mimari ofisler ve iç mimarlarla koordineli çalışıyor, otel konseptine uygun bütünlüklü bir tabela sistemi oluşturuyoruz.`,
      benefits: [
        'Çatı tabelası ile uzak mesafeden görünürlük',
        'Paslanmaz ve bron harf ile lüks algı',
        'Uluslararası standartlarda yönlendirme sistemi',
        'Oda numaralandırma ve kapı isimlik çözümleri',
        'Rüzgar ve deprem dayanımı hesaplı montaj',
        'Anahtar teslim proje yönetimi',
      ],
      popularTypes: [
        {
          name: 'Çatı Tabelası',
          description:
            'Otel binasının çatısına montajlanan büyük ebat ışıklı harfler. Gece görünürlüğü ve marka bilinirliği için vazgeçilmezdir.',
        },
        {
          name: 'Giriş Cephe Tabelası',
          description:
            'Otel giriş cephesinde konumlanan ışıklı veya ışıksız tabela. Misafirlerin ilk karşılaştığı görsel unsurdur.',
        },
        {
          name: 'Yönlendirme ve Oda Numaralandırma',
          description:
            'İç mekân yönlendirme panoları, kat bilgilendirme ve oda numaralandırma sistemleri. Misafir deneyimini iyileştirir.',
        },
        {
          name: 'Totem Tabela',
          description:
            'Otel girişi veya otopark alanında konumlanan direk üzeri tabela. Araç trafiğinden görülebilir yükseklikte tasarlanır.',
        },
      ],
      faq: [
        {
          question: 'Otel çatı tabelası fiyatları ne kadar?',
          answer:
            'Çatı tabelası fiyatı harf yüksekliği, malzeme, aydınlatma ve montaj zorluk derecesine göre değişir. Detaylı fiyat teklifi için yerinde keşif gereklidir.',
        },
        {
          question: 'Çatı tabelası rüzgara dayanıklı mı?',
          answer:
            'Evet, tüm çatı tabelalarımız statik hesaplama ile rüzgar ve deprem yüklerine karşı dayanıklı şekilde tasarlanır ve montajlanır.',
        },
        {
          question: 'Otel yönlendirme sistemi neleri kapsar?',
          answer:
            'Lobi yönlendirme, kat bilgilendirme, oda numaralandırma, restoran-toplantı salonu yönlendirme, acil çıkış ve yangın tahliye planlarını kapsar.',
        },
      ],
    },
    relatedServices: ['cati-tabelasi', 'yonlendirme', 'paslanmaz-harfler', 'kapi-isimlik'],
    materialTable: [
      { name: 'Paslanmaz Kutu Harf', durability: '20+ yıl', lighting: 'Halo LED / ön LED', priceRange: '₺20.000 – ₺80.000' },
      { name: 'Cephe Giydirme + Logo', durability: '15+ yıl', lighting: 'LED spot', priceRange: '₺30.000 – ₺120.000' },
      { name: 'Totem Tabela', durability: '15+ yıl', lighting: 'Dahili LED panel', priceRange: '₺30.000 – ₺100.000' },
      { name: 'İç Mekan Yönlendirme', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺5.000 – ₺20.000' },
    ],
  },
  {
    slug: 'magaza-tabelasi',
    name: 'Mağaza Tabelası',
    title: 'Mağaza Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul mağaza ve dükkan tabelası imalatı. Kutu harf, ışıklı tabela ve vitrin uygulamaları. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Mağaza Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🏪',
    content: {
      intro: `Mağaza ve dükkan tabelaları, cadde üzerindeki rekabetin en yoğun olduğu noktada işletmenizin yüzüdür. İstanbul’un Bağdat Caddesi, İstiklal Caddesi, Nişantaşı, Bakırköy ve Beylikdüzü gibi alışveriş yoğunluğunun fazla olduğu bölgelerinde tabela tasarımı ve kalitesi doğrudan satışlara etki eder. A2 Reklam olarak mağaza cephelerine özel kutu harf tabelalar, ışıklı light box panolar, vitrin folyo uygulamaları ve dijital baskılı branda çözümleri üretiyoruz. Markanızın kurumsal kimliğine uygun renk, font ve malzeme seçimi ile tabelanızı özelleştiriyoruz. Paslanmaz çelik, galvaniz, akrilik ve kompozit panel gibi geniş malzeme yelpazesiyle her bütçeye uygun çözümler mevcut. Vitrin camına uygulanan one-way vision folyo ile hem görsellik hem mahremiyet sağlanabilir. Dış mekân tabelalarımızın tümü UV dayanımlı ve su geçirmez üretilmekte olup yıllarca bakım gerektirmeden hizmet verir. Ücretsiz keşif, tasarım ve montaj hizmeti ile anahtar teslim tabela çözümü sunuyoruz. Mağaza tabelasında başarılı sonuç almak için tasarımın hedef kitleye hitap etmesi, renklerin marka kimliğiyle uyumlu olması ve tabelanın cephe oranlarına göre doğru boyutlandırılması gerekir. Zincir mağazalar için tüm şubelerde tutarlı tabela üretimi yapabiliyoruz. Yeni açılacak mağazalar için cephe analizi yaparak en etkili tabela konumlandırmasını öneriyoruz. A2 Reklam olarak İstanbul Mağaza cephe tasarımında doğru tabela konumlandırması, boyutlandırma ve aydınlatma açısı müşteri dikkatini çekmede belirleyici faktörlerdir. A2 Reklam olarak İstanbul Profesyonel tabela yatırımı yapan mağazalar, caddede rakiplerinden öne çıkarak müşteri trafiğini artırır.’un tüm alışveriş bölgelerinde deneyim sahibiyiz ve her mağazanın cephe yapısına göre özel çözüm önerisi sunuyoruz. Zincir mağazalar için tüm şubelerde tutarlı seri üretim kapasitemiz de mevcuttur.’un tüm ilçelerinde mağaza tabela projeleri gerçekleştirdik; Kağıthane atölyemizde kendi bünyemizde üretim yaparak kaliteyi kontrol altında tutuyoruz. Mağaza açılış süreçlerinde hızlı üretim ve montaj kapasitemizle zamanında teslim garantisi veriyoruz.`,
      benefits: [
        'Kurumsal kimliğe uygun özel tasarım',
        'Paslanmaz, akrilik ve kompozit malzeme seçenekleri',
        'Vitrin folyo ile görsellik ve mahremiyet',
        'UV dayanımlı ve su geçirmez üretim',
        'Her bütçeye uygun çözüm alternatifi',
      ],
      popularTypes: [
        {
          name: 'Kutu Harf Tabela',
          description:
            'LED aydınlatmalı üç boyutlu harflerle oluşturulan tabela. Mağazanıza modern ve dikkat çekici bir görünüm kazandırır.',
        },
        {
          name: 'Işıklı Light Box Tabela',
          description:
            'Akrilik yüzeyli, içten aydınlatmalı kutu tabela. Logo ve marka adının homojen ışıkla görüntülenmesini sağlar.',
        },
        {
          name: 'Vitrin Folyo Uygulaması',
          description:
            'Dijital baskı, buzlu cam veya one-way vision folyo uygulamaları. Vitrini reklam alanına dönüştürür.',
        },
        {
          name: 'Cephe Giydirme',
          description:
            'Kompozit panel veya dijital baskılı branda ile mağaza cephesinin tamamının kaplanması. Büyük etki alanı oluşturur.',
        },
      ],
      faq: [
        {
          question: 'Mağaza tabelası yaptırmak ne kadar sürer?',
          answer:
            'Üretim süresi tabela türü ve boyutuna göre 5-10 iş günü arasında değişir. Montaj genellikle 1 günde tamamlanır.',
        },
        {
          question: 'Marka renkleriyle birebir uyum sağlanabiliyor mu?',
          answer:
            'Evet, Pantone ve RAL renk kodlarına göre birebir renk eşleştirmesi yapılır. Kurumsal kimliğinize tamamen uyumlu tabela üretiyoruz.',
        },
        {
          question: 'Kiracıyım, bina cephesine tabela montajı yapabilir miyim?',
          answer:
            'Bina yönetimi veya mal sahibinden yazılı izin alınması ve belediye ruhsatının çıkarılması gerekmektedir. A2 Reklam bu süreçte size rehberlik eder.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'paslanmaz-harfler', 'cephe-tabela', 'fener-tabela'],
    materialTable: [
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺12.000 – ₺50.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺8.000 – ₺30.000' },
      { name: 'Neon LED Tabela', durability: '5+ yıl', lighting: 'Neon flex LED', priceRange: '₺5.000 – ₺22.000' },
      { name: 'Fener Tabela', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺4.000 – ₺15.000' },
    ],
  },
  {
    slug: 'fabrika-tabelasi',
    name: 'Fabrika Tabelası',
    title: 'Fabrika Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul fabrika ve sanayi tabelası imalatı. Büyük ebat cephe giydirme, totem ve yönlendirme. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Fabrika Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🏭',
    content: {
      intro: `Fabrika ve sanayi tesisleri için tabela; kurumsal kimliğin yansıtılması, ziyaretçi yönlendirmesi ve iş güvenliği açısından kritik öneme sahiptir. İstanbul’un İkitelli, Hadimköy, Tuzla, Gebze ve Beylikdüzü organize sanayi bölgelerinde çok sayıda fabrika tabelası projesi gerçekleştiren A2 Reklam, büyük ebat cephe giydirme, totem tabela, yönlendirme ve güvenlik tabelaları alanında uzmanlaşmış bir firmadır. Fabrika cephelerinde genellikle büyük ebat kompozit panel giydirme veya paslanmaz çelik kutu harf tabelalar tercih edilir. Bu tabelaların boyutu nedeniyle çelik konstrüksiyon taşıyıcı sistem, rüzgar yükü hesabı ve profesyonel montaj ekibi gerektirir. Giriş alanına dikilen totem tabelalar fabrika isim ve logosunu taşıt trafiğinden görülebilir kılar. Tesis içerisindeki yönlendirme tabelaları; üretim alanları, ofisler, yemekhane, otopark ve acil çıkışlar için uluslararası standartlarda üretilir. İş güvenliği tabelaları ise OSGB gereksinimleri doğrultusunda hazırlanır. Galvaniz ve paslanmaz çelik malzemelerimiz endüstriyel ortam koşullarına tam dayanıklıdır. Fabrika tabelası projelerinde işveren markasının güçlendirilmesi, ziyaretçi ve tedarikçilere profesyonel bir ilk izlenim bırakılması ve iş güvenliği gereksinimlerinin karşılanması hedeflenir. Organize sanayi bölgelerindeki fabrikalarda genellikle çoklu tabela sistemi gerekir: ana giriş totemi, cephe tabelası, idari bina yönlendirmesi ve üretim alanı güvenlik tabelaları bir bütün olarak planlanmalıdır. A2 Reklam olarak büyük ölçekli endüstriyel projelerde deneyim sahibiyiz ve proje yönetimi sürecini baştan sona koordine ediyoruz. İstanbul ve çevresindeki sanayi bölgelerine ücretsiz keşif hizmeti sunuyoruz.`,
      benefits: [
        'Büyük ebat cephe giydirme ile kurumsal görünüm',
        'Çelik konstrüksiyon taşıyıcı sistem ile sağlam montaj',
        'Endüstriyel ortam koşullarına dayanıklı malzeme',
        'İş güvenliği ve OSGB uyumlu tabelalar',
        'Tesis içi yönlendirme ve bilgilendirme sistemi',
        'Totem tabela ile taşıt trafiğinden görünürlük',
      ],
      popularTypes: [
        {
          name: 'Büyük Ebat Cephe Giydirme',
          description:
            'Kompozit panel veya galvaniz sac ile fabrika cephesinin tamamının kaplanması. Kurumsal renk ve logo ile marka bilinirliği oluşturur.',
        },
        {
          name: 'Totem Tabela',
          description:
            'Fabrika girişine dikilen yüksek direk üzeri ışıklı tabela. Yoldan geçen taşıtlardan kolayca fark edilir.',
        },
        {
          name: 'Yönlendirme ve Güvenlik Tabelaları',
          description:
            'Tesis içi yönlendirme, iş güvenliği uyarıları, acil çıkış ve yangın tahliye planları. OSGB standartlarına uygun üretilir.',
        },
      ],
      faq: [
        {
          question: 'Fabrika cephe tabelası ne kadara mal olur?',
          answer:
            'Fabrika tabelaları boyut olarak büyük ve konstrüksiyon gerektirdiğinden fiyat proje bazlı belirlenir. Ücretsiz keşif ve detaylı fiyat teklifi için bizi arayın.',
        },
        {
          question: 'Fabrika tabelası için statik hesap yapılıyor mu?',
          answer:
            'Evet, büyük ebat cephe ve çatı tabelaları için mühendislik ofisi tarafından rüzgar ve deprem yükü hesaplaması yapılır.',
        },
        {
          question: 'İş güvenliği tabelaları zorunlu mudur?',
          answer:
            'Evet, iş yerlerinde güvenlik ve uyarı tabelaları 6331 sayılı İş Sağlığı ve Güvenliği Kanunu kapsamında zorunludur.',
        },
      ],
    },
    relatedServices: ['cephe-tabela', 'totem', 'yonlendirme'],
    materialTable: [
      { name: 'Kompozit Panel Cephe', durability: '15-20 yıl', lighting: 'LED spot / şerit', priceRange: '₺800 – ₺1.400 /m²' },
      { name: 'Galvaniz Trapez Sac', durability: '15-25 yıl', lighting: 'Harici aydınlatma', priceRange: '₺500 – ₺900 /m²' },
      { name: 'Alüminyum Kaplama', durability: '25-30 yıl', lighting: 'LED spot', priceRange: '₺2.000 – ₺3.000 /m²' },
      { name: 'Çatı / Cephe Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺20.000 – ₺80.000' },
    ],
  },
  {
    slug: 'plaza-tabelasi',
    name: 'Plaza Tabelası',
    title: 'Plaza Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul plaza ve iş merkezi tabelası imalatı. Paslanmaz harf, yönlendirme ve kapı isimlik. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Plaza Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🏢',
    content: {
      intro: `Plaza ve iş merkezleri, İstanbul’un iş dünyasının kalbi olup tabela ve yönlendirme sistemleri kurumsal imajın vazgeçilmez parçasıdır. Levent, Maslak, Şişli, Ataşehir ve Ümraniye gibi İstanbul’un iş merkezlerinin yoğunlaştığı bölgelerde plaza tabelaları profesyonelliğin göstergesidir. A2 Reklam olarak plaza dış cephe tabelaları, giriş lobi panoları, kat yönlendirme sistemleri, kiracı bilgilendirme panoları ve kapı isimlik çözümleri sunuyoruz. Plaza dış cephesinde genellikle paslanmaz çelik veya krom harf tabelalar tercih edilir; bu malzemeler hem dayanıklıdır hem de prestijli bir görünüm sunar. Giriş lobisinde konumlanan kiracı bilgilendirme panosu plaza içerisindeki firmaların listesini gösterir ve ziyaretçilerin yön bulmasını kolaylaştırır. Kat yönlendirme panoları ve ofis kapı isimlikleri kurumsal standartlarda, plaza genelinde tutarlı bir tasarım diliyle üretilir. Yönetim şirketi talepleri doğrultusunda standart tasarım şablonları oluşturuyor ve tüm kiracılar için uygulanmasını sağlıyoruz. Plaza tabela projeleri genellikle bina yönetim şirketi koordinasyonunda yürütülür ve tüm kiracılar için ortak bir tasarım standardı belirlenir. A2 Reklam olarak plaza yönetimleriyle doğrudan çalışarak standart tasarım şablonları oluşturuyor ve yeni kiracılar için hızlı üretim kapasitesiyle kısa sürede tabela teslimi yapıyoruz. Maslak, Levent ve Ataşehir iş merkezlerinde çok sayıda plaza projesi deneyimimiz bulunmaktadır. Paslanmaz çelik harfler zamanla rengini ve parlaklığını kaybetmeyen bir malzeme olup plaza cephelerinde uzun yıllar bakım gerektirmeden hizmet verir. Lobi düzenlemesi ve dijital bilgilendirme ekranları da hizmet kapsamımız dahilindedir.`,
      benefits: [
        'Paslanmaz çelik ve krom harf ile prestijli görünüm',
        'Kiracı bilgilendirme panosu ile kolay yön bulma',
        'Kat yönlendirme sistemi ile profesyonel iç mekân',
        'Plaza genelinde tutarlı tasarım dili',
        'Değiştirilebilir kiracı isim paneli sistemi',
      ],
      popularTypes: [
        {
          name: 'Paslanmaz Cephe Harf Tabela',
          description:
            'Plaza dış cephesinde konumlanan paslanmaz çelik veya krom üç boyutlu harfler. Işıklı veya ışıksız seçenekleriyle prestijli bir görünüm sunar.',
        },
        {
          name: 'Kiracı Bilgilendirme Panosu',
          description:
            'Giriş lobisinde yer alan, plaza içerisindeki firmaların listesini gösteren şık pano. Değiştirilebilir isim panelleriyle güncel tutulur.',
        },
        {
          name: 'Yönlendirme ve Kapı İsimlik',
          description:
            'Kat yönlendirme panoları ve ofis kapı isimlikleri. Ziyaretçilerin plaza içerisinde rahatlıkla yön bulmasını sağlar.',
        },
      ],
      faq: [
        {
          question: 'Plaza cephe tabelası yaptırmak ne kadar tutar?',
          answer:
            'Fiyat; harf boyutu, malzeme ve montaj yüksekliğine göre proje bazlı belirlenir. Yerinde keşif sonrası detaylı fiyat teklifi sunuyoruz.',
        },
        {
          question: 'Kiracı değişikliğinde pano güncellenebilir mi?',
          answer:
            'Evet, kiracı bilgilendirme panolarımız değiştirilebilir panel sistemiyle üretilir. Kiracı değişikliğinde sadece ilgili panelin güncellenmesi yeterlidir.',
        },
        {
          question: 'Tüm katlara aynı standartta yönlendirme yapılabilir mi?',
          answer:
            'Evet, plaza yönetimi ile koordineli şekilde tüm katlara tutarlı tasarım dilinde yönlendirme sistemi kuruyoruz.',
        },
      ],
    },
    relatedServices: ['paslanmaz-harfler', 'yonlendirme', 'kapi-isimlik', 'cephe-tabela'],
    materialTable: [
      { name: 'Paslanmaz Kutu Harf', durability: '20+ yıl', lighting: 'Halo LED aydınlatma', priceRange: '₺20.000 – ₺70.000' },
      { name: 'Cephe Giydirme (ACP)', durability: '15+ yıl', lighting: 'LED spot', priceRange: '₺25.000 – ₺90.000' },
      { name: 'İç Mekan Yönlendirme', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺5.000 – ₺25.000' },
      { name: 'Totem Tabela', durability: '15+ yıl', lighting: 'Dahili LED panel', priceRange: '₺30.000 – ₺100.000' },
    ],
  },
  {
    slug: 'avm-tabelasi',
    name: 'AVM Tabelası',
    title: 'AVM Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul AVM ve alışveriş merkezi tabelası imalatı. Mağaza cephe, yönlendirme ve totem tabela. A2 Reklam ✆ 0531 618 16 72',
    h1: 'AVM Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🏬',
    content: {
      intro: `Alışveriş merkezleri, yüzlerce mağazanın bir arada bulunduğu ve görsel rekabetin en yoğun yaşandığı mekânlardır. İstanbul’un Cevahir, İstinye Park, Zorlu Center, Mall of İstanbul ve Viaport gibi büyük AVM’’lerinde tabela kalitesi markanın prestijini doğrudan yansıtır. A2 Reklam olarak AVM içerisindeki mağaza cephe tabelaları, ışıklı kutu harf uygulamaları, yönlendirme panoları, kat bilgilendirme sistemleri ve dış mekan totem tabelalar üretiyoruz. AVM tabelalarında genellikle AVM yönetiminin belirlediği standartlara uyum zorunlu olup biz bu standartlara hakim olarak üretim gerçekleştiriyoruz. İşıklı kutu harf ve light box tabelalar AVM içerisinde en çok tercih edilen türlerdir. Paslanmaz çelik, akrilik ve alumınyum malzeme seçenekleriyle farklı bütçe ve tasarım beklentilerine yanıt veriyoruz. AVM dış cephesinde konumlanan totem tabelalar ve otopark yönlendirme tabelaları da hizmet kapsamımız dahilindedir. Üretim sürecinde AVM mesai saatleri dışında montaj planlaması yapılarak alışveriş akışının etkilenmemesi sağlanır. AVM tabela projeleri genellikle mağaza açılış takvimi ile paralel yürütülür ve teslim sürelerine titizlikle uyulması gerekir. A2 Reklam olarak AVM açılış projelerinde çoklu mağaza tabelası üretim deneyimimiz bulunmaktadır. Her mağazanın marka kimliğini doğru yansıtırken AVM yönetiminin belirlediği teknik standartlara da tam uyum sağlıyoruz. AVM dışındaki reklam alanları, dijital ekran entegrasyonu ve mevsimsel kampanya görsellerinin uygulanması da hizmetlerimiz arasındadır. Kalite kontrol sürecimiz sayesinde her tabelanın kusursuz çıkmasını garanti ediyoruz. A2 Reklam olarak AVM içerisindeki farklı sektörlerden mağazalara — giyim, elektronik, gıda, kozmetik — tabela deneyimimiz bulunmaktadır. Her markanın özel gereksinimlerini anlıyor ve AVM standartları çerçevesinde en etkili çözümü sunuyoruz.`,
      benefits: [
        'AVM yönetimi standartlarına tam uyumluluk',
        'Işıklı kutu harf ile yüksek görsel etki',
        'Mesai saatleri dışında planlanan montaj',
        'Dış mekan totem ve otopark yönlendirme',
        'Paslanmaz, akrilik ve alumınyum malzeme seçenekleri',
      ],
      popularTypes: [
        {
          name: 'Işıklı Kutu Harf Tabela',
          description:
            'LED aydınlatmalı üç boyutlu harfler ile mağaza cephesi tabelası. AVM içerisinde en yaygın kullanılan tabela türüdür.',
        },
        {
          name: 'Light Box Tabela',
          description:
            'Akrilik yüzeyli, homojen ışık dağılımlı kutu tabela. Logo ve görsellerin net görüntülenmesini sağlar.',
        },
        {
          name: 'Yönlendirme ve Kat Bilgilendirme',
          description:
            'AVM içerisinde ziyaretçi yönlendirme panoları, kat planları ve dijital bilgilendirme ekranları.',
        },
        {
          name: 'Dış Mekan Totem Tabela',
          description:
            'AVM girişi veya otopark alanında konumlanan yüksek direk tabela. Uzak mesafeden görünürlük sağlar.',
        },
      ],
      faq: [
        {
          question: 'AVM tabelası yaptırmak için nelere dikkat etmeliyim?',
          answer:
            'AVM yönetiminin tabela standartlarını (ölçü, malzeme, aydınlatma) önceden öğrenmek gerekir. A2 Reklam bu standartlara hakim olup projenizi buna göre yönetir.',
        },
        {
          question: 'AVM içerisinde montaj nasıl yapılır?',
          answer:
            'AVM tabelaları genellikle alışveriş saatleri dışında, gece montajı şeklinde gerçekleştirilir. AVM yönetimiyle koordineli çalışılır.',
        },
        {
          question: 'AVM tabelası üretim süresi ne kadardır?',
          answer:
            'Standart AVM tabelaları için üretim süresi 7-15 iş günü arasında değişir. AVM açılış projeleri için özel takvim planlanabilir.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'totem', 'yonlendirme', 'paslanmaz-harfler'],
    materialTable: [
      { name: 'LED Kutu Harf (Mağaza)', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺15.000 – ₺60.000' },
      { name: 'Dijital LED Ekran', durability: '10+ yıl', lighting: 'Full LED panel', priceRange: '₺40.000 – ₺150.000' },
      { name: 'Fener Tabela', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺5.000 – ₺18.000' },
      { name: 'Yönlendirme Sistemi', durability: '10+ yıl', lighting: 'LED arka aydınlatma', priceRange: '₺8.000 – ₺30.000' },
    ],
  },
  {
    slug: 'hastane-tabelasi',
    name: 'Hastane Tabelası',
    title: 'Hastane Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul hastane ve sağlık merkezi tabelası imalatı. Yönlendirme, cephe tabela ve kapı isimlik. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Hastane Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🏥',
    content: {
      intro: `Hastane, poliklinik ve sağlık merkezleri, tabela ve yönlendirme sisteminin en kritik olduğu tesislerdir. Hasta ve hasta yakınlarının stresli anlarında doğru yöne hızla ulaşması hayat kurtarabilir. İstanbul’un Şişli, Fatih, Bakırköy, Kadıköy ve Üsküdar gibi büyük hastanelerin bulunduğu ilçelerinde kapsamlı hastane tabela projeleri gerçekleştiren A2 Reklam, dış cephe tabelaları, acil giriş yönlendirmesi, iç mekân yönlendirme sistemi, poliklinik kapı isimlikleri ve kat bilgilendirme panoları üretmektedir. Sağlık tesisi tabelalarında Sağlık Bakanlığı düzenlemelerine uyum zorunludur; biz bu kurallara hakim olarak tasarım ve üretim gerçekleştiriyoruz. Yönlendirme sistemimiz uluslararası sağlık tesisi standartlarına (JCI) uyumlu olup renk kodlaması, sembol kullanımı ve çok dilli bilgilendirme içerir. Acil servis, radyoloji, laboratuvar, ameliyathane ve yoğun bakım gibi kritik alanlar için özel yönlendirme çözümleri üretiyoruz. Yangın tahliye planları ve acil çıkış tabelaları da hizmet kapsamımız dahilindedir. Hastane tabela projeleri özel uzmanlık gerektiren kapsamlı projelerdir. Acil servis yönlendirmesinin net ve hızlı algılanabilir olması hayat kurtarıcı önem taşır. A2 Reklam olarak acil durumlarda fosforlu ve ışıklı malzeme kullanarak karanlıkta bile okunabilir yönlendirme sistemleri üretiyoruz. Engelli erişim yönlendirmesi, braille alfabeli bilgilendirme panelleri ve çok dilli tabela çözümleri de hizmet kapsamımız dahilindedir. Mevcut hastanelerin tabela yenileme projeleri için de hastane işleyişini aksatmadan aşamalı montaj planlaması yapıyoruz. Mevcut hastanelerin yıpranmış tabela sistemlerinin yenilenmesi projeleri de gerçekleştiriyoruz. Bölüm isimlendirme standartlarının güncellenmesi, yeni poliklinik eklenmesi veya bina taşınması durumlarında komple tabela projesi yönetimi sunuyoruz. A2 Reklam olarak sağlık sektöründeki tabela ihtiyaçlarına hakim deneyimli ekibimizle hizmet veriyoruz.`,
      benefits: [
        'Sağlık Bakanlığı ve JCI standartlarına uygunluk',
        'Renk kodlamalı yönlendirme sistemi',
        'Acil servis yönlendirmesi dahil kapsamlı çözüm',
        'Çok dilli bilgilendirme seçeneği',
        'Yangın tahliye planı ve acil çıkış tabelaları',
        'Poliklinik kapı isimlik ve kat bilgilendirme',
      ],
      popularTypes: [
        {
          name: 'Dış Cephe Tabelası',
          description:
            'Hastane adı ve logosu içeren büyük ebat ışıklı tabela. Gece-gündüz görünürlük sağlar ve hastaya yön verir.',
        },
        {
          name: 'İç Mekân Yönlendirme Sistemi',
          description:
            'Kat yönlendirme, bölüm bilgilendirme ve renk kodlamalı yönlendirme panoları. Hasta ve ziyaretçi deneyimini iyileştirir.',
        },
        {
          name: 'Poliklinik Kapı İsimlik',
          description:
            'Hekim adı, uzmanlık alanı ve oda numarası bilgilerini içeren kapı isimlikleri. Değiştirilebilir panel sistemiyle üretilir.',
        },
        {
          name: 'Acil Giriş Yönlendirmesi',
          description:
            'ışıklı ve fosforlu malzeme ile üretilen acil servis giriş yönlendirme tabelaları. 7/24 net görünürlük sağlar.',
        },
      ],
      faq: [
        {
          question: 'Hastane yönlendirme sistemi neleri kapsar?',
          answer:
            'Dış mekan yönlendirme, giriş lobi panosu, kat bilgilendirme, poliklinik yönlendirme, acil servis, laboratuvar, radyoloji ve otopark yönlendirmesini kapsar.',
        },
        {
          question: 'Sağlık tesisi tabelasında yasal zorunluluklar nelerdir?',
          answer:
            'Sağlık Bakanlığı düzenlemeleri tabela boyutu, içerik ve tasarım konusunda kurallar belirler. Ayrıca JCI akreditasyonu olan hastaneler için ek standartlar vardır.',
        },
        {
          question: 'Hastane tabela projesi ne kadar sürer?',
          answer:
            'Kapsamlı bir hastane yönlendirme projesi tasarım dahil 15-30 iş günü sürebilir. Küçük ölçekli projeler daha kısa sürede tamamlanır.',
        },
      ],
    },
    relatedServices: ['yonlendirme', 'cephe-tabela', 'kapi-isimlik', 'isikli-tabela'],
    materialTable: [
      { name: 'Paslanmaz Kutu Harf', durability: '20+ yıl', lighting: 'Halo LED aydınlatma', priceRange: '₺15.000 – ₺60.000' },
      { name: 'LED Yönlendirme Tabela', durability: '10+ yıl', lighting: 'Dahili LED panel', priceRange: '₺3.000 – ₺12.000' },
      { name: 'Acil Işıklı Tabela', durability: '10+ yıl', lighting: 'Sabit LED', priceRange: '₺5.000 – ₺15.000' },
      { name: 'Totem / Pylon Tabela', durability: '15+ yıl', lighting: 'Dahili LED', priceRange: '₺30.000 – ₺100.000' },
    ],
  },
  {
    slug: 'okul-tabelasi',
    name: 'Okul Tabelası',
    title: 'Okul Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul okul, kreş ve eğitim kurumu tabelası imalatı. Cephe tabela ve yönlendirme sistemleri. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Okul Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🎓',
    content: {
      intro: `Okul, kreş ve eğitim kurumları için tabela; kurumsal kimliğin yansıtılması, güven algısının oluşturulması ve velilere profesyonel bir ilk izlenim bırakılması açısından önemlidir. İstanbul’un Kadıköy, Bakırköy, Ataşehir, Başakşehir ve Beylikdüzü gibi genç nüfusun ve aile yoğunluğunun yüksek olduğu ilçelerinde özel okul ve kreşler arasındaki rekabet artmaktadır. A2 Reklam olarak cephe tabelaları, ışıklı kutu harf uygulamaları, bahçe kapısı tabelası, iç mekân yönlendirme ve sınıf kapı isimlikleri ile eğitim kurumlarına kapsamlı tabela çözümleri sunuyoruz. Kreşler için renkli ve eğlenceli tasarımlar, ilköğretim ve lise için kurumsal ve ciddi tasarım dilleri geliştiriyoruz. MEB düzenlemelerine uygun tabela ölçü ve içerikleri konusunda deneyim sahibiyiz. Bina cephesine uygulanan tabelaların yanı sıra okul bahçesi yönlendirme levhaları, otopark tabelaları ve spor alanı bilgilendirme panoları da hizmet kapsamımız dahilindedir. Çocuk güvenliğine uygun, keskin kenarsız ve sağlam malzeme kullanımı öncelikli ilkemizdir. Okul tabelası yaptırırken eğitim kurumunun prestijini yansıtan ve velilere güven veren bir tasarım oluşturmak esastır. Özel okullar arasındaki rekabetin yoğun olduğu İstanbul Eğitim kurumlarının tabela ihtiyaçları yalnızca cephe tabelasıyla sınırlı değildir. Spor salonu, yüzüme havuzu, kütüphane ve yemekhane gibi alanlar için de yönlendirme ve bilgilendirme tabelaları gereklidir. Kampus yapısına sahip okullarda dış mekan yönlendirme, otopark tabelaları ve bina isimlendirme projeleri de gerçekleştiriyoruz. A2 Reklam olarak İstanbul Kreş ve anaokulları için parlak renkler ve büyük figürler velilerin dikkatini çekerken çocukların da ilgisini çeker. İlköğretim okulları için dinamik tasarımlar, liseler için ise kurumsal ve ciddi bir görsel dil tercih edilir.’daki özel okul ve kreşlere özel tabela çözümleri sunuyor, dönem başı yoğunluğunda hızlı üretim ve teslimat garantisi veriyoruz.’da etkili bir tabela yatırımı, öğrenci kazanımında doğrudan rol oynayabilir. A2 Reklam olarak anaokulu ve kreşler için çocuk dostu renkli tasarımlar, ilk ve ortaokul için dinamik ve enerjik çözümler, lise ve üniversite için kurumsal ve ciddi tabela dilleri geliştiriyoruz. Okul bina yönetimi ve müteahhit firmalarla koordineli çalışarak yeni bina projelerinde de tabela entegrasyonu sağlıyoruz.`,
      benefits: [
        'MEB düzenlemelerine uygun tabela tasarımı',
        'Çocuk güvenliğine uygun keskin kenarsız malzeme',
        'Kreş için renkli ve eğlenceli tasarım dili',
        'Bahçe ve otopark yönlendirme çözümleri',
        'Kurumsal kimliğe uygun profesyonel görünüm',
      ],
      popularTypes: [
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Okul adı ve logosu içeren LED aydınlatmalı cephe tabelası. Velilere güven veren profesyonel bir görünüm oluşturur.',
        },
        {
          name: 'Bahçe Kapısı Tabelası',
          description:
            'Okul giriş kapısına montajlanan kutu harf veya pleksi tabela. Kurumsal renk ve logoyla üretilir.',
        },
        {
          name: 'Sınıf Kapı İsimlik ve Yönlendirme',
          description:
            'Sınıf isimlikleri, kat bilgilendirme panoları ve iç mekân yönlendirme tabelaları. Öğrenci ve velilerin kolay yön bulmasını sağlar.',
        },
      ],
      faq: [
        {
          question: 'Okul tabelası için MEB’’in kuralları var mı?',
          answer:
            'Milli Eğitim Bakanlığı’nın özel öğretim kurumları için tabela içeriği ve boyutuna dair düzenlemeleri vardır. A2 Reklam bu kurallara uygun üretim yapar.',
        },
        {
          question: 'Kreş tabelası için ne tür malzeme kullanılır?',
          answer:
            'Çocuk güvenliği ön planda tutularak keskin kenarsız, yuvarlatılmış hatlı malzemeler tercih edilir. Genellikle akrilik ve PVC bazlı malzemeler kullanılır.',
        },
        {
          question: 'Okul tabelası ne kadar sürede hazır olur?',
          answer:
            'Üretim süresi projenin kapsamına göre 5-10 iş günü arasında değişir. Dönem başı yoğunluk dönemlerinde erken sipariş önerilir.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'cephe-tabela', 'yonlendirme', 'kapi-isimlik'],
    materialTable: [
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺10.000 – ₺35.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺8.000 – ₺25.000' },
      { name: 'Totem Tabela', durability: '15+ yıl', lighting: 'Dahili LED', priceRange: '₺20.000 – ₺60.000' },
      { name: 'Yönlendirme Tabela', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺3.000 – ₺10.000' },
    ],
  },
  {
    slug: 'benzin-istasyonu-tabelasi',
    name: 'Benzin İstasyonu Tabelası',
    title:
      'Benzin İstasyonu Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul benzin istasyonu tabelası imalatı. Totem tabela, LED fiyat göstergesi ve pano çözümleri. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Benzin İstasyonu Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '⛽',
    content: {
      intro: `Benzin istasyonları ve akaryakıt bayileri için tabela sistemi, sürücülerin uzak mesafeden istasyonu fark etmesini ve fiyat bilgisini görebilmesini sağlayan kritik bir yatırımdır. İstanbul’un E-5, TEM ve sahil yolları gibi ana arter üzerindeki istasyonlarda yüksek totem tabelalar ve LED fiyat göstergeleri vazgeçilmezdir. A2 Reklam olarak benzin istasyonlarına özel totem tabelalar, LED akaryakıt fiyat panoları, ışıklı cephe tabelaları ve kanopi (çatı) altı tabelalar üretiyoruz. Totem tabelalarımız 6-12 metre yüksekliğe kadar üretilmekte olup çelik konstrüksiyon taşıyıcı sistem ve statik hesapla mühendislik güvenliği sağlanır. LED akaryakıt fiyat göstergeleri uzaktan kumanda veya bilgisayar kontrollü olup fiyat değişikliklerini anında yansıtabilir. Kanopi altı tabelalar istasyon markasını ve hizmet alanlarını belirtir. Akaryakıt sektörünün yatırım büyüklüğü göz önüne alındığında tabela kalitesinde taviz vermemek gerekir. Tüm ürünlerimiz dış mekâna dayanıklı ve IP65 koruma sınıfındadır. Benzin istasyonu tabela projelerinde marka standardizasyonu büyük önem taşır. BP, Shell, Opet, Petrol Ofisi gibi büyük akaryakıt şirketlerinin bayileri için kurumsal standartlara uygun seri üretim kapasitemiz mevcuttur. Bağımsız istasyonlar için ise özel tasarım totem ve cephe tabelaları üretiyoruz. A2 Reklam olarak İstanbul ve çevresindeki ana arter üzerindeki istasyonlara hizmet veriyoruz. Fiyat panolarımız uzun ömürlü LED modüllerle donatılmış olup gündüz güneş altında bile net okunabilirlik sağlar. Kanopi aydınlatma ve yer işaretleme tabelaları da hizmet kapsamımız dahilindedir. Benzin istasyonlarının 7/24 açık olması nedeniyle tabela aydınlatmasının kesintisiz çalışması gereklidir. LED sistemlerimiz uzun ömürlü ve enerji tasarruflu olup yıllarca bakım gerektirmeden hizmet verir.`,
      benefits: [
        'Yüksek totem tabela ile uzak mesafeden görünürlük',
        'LED fiyat göstergesi ile anında fiyat güncelleme',
        'Çelik konstrüksiyon ve statik hesaplı güvenli montaj',
        'IP65 dış mekan dayanıklılığı',
        'Kanopi altı marka ve hizmet tabelaları',
        'Uzaktan kumanda veya bilgisayar kontrollü fiyat sistemi',
      ],
      popularTypes: [
        {
          name: 'Totem Tabela',
          description:
            '6-12 metre yüksekliğinde çelik konstrüksiyon üzeri ışıklı tabela. Ana yoldan sürücülerin istasyonu fark etmesini sağlar.',
        },
        {
          name: 'LED Akaryakıt Fiyat Panosu',
          description:
            'Uzaktan kumandalı veya bilgisayar kontrollü dijital LED fiyat göstergesi. Fiyat değişikliklerini anında yansıtır.',
        },
        {
          name: 'Kanopi Altı Tabela',
          description:
            'İstasyon çatısı altına montajlanan marka ve hizmet bilgilendirme tabelaları. Pompa alanlarını belirtir.',
        },
      ],
      faq: [
        {
          question: 'Benzin istasyonu totem tabelası ne kadara mal olur?',
          answer:
            'Totem tabela fiyatı yükseklik, malzeme ve LED sistem kalitesine göre proje bazlı belirlenir. Ücretsiz keşif ve detaylı fiyat teklifi sunuyoruz.',
        },
        {
          question: 'LED fiyat panosu uzaktan kontrol edilebilir mi?',
          answer:
            'Evet, LED fiyat panolarımız uzaktan kumanda veya bilgisayar yazılımı üzerinden kontrol edilerek fiyat güncellemesi yapılabilir.',
        },
        {
          question: 'Totem tabela için belediye izni gerekli mi?',
          answer:
            'Evet, yol kenarındaki totem tabelalar için ilçe belediyesinden ilan-reklam ruhsatı ve gerekirse Karayolları Genel Müdürlüğü izni alınmalıdır.',
        },
        {
          question: 'Totem tabela rüzgara dayanıklı mı?',
          answer:
            'Evet, tüm totem tabelalarımız mühendislik ofisi tarafından yapılan statik hesaplama ile rüzgar ve deprem yüklerine karşı dayanıklı tasarlanır.',
        },
      ],
    },
    relatedServices: ['totem', 'isikli-tabela', 'cephe-tabela'],
    materialTable: [
      { name: 'Totem / Pylon Tabela', durability: '15+ yıl', lighting: 'Dahili LED panel', priceRange: '₺40.000 – ₺150.000' },
      { name: 'Kanopi Aydınlatma', durability: '10+ yıl', lighting: 'LED bant / panel', priceRange: '₺20.000 – ₺60.000' },
      { name: 'Pompa Üstü Tabela', durability: '10+ yıl', lighting: 'Işıklı kutu', priceRange: '₺8.000 – ₺25.000' },
      { name: 'Cephe Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺15.000 – ₺50.000' },
    ],
  },
  {
    slug: 'kargo-lojistik-tabelasi',
    name: 'Kargo & Lojistik Tabelası',
    title: 'Kargo & Lojistik Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul kargo ve lojistik tabelası imalatı. Işıklı cephe, depo tabelası ve araç giydirme. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Kargo & Lojistik Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '📦',
    content: {
      intro: `Kargo şubeleri, lojistik firmaları ve depo tesisleri için tabela sistemi, müşterilerin ve iş ortaklarının tesisi kolay bulması açısından büyük önem taşır. İstanbul’un Hadimköy, Tuzla, Çatalca ve Esenyurt gibi lojistik merkezlerinin yoğunlaştığı bölgelerinde tesislerin görünürlüğü kritiktir. A2 Reklam olarak kargo şubelerine özel ışıklı cephe tabelaları, depo cephe giydirme projeleri, totem tabelalar, araç giydirme ve yönlendirme tabelaları üretiyoruz. Kargo şubeleri genellikle cadde üzerinde konumlandığından ışıklı ve dikkat çekici cephe tabelaları müşteri trafiğini artırır. Depo ve lojistik merkezlerinde büyük ebat cephe giydirme ve totem tabela ile kurumsal görünüm oluşturulur. Kargo firmalarının araç filoları için de araç giydirme hizmeti sunuyoruz; bu sayede her yolculuk bir reklam fırsatına dönüşür. Kurumsal bayilik standartlarına uygun tabela üretiminde büyük kargo firmalarıyla çalışma deneyimimiz mevcuttur. Tüm tabelalarımız dış mekâna dayanıklı malzemelerle üretilmektedir. Kargo ve lojistik sektöründe tabela yatırımı, müşteri güvenini artırmanın ve profesyonel bir marka algısı oluşturmanın en etkili yoludur. Özellikle yeni açılan şubeler için hızlı tabela üretimi ve montajı kritik önem taşır; A2 Reklam olarak acil açılış projelerinde ekspres üretim kapasitemiz mevcuttur. İstanbul Ayrıca kargo şubelerinin iç mekanında müşteri bekleme alanı, gönderi kabul ve teslimat noktaları için yönlendirme tabelaları da üretiyoruz. Depo ve lojistik merkezlerinde güvenlik ve uyarı tabelaları, yangın tahliye planları ve kat bilgilendirme panoları da hizmet kapsamımız dahilindedir. Kağıthane atölyemizden İstanbul geneline hızlı teslimat ve montaj hizmeti sunuyoruz.’un tüm ilçelerinde kargo şube tabelası projesi deneyimimiz bulunmaktadır. Lojistik depo ve dağıtım merkezleri için büyük ebat cephe giydirme ve yönlendirme sistemi projeleri de gerçekleştiriyoruz. Kurumsal bayilik standartlarına hakim ekibimiz ile sorunsuz bir süreç yönetimi sunuyoruz.`,
      benefits: [
        'Kurumsal bayilik standartlarına uyumlu üretim',
        'Araç giydirme ile mobil reklam',
        'Depo cephe giydirme ile büyük etki alanı',
        'Işıklı tabela ile gece-gündüz görünürlük',
        'Totem tabela ile ana yoldan görülebilirlik',
      ],
      popularTypes: [
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Kargo şubesi adı ve logosu içeren LED aydınlatmalı cephe tabelası. Müşterilerin şubeyi kolay bulmasını sağlar.',
        },
        {
          name: 'Araç Giydirme',
          description:
            'Kargo araçlarının tam veya kısmi folyo ile kaplanması. Her teslimat sürecinde marka görünürlüğü sağlar.',
        },
        {
          name: 'Depo Cephe Giydirme',
          description:
            'Lojistik depo cephesinin kompozit panel veya branda ile kaplanması. Kurumsal kimlik ve profesyonel görünüm sunar.',
        },
      ],
      faq: [
        {
          question: 'Kargo şubesi tabelası ne kadar sürede hazır olur?',
          answer:
            'Standart kargo şube tabelaları için üretim süresi 5-7 iş günüdür. Montaj genellikle 1 gün içinde tamamlanır.',
        },
        {
          question: 'Araç giydirme ne kadar dayanır?',
          answer:
            'Kaliteli araç giydirme folyoları 3-5 yıl boyunca renk solması olmadan dayanıklılık gösterir. Düzgün yıkama ve bakım ömürü uzatır.',
        },
        {
          question: 'Mevcut bayilik tabelamızı yenileyebilir misiniz?',
          answer:
            'Evet, mevcut kasanız uygunsa üzerine yeni baskı ve giydirme yapabilir veya komple yeni tabela üretebiliriz.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'cephe-tabela', 'arac-giydirme', 'totem'],
    materialTable: [
      { name: 'Cephe Giydirme (ACP)', durability: '15+ yıl', lighting: 'LED spot', priceRange: '₺20.000 – ₺80.000' },
      { name: 'Totem Tabela', durability: '15+ yıl', lighting: 'Dahili LED panel', priceRange: '₺25.000 – ₺80.000' },
      { name: 'Araç Giydirme (Filo)', durability: '3-5 yıl', lighting: 'Reflektif folyo', priceRange: '₺8.000 – ₺30.000 /araç' },
      { name: 'Depo Yönlendirme', durability: '10+ yıl', lighting: 'LED (opsiyonel)', priceRange: '₺2.000 – ₺8.000' },
    ],
  },
  {
    slug: 'firin-pastane-tabelasi',
    name: 'Fırın & Pastane Tabelası',
    title: 'Fırın & Pastane Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul fırın ve pastane tabelası imalatı. Işıklı tabela, vitrin folyo ve menü panosu. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Fırın & Pastane Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🍞',
    content: {
      intro: `Fırın ve pastaneler, İstanbul’un her mahallesinde bulunan ve günlük yaşamın vazgeçilmez parçası olan işletmelerdir. Fatih, Üsküdar, Beyoğlu, Bağcılar ve Pendik gibi ilçelerde her mahallede birden fazla fırın bulunur ve bu rekabet ortamında fark edilmek tabela tasarımına bağlıdır. A2 Reklam olarak fırın ve pastanelere özel ışıklı cephe tabelaları, vitrin cam folyo uygulamaları, menü panoları, fener tabelalar ve neon LED dekoratif yazılar üretiyoruz. Sıcak ekmek kokusunun yanına dikkat çekici bir tabela eklendiğinde müşteri trafiği katlanarak artar. Vitrin camına uygulanan folyo ile hem ürün görselleri hem de fırın ismi sergilenebilir. Özellikle sabah erken saatlerden itibaren açık olan fırınlar için ışıklı tabela ve fener tabela çözümleri gece-gündüz görünürlük sağlar. Pastaneler için ise şık ve estetik tasarım dili ön plana çıkmakta; neon LED yazılar ve ahşap görünümlü tabelalar tercih edilmektedir. Sıcaklık, un tozu ve yağ buharına dayanıklı malzeme seçimi yapılmaktadır. Fırın ve pastane tabelası seçiminde dikkat edilmesi gereken önemli unsurlar; tabelanın mahalle sakinleri tarafından kolayca fark edilmesi, açılış saatlerinde görünürlük sağlaması ve işletmenin sıcak, samimi atmosferini yansıtmasıdır. Pastane tabelalarında estetik ve şıklık ön planda tutulurken, ekmek fırınları için sade ve okunabilir tasarımlar tercih edilmektedir. A2 Reklam olarak İstanbul Zincir fırın ve pastane markası olan işletmeler için tüm şubelerde tutarlı kurumsal tabela üretimi yapabiliyoruz. Her şube açılışında hızlı üretim ve montaj kapasitemizle zamanlı teslim garantisi veriyoruz. Kağıthane atölyemizde kendi bünyemizde üretim yaparak aracı maliyetlerini ortadan kaldırıyor ve ekonomik fiyatlar sunuyoruz.’un her semtinde fırın ve pastane tabelası projesi gerçekleştirdik; Kağıthane atölyemizde kendi bünyemizde üretim yaparak kalite kontrolünü sağlıyoruz. Yeni açılacak fırınlar için cephe analizi yaparak en etkili tabela konumlandırmasını öneriyoruz.`,
      benefits: [
        'Gece-gündüz görünürlük sağlayan ışıklı tabela',
        'Vitrin folyo ile ürün sergileme ve marka görünürlüğü',
        'Sıcaklık ve buhara dayanıklı malzeme seçimi',
        'Fener tabela ile cadde üzerinde dikkat çekme',
        'Ekonomik fiyatlı çözüm alternatifleri',
      ],
      popularTypes: [
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Fırın veya pastane adı içeren LED aydınlatmalı cephe tabelası. Erken saatlerden itibaren görünürlük sağlar.',
        },
        {
          name: 'Fener Tabela',
          description:
            'Dükkân cephesine dik monte edilen çift yüzlü ışıklı tabela. Yayaların her iki yönden fırını görmesini sağlar.',
        },
        {
          name: 'Vitrin Folyo Uygulaması',
          description:
            'Cam yüzeyine uygulanan dijital baskı folyo ile ürün görselleri ve marka kimliği sergilenir.',
        },
        {
          name: 'Neon LED Dekoratif Yazı',
          description:
            'Pastane içerisinde dekoratif amaçlı esnek neon LED yazılar. Sosyal medya paylaşımı için ideal görsel unsur oluşturur.',
        },
      ],
      faq: [
        {
          question: 'Fırın tabelası ne kadar tutar?',
          answer:
            'Fırın tabelası fiyatı boyut ve türe göre değişir. Ekonomik light box tabeladan prestijli kutu harf tabelaya kadar farklı bütçe seçenekleri mevcuttur.',
        },
        {
          question: 'Fırın tabelası sıcaklığa dayanıklı mı?',
          answer:
            'Dış mekâna dayanıklı malzemeler kullanıyoruz. Fırın bacası yakınındaki tabelalar için özel ısıya dayanıklı malzeme seçimi yapılmaktadır.',
        },
        {
          question: 'Vitrin folyo uygulaması çıkarılabilir mi?',
          answer:
            'Evet, profesyonel uygulama ile monte edilen folyolar camı bozmadan temiz bir şekilde sökülebilir.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'fener-tabela', 'cephe-tabela'],
    materialTable: [
      { name: 'Neon LED Tabela', durability: '5+ yıl', lighting: 'Neon flex LED', priceRange: '₺5.000 – ₺18.000' },
      { name: 'Ahşap Tabela (Emprenye)', durability: '5-10 yıl', lighting: 'Harici LED spot', priceRange: '₺5.000 – ₺15.000' },
      { name: 'Fener Tabela', durability: '10+ yıl', lighting: 'Dahili LED panel', priceRange: '₺4.000 – ₺12.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺8.000 – ₺22.000' },
    ],
  },
  {
    slug: 'veteriner-tabelasi',
    name: 'Veteriner Tabelası',
    title: 'Veteriner Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul veteriner kliniği ve pet shop tabelası imalatı. Işıklı, kutu harf ve fener tabela. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Veteriner Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🐾',
    content: {
      intro: `Veteriner klinikleri ve pet shop’’lar, evcil hayvan sahiplerinin güvendiği ve kolaylıkla ulaşabildiği tesisler olmalıdır. İstanbul’un Kadıköy, Beşiktaş, Sarıyer, Bakırköy ve Ataşehir gibi evcil hayvan popülasyonunun yüksek olduğu ilçelerinde veteriner klinikleri yoğun bir rekabet içindedir. A2 Reklam olarak veteriner klinikleri ve pet shop’’lara özel ışıklı cephe tabelaları, kutu harf uygulamaları, fener tabelalar ve cam folyo çözümleri üretiyoruz. Veteriner tabelası tasarımında sıcak, samimi ve güven veren bir görsel dil ön plana çıkar. Pati izi, hayvan siluetleri ve canlı renkler bu sektörün tabela tasarımında sık kullanılan unsurlardır. 7/24 acil veteriner hizmeti sunan klinikler için gece görünürlüğü sağlayan ışıklı tabela çözümleri kritik önemdedir. Pet shop’’lar için ise vitrin cam folyo uygulaması ile ürün çeşitliliği ve marka kimliği sergilenebilir. Malzeme seçiminde kolay temizlenebilir ve hijyenik yüzeyler tercih ediyoruz. Ücretsiz keşif ve tasarım hizmeti sunuyoruz. Veteriner tabelası tasarımında evcil hayvan sahiplerine sıcak ve güven verici bir mesaj iletmek esastır. Klinik hizmetleri, acil müdahale saatleri ve iletişim bilgileri tabelada net bir şekilde yer almalıdır. Pet shop tabelaları için ise renkli, canlı ve davetkar bir tasarım dili tercih edilmektedir. A2 Reklam olarak her iki segment için de özel çözümler geliştiriyoruz. İstanbul Veteriner kliniği açılışlarında tabela, vitrin folyo ve yönlendirme tabelasını içeren paket çözümler sunuyoruz. Bu paketler yeni açılan klinikler için maliyet avantajı sağlarken profesyonel bir başlangıç yapmalarını mümkün kılar.’un evcil hayvan sahipliğinin yoğun olduğu semtlerinde onlarca veteriner ve pet shop tabela projesi gerçekleştirdik. Kağıthane atölyemizden İstanbul geneline ücretsiz keşif ve montaj hizmeti sunuyoruz.`,
      benefits: [
        'Sıcak ve güven veren tabela tasarım dili',
        '7/24 acil hizmet için ışıklı gece görünürlüğü',
        'Kolay temizlenebilir hijyenik malzeme',
        'Pati izi ve hayvan figrüleri ile sektöre özel tasarım',
        'Fener tabela ile yayalardan görünürlük',
      ],
      popularTypes: [
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Klinik adı, logosu ve pati izi gibi sektörel semboller içeren LED aydınlatmalı tabela. Gece acil durumlar için görünürlük sağlar.',
        },
        {
          name: 'Kutu Harf Tabela',
          description:
            'Paslanmaz veya galvaniz gövdeli üç boyutlu harfler. Profesyonel ve modern bir görünüm sunar.',
        },
        {
          name: 'Fener Tabela',
          description:
            'Cepheye dik monte edilen çift yüzlü ışıklı tabela. Cadde üzerinde yayaların her iki yönden görmesini sağlar.',
        },
      ],
      faq: [
        {
          question: 'Veteriner tabelası için özel bir izin gerekli mi?',
          answer:
            'İlçe belediyesinden standart ilan-reklam ruhsatı yeterlidir. Tabela içeriğinde Tarım ve Orman Bakanlığı düzenlemelerine dikkat edilmelidir.',
        },
        {
          question: 'Veteriner tabelası ne kadar sürede hazır olur?',
          answer:
            'Üretim süresi tabela türüne göre 5-7 iş günüdür. Acil açılış projeleri için hızlandırılmış üretim mevcuttur.',
        },
        {
          question: 'Pet shop tabelası ile veteriner tabelası farkı nedir?',
          answer:
            'Tasarım dili benzer olmakla birlikte veteriner klinikleri daha klinik ve profesyonel, pet shop\u2019lar ise daha renkli ve ticari bir tasarım diline yönelik olabilir.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'fener-tabela', 'paslanmaz-harfler'],
    materialTable: [
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺8.000 – ₺25.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺6.000 – ₺18.000' },
      { name: 'Fener Tabela', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺4.000 – ₺12.000' },
      { name: 'Cam Folyo + LED Şerit', durability: '5-7 yıl', lighting: 'LED şerit', priceRange: '₺3.000 – ₺8.000' },
    ],
  },
  {
    slug: 'avukat-hukuk-tabelasi',
    name: 'Avukat & Hukuk Bürosu Tabelası',
    title:
      'Avukat & Hukuk Bürosu Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul avukat ve hukuk bürosu tabelası imalatı. Paslanmaz harf, kapı isimlik ve yönlendirme. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Avukat & Hukuk Bürosu Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '⚖️',
    content: {
      intro: `Avukatlık büroları, hukuk ofisleri ve noter ofisleri için tabela tasarımı; ciddiyet, güven ve profesyonellik mesajı veren bir görsel kimlik oluşturmalıdır. İstanbul’un Şişli, Levent, Ataşehir, Kadıköy ve Çağlayan Adliyesi çevresi gibi hukuk bürolarının yoğunlaştığı bölgelerinde tabela kalitesi büronun itibarını doğrudan yansıtır. A2 Reklam olarak avukat ve hukuk bürolarına özel paslanmaz çelik harf tabelalar, kapı isimlik sistemleri, ofis yönlendirme panoları ve bina giriş tabelası çözümleri sunuyoruz. Hukuk sektöründe sade, şık ve zamansiz bir tasarım dili tercih edilir; parlak krom, fırçalı paslanmaz ve koyu renk pleksi bu dilin temel malzemeleridir. Baro düzenlemelerine uygun tabela içeriği ve boyutu konusunda deneyimli ekibimiz size rehberlik eder. Plaza veya apartman bünyesindeki hukuk ofisleri için bina girişinden ofis kapısına kadar bütünlüklü tabela ve yönlendirme sistemi kuruyoruz. Müvekkil ziyaretlerinde profesyonel ilk izlenim bırakın. Hukuk bürosu tabelası yatırımında müvekkillere ilk temas noktasında profesyonel bir izlenim bırakmak esastır. Tabela malzemesi ve tasarımı büronun uzmanlık alanını ve konumlanmasını yansıtmalıdır. Kurumsal hukuk büroları için minimal ve prestijli çözümler, bireysel avukatlar için ekonomik ancak şık alternatifler sunabiliyoruz. A2 Reklam olarak Çağlayan, Kartal ve Bakırköy Adliyesi çevresindeki hukuk bürolarına çok sayıda tabela projesi gerçekleştirdik. Bina girişinden ofis kapısına kadar bütünlüklü bir yönlendirme sistemi kurarak müvekkillerinizin büronuza sorunsuz ulaşmasını sağlıyoruz. İstanbul Ücretsiz keşif hizmetimizle büronuzun cephe yapısını ve bina giriş alanını yerinde değerlendiriyor, size en uygun tabela çözümü öneriyoruz.’daki büyük hukuk büroları, bireysel avukatlar ve arabuluculuk merkezleri için farklı bütçe ve tasarım seçenekleri mevcut olup Kağıthane atölyemizde kendi bünyemizde üretim yaparak kaliteyi kontrol altında tutuyoruz.`,
      benefits: [
        'Paslanmaz çelik ve krom ile prestijli görünüm',
        'Baro düzenlemelerine uygun tabela içeriği',
        'Sade ve zamansiz tasarım dili',
        'Bina girişinden ofis kapısına bütünlüklü çözüm',
        'Kapı isimlik ve yönlendirme panoları',
      ],
      popularTypes: [
        {
          name: 'Paslanmaz Harf Tabela',
          description:
            'Fırçalı veya parlak paslanmaz çelik harfler. Hukuk bürosuna ciddi ve güvenilir bir görünüm kazandırır.',
        },
        {
          name: 'Kapı İsimlik',
          description:
            'Ofis kapısına montajlanan avukat adı ve unvanı bilgilerini içeren isimlik. Akrilik, cam veya paslanmaz malzeme seçenekleri mevcuttur.',
        },
        {
          name: 'Bina Giriş Tabelası',
          description:
            'Apartman veya plaza girişinde konumlanan hukuk bürosu bilgilendirme tabelası. Ziyaretçilerin doğru kata yönlendirilmesini sağlar.',
        },
      ],
      faq: [
        {
          question: 'Avukat tabelasında ad soyad dışında ne yazabilir?',
          answer:
            'Baro düzenlemelerine göre avukat adı, soyadı ve unvanı yazılabilir. Uzmanlık alanı belirtme konusunda baronuzun kurallarını kontrol etmeniz önerilir.',
        },
        {
          question: 'Hukuk bürosu tabelası ne kadar tutar?',
          answer:
            'Fiyat; malzeme, boyut ve tasarım seçimine göre değişir. Paslanmaz harf tabelalar kapsamlı bir fiyat aralığına sahiptir.',
        },
        {
          question: 'Apartman cephesine tabela montajı yapılabilir mi?',
          answer:
            'Bina yönetiminin yazılı onayı ve belediye ruhsatı ile montaj yapılabilir. Küçük ebat kapı isimlikleri genellikle izin gerektirmez.',
        },
      ],
    },
    relatedServices: ['paslanmaz-harfler', 'kapi-isimlik', 'yonlendirme'],
    materialTable: [
      { name: 'Paslanmaz Kutu Harf', durability: '20+ yıl', lighting: 'Halo LED aydınlatma', priceRange: '₺12.000 – ₺40.000' },
      { name: 'Pleksi Kapı İsimlik', durability: '10+ yıl', lighting: 'Dahili LED', priceRange: '₺2.000 – ₺6.000' },
      { name: 'Cam Folyo (Kumlama)', durability: '10+ yıl', lighting: 'Işıksız', priceRange: '₺1.500 – ₺5.000' },
      { name: 'Alüminyum Profil Tabela', durability: '15+ yıl', lighting: 'LED spot', priceRange: '₺5.000 – ₺15.000' },
    ],
  },
  {
    slug: 'spor-salonu-tabelasi',
    name: 'Spor Salonu Tabelası',
    title: 'Spor Salonu Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul spor salonu ve fitness tabelası imalatı. Işıklı tabela, neon LED ve cephe giydirme. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Spor Salonu Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '💪',
    content: {
      intro: `Spor salonu, fitness merkezi ve gym işletmeleri için tabela; enerjik, dinamik ve motive edici bir marka kimliği oluşturmanın en etkili aracıdır. İstanbul’un Kadıköy, Beşiktaş, Bakırköy, Ataşehir ve Başakşehir gibi genç ve aktif nüfusun yoğun olduğu ilçelerinde spor salonları büyük rekabet içindedir. A2 Reklam olarak spor salonlarına özel ışıklı cephe tabelaları, neon LED dekoratif yazılar, büyük ebat cephe giydirme, fener tabelalar ve cam folyo uygulamaları üretiyoruz. Spor salonlarında tabela tasarımı genellikle cesur renkler, kalın fontlar ve enerji dolu görsellerle desteklenir. Neon LED yazılar iç mekânda motivasyon sloganları olarak kullanılırken, dış cephe tabelaları dikkat çekici boyutlarda üretilir. Cephe giydirme projeleriyle salonun tamamını kapsayan marka görselliği oluşturulabilir. Zemin kattan bodrum kata kadar uzanan büyük format branda baskılar sürücü ve yaya dikkatini anında çeker. Malzeme olarak darbe dayanımlı ve kolay temizlenebilir yüzeyler tercih ediyoruz. A2 Reklam’ın atölyesinden çıkan her tabela enerjinizi sokakta yansıtsın. Spor salonu tabelası yaptırırken hedef kitlenizi tanımak ve tabela tasarımını buna göre şekillendirmek önemlidir. Boutique fitness stüdyoları için minimal ve şık tabelalar, büyük spor zincirleri için kurumsal standartlarda seri üretim ve CrossFit box gibi niş alanlar için endüstriyel tarz çözümler sunabiliyoruz. A2 Reklam olarak İstanbul Spor salonlarının çoğu bodrum veya zemin katta konumlandığından tabela stratejisi cephe görünürlüğünü maksimize edecek şekilde planlanmalıdır. Dijital baskılı branda, fener tabela ve yönlendirme tabelalarının birlikte kullanımı en etkili sonuçları verir.’un en yoğun ilçelerinde çok sayıda spor salonu tabela projesi gerçekleştirdik. Kağıthane atölyemizde kendi bünyemizde üretim yaparak hem kaliteyi kontrol altında tutuyor hem de rekabetçi fiyatlar sunuyoruz. Ücretsiz keşif ve tasarım danışmanlığı hizmetimizle işletmenize en uygun çözümü birlikte belirliyoruz.`,
      benefits: [
        'Enerjik ve dinamik tabela tasarım dili',
        'Neon LED ile iç mekân motivasyon yazıları',
        'Büyük format cephe giydirme ile görsel etki',
        'Darbe dayanımlı ve kolay temizlenebilir malzeme',
        'Fener tabela ile cadde üzerinde görünürlük',
        'Sosyal medya dostu neon köşesi tasarımı',
      ],
      popularTypes: [
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Spor salonu adı ve logosu içeren büyük ebat LED aydınlatmalı tabela. Cesur renkler ve kalın fontlarla dikkat çeker.',
        },
        {
          name: 'Neon LED Motivasyon Yazısı',
          description:
            'Esnek silikon neon LED ile üretilen motivasyon sloganları. İç mekânda enerji ve motivasyon kaynağıdır.',
        },
        {
          name: 'Cephe Giydirme',
          description:
            'Dijital baskılı branda veya kompozit panel ile salonun dış cephesinin tamamının kaplanması. Büyük görsel etki alanı oluşturur.',
        },
      ],
      faq: [
        {
          question: 'Spor salonu tabelası ne kadara mal olur?',
          answer:
            'Fiyat; tabela türü, boyut ve malzemeye göre değişir. Basit bir fener tabeladan kapsamlı cephe giydirme projesine kadar geniş bir fiyat aralığı mevcuttur.',
        },
        {
          question: 'Bodrum kat spor salonu için ne tür tabela önerilir?',
          answer:
            'Cephe giydirme ve fener tabela ile bodrum kat girişini vurgulayabilirsiniz. Ayrıca yönlendirme tabelaları ile müşterilerin girişi kolay bulması sağlanır.',
        },
        {
          question: 'İç mekân neon LED yazı ne kadar dayanır?',
          answer:
            'LED neon tabelalar ortalama 30.000-50.000 saat ömrüyle yıllarca sorunsuz çalışır. Düşük enerji tüketir ve bakım gerektirmez.',
        },
      ],
    },
    relatedServices: ['isikli-tabela', 'cephe-tabela', 'fener-tabela'],
    materialTable: [
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺12.000 – ₺40.000' },
      { name: 'Neon LED Tabela', durability: '5+ yıl', lighting: 'Neon flex LED', priceRange: '₺6.000 – ₺22.000' },
      { name: 'Cephe Giydirme', durability: '15+ yıl', lighting: 'LED spot', priceRange: '₺20.000 – ₺60.000' },
      { name: 'Dijital / Mekanik Pano', durability: '10+ yıl', lighting: 'LED / mekanik', priceRange: '₺10.000 – ₺35.000' },
    ],
  },
  {
    slug: 'oto-yikama-galeri-tabelasi',
    name: 'Oto Yıkama & Galeri Tabelası',
    title:
      'Oto Yıkama & Galeri Tabelası | A2 Reklam — Profesyonel Tabela İmalatı',
    metaDescription:
      'İstanbul oto yıkama ve oto galeri tabelası imalatı. Totem, ışıklı tabela ve araç giydirme. A2 Reklam ✆ 0531 618 16 72',
    h1: 'Oto Yıkama & Galeri Tabelası — İstanbul Profesyonel Tabela Çözümleri',
    icon: '🚗',
    content: {
      intro: `Oto yıkama, oto galeri ve araç bakım merkezleri için tabela; yol üzerinden geçen sürücülerin dikkatini çekmenin ve müşteri trafiği oluşturmanın en etkili yoludur. İstanbul’un Maslak, Levent, Bağcılar, Küçükçekmece ve Tuzla gibi araç trafiğinin yoğun olduğu bölgelerinde oto sektörü firmaları için görünürlük hayati önemdedir. A2 Reklam olarak oto yıkama ve oto galerilere özel totem tabelalar, ışıklı cephe tabelaları, fiyat panoları, araç giydirme hizmeti ve yönlendirme tabelaları üretiyoruz. Totem tabelalar yol kenarında konumlanarak sürücülerin hızıyla geçerken bile tesisi fark etmesini sağlar. Oto yıkama fiyat panoları müşterilerin hizmet seçeneklerini dışarıdan görebilmesini sağlar. Oto galeriler için şık ve güven veren paslanmaz harf tabelalar ile kurumsal kimlik oluşturulur. Su, deterjan ve kimyasal maddelere maruz kalabilecek oto yıkama tabelalarında özel koruma katmanlı malzeme kullanıyoruz. Firma araçlarınız için de araç giydirme hizmeti sunarak yol üzerinde mobil reklam yapmanızı sağlıyoruz. Oto yıkama ve galeri tabelası yatırımında en önemli unsur, yol üzerinden geçen sürücülerin hızla dikkatini çekecek boyut ve aydınlatma kalitesidir. Oto galeriler için şık paslanmaz harf tabelalar müşteri güvenini artırırken, oto yıkamalar için fiyat panosu şeffaf hizmet bilgilendirmesi sağlar. A2 Reklam olarak İstanbul Oto sektöründe müşteri güveni her şeyden önemlidir ve profesyonel bir tabela bu güvenin ilk adımıdır. Galeri showroom içerisinde araç sergileme alanları için aydınlatma ve yönlendirme çözümleri de sunabiliyoruz. Kağıthane atölyemizden İstanbul geneline hızlı teslimat ve montaj hizmeti sağlıyoruz.’un otomotiv sektörünün yoğun olduğu Maslak Oto Center, İkitelli Oto Sanayi ve Tuzla bölgelerinde çok sayıda proje gerçekleştirdik. Kendi bünyemizde üretim yaparak kaliteyi kontrol altında tutuyor ve rekabetçi fiyatlar sunuyoruz. Ücretsiz keşif hizmetimizle ihtiyacınızı yerinde değerlendirip en uygun çözümü öneriyoruz.`,
      benefits: [
        'Totem tabela ile yol üzerinden yüksek görünürlük',
        'Su ve kimyasala dayanıklı özel koruma katmanı',
        'Fiyat panosu ile şeffaf hizmet bilgilendirmesi',
        'Araç giydirme ile mobil reklam',
        'Paslanmaz harf ile galeri prestiji',
        'Gece görünürlük sağlayan LED aydınlatma',
      ],
      popularTypes: [
        {
          name: 'Totem Tabela',
          description:
            'Yol kenarına dikilen yüksek direk üzeri ışıklı tabela. Sürücülerin geçerken tesisi fark etmesini sağlar.',
        },
        {
          name: 'Işıklı Cephe Tabelası',
          description:
            'Oto yıkama veya galeri adı içeren LED aydınlatmalı cephe tabelası. Gece-gündüz görünürlük sağlar.',
        },
        {
          name: 'Fiyat ve Hizmet Panosu',
          description:
            'Yıkama paketlerini ve fiyatlarını gösteren pano. Değiştirilebilir baskı sistemiyle kolaylıkla güncellenebilir.',
        },
        {
          name: 'Araç Giydirme',
          description:
            'Firma araçlarının folyo ile kaplanması. Her yolculuk bir reklam fırsatına dönüşür.',
        },
      ],
      faq: [
        {
          question: 'Oto yıkama tabelası suya dayanıklı mı?',
          answer:
            'Evet, oto yıkama tabelalarımız IP65 koruma sınıfında ve özel su geçirmez kaplamalarla üretilmektedir. Deterjan ve kimyasala karşı da dayanıklıdır.',
        },
        {
          question: 'Oto galeri tabelası için hangi malzeme uygundur?',
          answer:
            'Oto galeriler için paslanmaz çelik harf ve ışıklı kutu harf tabelalar en çok tercih edilen seçeneklerdir. Şık ve güvenilir bir imaj oluşturur.',
        },
        {
          question: 'Oto yıkama fiyat panosu nasıl güncellenir?',
          answer:
            'Değiştirilebilir baskı sistemli panolarda ön kapağı açarak baskıyı değiştirebilirsiniz. Dijital LED panolarda ise uzaktan kumanda ile güncelleme yapılır.',
        },
        {
          question: 'Oto galeri ve oto yıkama aynı tabelada birleştirilebilir mi?',
          answer:
            'Evet, aynı lokasyondaki iki farklı hizmeti tek bir tabela tasarımında birleştirebiliriz. Böylece hem maliyetten tasarruf eder hem de net bilgilendirme sağlarsınız.',
        },
      ],
    },
    relatedServices: ['totem', 'isikli-tabela', 'arac-giydirme', 'cephe-tabela'],
    materialTable: [
      { name: 'Totem Tabela', durability: '15+ yıl', lighting: 'Dahili LED panel', priceRange: '₺25.000 – ₺80.000' },
      { name: 'Işıklı Lightbox', durability: '10+ yıl', lighting: 'Arka LED panel', priceRange: '₺8.000 – ₺30.000' },
      { name: 'LED Kutu Harf', durability: '15+ yıl', lighting: 'Dahili LED modül', priceRange: '₺10.000 – ₺35.000' },
      { name: 'Araç Üstü Reklam', durability: '3-5 yıl', lighting: 'Reflektif folyo', priceRange: '₺5.000 – ₺15.000' },
    ],
  },
];
