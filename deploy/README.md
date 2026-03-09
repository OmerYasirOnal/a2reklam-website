# Deployment Notes (cPanel)

1. Build locally:
   ```bash
   npm run build
   ```
2. Make sure `dist/.htaccess` exists (it should match `.htaccess-fixed` in the repo root).
3. Upload the contents of `dist/` to `public_html/` (overwrite existing).
4. In cPanel File Manager, enable "Show Hidden Files" and confirm `public_html/.htaccess` exists.
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
