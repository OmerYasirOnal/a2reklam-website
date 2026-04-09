export type Locale = 'tr';

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
  return { tr: normalized };
}
