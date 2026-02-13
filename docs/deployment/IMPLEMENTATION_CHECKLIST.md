# A2REKLAM SEO AUDIT - IMPLEMENTATION CHECKLIST

## Pre-Deployment Verification (Local)

- [ ] Read `SEO_AUDIT_SUMMARY.txt` (this file provides overview)
- [ ] Read `A2REKLAM_SEO_AUDIT.docx` (full technical report)
- [ ] Review `DEPLOYMENT_QUICK_START.md` (step-by-step guide)
- [ ] Verify `.htaccess-fixed` exists in project root
- [ ] Verify `dist/` folder contains 341 HTML files
- [ ] Verify `dist/sitemap-index.xml` exists (183 bytes)
- [ ] Verify `dist/sitemap-0.xml` exists (26 KB)

## Phase 1: cPanel File Upload (Today)

### Step 1: Prepare .htaccess
- [ ] Locate `.htaccess-fixed` in your project root
- [ ] Rename it to `.htaccess` (remove "-fixed")
- [ ] Verify it contains sitemap redirect lines
- [ ] Make a backup of any existing `.htaccess` in cPanel

### Step 2: Upload via cPanel File Manager
- [ ] Login to cPanel
- [ ] Navigate to `/public_html/`
- [ ] Delete or backup existing `.htaccess` (if present)
- [ ] Upload new `.htaccess` file
- [ ] Upload `dist/` folder contents (overwrite existing)
- [ ] Set file permissions: `.htaccess` → 644

### Step 3: Verify Upload
- [ ] Check that `public_html/.htaccess` is present
- [ ] Check that `public_html/sitemap-index.xml` is present
- [ ] Check that `public_html/sitemap-0.xml` is present
- [ ] Check that `public_html/robots.txt` exists

## Phase 2: Local Verification (Same Day - Before GSC Steps)

Run these commands on your local machine to verify deployment:

### Check 1: Sitemap Redirects
```bash
curl -I https://a2reklam.com/sitemap.xml
# Expected: HTTP 301, Location: https://a2reklam.com/sitemap-index.xml
```
- [ ] Returns HTTP 301
- [ ] Redirects to /sitemap-index.xml

### Check 2: Legacy sitemap_index.xml
```bash
curl -I https://a2reklam.com/sitemap_index.xml
# Expected: HTTP 301, Location: https://a2reklam.com/sitemap-index.xml
```
- [ ] Returns HTTP 301
- [ ] Redirects to /sitemap-index.xml

### Check 3: New Sitemap Loads
```bash
curl -s https://a2reklam.com/sitemap-index.xml | head -5
# Expected: XML header and <sitemapindex> tag
```
- [ ] Returns valid XML
- [ ] Contains <sitemapindex> element
- [ ] References sitemap-0.xml

### Check 4: Main Sitemap Has URLs
```bash
curl -s https://a2reklam.com/sitemap-0.xml | grep -c "<url>"
# Expected: 341
```
- [ ] Returns count of 341 (or close to it)

### Check 5: robots.txt Correct
```bash
curl -s https://a2reklam.com/robots.txt | grep Sitemap
# Expected: Sitemap: https://a2reklam.com/sitemap-index.xml
```
- [ ] Points to https://a2reklam.com/sitemap-index.xml (non-www, dash format)

### Check 6: Homepage Canonical
```bash
curl -s https://a2reklam.com/ | grep 'rel="canonical"'
# Expected: href="https://a2reklam.com/"
```
- [ ] Shows self-referencing canonical tag

### Check 7: Contact Page Canonical
```bash
curl -s https://a2reklam.com/iletisim/ | grep 'rel="canonical"'
# Expected: href="https://a2reklam.com/iletisim/"
```
- [ ] Shows correct canonical

### Check 8: Quote Page Canonical
```bash
curl -s https://a2reklam.com/teklif-al/ | grep 'rel="canonical"'
# Expected: href="https://a2reklam.com/teklif-al/"
```
- [ ] Shows correct canonical

## Phase 3: Google Search Console (Day 1-2)

### Step 1: Login to GSC
- [ ] Go to https://search.google.com/search-console/
- [ ] Verify you're logged in with correct Google account
- [ ] Select property: `a2reklam.com`

### Step 2: Remove Old Sitemap
- [ ] Left sidebar → Click "Sitemaps"
- [ ] Find `https://www.a2reklam.com/sitemap_index.xml` (or similar)
- [ ] Click the three dots (...) menu
- [ ] Click "Delete"
- [ ] Confirm deletion

### Step 3: Submit New Sitemap
- [ ] Same "Sitemaps" page
- [ ] Click "Add Sitemap" button
- [ ] Type: `sitemap-index.xml` (GSC auto-fills the domain)
- [ ] Click "Submit"
- [ ] Wait for processing notification

### Step 4: Request Indexing (Optional but Recommended)
- [ ] Left sidebar → Click "URL Inspection"
- [ ] Paste: `https://a2reklam.com/`
- [ ] If shows "URL not on Google" → Click "Request Indexing"
- [ ] Repeat for key pages:
  - [ ] `/hizmetler/` (services)
  - [ ] `/hizmet-bolgeleri/` (service areas)
  - [ ] `/tabela-rehberi/` (guides)
  - [ ] `/galeri/` (gallery)
  - [ ] `/iletisim/` (contact)
  - [ ] `/teklif-al/` (quote request)

## Phase 4: Monitoring (Days 3-14)

### Daily Checks
- [ ] Check GSC Sitemaps report (should show processing status)
- [ ] Look for "Status" changes from "Processing" to "Success"
- [ ] Watch "Discovered" count increase (should go from 61 → 300+)
- [ ] Watch "Indexed" count increase (should go from ~30 → 250+)

### Weekly Checks (Week 2-3)
- [ ] Run verification commands again
- [ ] Use URL Inspection on critical pages
- [ ] Check GSC Coverage report
- [ ] Look for any crawl errors

### Success Indicators
- [ ] GSC discovered 300+ pages (from 61)
- [ ] GSC indexed 250+ pages (from ~30)
- [ ] Key pages show "URL is on Google"
- [ ] robots.txt shows no errors
- [ ] Sitemaps report shows "No errors"

## Phase 5: Post-Deployment (Week 3+)

- [ ] Monitor organic search traffic (expect increase)
- [ ] Use GSC Search Performance report to track results
- [ ] Watch for any crawl errors or warnings
- [ ] Check site:a2reklam.com in Google Search to see indexed pages
- [ ] Archive this audit for future reference

## Troubleshooting

### Problem: .htaccess returns 500 error
**Solution:**
- Check Apache error logs (cPanel → Error Log)
- Verify .htaccess syntax (use HTACCESS_SITEMAP_PATCH.txt as reference)
- Check that `mod_alias` or `mod_rewrite` is enabled
- Restore backup and try again

### Problem: Sitemap still returns 404
**Solution:**
- Verify `sitemap-index.xml` file exists in `/public_html/`
- Verify `sitemap-0.xml` file exists in `/public_html/`
- Check file permissions (should be 644)
- Check that dist/ was uploaded completely

### Problem: GSC still shows old sitemap
**Solution:**
- Verify old sitemap was deleted from GSC
- Wait 24-48 hours after deleting old sitemap
- Resubmit new sitemap explicitly
- Clear GSC's cache (use "Request Indexing")

### Problem: Pages not getting indexed after 2 weeks
**Solution:**
- Verify canonical tags are correct
- Verify no robots meta noindex tags
- Check GSC Coverage report for errors
- Use "Request Indexing" for specific pages
- Check for any crawl errors in GSC

## Sign-Off

- [ ] All deployment steps completed
- [ ] All verification commands passed
- [ ] New sitemap submitted to GSC
- [ ] Key pages requested for indexing
- [ ] Monitoring plan is in place
- [ ] Backup of original files saved (optional)

**Deployment Completed By:** _________________ **Date:** _______

**Expected Result Date:** 2 weeks from submission (approximately mid-February 2026)

---

## Document References

- **Full Report:** `A2REKLAM_SEO_AUDIT.docx` (detailed technical analysis)
- **Quick Reference:** `DEPLOYMENT_QUICK_START.md` (condensed steps)
- **Redirect Details:** `HTACCESS_SITEMAP_PATCH.txt` (copy-paste ready)
- **Redirect Map:** `LEGACY_REDIRECTS.csv` (reference table)
- **Executive Summary:** `SEO_AUDIT_SUMMARY.txt` (overview)

---

**Status:** Ready for Deployment
**Audit Version:** 1.0
**Audit Date:** January 27, 2026
