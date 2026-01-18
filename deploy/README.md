# Deployment Notes

- Use `public/.htaccess` at the web root (for example, `public_html/.htaccess`).
- Keep redirects minimal and direct to avoid chains.
- The current file includes sitemap redirects for legacy WordPress paths.
- After deploy, verify `/sitemap-index.xml` and `/sitemap-0.xml` load correctly.
