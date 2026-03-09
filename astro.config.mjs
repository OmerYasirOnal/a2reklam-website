import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeRemoveFirstH1 from './src/utils/rehype-remove-first-h1.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://a2reklam.com',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap({
      filter: (page) => {
        try {
          const pathname = decodeURIComponent(new URL(page).pathname).normalize('NFC').toLowerCase();
          if (pathname.includes('/thank-you/')) return false;
          if (pathname.includes('/tesekkurler/')) return false;
          if (pathname.startsWith('/ar/')) return false;
          if (pathname.includes('/404')) return false;
          return true;
        } catch {
          return true;
        }
      },
      serialize(item) {
        // Anasayfa
        if (item.url === 'https://a2reklam.com/' || item.url === 'https://a2reklam.com') {
          return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: new Date() };
        }
        // Hizmet sayfaları
        if (/\/hizmetler\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: new Date() };
        }
        // Hizmet bölgeleri (ilçe sayfaları)
        if (/\/hizmet-bolgeleri\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date() };
        }
        // Tabela rehberi
        if (/\/tabela-rehberi\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date() };
        }
        // Blog
        if (/\/blog\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.7 };
        }
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeRemoveFirstH1],
  },
  redirects: {
    // Arabic → Turkish (301 redirects)
    '/ar/': '/',
    '/ar/services/': '/hizmetler/',
    '/ar/gallery/': '/galeri/',
    '/ar/contact/': '/iletisim/',
    '/ar/get-quote/': '/iletisim/',
    '/ar/thank-you/': '/tesekkurler/',
    // Removed English pages → Turkish equivalents (301 redirects)
    '/en/blog/': '/blog/',
    '/en/faq/': '/sss/',
    '/en/thank-you/': '/tesekkurler/',
    '/en/service-areas/': '/hizmet-bolgeleri/',
  },
  trailingSlash: 'always',
  build: {
    format: 'file',
  },
});
