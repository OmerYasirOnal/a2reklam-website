# GTM Tracking - Quick Reference Guide

## TL;DR

✅ **Status:** Site uses **only GTM-MXT449F9** — no issues found
✅ **Action Required:** None — code is production-ready
✅ **Build Status:** Clean (341 pages, all GTM-injected)

---

## Deployment Quick Steps

### 1. Build Locally
```bash
cd /Users/omeryasironal/Projects/A2reklam
pnpm run build
```
**Expected Output:**
```
[build] 341 page(s) built in 2.55s
[build] Complete!
```

### 2. Prepare for Upload
```bash
# Use production .htaccess
cp .htaccess-fixed dist/.htaccess
# OR
cp .htaccess.production dist/.htaccess
```

### 3. Upload to Production
Upload `dist/` folder to `a2reklam.com` public_html/ using:
- cPanel File Manager (recommended for first deploy)
- FTP/SFTP (FileZilla, Cyberduck)
- rsync (if SSH available)

### 4. Verify Deployment (5 minutes)
```bash
# Test homepage loads
curl -I https://www.a2reklam.com/
# Expected: HTTP 200

# Test HTTPS redirect
curl -I http://a2reklam.com/
# Expected: HTTP 301 → https://www.a2reklam.com/
```

### 5. Open Browser and Check GTM
1. Visit: https://www.a2reklam.com/
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Type: `dataLayer` and press Enter
5. **Should see:**
   ```javascript
   Array [Object { gtm.start: ..., event: 'gtm.js' }]
   ```

---

## What Gets Deployed

### ✅ Upload These Files from dist/
```
dist/.htaccess
dist/index.html (+ all 341 HTML pages)
dist/api/contact.php
dist/robots.txt
dist/sitemap-index.xml
dist/_astro/ (CSS/JS bundles)
dist/assets/ (images)
dist/blog/
dist/en/
dist/ar/
(all other generated files)
```

### ❌ Do NOT Upload
```
node_modules/
src/
.git/
.env
package.json
pnpm-lock.yaml
tsconfig.json
```

---

## What's Already Correct

| Component | Status | Details |
|-----------|--------|---------|
| GTM Container | ✅ | GTM-MXT449F9 only |
| Direct Tracking | ✅ | None (all through GTM) |
| Events | ✅ | cta_click, form_success routing to dataLayer |
| Multi-Language | ✅ | TR/EN/AR all have GTM injected |
| Security | ✅ | CSP headers allow GTM domains |
| Code Changes | ✅ | ZERO needed — already perfect |

---

## Verification Checklist

After deploying, check off:

- [ ] Site loads at https://www.a2reklam.com/ (no 404)
- [ ] DevTools Console shows `dataLayer` with `gtm.js` event
- [ ] Network tab shows gtm.js request (Status 200)
- [ ] Click a button → `cta_click` event appears in dataLayer
- [ ] Contact form sends email to info@a2reklam.com
- [ ] All language versions load (tr, en, ar)
- [ ] Google Tag Assistant shows GTM-MXT449F9 connected

---

## Tracking IDs Reference

| ID | Purpose | Where Used | Status |
|----|---------|-----------|--------|
| GTM-MXT449F9 | Main Container | Injected in all 341 HTML pages | ✅ Active |
| AW-17854412453 | Google Ads | Configured in GTM UI (not injected directly) | ✅ Correct |
| G-TC9GJP3GLT | GA4 | Configured in GTM UI (not injected directly) | ✅ Correct |
| GTM-W6TJR7MM | (unwanted) | Not found in codebase | ✅ Clean |
| G-DWZ1JEH8L7 | (unwanted) | Not found in codebase | ✅ Clean |

---

## Source Code Locations

If you need to understand the tracking setup:

| File | Lines | Purpose |
|------|-------|---------|
| src/consts.ts | 25-27 | Centralized tracking IDs |
| src/components/common/Tracking.astro | 9-13 | GTM script injection |
| src/components/common/TrackingEvents.astro | 21-88 | Event routing to dataLayer |
| src/layouts/Layout.astro | 80, 98-107 | GTM integration in main layout |

**Note:** No changes needed in any of these files.

---

## If Something Goes Wrong

### Site Won't Load (500/503 Error)
1. Check cPanel → Error Logs
2. Verify .htaccess syntax (try removing complex rules)
3. Restore previous backup if available

### GTM Not Loading
1. Check CSP header in .htaccess allows www.googletagmanager.com
2. Verify gtm.js request returns 200 in Network tab
3. Check browser Console for JavaScript errors

### Email Form Not Working
1. Verify api/contact.php was uploaded
2. Check file permissions (should be 644)
3. Test PHP mail() function in cPanel

### Events Not Appearing in dataLayer
1. Check Browser Console for JavaScript errors
2. Verify TrackingEvents.astro is in page source
3. Ensure data-track attributes are on HTML elements

---

## Getting Help

**If GTM isn't working after deployment:**

1. Check Google Tag Assistant: https://tagassistant.google.com/
2. Verify container configuration in GTM UI
3. Ensure Google Ads and GA4 tags are enabled in container
4. Check CSP header allows GTM domains

**If form isn't sending email:**

1. Verify api/contact.php permissions (644)
2. Check cPanel → Email Settings
3. Test with simple PHP mail() script

**For other issues:**

See full documentation:
- GTM_AUDIT_REPORT.md (technical details)
- DEPLOYMENT_TRACKING_CHECKLIST.md (step-by-step procedures)

---

## Key Points to Remember

1. ✅ **Only GTM-MXT449F9** is injected into HTML
2. ✅ **No direct Google Ads or GA4 tags** in HTML (all through GTM)
3. ✅ **All events go through dataLayer** for GTM to process
4. ✅ **All 341 pages** have GTM properly injected
5. ✅ **No code changes needed** — deploy as-is
6. ✅ **CSP headers** are configured for GTM
7. ✅ **noscript fallback** present for non-JS users

---

## Files to Review

1. **TRACKING_STATUS_SUMMARY.txt** — One-page executive summary
2. **GTM_AUDIT_REPORT.md** — Full technical audit (600+ lines)
3. **DEPLOYMENT_TRACKING_CHECKLIST.md** — Detailed deployment steps
4. **QUICK_REFERENCE.md** — This file

---

## Build Output Info

```
Framework: Astro 5.16.15
Output: dist/ folder
Total Pages: 341 HTML files
Size: ~95 MB
Build Time: ~2.5 seconds
Build Status: ✅ Clean (no warnings or errors)
```

---

## Commands to Remember

```bash
# Build locally
pnpm run build

# Preview locally (optional)
pnpm run preview

# Check file count
find dist -name "*.html" | wc -l

# Check GTM in built output
grep -c "GTM-MXT449F9" dist/index.html

# Copy production .htaccess
cp .htaccess-fixed dist/.htaccess
```

---

## One More Thing

**This is a clean, well-implemented GTM setup. No changes needed. Deploy with confidence!** ✅

For detailed information, see the full audit report: `GTM_AUDIT_REPORT.md`
