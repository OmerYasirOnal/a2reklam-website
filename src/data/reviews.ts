export type Review = {
  author: string;
  text: { tr: string; en: string };
  rating?: number; // 1-5 (optional)
  date?: string; // "2025-01" format (optional)
  highlight?: boolean;
};

export const REVIEWS: Review[] = [
  {
    author: 'BEYZA ERAVCI',
    text: {
      tr: 'Osman Bey ve ekibine Eravcı İnşaat firması olarak çok teşekkür ediyoruz. İş ve işçilik konusunda bizleri mağdur etmeden en kısa sürede yapılacak en iyi işi çıkardılar. Kendi sektörlerinde öncü olduklarını düşünüyorum. Hiç düşünmeden güvenebilir ve işi emanet edebilirsiniz.',
      en: 'Osman Bey ve ekibine Eravcı İnşaat firması olarak çok teşekkür ediyoruz. İş ve işçilik konusunda bizleri mağdur etmeden en kısa sürede yapılacak en iyi işi çıkardılar. Kendi sektörlerinde öncü olduklarını düşünüyorum. Hiç düşünmeden güvenebilir ve işi emanet edebilirsiniz.',
    },
    rating: 5,
    date: '2026-01',
    highlight: true,
  },
  {
    author: 'Kerem Pelit',
    text: {
      tr: 'İşletmemizin bir parçası, ışığımızın parıltısı.. Tam anlamıyla EMEĞİNİN dehası.. A2 reklam ekibi ve Sayın Osman ŞAHİN\'e bir kez daha teşekkürlerimizi eder başarılarının devamını dilerizz 🙏🏼😊 …',
      en: 'İşletmemizin bir parçası, ışığımızın parıltısı.. Tam anlamıyla EMEĞİNİN dehası.. A2 reklam ekibi ve Sayın Osman ŞAHİN\'e bir kez daha teşekkürlerimizi eder başarılarının devamını dilerizz 🙏🏼😊 …',
    },
    rating: 5,
    date: '2026-01',
    highlight: true,
  },
  {
    author: 'Yunus Emre Şahin',
    text: {
      tr: 'Gerçekten piyasada böyle iş yapan sayılı firmalardan birisi işin başlangıcından sonuna kadar profesyonel ve güvenilir hizmet veriyorlar. Türkiyede böyle işi yapıcak firmalar bi elin 5 parmağını geçmez teşekkürler Osman bey ve çalışma ekibine.',
      en: 'Gerçekten piyasada böyle iş yapan sayılı firmalardan birisi işin başlangıcından sonuna kadar profesyonel ve güvenilir hizmet veriyorlar. Türkiyede böyle işi yapıcak firmalar bi elin 5 parmağını geçmez teşekkürler Osman bey ve çalışma ekibine.',
    },
    rating: 5,
    date: '2025-11',
    highlight: false,
  },
  {
    author: 'Ahmet Enes Bozkurt',
    text: {
      tr: 'Osman bey ve ekibini tebrik ederim gerçekten de müthiş bir iş çıkardılar. Yaptıkları iş uzun vadede garanti sağlıyor Osman bey ve ekibinden çok teşekkür ederim. Kesinlikle tavsiyemdir. HAYIRLI İŞLER DİLERİM 🔥🙌 …',
      en: 'Osman bey ve ekibini tebrik ederim gerçekten de müthiş bir iş çıkardılar. Yaptıkları iş uzun vadede garanti sağlıyor Osman bey ve ekibinden çok teşekkür ederim. Kesinlikle tavsiyemdir. HAYIRLI İŞLER DİLERİM 🔥🙌 …',
    },
    rating: 5,
    date: '2026-01',
    highlight: false,
  },
  {
    author: 'Furkanhasan Can',
    text: {
      tr: 'Banko arkasına ve önüne logo ve paslanmaz harfler yaptırdık, malzeme kalitesi, işçiliği ve ekip çalışması özenliydi.Kesinlikle tavsiye ederiz.👍🏻👍🏻 …',
      en: 'Banko arkasına ve önüne logo ve paslanmaz harfler yaptırdık, malzeme kalitesi, işçiliği ve ekip çalışması özenliydi.Kesinlikle tavsiye ederiz.👍🏻👍🏻 …',
    },
    rating: 5,
    date: '2025-10',
    highlight: true,
  },
  {
    author: 'Mustafa Baz',
    text: {
      tr: 'Osman bey gerek ilgi alakası gerekse iş konusunda titiz ve detaycı bir çalışma anlayışına sahip, buda iş konusunda karşı tarafa güven veriyor.\nAracımız üzerindeki folyolar çok kötü hale gelmişti değişmesi gerekiyordu.\nTemiz bir çalışma ile mükemmel bir iş teslim ettiler.İyi ki kendileri ile çalışmışız.\nKendilerine çok teşekkür ediyorum.',
      en: 'Osman bey gerek ilgi alakası gerekse iş konusunda titiz ve detaycı bir çalışma anlayışına sahip, buda iş konusunda karşı tarafa güven veriyor.\nAracımız üzerindeki folyolar çok kötü hale gelmişti değişmesi gerekiyordu.\nTemiz bir çalışma ile mükemmel bir iş teslim ettiler.İyi ki kendileri ile çalışmışız.\nKendilerine çok teşekkür ediyorum.',
    },
    rating: 5,
    date: '2025-02',
    highlight: false,
  },
];
