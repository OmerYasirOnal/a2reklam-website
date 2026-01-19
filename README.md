# A2 Reklam Astro Rebuild

[![Build](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml/badge.svg)](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml)

Modern multilingual (TR/EN/AR) static-first website for a2reklam.com, built with Astro 5.

## Quick Start

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Develop locally:
   ```bash
   npm run dev
   ```

3. Repo safety check (prevents private assets from being tracked):
   ```bash
   npm run repo:safety
   ```

## Demo Assets vs Production Assets

This public repo ships a small demo image set so CI builds remain green and the repo stays safe.

- Demo assets live in `public/assets/img/demo/` and `public/images-manifest.demo.json`.
- Full private assets live locally in `RES.../` and are generated with:
  ```bash
  npm run process-images
  ```
  This writes `public/assets/img/` and `public/images-manifest.json` (both ignored by git).

The site loads `images-manifest.json` when present and falls back to the demo manifest otherwise.

## Security Note

- Private assets must never be committed (the `RES...` archive, `node_modules/`, `dist/`, or full manifests).
- If private assets ever leak into history, purge them with `git filter-repo` and force-push.
- CI runs `npm run repo:safety` to block tracked private assets.

## Build

```bash
npm run build
```
Output is written to `dist/`.

## Lead Forms (Static Hosting)

Set `PUBLIC_FORM_ENDPOINT` to your form provider endpoint (Formspree/Getform/etc.). Example:
```bash
PUBLIC_FORM_ENDPOINT="https://formspree.io/f/your-id"
```

If not set, the forms fall back to mailto and WhatsApp links. Successful submissions redirect to `/teşekkürler/` and `/en/thank-you/`.

## Tracking (GTM-Only)

**Important**: This site injects **ONLY GTM** (`GTM-MXT449F9`). GA4 and Google Ads tags must be configured inside the GTM container to avoid double counting.

### GTM Configuration Required

In your GTM container, configure:
- **GA4 Configuration Tag**: Measurement ID `G-TC9GJP3GLT`
- **Google Ads Conversion Tag**: Conversion ID `AW-17854412453`

### DataLayer Events

The site pushes the following events to `dataLayer`:

1. **lead_click**: Fires when users click lead CTAs (call, WhatsApp, quote buttons)
   - Properties: `lead_type`, `lang`, `page`

2. **lead_submit**: Fires when quote forms are submitted
   - Properties: `lead_type`, `lang`, `page`

3. **lead_conversion**: Fires on thank-you pages (once per page load)
   - Properties: `lead_type: 'quote'`, `lang`, `page`
   - Pages: `/teşekkürler/`, `/en/thank-you/`, `/ar/thank-you/`

### Tag Assistant Verification

1. Install [Tag Assistant](https://tagassistant.google.com/)
2. Visit any page on the site
3. Verify:
   - ✅ **Single** `page_view` event (not double)
   - ✅ `lead_click` appears when clicking CTAs
   - ✅ `lead_submit` appears when submitting forms
   - ✅ `lead_conversion` appears on thank-you pages

### Google Ads Conversion Setup

**Recommended**: Use GTM to trigger Google Ads conversions on `lead_conversion` event:
- Create a trigger in GTM: Event = `lead_conversion`
- Create a Google Ads Conversion Tag in GTM
- Attach the trigger to the tag

**Alternative**: If using direct conversion URLs, update your conversion rules:
- Old: `/iletisim-tabela/` → New: `/iletisim/` OR better: `/teşekkürler/` (TR), `/en/thank-you/` (EN), `/ar/thank-you/` (AR)

## Deployment (cPanel)

1. Run `npm run build`.
2. Upload the contents of `dist/` to `public_html`.
3. Ensure the root `.htaccess` is present (see `public/.htaccess` and `deploy/README.md`).

## Key Directories

- `src/content/`: Markdown content for services, districts, and blog.
- `src/components/`: Reusable UI components.
- `public/assets/img/demo/`: Demo images tracked in git.
- `public/brand/`: Brand source assets used for icons.
- `scripts/`: Local automation scripts.

## Search Console Checklist

- Verify the domain property.
- Submit `https://a2reklam.com/sitemap-index.xml`.
- Confirm canonical + hreflang tags after launch.
- Monitor coverage and 404s after go-live.
