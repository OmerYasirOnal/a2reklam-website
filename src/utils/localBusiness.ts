import {
  ADDRESS,
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  BUSINESS_NAME,
  BUSINESS_SHORT_NAME,
  EMAIL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  LOGO_PATH,
  MAPS_URL,
  PHONE_NUMBER,
  SITE_DESCRIPTION,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
} from '../consts';

const GEO = {
  "@type": "GeoCoordinates",
  "latitude": 41.0820,
  "longitude": 28.9719
};

function pruneEmpty(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(pruneEmpty).filter((item) => item !== undefined);
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => [key, pruneEmpty(val)])
      .filter(([, val]) => val !== undefined);
    return Object.fromEntries(entries);
  }
  if (value === null || value === '') return undefined;
  return value;
}

export function getLocalBusinessSchema(siteUrl: URL): Record<string, unknown> {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'Organization'],
    '@id': `${siteUrl.toString()}#organization`,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_SHORT_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl.toString(),
    telephone: PHONE_NUMBER,
    email: EMAIL,
    image: new URL(LOGO_PATH, siteUrl).toString(),
    logo: new URL(LOGO_PATH, siteUrl).toString(),
    // E-E-A-T sinyalleri — Google'ın otorite değerlendirmesi için
    foundingDate: '2005',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 20,
    },
    knowsAbout: [
      'Tabela İmalatı',
      'Işıklı Tabela',
      'Kutu Harf',
      'Totem Tabela',
      'Cephe Tabela',
      'Paslanmaz Harf',
      'Araç Giydirme',
      'Yönlendirme Sistemleri',
      'Kumlama Folyo',
      'Kurumsal Reklam',
    ],
    slogan: 'Premium Tabela ve Reklam Çözümleri',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'TRY',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Şirintepe, Açelya Sokağı Ugur Apt No:4/a',
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: '34415',
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: ADDRESS_REGION,
    },
    hasMap: MAPS_URL,
    sameAs: [SOCIAL_INSTAGRAM_URL, SOCIAL_FACEBOOK_URL, SOCIAL_LINKEDIN_URL],
    geo: GEO,
    priceRange: '₺₺',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    // Only include AggregateRating if we have real data
    aggregateRating:
      GOOGLE_RATING && GOOGLE_REVIEW_COUNT
        ? {
            '@type': 'AggregateRating',
            ratingValue: GOOGLE_RATING,
            reviewCount: GOOGLE_REVIEW_COUNT,
            bestRating: 5,
            worstRating: 1,
          }
        : null,
    makesOffer: [
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/isikli-tabela/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/isiksiz-tabela/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/paslanmaz-harfler/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/totem/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/cephe-tabela/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/arac-giydirme/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/yonlendirme/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/kabartma-pleksiglass/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/ozel-imalatlar/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/ofis-kumlama-folyolari/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/fener-tabela/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/cati-tabelasi/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/kapi-isimlik/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/ayakli-a-pano/#service` },
      { '@id': `${siteUrl.toString().replace(/\/$/, '')}/hizmetler/banko-uygulamalari/#service` },
    ],
  };

  return pruneEmpty(schema) as Record<string, unknown>;
}
