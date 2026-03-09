# A2 Reklam - Kurumsal Web Sitesi

[![Build](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml/badge.svg)](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml)

Istanbul merkezli profesyonel tabela imalati ve reklam cozumleri sunan A2 Reklam'in kurumsal web sitesi. Astro 5 ile olusturulmus, Vercel uzerinde deploy edilen statik site.

## Tech Stack

- **Framework:** Astro v5 + Tailwind CSS v3 + React (minimal)
- **Hosting:** Vercel (static) / cPanel (legacy)
- **SEO:** Schema.org (LocalBusiness, WebSite, FAQPage, BreadcrumbList, Service, BlogPosting)
- **Analytics:** Google Tag Manager (GTM-MXT449F9), GA4 (G-TC9GJP3GLT)
- **Form:** PHPMailer SMTP (harici sunucu)

## Kurulum

**Gereksinimler:**
- Node.js 20.x
- npm

```bash
# Bagimliliklari yukle
npm install

# Gelistirme sunucusunu baslat
npm run dev

# Production build
npm run build

# Build onizleme
npm run preview
```

## Demo Assets vs Production Assets

This public repo ships a small demo image set so CI builds remain green and the repo stays safe.

- Demo assets live in `public/assets/img/demo/` and `public/images-manifest.demo.json`.
- Full private assets live locally in `RES.../` and are generated with:
  ```bash
  pnpm run process-images
  ```
  This writes `public/assets/img/` and `public/images-manifest.json` (both ignored by git).

The site loads `images-manifest.json` when present and falls back to the demo manifest otherwise.

## Security Note

- Private assets must never be committed (the `RES...` archive, `node_modules/`, `dist/`, or full manifests).
- If private assets ever leak into history, purge them with `git filter-repo` and force-push.
- CI runs `pnpm run repo:safety` to block tracked private assets.

## Build

```bash
pnpm run build
```
Output is written to `dist/` (341 static pages).

## Contact Form Email Integration

The contact form sends emails to `info@a2reklam.com` via a PHP endpoint (`public/api/contact.php`) that is deployed with the static site.

### How it Works
1. User submits the form on `/iletisim/` (or `/en/contact/`, `/ar/contact/`)
2. JavaScript sends form data via `fetch()` to `/api/contact.php`
3. PHP validates input, performs anti-spam checks, and sends email
4. On success: Form clears, success message displays, and Google Ads conversion fires
5. On error: Error message displays, no conversion fires

### PHP Configuration
The endpoint uses PHP's built-in `mail()` function, which works on most cPanel hosts without additional configuration.

**For SMTP configuration (optional):**
If `mail()` doesn't work or you need SMTP, you can upgrade to PHPMailer:
1. Install PHPMailer in `public/api/` (not tracked in git)
2. Update `contact.php` to use SMTP credentials from a config file (outside git)
3. Never commit SMTP credentials to the repository

### Security Features
- Same-origin CORS policy (only allows requests from a2reklam.com and localhost)
- Honeypot field for spam prevention
- Rate limiting (5 requests per IP per hour)
- Input validation and sanitization
- Referer header validation

### Testing Locally
To test the form locally with PHP:
```bash
# Option 1: Use PHP's built-in server
php -S localhost:8000 -t public

# Option 2: Use Astro dev server (forms will fail locally without PHP)
pnpm run dev
# Note: Contact form will fail in dev mode unless you have a local PHP server
```

On production (cPanel), PHP is available by default and `/api/contact.php` will work automatically.

## Tracking (GTM-Only)

**Important**: This site uses **ONLY Google Tag Manager** (`GTM-MXT449F9`). All analytics and conversion tracking must be configured inside the GTM container to avoid double tracking.

### GTM Setup

The site loads a single GTM container. No other tracking scripts (GA4, Google Ads gtag.js) are loaded directly in the code.

**Configure these tags inside GTM:**
- **GA4 Configuration Tag**: Use Measurement ID `G-TC9GJP3GLT`
- **Google Ads Conversion Tags**: Use Conversion ID `AW-17854412453`

### CTA Elements for GTM Triggers

All call-to-action elements have stable `data-track` attributes for easy GTM trigger setup:

**WhatsApp Buttons:**
- Selector: `[data-track="whatsapp"]`
- Trigger: Click - All Elements matching `data-track` equals `whatsapp`
- Use this for Google Ads WhatsApp conversion

**Phone Call Buttons:**
- Selector: `[data-track="call"]`
- Trigger: Click - All Elements matching `data-track` equals `call`
- Use this for Google Ads phone call conversion

**Quote/Contact Buttons:**
- Selector: `[data-track="quote"]`
- Trigger: Click - All Elements matching `data-track` equals `quote`

### GTM Conversion Setup Example

To track Google Ads conversions for WhatsApp and phone clicks:

1. **Create Click Triggers in GTM:**
   - Trigger Type: Click - All Elements
   - Condition: Click Element → matches CSS selector → `[data-track="whatsapp"]`
   - Repeat for `[data-track="call"]`

2. **Create Google Ads Conversion Tags:**
   - Tag Type: Google Ads Conversion Tracking
   - Conversion ID: `AW-17854412453`
   - Conversion Label: (get from Google Ads)
   - Attach the corresponding trigger

### DataLayer Events

The site pushes the following events to `dataLayer` for GTM:

1. **cta_click**: Fires when users click CTAs (call, WhatsApp, quote buttons)
   - Properties: `cta_type` (whatsapp/call/quote), `lang`, `page`, `phone_number` (for call clicks)
   - Use in GTM: Create custom event triggers on `cta_click`

2. **lead_submit**: Fires when forms are submitted (not on success, just on submit)
   - Properties: `lead_type`, `lang`, `page`

3. **phone_click**: Fires when users click any `tel:` CTA
   - Properties: `phone_number`, `lang`, `page`
   - Use this for direct phone-call conversion tags in GTM / Google Ads

4. **form_success**: Fires ONLY when contact form email is successfully sent
   - Properties: `form_type: 'contact'`, `lang`, `page`
   - Use this for Google Ads form submission conversion (success-based)

5. **lead_conversion**: Fires on thank-you pages (once per page load)
   - Properties: `lead_type: 'quote'`, `lang`, `page`
   - Pages: `/teşekkürler/`, `/en/thank-you/`, `/ar/thank-you/`

6. **outbound_click**: Fires for external outbound links (references, maps, social)
   - Properties: `outbound_type`, `outbound_target`, `outbound_name`, `lang`, `page`
   - Use this for measuring off-site referral clicks in GTM/GA4.

### Tag Assistant Verification

1. Install [Tag Assistant](https://tagassistant.google.com/)
2. Visit any page on the site
3. Verify:
   - ✅ GTM container loads (GTM-MXT449F9)
   - ✅ `cta_click` appears when clicking CTAs
   - ✅ `form_success` appears after successful form submission
   - ✅ `lead_conversion` appears on thank-you pages
   - ✅ No duplicate page views or double tracking

## Deployment

### Vercel Deploy (Onerilen)

1. GitHub reposunu Vercel'e baglayin
2. Framework: **Astro** otomatik algilanir
3. Build komutu: `npm run build`
4. Output dizini: Otomatik (`@astrojs/vercel` adapter)
5. Gerekli ortam degiskenlerini Vercel dashboard'dan ekleyin
6. Deploy!

`vercel.json` dosyasi guvenlik header'lari, cache ayarlari ve 301 redirect'leri icerir.

### Ortam Degiskenleri

| Degisken | Aciklama | Zorunlu |
|----------|----------|---------|
| `PUBLIC_GTM_CONTAINER_ID` | GTM Container ID | Hayir (varsayilan: GTM-MXT449F9) |
| `PUBLIC_GA4_MEASUREMENT_ID` | GA4 Measurement ID | Hayir (varsayilan: G-TC9GJP3GLT) |

> Not: Tracking ID'leri `src/consts.ts` icinde hardcoded. Vercel'de override etmek icin `import.meta.env` kullanilabilir.

### cPanel Deploy (Legacy)

```bash
npm run deploy    # FTP upload + server extract
```

`.env.deploy` dosyasinda FTP bilgileri saklanir (gitignored).

### Build Output
```bash
npm run build
```
- Output: `dist/` + `.vercel/output/` (174+ statik HTML sayfa)
- Node version: 20.x

## Proje Yapisi

```
src/
├── components/
│   ├── common/       # Header, Footer, SEO, CookieConsent, Tracking
│   ├── landing/      # Hero, ServicesGrid, KPI, Reviews, Gallery
│   ├── seo/          # FAQ, Breadcrumb, SiteSchemas, ServiceSchema
│   └── ui/           # UI bilesenleri
├── content/
│   ├── blog/         # 66 blog yazisi (Markdown)
│   ├── services/     # 18 hizmet turu
│   ├── districts/    # 44 Istanbul ilcesi
│   └── tabela_rehberi/ # 22 rehber
├── layouts/          # Layout.astro
├── pages/            # Route'lar
├── styles/           # Global CSS
└── utils/            # Yardimci fonksiyonlar
```

## Key Directories

- `src/content/`: Markdown content for services, districts, and blog.
- `src/components/`: Reusable UI components.
- `src/components/seo/`: SEO components (FAQ, Breadcrumb, SiteSchemas, ServiceSchema).
- `public/assets/img/demo/`: Demo images tracked in git.
- `public/brand/`: Brand source assets used for icons.
- `scripts/`: Local automation scripts.

## Search Console Checklist

- Verify the domain property.
- Submit `https://a2reklam.com/sitemap-index.xml`.
- Confirm canonical + hreflang tags after launch.
- Monitor coverage and 404s after go-live.
