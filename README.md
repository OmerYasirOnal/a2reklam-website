# A2 Reklam Astro Rebuild

[![Build](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml/badge.svg)](https://github.com/OmerYasirOnal/a2reklam-website/actions/workflows/build.yml)

Modern bilingual (TR/EN) static-first website for a2reklam.com, built with Astro 5.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Develop locally:
   ```bash
   npm run dev
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

## Build

```bash
npm run build
```
Output is written to `dist/`.

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
