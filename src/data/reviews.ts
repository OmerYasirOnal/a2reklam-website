export type Review = {
  author: string;
  text: { tr: string; en: string; ar: string };
  rating?: number; // 1-5 (optional)
  date?: string; // "2025-01" format (optional)
  highlight?: boolean;
};

export const REVIEWS: Review[] = [
  {
    author: 'Ahmet Y.',
    text: {
      tr: 'A2 Reklam ile çalıştık, çok memnun kaldık. Tabela üretimi ve montajında profesyonel bir ekip. İşlerini zamanında teslim ettiler.',
      en: 'We worked with A2 Advertising and were very satisfied. Professional team in signage production and installation. They delivered on time.',
      ar: 'تعاملنا مع A2 Reklam وكنا راضين جداً. فريق محترف في تصنيع وتركيب اللافتات. قاموا بالتسليم في الوقت المحدد.',
    },
    rating: 5,
    date: '2024-12',
    highlight: true,
  },
  {
    author: 'Mehmet K.',
    text: {
      tr: 'Kurumsal tabela ihtiyacımız için A2 Reklam\'ı tercih ettik. Kaliteli malzeme ve özenli işçilik. Fiyat performans açısından çok uygun.',
      en: 'We chose A2 Advertising for our corporate signage needs. Quality materials and careful craftsmanship. Very reasonable in terms of price performance.',
      ar: 'اخترنا A2 Reklam لاحتياجاتنا من اللافتات المؤسسية. مواد عالية الجودة وصنعة متقنة. معقول جداً من حيث السعر والأداء.',
    },
    rating: 5,
    date: '2024-11',
    highlight: true,
  },
  {
    author: 'Ayşe D.',
    text: {
      tr: 'Cephe tabelası ve totem tabela için A2 Reklam ile çalıştık. Tasarımdan montaja kadar tüm süreç sorunsuz ilerledi. Teşekkürler!',
      en: 'We worked with A2 Advertising for facade signage and totem signs. The entire process from design to installation went smoothly. Thank you!',
      ar: 'تعاملنا مع A2 Reklam للحصول على لافتات الواجهة واللافتات التوتم. العملية بأكملها من التصميم إلى التركيب سارت بسلاسة. شكراً!',
    },
    rating: 5,
    date: '2024-10',
    highlight: false,
  },
  {
    author: 'Ali S.',
    text: {
      tr: 'Işıklı tabela üretimi için A2 Reklam\'ı seçtik. LED aydınlatma kaliteli, montaj temiz yapıldı. İstanbul genelinde hizmet vermeleri büyük avantaj.',
      en: 'We chose A2 Advertising for illuminated signage production. LED lighting is quality, installation was done cleanly. Their service across Istanbul is a great advantage.',
      ar: 'اخترنا A2 Reklam لإنتاج لافتات مضيئة. الإضاءة LED عالية الجودة، وتم التركيب بدقة. خدمتهم في جميع أنحاء إسطنبول ميزة كبيرة.',
    },
    rating: 5,
    date: '2024-09',
    highlight: false,
  },
  {
    author: 'Zeynep T.',
    text: {
      tr: 'Kutu harf ve paslanmaz harf üretimi için A2 Reklam ile çalıştık. Üretim kalitesi ve montaj hızı mükemmel. Tavsiye ederim.',
      en: 'We worked with A2 Advertising for channel letters and stainless steel letter production. Production quality and installation speed were excellent. I recommend them.',
      ar: 'تعاملنا مع A2 Reklam لإنتاج الحروف البارزة وحروف الاستانلس. جودة الإنتاج وسرعة التركيب كانت ممتازة. أنصح بهم.',
    },
    rating: 5,
    date: '2024-08',
    highlight: true,
  },
  {
    author: 'Can Ö.',
    text: {
      tr: 'Araç giydirme hizmeti için A2 Reklam\'ı tercih ettik. Vinil uygulaması profesyonel, sonuç çok başarılı. Mobil reklam için ideal.',
      en: 'We chose A2 Advertising for vehicle wrapping service. Vinyl application was professional, the result was very successful. Ideal for mobile advertising.',
      ar: 'اخترنا A2 Reklam لخدمة تغليف المركبات. تطبيق الفينيل كان محترفاً، والنتيجة ناجحة جداً. مثالي للإعلان المتحرك.',
    },
    rating: 5,
    date: '2024-07',
    highlight: false,
  },
];
