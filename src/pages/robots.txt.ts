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
Disallow: /api/

Sitemap: ${sitemapURL.href}
Sitemap: https://a2reklam.com/video-sitemap.xml
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
