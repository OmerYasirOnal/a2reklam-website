# A2 Reklam Astro Rebuild

[![Build](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml/badge.svg)](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml)

Modern multilingual (TR/EN/AR) static-first website for a2reklam.com, built with Astro 5.

## Quick Start

**Requirements:**
- Node.js 20.x
- pnpm 10.x (`npm install -g pnpm`)

1. Install dependencies:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. Develop locally:
   ```bash
   pnpm run dev
   ```

3. Repo safety check (prevents private assets from being tracked):
   ```bash
   pnpm run repo:safety
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
   - Properties: `cta_type` (whatsapp/call/quote), `lang`, `page`
   - Use in GTM: Create custom event triggers on `cta_click`

2. **lead_submit**: Fires when forms are submitted (not on success, just on submit)
   - Properties: `lead_type`, `lang`, `page`

3. **form_success**: Fires ONLY when contact form email is successfully sent
   - Properties: `form_type: 'contact'`, `lang`, `page`
   - Use this for Google Ads form submission conversion (success-based)

4. **lead_conversion**: Fires on thank-you pages (once per page load)
   - Properties: `lead_type: 'quote'`, `lang`, `page`
   - Pages: `/teşekkürler/`, `/en/thank-you/`, `/ar/thank-you/`

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

### Build Output
```bash
pnpm run build
```
- Output: `dist/` folder (341 static HTML pages)
- Dependencies: None (static HTML/CSS/JS only)
- Node version used: 20.x
- Package manager: pnpm 10.x

### Deploy to a2reklam.com (cPanel)

**Step-by-step deployment:**

1. **Build the site locally:**
   ```bash
   pnpm run build
   ```
   This creates the `dist/` folder with all static files.

2. **Upload to cPanel:**
   - Connect via FTP/SFTP or use cPanel File Manager
   - Upload entire `dist/` folder contents to `public_html/`
   - Important: Upload `public/api/contact.php` to `public_html/api/contact.php`
     - This PHP file handles contact form email submissions
     - Ensure the `/api/` directory exists in `public_html/`

3. **Verify Required Files:**
   - `.htaccess` (for URL rewriting) should be in `public_html/`
   - `api/contact.php` should be accessible at `https://a2reklam.com/api/contact.php`

4. **Test Critical Features:**
   - Phone call button (should push `cta_click` event to GTM)
   - WhatsApp button (should push `cta_click` event to GTM)
   - Contact form submission (should send email and push `form_success` event)
   - Gallery lightbox (GLightbox with swipe/keyboard support)

5. **Configure GTM:**
   - Set up Google Ads conversion tags inside GTM
   - Use `[data-track="whatsapp"]` and `[data-track="call"]` as trigger selectors
   - Use `form_success` custom event for form conversion tracking

**No server-side runtime needed** - everything is static HTML/CSS/JS except for the PHP email endpoint.

### Environment Variables (Optional)
- `PUBLIC_FORM_ENDPOINT`: Form submission endpoint (Formspree/Getform)
  - If not set, forms fall back to mailto/WhatsApp
  - Set in `.env` during build: `PUBLIC_FORM_ENDPOINT="https://formspree.io/f/your-id"`

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
