export type Locale = 'tr' | 'en' | 'ar';

const LOCALES: Locale[] = ['tr', 'en', 'ar'];

const STATIC_ROUTES: Array<Partial<Record<Locale, string>>> = [
  { tr: '/', en: '/en/', ar: '/ar/' },
  { tr: '/hizmetler/', en: '/en/services/', ar: '/ar/services/' },
  { tr: '/iletisim/', en: '/en/contact/', ar: '/ar/contact/' },
  { tr: '/teklif-al/', en: '/en/get-quote/', ar: '/ar/get-quote/' },
  { tr: '/teşekkürler/', en: '/en/thank-you/', ar: '/ar/thank-you/' },
  { tr: '/hizmet-bolgeleri/', en: '/en/service-areas/' },
  { tr: '/hakkimizda/', en: '/en/about/' },
  { tr: '/sss/', en: '/en/faq/' },
  { tr: '/referanslar/', en: '/en/portfolio/' },
  { tr: '/blog/', en: '/en/blog/' },
];

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  let path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (path.endsWith('.html')) {
    path = path.replace(/\.html$/, '/');
  }
  if (!path.endsWith('/')) {
    path = `${path}/`;
  }
  return path;
}

export function getLocaleAlternates(pathname: string): Partial<Record<Locale, string>> {
  const normalized = normalizePath(pathname);

  for (const route of STATIC_ROUTES) {
    for (const locale of LOCALES) {
      const candidate = route[locale];
      if (candidate && normalizePath(candidate) === normalized) {
        return Object.fromEntries(
          LOCALES.filter((loc) => route[loc]).map((loc) => [loc, route[loc]])
        ) as Partial<Record<Locale, string>>;
      }
    }
  }

  const trService = normalized.match(/^\/hizmetler\/([^/]+)\/$/);
  if (trService) {
    const slug = trService[1];
    return {
      tr: normalized,
      en: `/en/services/${slug}/`,
      ar: `/ar/services/${slug}/`,
    };
  }

  const enService = normalized.match(/^\/en\/services\/([^/]+)\/$/);
  if (enService) {
    const slug = enService[1];
    return {
      tr: `/hizmetler/${slug}/`,
      en: normalized,
      ar: `/ar/services/${slug}/`,
    };
  }

  const arService = normalized.match(/^\/ar\/services\/([^/]+)\/$/);
  if (arService) {
    const slug = arService[1];
    return {
      tr: `/hizmetler/${slug}/`,
      en: `/en/services/${slug}/`,
      ar: normalized,
    };
  }

  const trDistrict = normalized.match(/^\/hizmet-bolgeleri\/([^/]+)\/$/);
  if (trDistrict) {
    const slug = trDistrict[1];
    return {
      tr: normalized,
      en: `/en/service-areas/${slug}/`,
    };
  }

  const enDistrict = normalized.match(/^\/en\/service-areas\/([^/]+)\/$/);
  if (enDistrict) {
    const slug = enDistrict[1];
    return {
      tr: `/hizmet-bolgeleri/${slug}/`,
      en: normalized,
    };
  }

  const trBlog = normalized.match(/^\/blog\/([^/]+)\/$/);
  if (trBlog) {
    const slug = trBlog[1];
    return {
      tr: normalized,
      en: `/en/blog/${slug}/`,
    };
  }

  const enBlog = normalized.match(/^\/en\/blog\/([^/]+)\/$/);
  if (enBlog) {
    const slug = enBlog[1];
    return {
      tr: `/blog/${slug}/`,
      en: normalized,
    };
  }

  const currentLocale: Locale = normalized.startsWith('/en/')
    ? 'en'
    : normalized.startsWith('/ar/')
      ? 'ar'
      : 'tr';

  return { [currentLocale]: normalized } as Partial<Record<Locale, string>>;
}
