import { BUSINESS_NAME } from '../consts';

interface ServiceSchemaOptions {
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  siteUrl: string;
}

export function getServiceSchema(options: ServiceSchemaOptions): Record<string, unknown> {
  const { slug, title, description, heroImage, siteUrl } = options;
  const baseUrl = siteUrl.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${baseUrl}/hizmetler/${slug}/#service`,
        'name': title,
        'serviceType': title,
        'description': description,
        ...(heroImage ? { 'image': [`${baseUrl}${heroImage}`] } : {}),
        'provider': {
          '@id': `${baseUrl}/#organization`,
        },
        'areaServed': {
          '@type': 'City',
          'name': 'İstanbul',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/hizmetler/${slug}/#webpage`,
        'url': `${baseUrl}/hizmetler/${slug}/`,
        'name': `${title} | ${BUSINESS_NAME}`,
        'about': { '@id': `${baseUrl}/hizmetler/${slug}/#service` },
      },
    ],
  };
}
