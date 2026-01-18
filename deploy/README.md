# Deployment Notes (cPanel)

1. Build locally:
   ```bash
   npm run build
   ```
2. Upload the contents of `dist/` to `public_html/`.
3. Copy `public/.htaccess` to `public_html/.htaccess` (merge if you already have rules).
4. Verify clean URLs and redirects:
   - `/sitemap-index.xml`
   - `/sitemap-0.xml`
   - `/iletisim-tabela/` → `/iletisim/`
5. Check that `/hizmetler/`, `/en/services/`, and `/ar/services/` load.

## Post-Launch Checklist

- Submit `https://a2reklam.com/sitemap-index.xml` in Search Console.
- Test legacy redirects from old WordPress URLs.
- Confirm GTM + gtag via Tag Assistant (avoid duplicate `page_view` if GA4/Ads are also in GTM).
- Validate lead forms (Formspree/Getform) or mailto/WhatsApp fallback.
