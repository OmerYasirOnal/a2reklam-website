import {
  ADDRESS,
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  BUSINESS_NAME,
  BUSINESS_SHORT_NAME,
  EMAIL,
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
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    alternateName: BUSINESS_SHORT_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl.toString(),
    telephone: PHONE_NUMBER,
    email: EMAIL,
    image: new URL(LOGO_PATH, siteUrl).toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: ADDRESS_REGION,
    },
    hasMap: MAPS_URL,
    sameAs: [SOCIAL_INSTAGRAM_URL, SOCIAL_FACEBOOK_URL, SOCIAL_LINKEDIN_URL],
    geo: GEO,
  };

  return pruneEmpty(schema) as Record<string, unknown>;
}
