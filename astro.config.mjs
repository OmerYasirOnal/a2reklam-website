import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import rehypeRemoveFirstH1 from './src/utils/rehype-remove-first-h1.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** Append video-sitemap.xml reference to the generated sitemap-index.xml */
function videoSitemapIndex() {
  return {
    name: 'video-sitemap-index',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const indexPath = join(dir.pathname, 'sitemap-index.xml');
        try {
          let xml = readFileSync(indexPath, 'utf-8');
          if (!xml.includes('video-sitemap.xml')) {
            xml = xml.replace(
              '</sitemapindex>',
              '<sitemap><loc>https://a2reklam.com/video-sitemap.xml</loc></sitemap></sitemapindex>'
            );
            writeFileSync(indexPath, xml, 'utf-8');
          }
        } catch { /* sitemap-index not found, skip */ }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://a2reklam.com',
  output: 'static',
  adapter: vercel(),
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
          if (pathname.startsWith('/en/') || pathname === '/en') return false;
          if (pathname.includes('/404')) return false;
          if (pathname.includes('/teklif-al/')) return false;
          if (pathname.startsWith('/videolar/')) return false;
          if (pathname.includes('/api/')) return false;
          return true;
        } catch {
          return true;
        }
      },
      serialize(item) {
        // Anasayfa
        if (item.url === 'https://a2reklam.com/' || item.url === 'https://a2reklam.com') {
          return { ...item, changefreq: 'daily', priority: 1.0, lastmod: new Date() };
        }
        // Hizmet sayfaları
        if (/\/hizmetler\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.9, lastmod: new Date() };
        }
        // Istanbul hub sayfası
        if (item.url.includes('/istanbul-tabelaci/')) {
          return { ...item, changefreq: 'weekly', priority: 0.9, lastmod: new Date() };
        }
        // Sektörel tabela sayfaları
        if (/\/sektorel\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date() };
        }
        // İlçe tabelacı sayfaları
        if (/-tabelaci\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date() };
        }
        // Tabela rehberi
        if (/\/tabela-rehberi\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.8, lastmod: new Date() };
        }
        // Blog
        if (/\/blog\//.test(item.url)) {
          return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: new Date() };
        }
        return item;
      },
    }),
    videoSitemapIndex(),
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
    '/ar/about/': '/hakkimizda/',
    '/ar/thank-you/': '/tesekkurler/',
    // English → Turkish (301 redirects)
    '/en/': '/',
    '/en/blog/': '/blog/',
    '/en/faq/': '/sss/',
    '/en/thank-you/': '/tesekkurler/',
    '/en/services/': '/hizmetler/',
    '/en/gallery/': '/galeri/',
    '/en/contact/': '/iletisim/',
    '/en/about/': '/hakkimizda/',
    '/en/portfolio/': '/referanslar/',
    '/en/get-quote/': '/iletisim/',
    '/en/service-areas/': '/istanbul-tabelaci/',
    // Legacy WordPress URLs
    '/hakkinda/': '/hakkimizda/',
    '/tabela-cesitleri/': '/hizmetler/',
    '/tabelacesitleri/folyo-baski-uygulama/': '/hizmetler/ofis-kumlama-folyolari/',
    '/tabelacesitleri/pleksi-kutu-harf/': '/hizmetler/kabartma-pleksiglass/',
    '/tabelacesitleri/kutu-harf/': '/hizmetler/paslanmaz-harfler/',
    '/tabelacesitleri/isikli-tabela/': '/hizmetler/isikli-tabela/',
    '/tabelacesitleri/totem-tabela/': '/hizmetler/totem/',
    '/tabelacesitleri/cephe-tabela/': '/hizmetler/cephe-tabela/',
    '/tabelacesitleri/arac-giydirme/': '/hizmetler/arac-giydirme/',
    '/tabelacesitleri/paslanmaz-harf/': '/hizmetler/paslanmaz-harfler/',
    '/fener-tabela-nedir/': '/hizmetler/fener-tabela/',
    '/iletisim-tabela/': '/iletisim/',
    '/teklif-al/': '/iletisim/',
    '/tabelacesitleri/dijital-baski/': '/hizmetler/',
    '/tabelacesitleri/neon-tabela/': '/hizmetler/isikli-tabela/',
    // Eski tabelaci sonekli ilçe URL'leri → yeni URL'ler (doğrudan, zincirsiz)
    '/uskudar-tabela-tabelaci/': '/uskudar-tabelaci/',
    '/sisli-tabela-tabelaci/': '/sisli-tabelaci/',
    '/kadikoy-tabela-tabelaci/': '/kadikoy-tabelaci/',
    '/besiktas-tabela-tabelaci/': '/besiktas-tabelaci/',
    '/beyoglu-tabela-tabelaci/': '/beyoglu-tabelaci/',
    '/fatih-tabela-tabelaci/': '/fatih-tabelaci/',
    '/bakirkoy-tabela-tabelaci/': '/bakirkoy-tabelaci/',
    '/umraniye-tabela-tabelaci/': '/umraniye-tabelaci/',
    '/atasehir-tabela-tabelaci/': '/atasehir-tabelaci/',
    '/maltepe-tabela-tabelaci/': '/maltepe-tabelaci/',
    // Eski hizmet-bolgeleri URL'leri → yeni tabelaci URL'leri
    '/hizmet-bolgeleri/': '/istanbul-tabelaci/',
    '/hizmet-bolgeleri/adalar-tabela/': '/adalar-tabelaci/',
    '/hizmet-bolgeleri/arnavutkoy-tabela/': '/arnavutkoy-tabelaci/',
    '/hizmet-bolgeleri/atasehir-tabela/': '/atasehir-tabelaci/',
    '/hizmet-bolgeleri/avcilar-tabela/': '/avcilar-tabelaci/',
    '/hizmet-bolgeleri/bagcilar-tabela/': '/bagcilar-tabelaci/',
    '/hizmet-bolgeleri/bahcelievler-tabela/': '/bahcelievler-tabelaci/',
    '/hizmet-bolgeleri/bakirkoy-tabela/': '/bakirkoy-tabelaci/',
    '/hizmet-bolgeleri/basaksehir-tabela/': '/basaksehir-tabelaci/',
    '/hizmet-bolgeleri/bayrampasa-tabela/': '/bayrampasa-tabelaci/',
    '/hizmet-bolgeleri/besiktas-tabela/': '/besiktas-tabelaci/',
    '/hizmet-bolgeleri/beykoz-tabela/': '/beykoz-tabelaci/',
    '/hizmet-bolgeleri/beylikduzu-tabela/': '/beylikduzu-tabelaci/',
    '/hizmet-bolgeleri/beyoglu-tabela/': '/beyoglu-tabelaci/',
    '/hizmet-bolgeleri/buyukcekmece-tabela/': '/buyukcekmece-tabelaci/',
    '/hizmet-bolgeleri/catalca-tabela/': '/catalca-tabelaci/',
    '/hizmet-bolgeleri/cekmekoy-tabela/': '/cekmekoy-tabelaci/',
    '/hizmet-bolgeleri/esenler-tabela/': '/esenler-tabelaci/',
    '/hizmet-bolgeleri/esenyurt-tabela/': '/esenyurt-tabelaci/',
    '/hizmet-bolgeleri/eyupsultan-tabela/': '/eyupsultan-tabelaci/',
    '/hizmet-bolgeleri/fatih-tabela/': '/fatih-tabelaci/',
    '/hizmet-bolgeleri/gaziosmanpasa-tabela/': '/gaziosmanpasa-tabelaci/',
    '/hizmet-bolgeleri/gungoren-tabela/': '/gungoren-tabelaci/',
    '/hizmet-bolgeleri/kadikoy-tabela/': '/kadikoy-tabelaci/',
    '/hizmet-bolgeleri/kagithane-tabela/': '/kagithane-tabelaci/',
    '/hizmet-bolgeleri/kartal-tabela/': '/kartal-tabelaci/',
    '/hizmet-bolgeleri/kucukcekmece-tabela/': '/kucukcekmece-tabelaci/',
    '/hizmet-bolgeleri/maltepe-tabela/': '/maltepe-tabelaci/',
    '/hizmet-bolgeleri/pendik-tabela/': '/pendik-tabelaci/',
    '/hizmet-bolgeleri/sancaktepe-tabela/': '/sancaktepe-tabelaci/',
    '/hizmet-bolgeleri/sariyer-tabela/': '/sariyer-tabelaci/',
    '/hizmet-bolgeleri/sile-tabela/': '/sile-tabelaci/',
    '/hizmet-bolgeleri/silivri-tabela/': '/silivri-tabelaci/',
    '/hizmet-bolgeleri/sisli-tabela/': '/sisli-tabelaci/',
    '/hizmet-bolgeleri/sultanbeyli-tabela/': '/sultanbeyli-tabelaci/',
    '/hizmet-bolgeleri/sultangazi-tabela/': '/sultangazi-tabelaci/',
    '/hizmet-bolgeleri/tuzla-tabela/': '/tuzla-tabelaci/',
    '/hizmet-bolgeleri/umraniye-tabela/': '/umraniye-tabelaci/',
    '/hizmet-bolgeleri/uskudar-tabela/': '/uskudar-tabelaci/',
    '/hizmet-bolgeleri/zeytinburnu-tabela/': '/zeytinburnu-tabelaci/',
    // Mahalle sayfaları → ilçe sayfalarına yönlendirme
    '/hizmet-bolgeleri/etiler-tabela/': '/besiktas-tabelaci/',
    '/hizmet-bolgeleri/levent-tabela/': '/besiktas-tabelaci/',
    '/hizmet-bolgeleri/maslak-tabela/': '/sariyer-tabelaci/',
    // İstanbul dışı il sayfaları → hub sayfası
    '/hizmet-bolgeleri/bursa/': '/istanbul-tabelaci/',
    '/hizmet-bolgeleri/kocaeli/': '/istanbul-tabelaci/',
    '/hizmet-bolgeleri/sakarya/': '/istanbul-tabelaci/',
    '/hizmet-bolgeleri/tekirdag/': '/istanbul-tabelaci/',
    '/hizmet-bolgeleri/yalova/': '/istanbul-tabelaci/',
  },
  trailingSlash: 'always',
  build: {
    format: 'file',
  },
});
