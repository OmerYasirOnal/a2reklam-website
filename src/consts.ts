export const BUSINESS_NAME = 'A2 Reklam - Tabela ve Reklam Sistemleri';
export const BUSINESS_SHORT_NAME = 'A2 Reklam';
export const SITE_TITLE = 'A2 Reklam - Tabela ve Reklam Çözümleri';
export const SITE_DESCRIPTION = 'İstanbul\'da Tabela İmalatı, Totem Tabela, Cephe Giydirme, Kutu Harf ve Dijital Baskı Hizmetleri. En uygun fiyat ve kaliteli işçilik.';
export const PHONE_NUMBER = '+90 531 618 16 72';
export const PHONE_TEL = '+905316181672';
export const WHATSAPP_LINK = 'https://wa.me/905316181672';
export const EMAIL = 'info@a2reklam.com';
export const ADDRESS = 'Şirintepe, Açelya Sokağı Ugur Apt No:4/a, 34415 Kâğıthane/İstanbul, Türkiye';
export const ADDRESS_LOCALITY = 'Kâğıthane';
export const ADDRESS_REGION = 'İstanbul';
export const ADDRESS_COUNTRY = 'TR';
export const MAPS_URL = 'https://maps.google.com/maps?q=A2 reklam, Şirintepe, Açelya Sokağı Ugur Apt A2 reklam, No:4/a, 34415 Kâğıthane/İstanbul';
export const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=A2 reklam, Şirintepe, Açelya Sokağı Ugur Apt A2 reklam, No:4/a, 34415 Kâğıthane/İstanbul&t=&z=12&ie=UTF8&output=embed';
export const LOGO_PATH = '/brand/a2reklam-logo.png';
export const SOCIAL_FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61560990926799';
export const SOCIAL_INSTAGRAM_URL = 'https://www.instagram.com/a2_reklam/';
export const SOCIAL_LINKEDIN_URL = 'https://www.linkedin.com/in/osman-%C5%9Fahin-5a460930a/?originalSubdomain=tr';
export const TRACKING_ENABLED = true;
export const GTM_CONTAINER_ID = 'GTM-MXT449F9';
export const GOOGLE_ADS_ID = 'AW-17854412453';
export const GA4_MEASUREMENT_ID = 'G-TC9GJP3GLT';

// Google Reviews
export const GOOGLE_REVIEWS_URL = 'https://share.google/gqYaUAWHtVf9iZ8o6';
export const GOOGLE_REVIEW_WRITE_URL = 'https://share.google/gqYaUAWHtVf9iZ8o6'; // Same link or update if separate write URL exists
// Optional: Add actual rating/count when available (default to null to avoid fake numbers)
export const GOOGLE_RATING: number | null = null; // 1-5 rating
export const GOOGLE_REVIEW_COUNT: number | null = null; // Total review count

// Stats Section Configuration
// Set to true to show, false/null to hide
export const STATS_CONFIG: Record<string, boolean | null> = {
  corporate: true,
  endToEnd: true,
  istanbul: true,
  quality: true,
};

// References / Clients Section
// Set to null to hide the section entirely
export const REFERENCES: Array<{ name: string; logo?: string; website?: string }> | null = [
  { name: 'PIDEM' },
  { name: 'AJANS PRESS' },
  { name: 'BUGABOO' },
  { name: 'BAĞCILAR BELEDİYESİ' },
  { name: 'HD İSKENDER' },
  { name: 'HENKEL' },
  { name: 'SUNSTOP' },
  { name: 'ESSENTIAL ENERGY' },
  { name: 'MCA CEYLAN ASANSÖR' },
  { name: 'HARMONY' },
  { name: 'GÜRSOY 1933' },
  { name: 'ENERGY FOCUS' },
  { name: 'İKBAL' },
  { name: 'GKOÇ YAPI' },
  { name: 'GÜLLÜOĞLU' },
  { name: 'MUMUS' },
  { name: 'KISMET BY MILKA' },
  { name: 'ELECTROLUX' },
  { name: 'ÖZTÜRK HOLDING' },
  { name: 'RENEWABLE ENERGY GROUP' },
  { name: 'QUA GRANITE' },
  { name: 'TISSOT' },
];
// When logos are ready, add them:
// export const REFERENCES = [
//   { name: 'Firma A', logo: '/assets/logos/firma-a.png', website: 'https://...' },
// ];

// KPI Counters (Customer Satisfaction Stats)
// Set values or null to hide individual cards
export const KPI_PROJECTS: number | null = null; // e.g., 500+ projects
export const KPI_HAPPY_CLIENTS: number | null = null; // e.g., 300+ clients
export const KPI_DISTRICTS: number = 39; // Istanbul districts served
export const KPI_SINCE_YEAR: number = 2010; // Established year
