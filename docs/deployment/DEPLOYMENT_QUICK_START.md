# A2REKLAM SEO AUDIT - DEPLOYMENT QUICK START

## What to Deploy

### Files to Upload to cPanel `/public_html/`

1. **dist/** (entire folder) → Upload and overwrite existing `/public_html/`
   - Contains all 341 HTML pages
   - Includes sitemap-index.xml and sitemap-0.xml

2. **.htaccess** → Rename `.htaccess-fixed` to `.htaccess` and upload to `/public_html/`
   - Already includes sitemap redirects
   - Includes www/non-www canonicalization
   - Security headers and compression settings included

3. **robots.txt** → Already in `public/` folder, copy to `/public_html/robots.txt`
   - Already points to correct Astro sitemap-index.xml

---

## Copy-Paste: .htaccess Sitemap Redirects

**Location:** Add these lines to your `.htaccess` file (they're already in `.htaccess-fixed`):

```apache
# LEGACY WORDPRESS REDIRECTS
<IfModule mod_alias.c>
  Redirect 301 /sitemap_index.xml /sitemap-index.xml
  Redirect 301 /sitemap.xml /sitemap-index.xml
  Redirect 301 /page-sitemap.xml /sitemap-0.xml
  Redirect 301 /post-sitemap.xml /sitemap-0.xml
  Redirect 301 /iletisim-tabela/ /iletisim/
  Redirect 301 /hakkinda/ /hakkimizda/
  Redirect 301 /tabela-cesitleri/ /hizmetler/
</IfModule>
```

---

## Verification Commands (Run After Upload)

```bash
# 1. Check sitemap redirects
curl -I https://a2reklam.com/sitemap.xml
# Expected: HTTP 301, Location: https://a2reklam.com/sitemap-index.xml

curl -I https://a2reklam.com/sitemap_index.xml
# Expected: HTTP 301, Location: https://a2reklam.com/sitemap-index.xml

# 2. Verify sitemap exists and is valid
curl -s https://a2reklam.com/sitemap-index.xml | head -5
# Expected: <?xml version... <sitemapindex

# 3. Check robots.txt points to Astro sitemap
curl -s https://a2reklam.com/robots.txt | grep Sitemap
# Expected: Sitemap: https://a2reklam.com/sitemap-index.xml

# 4. Verify critical page canonicals
curl -s https://a2reklam.com/iletisim/ | grep canonical
# Expected: href="https://a2reklam.com/iletisim/"
```

---

## Google Search Console Steps (After Upload)

### 1. Remove Old Sitemap
- Login to GSC → select a2reklam.com property
- Left menu → Sitemaps
- Find `https://www.a2reklam.com/sitemap_index.xml`
- Click ⋮ (three dots) → Delete

### 2. Submit New Astro Sitemap
- Same Sitemaps page → Add Sitemap button
- Enter: `sitemap-index.xml`
- Click Submit
- Wait for processing (24-48 hours)

### 3. Request Indexing for Key Pages
- Left menu → URL Inspection
- Inspect: `https://a2reklam.com/`
- If not indexed → Click Request Indexing
- Repeat for: `/hizmetler/`, `/hizmet-bolgeleri/`, `/tabela-rehberi/`, `/galeri/`, `/iletisim/`, `/teklif-al/`

---

## Expected Results

| Metric | Before | After (1-2 weeks) |
|--------|--------|-------------------|
| GSC Discovered URLs | 61 | 300+ |
| GSC Indexed URLs | ~30 | 250+ |
| Sitemap Submission Status | Error | Success |
| /iletisim/ in Google Index | No | Yes |
| /teklif-al/ in Google Index | No | Yes |

---

## Files in This Audit

1. **A2REKLAM_SEO_AUDIT.docx** - Complete technical report (this document provides all details)
2. **.htaccess-fixed** - Production-ready .htaccess file (rename to .htaccess when uploading)
3. **LEGACY_REDIRECTS.csv** - CSV table of all redirects for reference
4. **public/robots.txt** - Already correct, included for reference
5. **dist/** - Full Astro build output (341 pages)

---

## Timeline

- **Today:** Upload .htaccess and dist/ to cPanel
- **Day 1:** Submit new sitemap to GSC
- **Day 1-2:** Request indexing for key pages
- **Day 3-14:** Google crawls and indexes new pages
- **Week 2-3:** Most pages should appear in Google's index

---

## Success Indicators

✓ All sitemap redirects return HTTP 301 to new URLs
✓ robots.txt contains correct Astro sitemap URL
✓ Critical pages (/iletisim/, /teklif-al/) load and show self-referencing canonicals
✓ GSC shows 250+ indexed URLs (up from ~30)
✓ URL Inspection shows pages as "URL is on Google"

---

## Questions?

Refer to the full **A2REKLAM_SEO_AUDIT.docx** report for detailed explanations, root cause analysis, and troubleshooting steps.
