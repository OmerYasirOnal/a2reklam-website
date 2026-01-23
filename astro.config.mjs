import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rehypeRemoveFirstH1 from './src/utils/rehype-remove-first-h1.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://a2reklam.com',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeRemoveFirstH1],
  },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ar'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  trailingSlash: 'always',
  build: {
    format: 'file',
  },
});
