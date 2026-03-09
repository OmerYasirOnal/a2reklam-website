export type Locale = 'tr' | 'en';

const LOCALES: Locale[] = ['tr', 'en'];

// Only map routes where EN pages still exist
const STATIC_ROUTES: Array<Partial<Record<Locale, string>>> = [
  { tr: '/', en: '/en/' },
  { tr: '/galeri/', en: '/en/gallery/' },
  { tr: '/hizmetler/', en: '/en/services/' },
  { tr: '/iletisim/', en: '/en/contact/' },
  { tr: '/hakkimizda/', en: '/en/about/' },
  { tr: '/referanslar/', en: '/en/portfolio/' },
  // TR-only pages (no EN equivalent)
  { tr: '/tesekkurler/' },
  { tr: '/hizmet-bolgeleri/' },
  { tr: '/sss/' },
  { tr: '/blog/' },
  { tr: '/videolar/' },
  { tr: '/site-haritasi/' },
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

  // Check static routes
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

  // Dynamic TR service pages (no EN equivalent — individual EN service pages removed)
  const trService = normalized.match(/^\/hizmetler\/([^/]+)\/$/);
  if (trService) {
    return { tr: normalized };
  }

  // Dynamic TR district pages (no EN equivalent — EN district pages removed)
  const trDistrict = normalized.match(/^\/hizmet-bolgeleri\/([^/]+)\/$/);
  if (trDistrict) {
    return { tr: normalized };
  }

  // Dynamic TR blog pages (no EN equivalent — EN blog removed)
  const trBlog = normalized.match(/^\/blog\/([^/]+)\/$/);
  if (trBlog) {
    return { tr: normalized };
  }

  // Dynamic TR video pages
  const trVideo = normalized.match(/^\/videolar\/([^/]+)\/$/);
  if (trVideo) {
    return { tr: normalized };
  }

  // Dynamic TR tabela rehberi pages
  const trRehber = normalized.match(/^\/tabela-rehberi\/([^/]+)\/$/);
  if (trRehber) {
    return { tr: normalized };
  }

  // Fallback: detect locale from path
  const currentLocale: Locale = normalized.startsWith('/en/') ? 'en' : 'tr';
  return { [currentLocale]: normalized } as Partial<Record<Locale, string>>;
}
