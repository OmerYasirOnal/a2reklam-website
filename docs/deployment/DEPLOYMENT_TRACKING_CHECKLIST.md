# Deployment Tracking Checklist

## CHANGELOG: Tracking Configuration

### Summary
✅ **No changes required** — Repository already implements single-source GTM tracking (GTM-MXT449F9 only)

### Files Status

| File | Change | Status |
|---|---|---|
| `src/consts.ts` | None | ✅ No changes needed |
| `src/components/common/Tracking.astro` | None | ✅ No changes needed |
| `src/components/common/TrackingEvents.astro` | None | ✅ No changes needed |
| `src/layouts/Layout.astro` | None | ✅ No changes needed |
| `dist/` (all 341 pages) | None | ✅ Already built correctly |

### Architecture Decisions (Already Implemented)

✅ **Centralized Tracking IDs** (src/consts.ts)
- `GTM_CONTAINER_ID = 'GTM-MXT449F9'` (injected into HTML)
- `GOOGLE_ADS_ID = 'AW-17854412453'` (referenced only, not injected)
- `GA4_MEASUREMENT_ID = 'G-TC9GJP3GLT'` (referenced only, not injected)

✅ **Single GTM Injection** (src/components/common/Tracking.astro)
- One container ID injected into every page's `<head>`
- Comment clarifies: "GA4 & Google Ads tags must be configured in GTM to avoid double counting"

✅ **Event Routing Through dataLayer** (src/components/common/TrackingEvents.astro)
- All CTA clicks (WhatsApp, Call, Quote) push to `window.dataLayer`
- Form submissions push to `window.dataLayer`
- No direct `gtag()` calls or Google Ads tracking tags

✅ **Multi-Language Support**
- Turkish (TR): Root `/` domain
- English (EN): `/en/` prefix
- Arabic (AR): `/ar/` prefix
- GTM injection identical on all language variants

✅ **Security Headers** (.htaccess.production)
- Content-Security-Policy whitelists `https://www.googletagmanager.com`
- No inline script-src vulnerabilities
- Allows GTM dataLayer communication

---

## FILES TO UPLOAD

### Production Build Output

**Command to generate:**
```bash
pnpm run build
```

**Output location:** `dist/` folder

**Files to deploy to production:**

```
dist/
├── .htaccess                          (use .htaccess-fixed or .htaccess.production)
├── index.html                          (Homepage - GTM injected)
├── 404.html                            (Error page)
├── robots.txt
├── sitemap-index.xml
├── sitemap-0.xml
├── _astro/                             (CSS/JS bundles)
├── api/contact.php                     (Contact form endpoint)
├── assets/                             (Images, static files)
├── blog/                               (Blog pages - GTM injected)
├── en/                                 (English pages - GTM injected)
├── ar/                                 (Arabic pages - GTM injected)
├── galeri/                             (Gallery - GTM injected)
├── hizmetler/                          (Services - GTM injected)
├── hizmet-bolgeleri/                   (Districts - GTM injected)
├── tabela-rehberi/                     (Guides - GTM injected)
├── brand/                              (Logos)
└── [all other generated HTML files]    (GTM injected on each)
```

**Total Pages with GTM:** 341 HTML files ✅

### Critical Verification Files

After upload, verify these files are in place:

- ✅ `dist/index.html` (contains `GTM-MXT449F9` in head)
- ✅ `dist/.htaccess` (contains CSP header for GTM)
- ✅ `dist/api/contact.php` (contact form endpoint)
- ✅ `dist/robots.txt` (search engine indexing)
- ✅ `dist/sitemap-index.xml` (XML sitemap for SEO)

### Files NOT to Upload

```
❌ node_modules/         (dev dependencies)
❌ src/                  (source code)
❌ .git/                 (git history)
❌ .env                  (secrets)
❌ package.json          (dev config)
❌ tsconfig.json         (TypeScript config)
❌ astro.config.mjs      (build config)
❌ tailwind.config.js    (CSS config)
```

### .htaccess Deployment Note

**Two versions available:**

| File | Purpose |
|---|---|
| `.htaccess.production` | Complete production config (gzip, CSP, security headers) |
| `.htaccess-fixed` | Enhanced production config with detailed rewrite rules |

**Recommended:** Use `.htaccess-fixed` as it has more explicit rewrite rules for Astro's mixed output structure.

**Action:** Before uploading dist/, copy one of these to dist/.htaccess:
```bash
cp .htaccess-fixed dist/.htaccess
# OR
cp .htaccess.production dist/.htaccess
```

---

## VERIFICATION STEPS (Post-Deployment)

### Phase 1: Immediate Verification (5 minutes)

#### 1.1 Site Accessibility
```bash
# Test homepage loads
curl -I https://www.a2reklam.com/
# Expected: HTTP 200

# Test HTTPS redirect
curl -I http://a2reklam.com/
# Expected: HTTP 301 → https://www.a2reklam.com/

# Test non-www redirect
curl -I https://a2reklam.com/
# Expected: HTTP 301 → https://www.a2reklam.com/
```

#### 1.2 GTM Script Verification
1. Open browser: https://www.a2reklam.com/
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Type: `dataLayer` and press Enter
5. **Expected Output:**
   ```javascript
   Array [
     {gtm.start: 1706..., event: 'gtm.js'}
   ]
   ```
   ✅ If you see this, GTM is loaded correctly

#### 1.3 Check Network Request
1. Still in DevTools, go to Network tab
2. Reload page
3. Search for `gtm.js` in the filter
4. **Expected:**
   - URL: `https://www.googletagmanager.com/gtm.js?id=GTM-MXT449F9`
   - Status: 200
   - Size: ~5-10 KB

### Phase 2: Page Coverage Verification (10 minutes)

#### 2.1 Test Different Page Types
For each URL below, verify GTM loads (check Network tab for gtm.js request):

```
✅ Homepage:        https://www.a2reklam.com/
✅ Services:        https://www.a2reklam.com/hizmetler/
✅ Districts:       https://www.a2reklam.com/hizmet-bolgeleri/maltepe-tabela/
✅ Gallery:         https://www.a2reklam.com/galeri/
✅ Blog:            https://www.a2reklam.com/blog/
✅ Contact:         https://www.a2reklam.com/iletisim/
✅ Quote:           https://www.a2reklam.com/teklif-al/
✅ English:         https://www.a2reklam.com/en/
✅ Arabic:          https://www.a2reklam.com/ar/
```

**Verification:** For each page, check DevTools Console for:
```javascript
dataLayer = [
  {gtm.start: ..., event: 'gtm.js'}
]
```

#### 2.2 Test Specific URLs from Requirements
```
✅ https://www.a2reklam.com/arac-giydirme-nedir/
✅ https://www.a2reklam.com/askili-ofis-yonlendirme/
✅ https://www.a2reklam.com/blog/askiliofisyonlendirme/
✅ https://www.a2reklam.com/maltepe-tabela/
✅ https://www.a2reklam.com/sancaktepe-tabela-tabelaci/
```

For each: Verify GTM script loads and appears in Network tab.

### Phase 3: Event Tracking Verification (10 minutes)

#### 3.1 Test CTA Click Events
1. Navigate to: https://www.a2reklam.com/
2. Open DevTools Console
3. Clear console (click X icon)
4. Click any "WhatsApp" button or "Teklif Al" button
5. **Expected Console Output:**
   ```javascript
   {
     event: 'cta_click',
     cta_type: 'whatsapp',  // or 'quote' or 'call'
     lang: 'tr',
     page: '/'
   }
   ```
   ✅ Event appeared = tracking works

#### 3.2 Test Form Submission
1. Navigate to: https://www.a2reklam.com/iletisim/
2. Fill form with test data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+90 123 456 7890"
   - Service: Select any option
   - Message: "Test message"
3. Click "Gönder" button
4. **Expected Results:**
   - ✅ Email notification received at `info@a2reklam.com`
   - ✅ Page shows "Başarıyla gönderildi" message
   - ✅ DevTools shows form_success event (if available)

#### 3.3 Test All Language Event Properties
Repeat 3.1-3.2 for:
- English: https://www.a2reklam.com/en/
- Arabic: https://www.a2reklam.com/ar/

**Verify:** `lang` property changes to `en` and `ar` respectively

### Phase 4: Google Tag Manager Verification (5 minutes)

#### 4.1 Use Google Tag Assistant
1. Visit: https://tagassistant.google.com/
2. Click "Connect"
3. Enter URL: https://www.a2reklam.com/
4. **Expected Results:**
   - ✅ Container "GTM-MXT449F9" shows "Connected" (green)
   - ✅ No error icons or warnings
   - ✅ All pages listed show same container

#### 4.2 Check Tag Manager Console
1. Log in to: https://tagmanager.google.com/
2. Select container: GTM-MXT449F9
3. Go to "Overview"
4. Check "Tag Coverage" section (if available)
5. **Expected:** All pages show green checkmark (tagged)

### Phase 5: Security Header Verification (5 minutes)

#### 5.1 Check CSP Header
1. Open DevTools: F12
2. Go to Network tab
3. Click on first document request (the main page)
4. Scroll to Response Headers section
5. **Look for:**
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self'
   'unsafe-inline' https://www.googletagmanager.com ...
   ```
   ✅ If you see `https://www.googletagmanager.com` in script-src, CSP is correct

#### 5.2 Check Security Headers
In same Response Headers, verify:
```
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: SAMEORIGIN
✅ Referrer-Policy: strict-origin-when-cross-origin
```

### Phase 6: Performance Verification (5 minutes)

#### 6.1 PageSpeed Insights
1. Visit: https://pagespeed.web.dev/
2. Analyze: https://www.a2reklam.com/
3. **Expected:**
   - Mobile Score: 60+ ✅
   - Desktop Score: 80+ ✅
   - No GTM-related "unused JavaScript" warnings

#### 6.2 Lighthouse Report
1. In DevTools, go to "Lighthouse" tab
2. Run audit (all categories)
3. **Expected:**
   - Performance: 70+
   - Accessibility: 90+
   - Best Practices: 80+
   - SEO: 90+

### Phase 7: Cross-Browser Verification (10 minutes)

Test on each browser below. For each:
1. Navigate to https://www.a2reklam.com/
2. Open DevTools (F12)
3. Check Console for `dataLayer` (no errors)
4. Click a CTA button
5. Verify `cta_click` event appears

```
✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (macOS)
✅ Safari (iOS)
✅ Chrome (Android)
✅ Firefox (Android)
```

### Troubleshooting Guide

If any verification step fails:

| Issue | Solution |
|---|---|
| **GTM container not loading** | Check `.htaccess` CSP header allows `www.googletagmanager.com` |
| **Events not appearing in dataLayer** | Check Console for JavaScript errors; verify `TrackingEvents.astro` is loaded |
| **CSP violations in Console** | Update CSP header in `.htaccess` to include GTM domains |
| **Email not received from form** | Check `api/contact.php` permissions (644); verify PHP mail() is enabled |
| **HTTPS redirect loop** | Check `.htaccess` www redirect rules; verify SSL certificate is valid |
| **Pages return 404** | Verify all HTML files uploaded to `dist/` folder; check `.htaccess` rewrite rules |

---

## Sign-Off Checklist

After completing all verification steps, check off:

- [ ] Site accessible at https://www.a2reklam.com/ (HTTP 200)
- [ ] HTTPS redirect working (HTTP → HTTPS)
- [ ] WWW redirect working (non-www → www)
- [ ] GTM script loads on homepage (Network tab: gtm.js 200 OK)
- [ ] dataLayer shows `{event: 'gtm.js'}` in Console
- [ ] CTA click events fire and appear in dataLayer
- [ ] Form submission works and email is sent
- [ ] Google Tag Assistant shows GTM-MXT449F9 connected
- [ ] All test URLs load correctly (341 pages)
- [ ] CSP header includes www.googletagmanager.com
- [ ] No GTM-related errors in Console
- [ ] PageSpeed Insights scores acceptable
- [ ] All browsers show GTM loaded (no errors)
- [ ] Events fire consistently across all pages
- [ ] All language variants (TR/EN/AR) working

---

## Post-Deployment Communication

### Notify GTM Team

Once deployment verified, notify Google Tag Manager team:

1. **Verify Container Settings:**
   - Container ID: `GTM-MXT449F9`
   - GA4 Tag ID: `G-TC9GJP3GLT`
   - Google Ads ID: `AW-17854412453`

2. **Confirm Event Structure:**
   - Events pushed to dataLayer
   - Event names: `cta_click`, `form_success`
   - Event properties: `cta_type`, `lang`, `page`

3. **Verify Tag Configuration in GTM UI:**
   - Google Ads conversion tracking enabled
   - GA4 event tracking enabled
   - No duplicate tag firing
   - All triggers configured correctly

---

## Rollback Plan

If critical issues found post-deployment:

1. **Immediate Rollback (5 minutes):**
   ```bash
   # Delete new files from production
   # Restore previous dist/ backup
   # Verify old site loads
   ```

2. **Root Cause Analysis:**
   - Check server error logs
   - Check .htaccess syntax
   - Verify GTM container configuration

3. **Re-deploy:**
   - Fix identified issue
   - Rebuild: `pnpm run build`
   - Test locally
   - Deploy again

---

## Support Contacts

For deployment issues:

**Hosting Support (GüzelHosting):**
- [Add hosting support contact details]

**GTM Support:**
- Google Tag Manager Help: https://support.google.com/tagmanager/

**Developer:**
- [Add developer contact details]

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Verification Completed By:** _____________
**Sign-Off Date:** _____________
