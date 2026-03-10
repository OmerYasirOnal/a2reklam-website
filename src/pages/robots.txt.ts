import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Yandex
Allow: /

User-agent: *
Allow: /

Disallow: /ar/
Disallow: /tesekkurler/
Disallow: /en/thank-you/
Disallow: /en/service-areas/
Disallow: /api/
Disallow: /tabelacesitleri/
Disallow: /hizmet-bolgeleri/bursa/
Disallow: /hizmet-bolgeleri/kocaeli/
Disallow: /hizmet-bolgeleri/sakarya/
Disallow: /hizmet-bolgeleri/tekirdag/
Disallow: /hizmet-bolgeleri/yalova/

Sitemap: ${sitemapURL.href}
Sitemap: https://a2reklam.com/video-sitemap.xml
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
