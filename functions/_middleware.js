/**
 * A2 Reklam — Cloudflare Pages Middleware
 *
 * .htaccess'teki regex tabanlı yönlendirmeleri taşır (public/_redirects placeholder ile
 * yapılamayan suffix dönüşümleri: "X-tabela" -> "X-tabelaci").
 * Basit/birebir yönlendirmeler public/_redirects'te; bu dosya yalnızca:
 *   1) www -> non-www (301)
 *   2) hizmet-bolgeleri mahalle istisnaları
 *   3) hizmet-bolgeleri/<slug>-tabela -> /<slug>-tabelaci/
 *   4) en/service-areas/<slug>-tabela -> /<slug>-tabelaci/
 *   5) üst seviye /<slug>-tabela/ -> /<slug>-tabelaci/  (kurumsal landing istisnaları hariç)
 * Eşleşme yoksa next() ile statik içerik / _redirects devreye girer.
 */

// Kurumsal landing sayfaları: -tabela ile biter ama gerçek sayfalardır, yönlendirilmez.
const KURUMSAL_ISTISNA = new Set([
  'kurumsal-tabela', 'avm-tabela', 'plaza-tabela', 'fabrika-tabela', 'hastane-tabela',
  'otel-tabela', 'okul-tabela', 'banka-tabela', 'ofis-tabela', 'restoran-tabela',
  'kafe-tabela', 'magaza-tabela', 'sektorel-tabela', 'dijital-tabela', 'ledli-tabela',
  'neon-tabela', 'modern-tabela',
]);

// hizmet-bolgeleri altındaki mahalle özel yönlendirmeleri (regex'ten önce gelir).
const MAHALLE_ISTISNA = {
  'etiler-tabela': '/besiktas-tabelaci/',
  'levent-tabela': '/besiktas-tabelaci/',
  'maslak-tabela': '/sariyer-tabelaci/',
};

const SLUG = '[a-z0-9-]+';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const { pathname, search } = url;

  const redirect = (path) =>
    Response.redirect(`${url.origin}${path}${search}`, 301);

  // 1) www -> non-www
  if (url.hostname.startsWith('www.')) {
    const bare = url.hostname.slice(4);
    return Response.redirect(`https://${bare}${pathname}${search}`, 301);
  }

  // Eşleşme için sondaki slash'ı normalize et
  const p = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // 2 & 3) hizmet-bolgeleri/...
  const hbMatch = p.match(new RegExp(`^/hizmet-bolgeleri/(${SLUG}-tabela)$`));
  if (hbMatch) {
    const slug = hbMatch[1];
    if (MAHALLE_ISTISNA[slug]) return redirect(MAHALLE_ISTISNA[slug]);
    return redirect(`/${slug}ci/`); // bagcilar-tabela -> /bagcilar-tabelaci/
  }

  // 4) en/service-areas/<slug>-tabela -> /<slug>-tabelaci/
  const enArea = p.match(new RegExp(`^/en/service-areas/(${SLUG})-tabela$`));
  if (enArea) {
    return redirect(`/${enArea[1]}-tabelaci/`);
  }

  // 5) üst seviye /<slug>-tabela/ -> /<slug>-tabelaci/  (kurumsal istisnalar hariç)
  const topMatch = p.match(new RegExp(`^/(${SLUG}-tabela)$`));
  if (topMatch && !KURUMSAL_ISTISNA.has(topMatch[1])) {
    return redirect(`/${topMatch[1]}ci/`);
  }

  return next();
}
