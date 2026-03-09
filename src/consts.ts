import type { ReferenceItem } from './data/references';
import { REFERENCES as REFERENCES_DATA } from './data/references';

export const BUSINESS_NAME = 'A2 Reklam - Tabela ve Reklam Sistemleri';
export const BUSINESS_SHORT_NAME = 'A2 Reklam';
export const SITE_TITLE = 'A2 Reklam - Tabela ve Reklam Çözümleri';
export const SITE_DESCRIPTION = 'İstanbul\'da Tabela İmalatı, Totem Tabela, Cephe Giydirme, Kutu Harf ve Dijital Baskı Hizmetleri. En uygun fiyat ve kaliteli işçilik.';
export const SITE_DESCRIPTION_EN = 'Signage manufacturing in Istanbul: facade signs, totems, channel letters, and digital printing. Competitive pricing with premium craftsmanship.';
export const PHONE_NUMBER = '+90 531 618 16 72';
export const PHONE_TEL = '+905316181672';
export const WHATSAPP_LINK = 'https://wa.me/905316181672';
export const EMAIL = 'info@a2reklam.com';
export const ADDRESS = 'Şirintepe, Açelya Sokağı Ugur Apt No:4/a, 34415 Kâğıthane/İstanbul, Türkiye';
export const ADDRESS_LOCALITY = 'Kâğıthane';
export const ADDRESS_REGION = 'İstanbul';
export const ADDRESS_COUNTRY = 'TR';
export const MAPS_URL = 'https://www.google.com/maps/place/A2+Reklam+Tabela+%26+Mimari+Y%C3%B6nlendirme/@41.0888621,28.989254,17z/data=!3m1!4b1!4m6!3m5!1s0x14cab7540b4f6ebf:0x477fa2bd2bae8a19!8m2!3d41.0888581!4d28.9918343!16s%2Fg%2F11ldh20hb9?entry=ttu';
export const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008!2d28.9918343!3d41.0888581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7540b4f6ebf%3A0x477fa2bd2bae8a19!2sA2+Reklam+Tabela+%26+Mimari+Y%C3%B6nlendirme!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str';
export const LOGO_PATH = '/brand/a2reklam-logo.png';
export const SOCIAL_FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61560990926799';
export const SOCIAL_INSTAGRAM_URL = 'https://www.instagram.com/a2_reklam/';
export const SOCIAL_LINKEDIN_URL = 'https://www.linkedin.com/in/osman-%C5%9Fahin-5a460930a/?originalSubdomain=tr';
export const TRACKING_ENABLED = true;
export const GTM_CONTAINER_ID = 'GTM-MXT449F9';
export const GOOGLE_ADS_ID = 'AW-17854412453';
export const GA4_MEASUREMENT_ID = 'G-TC9GJP3GLT';

// Google Reviews (direct place URL to avoid search/deep-link fallback redirects)
export const GOOGLE_REVIEWS_URL = MAPS_URL;
// Google Business Profile real data (87 reviews, 5.0 rating)
export const GOOGLE_RATING: number | null = 5.0;
export const GOOGLE_REVIEW_COUNT: number | null = 87;

// Stats Section Configuration
// Set to true to show, false/null to hide
export const STATS_CONFIG: Record<string, boolean | null> = {
  corporate: true,
  endToEnd: true,
  istanbul: true,
  quality: true,
};

// References / Clients Section
// Centralized list lives in src/data/references.ts
export const REFERENCES: ReferenceItem[] | null = REFERENCES_DATA;

// KPI Counters (Customer Satisfaction Stats)
// Set values or null to hide individual cards
export const KPI_PROJECTS: number | null = 2500; // 2500+ tabela ve reklam hizmeti
export const KPI_HAPPY_CLIENTS: number | null = 1200; // 1200+ müşteri memnuniyeti
export const KPI_DISTRICTS: number = 39; // Istanbul districts served
export const KPI_SINCE_YEAR: number = 2005; // Established year (20+ years = 2005)
