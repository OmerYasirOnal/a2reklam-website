# SEO Cleanup & Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the comprehensive SEO strategy by removing thin/low-quality pages (/ar/ fully, most /en/, thin blog posts), cleaning up i18n infrastructure, updating sitemap/robots.txt, removing non-Istanbul locations, and enhancing schema markup — reducing ~300+ URLs to ~60-80 high-quality Turkish pages + 7 English pages.

**Architecture:** Remove Arabic language support entirely, prune English to 7 core pages, delete 10 thin blog posts, remove non-Istanbul province data, simplify i18n to TR-primary with limited EN support, and update all dependent components (SEO, Header, Footer, Layout, config).

**Tech Stack:** Astro.js 5.x, TypeScript, @astrojs/sitemap, JSON-LD structured data

---

## Task 1: Delete thin blog posts (post-3 through post-12)

**Files:**
- Delete: `src/content/blog/post-3.md`
- Delete: `src/content/blog/post-4.md`
- Delete: `src/content/blog/post-5.md`
- Delete: `src/content/blog/post-6.md`
- Delete: `src/content/blog/post-7.md`
- Delete: `src/content/blog/post-8.md`
- Delete: `src/content/blog/post-9.md`
- Delete: `src/content/blog/post-10.md`
- Delete: `src/content/blog/post-11.md`
- Delete: `src/content/blog/post-12.md`

**Step 1: Delete all 10 thin blog post files**

```bash
rm src/content/blog/post-{3,4,5,6,7,8,9,10,11,12}.md
```

**Step 2: Verify deletion**

```bash
ls src/content/blog/post-*.md 2>/dev/null && echo "FAIL: posts still exist" || echo "PASS: all thin posts deleted"
```

Expected: PASS

**Step 3: Commit**

```bash
git add -u src/content/blog/
git commit -m "chore(seo): remove 10 thin placeholder blog posts (post-3 to post-12)

These template-generated posts dilute site quality signals and waste crawl budget.
Returning 410 Gone via their absence from content collection."
```

---

## Task 2: Delete all /ar/ (Arabic) pages

**Files:**
- Delete: `src/pages/ar/index.astro`
- Delete: `src/pages/ar/gallery/index.astro`
- Delete: `src/pages/ar/services/index.astro`
- Delete: `src/pages/ar/contact.astro`
- Delete: `src/pages/ar/get-quote.astro`
- Delete: `src/pages/ar/thank-you.astro`

**Step 1: Delete the entire /ar/ directory**

```bash
rm -r src/pages/ar/
```

**Step 2: Verify deletion**

```bash
ls src/pages/ar/ 2>/dev/null && echo "FAIL" || echo "PASS: /ar/ pages removed"
```

Expected: PASS

**Step 3: Commit**

```bash
git add -u src/pages/ar/
git commit -m "chore(seo): remove all Arabic (/ar/) pages

Arabic pages are not backed by professional translation and dilute
site-wide quality score. Redirects will be added in a subsequent commit."
```

---

## Task 3: Delete thin /en/ pages (keep 7 core pages)

**Keep these /en/ pages:**
- `src/pages/en/index.astro` (homepage)
- `src/pages/en/about.astro`
- `src/pages/en/contact.astro`
- `src/pages/en/services/index.astro` (services overview)
- `src/pages/en/gallery/index.astro`
- `src/pages/en/portfolio.astro`
- `src/pages/en/get-quote.astro`

**Delete these /en/ pages:**
- `src/pages/en/blog/index.astro`
- `src/pages/en/blog/[...slug].astro`
- `src/pages/en/services/[...slug].astro`
- `src/pages/en/service-areas/index.astro`
- `src/pages/en/service-areas/[...slug].astro`
- `src/pages/en/service-areas/[province]/[district].astro`
- `src/pages/en/faq.astro`
- `src/pages/en/thank-you.astro`

**Step 1: Delete thin /en/ page files**

```bash
rm src/pages/en/blog/index.astro
rm "src/pages/en/blog/[...slug].astro"
rmdir src/pages/en/blog/
rm "src/pages/en/services/[...slug].astro"
rm src/pages/en/service-areas/index.astro
rm "src/pages/en/service-areas/[...slug].astro"
rm -r src/pages/en/service-areas/
rm src/pages/en/faq.astro
rm src/pages/en/thank-you.astro
```

**Step 2: Verify remaining EN pages**

```bash
find src/pages/en/ -name "*.astro" | sort
```

Expected output (7 files):
```
src/pages/en/about.astro
src/pages/en/contact.astro
src/pages/en/gallery/index.astro
src/pages/en/get-quote.astro
src/pages/en/index.astro
src/pages/en/portfolio.astro
src/pages/en/services/index.astro
```

**Step 3: Commit**

```bash
git add -u src/pages/en/
git commit -m "chore(seo): prune /en/ to 7 high-impact pages

Keep: homepage, about, contact, services index, gallery, portfolio, get-quote.
Remove: blog translations, individual service pages, service areas, FAQ, thank-you.
Redirects will be added in a subsequent commit."
```

---

## Task 4: Delete EN/AR content collections no longer needed

**Files:**
- Delete: `src/content/blog_en/` directory (9 files)
- Delete: `src/content/districts_en/` directory (39 files)
- Delete: `src/content/services_en/` directory (12 files)
- Modify: `src/content/config.ts` — remove `blog_en`, `districts_en`, `services_en` collections

**Step 1: Delete content directories**

```bash
rm -r src/content/blog_en/
rm -r src/content/districts_en/
rm -r src/content/services_en/
```

**Step 2: Update content config to remove deleted collections**

Edit `src/content/config.ts` — remove `services_en`, `districts_en`, `blog_en` collection definitions and exports:

```typescript
import { defineCollection, z, reference } from 'astro:content';

// Services collection (TR)
const services = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        heroImage: z.string().optional(),
        features: z.array(z.string()).optional(),
    }),
});

// Districts collection (TR)
const districts = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        districtName: z.string(),
    }),
});

// Blog collection (TR)
const blog = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
});

// Tabela Rehberleri collection (TR only - SEO/AIO focused guides)
const tabela_rehberi = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        category: z.string(),
        tags: z.array(z.string()).optional(),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    }),
});

export const collections = {
    services,
    districts,
    blog,
    tabela_rehberi,
};
```

**Step 3: Verify**

```bash
ls src/content/blog_en/ 2>/dev/null && echo "FAIL" || echo "PASS: blog_en removed"
ls src/content/districts_en/ 2>/dev/null && echo "FAIL" || echo "PASS: districts_en removed"
ls src/content/services_en/ 2>/dev/null && echo "FAIL" || echo "PASS: services_en removed"
```

**Step 4: Commit**

```bash
git add -u src/content/
git commit -m "chore(seo): remove EN content collections (blog_en, districts_en, services_en)

These collections served deleted /en/ page templates.
TR-only collections remain: services, districts, blog, tabela_rehberi."
```

---

## Task 5: Remove non-Istanbul provinces from locations data

**Files:**
- Modify: `src/data/locations.ts`

**Step 1: Update locations.ts — keep only Istanbul, remove arName fields**

Remove these provinces from the `LOCATIONS` array:
- Kocaeli (12 districts)
- Sakarya (16 districts)
- Tekirdağ (10 districts)
- Yalova (6 districts)
- Bursa (8 districts)

Also remove all `arName` fields from Istanbul and its districts since Arabic is being removed.

Edit `src/data/locations.ts`:

```typescript
/**
 * Geographic Service Areas Data
 * Single source of truth for all location pages
 *
 * Structure:
 * - Istanbul: All 39 districts (primary service area)
 *
 * Non-Istanbul provinces removed per SEO strategy:
 * doorway page risk + crawl budget waste for areas not actively served.
 */

export interface District {
  slug: string;
  trName: string;
  enName: string;
}

export interface Province {
  slug: string;
  trName: string;
  enName: string;
  districts: District[];
}

export const LOCATIONS: Province[] = [
  // Istanbul - All 39 Districts
  {
    slug: 'istanbul',
    trName: 'İstanbul',
    enName: 'Istanbul',
    districts: [
      { slug: 'adalar', trName: 'Adalar', enName: 'Adalar' },
      { slug: 'arnavutkoy', trName: 'Arnavutköy', enName: 'Arnavutkoy' },
      { slug: 'atasehir', trName: 'Ataşehir', enName: 'Atasehir' },
      { slug: 'avcilar', trName: 'Avcılar', enName: 'Avcilar' },
      { slug: 'bagcilar', trName: 'Bağcılar', enName: 'Bagcilar' },
      { slug: 'bahcelievler', trName: 'Bahçelievler', enName: 'Bahcelievler' },
      { slug: 'bakirkoy', trName: 'Bakırköy', enName: 'Bakirkoy' },
      { slug: 'basaksehir', trName: 'Başakşehir', enName: 'Basaksehir' },
      { slug: 'bayrampasa', trName: 'Bayrampaşa', enName: 'Bayrampasa' },
      { slug: 'besiktas', trName: 'Beşiktaş', enName: 'Besiktas' },
      { slug: 'beykoz', trName: 'Beykoz', enName: 'Beykoz' },
      { slug: 'beylikduzu', trName: 'Beylikdüzü', enName: 'Beylikduzu' },
      { slug: 'beyoglu', trName: 'Beyoğlu', enName: 'Beyoglu' },
      { slug: 'buyukcekmece', trName: 'Büyükçekmece', enName: 'Buyukcekmece' },
      { slug: 'catalca', trName: 'Çatalca', enName: 'Catalca' },
      { slug: 'cekmekoy', trName: 'Çekmeköy', enName: 'Cekmekoy' },
      { slug: 'esenler', trName: 'Esenler', enName: 'Esenler' },
      { slug: 'esenyurt', trName: 'Esenyurt', enName: 'Esenyurt' },
      { slug: 'eyupsultan', trName: 'Eyüpsultan', enName: 'Eyupsultan' },
      { slug: 'fatih', trName: 'Fatih', enName: 'Fatih' },
      { slug: 'gaziosmanpasa', trName: 'Gaziosmanpaşa', enName: 'Gaziosmanpasa' },
      { slug: 'gungoren', trName: 'Güngören', enName: 'Gungoren' },
      { slug: 'kadikoy', trName: 'Kadıköy', enName: 'Kadikoy' },
      { slug: 'kagithane', trName: 'Kağıthane', enName: 'Kagithane' },
      { slug: 'kartal', trName: 'Kartal', enName: 'Kartal' },
      { slug: 'kucukcekmece', trName: 'Küçükçekmece', enName: 'Kucukcekmece' },
      { slug: 'maltepe', trName: 'Maltepe', enName: 'Maltepe' },
      { slug: 'pendik', trName: 'Pendik', enName: 'Pendik' },
      { slug: 'sancaktepe', trName: 'Sancaktepe', enName: 'Sancaktepe' },
      { slug: 'sariyer', trName: 'Sarıyer', enName: 'Sariyer' },
      { slug: 'sile', trName: 'Şile', enName: 'Sile' },
      { slug: 'silivri', trName: 'Silivri', enName: 'Silivri' },
      { slug: 'sisli', trName: 'Şişli', enName: 'Sisli' },
      { slug: 'sultanbeyli', trName: 'Sultanbeyli', enName: 'Sultanbeyli' },
      { slug: 'sultangazi', trName: 'Sultangazi', enName: 'Sultangazi' },
      { slug: 'tuzla', trName: 'Tuzla', enName: 'Tuzla' },
      { slug: 'umraniye', trName: 'Ümraniye', enName: 'Umraniye' },
      { slug: 'uskudar', trName: 'Üsküdar', enName: 'Uskudar' },
      { slug: 'zeytinburnu', trName: 'Zeytinburnu', enName: 'Zeytinburnu' },
    ],
  },
];

/**
 * Get all districts across all provinces
 */
export function getAllDistricts(): Array<District & { province: string; provinceTrName: string }> {
  return LOCATIONS.flatMap(province =>
    province.districts.map(district => ({
      ...district,
      province: province.slug,
      provinceTrName: province.trName,
    }))
  );
}

/**
 * Get district by slug
 */
export function getDistrictBySlug(slug: string): (District & { province: Province }) | null {
  for (const province of LOCATIONS) {
    const district = province.districts.find(d => d.slug === slug);
    if (district) {
      return { ...district, province };
    }
  }
  return null;
}

/**
 * Get province by slug
 */
export function getProvinceBySlug(slug: string): Province | null {
  return LOCATIONS.find(p => p.slug === slug) || null;
}

/**
 * Get total district count
 */
export function getTotalDistrictCount(): number {
  return LOCATIONS.reduce((sum, province) => sum + province.districts.length, 0);
}
```

**Step 2: Update KPI_DISTRICTS in consts.ts**

Change `KPI_DISTRICTS` from 40 to 39 (exact Istanbul district count):

```typescript
export const KPI_DISTRICTS: number = 39; // Istanbul districts served
```

**Step 3: Commit**

```bash
git add src/data/locations.ts src/consts.ts
git commit -m "chore(seo): remove non-Istanbul provinces from locations data

Remove Kocaeli, Sakarya, Tekirdağ, Yalova, Bursa provinces (52 districts).
These are doorway pages for areas not actively served.
Keep Istanbul 39 districts only. Remove arName fields (Arabic removed)."
```

---

## Task 6: Add redirects and remove i18n from Astro config

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Update astro.config.mjs**

Remove the `i18n` block entirely. Add redirects for removed pages. Update sitemap filter to exclude thin pages.

```javascript
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
          // Exclude thank-you pages
          if (pathname.includes('/thank-you/')) return false;
          if (pathname.includes('/tesekkurler/')) return false;
          // Exclude any remaining /ar/ pages
          if (pathname.startsWith('/ar/')) return false;
          // Exclude removed /en/ sub-pages (only index-level EN pages in sitemap)
          if (pathname.startsWith('/en/blog/')) return false;
          if (pathname.startsWith('/en/service-areas/')) return false;
          if (pathname.includes('/en/faq/')) return false;
          return true;
        } catch {
          return true;
        }
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
    '/ar/get-quote/': '/teklif-al/',
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
```

**Step 2: Verify the config is valid**

```bash
npx astro check 2>&1 | head -20
```

**Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(seo): remove i18n config, add 301 redirects for removed pages

- Remove i18n block (defaultLocale, locales, routing)
- Add /ar/* → Turkish 301 redirects
- Add removed /en/* → Turkish 301 redirects
- Update sitemap filter to exclude /ar/, thin /en/ pages"
```

---

## Task 7: Simplify localeRoutes.ts (TR + limited EN only)

**Files:**
- Modify: `src/utils/localeRoutes.ts`

**Step 1: Rewrite localeRoutes.ts for TR + 7 EN pages only**

Remove `ar` from Locale type, remove Arabic routes, remove dynamic EN routes for deleted pages:

```typescript
export type Locale = 'tr' | 'en';

const LOCALES: Locale[] = ['tr', 'en'];

// Only map routes where EN pages still exist
const STATIC_ROUTES: Array<Partial<Record<Locale, string>>> = [
  { tr: '/', en: '/en/' },
  { tr: '/galeri/', en: '/en/gallery/' },
  { tr: '/hizmetler/', en: '/en/services/' },
  { tr: '/iletisim/', en: '/en/contact/' },
  { tr: '/teklif-al/', en: '/en/get-quote/' },
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
```

**Step 2: Commit**

```bash
git add src/utils/localeRoutes.ts
git commit -m "refactor(seo): simplify localeRoutes to TR + 7 EN pages

Remove Arabic locale entirely. Remove dynamic EN route mappings for
deleted pages (blog, services/[slug], service-areas, FAQ).
Only static TR↔EN mappings remain for 7 kept EN pages."
```

---

## Task 8: Update SEO.astro — remove Arabic hreflang

**Files:**
- Modify: `src/components/common/SEO.astro`

**Step 1: Update SEO.astro**

Remove Arabic alternate link generation. Update the Locale import type (now 'tr' | 'en' only):

In the frontmatter section, remove `arURL` computation and the `ar` hreflang link. The key changes:

1. Remove: `const arURL = alternates.ar ? ...`
2. Remove: the `{arURL && <link rel="alternate" hreflang="ar" ...>}` line
3. Update `xDefaultURL` to only use `trURL ?? enURL ?? canonicalURL`

```astro
---
import { getLocalBusinessSchema } from '../../utils/localBusiness';
import { getLocaleAlternates } from '../../utils/localeRoutes';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title: string;
  description: string;
  lang: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    section?: string;
    tags?: string[];
  };
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
}

const {
  title,
  description,
  lang,
  image = '/brand/a2reklam-logo.png',
  article = false,
  noindex = false,
  articleMeta,
  breadcrumbs = [],
  faq = [],
} = Astro.props;

const alternates = getLocaleAlternates(Astro.url.pathname);
const canonicalPath = alternates[lang as keyof typeof alternates] ?? Astro.url.pathname;
const canonicalURL = new URL(canonicalPath, Astro.site);
const trURL = alternates.tr ? new URL(alternates.tr, Astro.site) : null;
const enURL = alternates.en ? new URL(alternates.en, Astro.site) : null;
const xDefaultURL = trURL ?? enURL ?? canonicalURL;

const localBusinessSchema = Astro.site ? getLocalBusinessSchema(Astro.site) : null;

const breadcrumbSchema = breadcrumbs.length
  ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: new URL(crumb.item, Astro.site).toString(),
      })),
    }
  : null;

const faqSchema = faq.length
  ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }
  : null;

const articleSchema =
  article && articleMeta?.publishedTime
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        inLanguage: lang,
        datePublished: articleMeta.publishedTime,
        dateModified: articleMeta.modifiedTime ?? articleMeta.publishedTime,
        mainEntityOfPage: canonicalURL.toString(),
        image: [new URL(image, Astro.url).toString()],
        author: {
          '@type': 'Organization',
          name: articleMeta.authorName ?? 'A2 Reklam Ekibi',
        },
        publisher: {
          '@type': 'Organization',
          name: 'A2 Reklam - Tabela ve Reklam Sistemleri',
          logo: {
            '@type': 'ImageObject',
            url: new URL('/brand/a2reklam-logo.png', Astro.url).toString(),
          },
        },
        articleSection: articleMeta.section,
        keywords: articleMeta.tags?.join(', '),
      }
    : null;
---

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta
  name="theme-color"
  content="#0B0F14"
  id="theme-color"
  data-theme-dark="#0B0F14"
  data-theme-light="#F8F9FA"
/>
<meta name="generator" content={Astro.generator} />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Alternate Language Links (TR + EN only, no Arabic) -->
{trURL && <link rel="alternate" hreflang="tr" href={trURL} />}
{enURL && <link rel="alternate" hreflang="en" href={enURL} />}
<link rel="alternate" hreflang="x-default" href={xDefaultURL} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<meta
  name="robots"
  content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}
/>

<!-- Open Graph / Facebook -->
<meta property="og:type" content={article ? 'article' : 'website'} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.url)} />
{articleMeta?.publishedTime && <meta property="article:published_time" content={articleMeta.publishedTime} />}
{articleMeta?.modifiedTime && <meta property="article:modified_time" content={articleMeta.modifiedTime} />}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={canonicalURL} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image, Astro.url)} />

{localBusinessSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(localBusinessSchema)} />
)}

{breadcrumbSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
)}

{faqSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
)}

{articleSchema && (
  <script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
)}
```

**Step 2: Commit**

```bash
git add src/components/common/SEO.astro
git commit -m "feat(seo): remove Arabic hreflang from SEO component

Remove arURL computation and <link hreflang='ar'> tag.
Keep TR + EN hreflang for pages that have EN equivalents.
x-default points to TR (primary language)."
```

---

## Task 9: Update Header.astro — remove Arabic navigation

**Files:**
- Modify: `src/components/common/Header.astro`

**Step 1: Update Header.astro**

Remove `items_ar` array, remove Arabic from `languageOrder`, remove RTL-related handling for Arabic:

Key changes in the frontmatter:
1. Remove `items_ar` array
2. Simplify `items` to only check for 'en' or default to 'tr'
3. Remove 'ar' from `languageLabels` and `languageOrder`
4. Simplify `homeLink`, `callLabel`, `menuLabel`, `closeLabel` — remove 'ar' cases
5. Remove `isRtl` variable

Key changes in the template:
1. Remove all `isRtl &&` class conditionals
2. Remove RTL-related `data-rtl` attribute on mobile menu

The full replacement is large — edit the frontmatter section to remove Arabic references and simplify the ternary expressions. Keep the rest of the template structure intact but remove `isRtl` conditionals.

**Step 2: Commit**

```bash
git add src/components/common/Header.astro
git commit -m "feat(seo): remove Arabic navigation from Header

Remove items_ar, Arabic language switcher option, and RTL handling.
Language switcher now shows only Türkçe/English where alternates exist."
```

---

## Task 10: Update Footer.astro — remove Arabic content

**Files:**
- Modify: `src/components/common/Footer.astro`

**Step 1: Update Footer.astro**

Remove the `ar` key from the `content` object. Simplify the `t` variable assignment:

```typescript
const t = lang === 'en' ? content.en : content.tr;
```

Remove the entire `ar: { ... }` block from the content object.

**Step 2: Commit**

```bash
git add src/components/common/Footer.astro
git commit -m "feat(seo): remove Arabic content from Footer

Remove Arabic content block and simplify language selection to TR/EN."
```

---

## Task 11: Update Layout.astro — remove Arabic/RTL handling

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Update Layout.astro**

Key changes:
1. Remove `SITE_DESCRIPTION_AR` import
2. Simplify description assignment to only check 'en'
3. Remove `isRtl` variable
4. Remove RTL references in html dir attribute (always 'ltr')
5. Simplify `whatsappMessage` lang to only check 'en'
6. Simplify `quoteLink` to only check 'en'
7. Remove `isRtl && 'font-arabic'` from body class
8. Remove Arabic from `BackToTopButton` lang prop

Replace the frontmatter:

```astro
---
import { SITE_TITLE, SITE_DESCRIPTION, SITE_DESCRIPTION_EN, GTM_CONTAINER_ID, TRACKING_ENABLED } from '../consts';
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';
import SEO from '../components/common/SEO.astro';
import MobileCTA from '../components/common/MobileCTA.astro';
import WhatsAppAssistant from '../components/common/WhatsAppAssistant.astro';
import BackToTopButton from '../components/common/BackToTopButton.astro';
import Tracking from '../components/common/Tracking.astro';
import TrackingEvents from '../components/common/TrackingEvents.astro';
import { buildWhatsAppLink, buildWhatsAppMessage, sanitizePageTitle } from '../utils/whatsapp';
import '../styles/global.css';

interface Props {
	title?: string;
	description?: string;
	lang?: string;
  image?: string;
  article?: boolean;
  noindex?: boolean;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    section?: string;
    tags?: string[];
  };
  breadcrumbs?: { name: string; item: string }[];
  faq?: { question: string; answer: string }[];
  whatsappTitle?: string;
  whatsappLocation?: string;
  mobileCtaVariant?: 'default' | 'contact';
}

const {
  title = SITE_TITLE,
  description: providedDescription,
  lang = 'tr',
  image,
  article = false,
  noindex = false,
  articleMeta,
  breadcrumbs,
  faq,
  whatsappTitle,
  whatsappLocation,
  mobileCtaVariant = 'default',
} = Astro.props;

const description = providedDescription ?? (lang === 'en' ? SITE_DESCRIPTION_EN : SITE_DESCRIPTION);

const sanitizedTitle = sanitizePageTitle(whatsappTitle ?? title);
const whatsappMessage = buildWhatsAppMessage({
  lang: lang === 'en' ? 'en' : 'tr',
  pageTitle: sanitizedTitle,
  location: whatsappLocation ?? null,
});
const whatsappLink = buildWhatsAppLink(whatsappMessage);
const quoteLink =
  mobileCtaVariant === 'contact'
    ? '#contact-form'
    : lang === 'en'
      ? '/en/get-quote/'
      : '/teklif-al/';
---
```

And update the HTML:

```html
<html lang={lang} dir="ltr" class="scroll-smooth">
```

And the body class (remove `isRtl && 'font-arabic'`):

```html
<body class="bg-secondary text-gray-300 font-sans antialiased flex flex-col min-h-screen selection:bg-primary selection:text-white pb-16 md:pb-0">
```

And simplify BackToTopButton:

```html
<BackToTopButton lang={lang === 'en' ? 'en' : 'tr'} />
```

**Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(seo): remove Arabic/RTL support from Layout

Remove SITE_DESCRIPTION_AR import, isRtl logic, font-arabic class,
and RTL dir attribute. Simplify to TR + EN only."
```

---

## Task 12: Remove SITE_DESCRIPTION_AR from consts.ts

**Files:**
- Modify: `src/consts.ts`

**Step 1: Remove SITE_DESCRIPTION_AR and update Google Reviews data**

Delete the `SITE_DESCRIPTION_AR` line. Also, set real Google review data if available (the SEO report mentions 22 reviews at 5.0):

```typescript
export const SITE_DESCRIPTION_AR = '...'; // DELETE THIS LINE

// Update Google Reviews with real data from GBP
export const GOOGLE_RATING: number | null = 5.0;
export const GOOGLE_REVIEW_COUNT: number | null = 22;
```

**Step 2: Check for any other files importing SITE_DESCRIPTION_AR**

```bash
grep -r "SITE_DESCRIPTION_AR" src/ --include="*.ts" --include="*.astro"
```

If any other files import it, update them to remove the import. Layout.astro was already updated in Task 11.

**Step 3: Commit**

```bash
git add src/consts.ts
git commit -m "feat(seo): remove Arabic description, add Google review data

Remove SITE_DESCRIPTION_AR (Arabic support removed).
Add real Google rating (5.0) and review count (22) for AggregateRating schema."
```

---

## Task 13: Update robots.txt

**Files:**
- Modify: `public/robots.txt`

**Step 1: Update robots.txt to block /ar/ crawling and add Disallow for removed paths**

```
User-agent: *
Allow: /
Disallow: /tesekkurler/
Disallow: /en/thank-you/
Disallow: /ar/

Sitemap: https://a2reklam.com/sitemap-index.xml
Sitemap: https://a2reklam.com/video-sitemap.xml
```

**Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): update robots.txt — block /ar/ crawling

Add Disallow for /ar/ to prevent crawl budget waste.
Remove /ar/thank-you/ (covered by /ar/ block).
Keep sitemap references."
```

---

## Task 14: Enhance LocalBusiness schema

**Files:**
- Modify: `src/utils/localBusiness.ts`

**Step 1: Add openingHours, priceRange, and postal code to schema**

```typescript
import {
  ADDRESS,
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  BUSINESS_NAME,
  BUSINESS_SHORT_NAME,
  EMAIL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  LOGO_PATH,
  MAPS_URL,
  PHONE_NUMBER,
  SITE_DESCRIPTION,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
} from '../consts';

const GEO = {
  "@type": "GeoCoordinates",
  "latitude": 41.0820,
  "longitude": 28.9719
};

function pruneEmpty(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(pruneEmpty).filter((item) => item !== undefined);
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => [key, pruneEmpty(val)])
      .filter(([, val]) => val !== undefined);
    return Object.fromEntries(entries);
  }
  if (value === null || value === '') return undefined;
  return value;
}

export function getLocalBusinessSchema(siteUrl: URL): Record<string, unknown> {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl.toString()}#organization`,
    name: BUSINESS_NAME,
    alternateName: BUSINESS_SHORT_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl.toString(),
    telephone: PHONE_NUMBER,
    email: EMAIL,
    image: new URL(LOGO_PATH, siteUrl).toString(),
    logo: new URL(LOGO_PATH, siteUrl).toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Şirintepe, Açelya Sokağı Ugur Apt No:4/a',
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: '34415',
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: ADDRESS_REGION,
    },
    hasMap: MAPS_URL,
    sameAs: [SOCIAL_INSTAGRAM_URL, SOCIAL_FACEBOOK_URL, SOCIAL_LINKEDIN_URL],
    geo: GEO,
    priceRange: '₺₺',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    aggregateRating:
      GOOGLE_RATING && GOOGLE_REVIEW_COUNT
        ? {
            '@type': 'AggregateRating',
            ratingValue: GOOGLE_RATING,
            reviewCount: GOOGLE_REVIEW_COUNT,
            bestRating: 5,
            worstRating: 1,
          }
        : null,
  };

  return pruneEmpty(schema) as Record<string, unknown>;
}
```

**Step 2: Commit**

```bash
git add src/utils/localBusiness.ts
git commit -m "feat(seo): enhance LocalBusiness schema

Add @id for entity reference, logo field, postal code (34415),
priceRange, opening hours (Mon-Fri 9-18, Sat 9-14).
Split streetAddress from full address for proper PostalAddress structure."
```

---

## Task 15: Clean up remaining Arabic references in components

**Files:**
- Check and modify: `src/components/common/WhatsAppAssistant.astro`
- Check and modify: `src/components/common/MobileCTA.astro`
- Check and modify: `src/components/common/BackToTopButton.astro`
- Check and modify: `src/data/reviews.ts`
- Check and modify: `src/data/videos.ts`
- Check and modify: `src/config/serviceLabels.ts`

**Step 1: Search for remaining 'ar' language references**

```bash
grep -rn "'ar'" src/components/ src/data/ src/config/ --include="*.astro" --include="*.ts" | grep -v node_modules
```

**Step 2: Update each file found**

For each file with Arabic references:
- Remove `ar` cases from ternary expressions
- Remove `ar` keys from translation objects
- Simplify language checks to `lang === 'en' ? ... : ...`

**Step 3: Commit**

```bash
git add src/components/ src/data/ src/config/
git commit -m "chore(seo): remove remaining Arabic language references

Clean up ar cases from WhatsApp, MobileCTA, BackToTop, reviews,
videos, and serviceLabels. Simplify to TR/EN only."
```

---

## Task 16: Build verification

**Step 1: Run full build**

```bash
npm run build 2>&1
```

Expected: Build succeeds with no errors. May have warnings about removed content — those are expected.

**Step 2: Check build output page count**

```bash
find dist/ -name "index.html" | wc -l
```

Expected: Significantly fewer pages than before (~60-80 range).

**Step 3: Verify redirects are generated**

```bash
ls dist/ar/ 2>/dev/null && echo "Redirect pages exist" || echo "No /ar/ in dist"
```

**Step 4: Verify sitemap content**

```bash
cat dist/sitemap-*.xml | grep -c "<loc>"
```

Expected: URL count should match the reduced page set (~60-80).

**Step 5: Spot-check that /ar/ URLs are not in sitemap**

```bash
cat dist/sitemap-*.xml | grep "/ar/" && echo "FAIL: /ar/ in sitemap" || echo "PASS: no /ar/ in sitemap"
```

**Step 6: Commit any build fixes if needed, then final commit**

```bash
git add -A
git commit -m "chore: build verification — all SEO cleanup changes compile successfully"
```

---

## Summary of Changes

| Category | Before | After |
|----------|--------|-------|
| Languages | TR + EN + AR | TR + EN (7 pages) |
| /ar/ pages | 6 pages | 0 (301 → TR) |
| /en/ pages | 15 pages | 7 pages |
| Blog posts | 65 (10 thin) | 55 (quality only) |
| Provinces | 6 (91 districts) | 1 (39 districts) |
| i18n config | Full 3-lang | Removed |
| hreflang tags | TR/EN/AR | TR/EN (where applicable) |
| robots.txt | Minimal blocks | +/ar/ block |
| LocalBusiness | Basic | +hours, price, postal |
| AggregateRating | null (hidden) | 5.0/22 reviews |
| Estimated URLs | ~300+ | ~60-80 |

