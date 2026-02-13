# A2 Reklam Production Deployment Plan
**Target:** a2reklam.com (cPanel / GüzelHosting)
**Date:** 2026-01-24
**Deployment Type:** Static Site (Astro) + PHP Email Endpoint
**Status:** READY FOR DEPLOYMENT ✅

---

## A) Proje Tipi ve Gereksinimler

### Proje Tipi
- **Framework:** Astro 5 (Static Site Generator)
- **Runtime:** Static HTML/CSS/JS + PHP (sadece contact form endpoint için)
- **Build Output:** `dist/` klasörü (341 HTML sayfası)
- **Çoklu Dil:** TR (default), EN, AR
- **Database:** YOK (tamamen statik site - WordPress'ten migration yapılmış)
- **Total Size:** ~95 MB (images dahil)

### Build Gereksinimleri
- Node.js: 20.x
- Package Manager: pnpm 10.x
- Build Komutu: `pnpm run build`
- Output: `dist/` klasörü

### Runtime Gereksinimleri (Production)
- **Web Server:** Apache (cPanel default)
- **PHP:** 7.4+ (sadece `/api/contact.php` için)
- **Özel Gereksinim:** YOK (Node/Python daemon yok)
- **Mod Requirements:** mod_rewrite, mod_deflate, mod_expires, mod_headers (hepsi cPanel'de default)

### Özellikler
✅ Multi-language (TR/EN/AR)
✅ SEO-optimized (341 statik sayfa, sitemap, canonical, hreflang)
✅ GTM tracking (GTM-MXT449F9)
✅ Contact form (PHP endpoint: `/api/contact.php`)
✅ Image gallery (GLightbox)
✅ Dark/Light theme toggle
✅ WhatsApp + Call CTAs
✅ Responsive + Mobile-first

---

## B) Bulunan Riskler + Düzeltmeler

### 🔴 P0 - CRITICAL (Deployment Blocker - ÖNCELİKLE DÜZELTİLMELİ)

**P0-1: .htaccess eksik gzip/compression**
- **Risk:** Yavaş sayfa yükleme, SEO cezası, yüksek bandwidth
- **Durum:** Mevcut `.htaccess` dosyasında gzip/deflate yapılandırması YOK
- **Fix:** ✅ **TAMAMLANDI** - `.htaccess.production` dosyası oluşturuldu (mod_deflate ile tüm text/image compression)
- **Action Required:** Deploy sırasında `.htaccess.production` dosyasını `public_html/.htaccess` olarak kopyala

**P0-2: CSP (Content Security Policy) header eksik**
- **Risk:** XSS saldırıları, browser güvenlik uyarıları
- **Durum:** Güvenlik header'ları kısmi (X-Frame-Options var ama CSP yok)
- **Fix:** ✅ **TAMAMLANDI** - CSP header `.htaccess.production`'a eklendi (GTM/GA/Google Fonts whitelist ile)
- **Action Required:** Deploy sonrası browser console'da CSP violation kontrolü

**P0-3: www vs non-www canonical belirsiz**
- **Risk:** Duplicate content (SEO), split link equity, Google indexing karmaşası
- **Durum:** .htaccess'de www redirect KAPALI (commented out)
- **Fix:** ✅ **TAMAMLANDI** - `.htaccess.production`'da **www forced** (RECOMMENDED)
- **Rationale:** Marka tanınırlığı için `www.a2reklam.com` tercih edildi
- **Action Required:** Deploy sonrası `a2reklam.com` → `www.a2reklam.com` redirect kontrolü

### 🟠 P1 - HIGH (Production Ready ama iyileştirmeli)

**P1-1: Console.log statements production build'de**
- **Risk:** Gereksiz log çıktıları, ufak performans kaybı
- **Durum:** `dist/_astro/*.js` dosyalarında 5 adet console.log bulundu
- **Impact:** Minimal (sadece contact form debug logs)
- **Fix Options:**
  - Option 1: Astro config'e terser minification ekle (console.log strip)
  - Option 2: Manuel olarak kaynak koddan console.log'ları kaldır
- **Recommendation:** Tolere edilebilir - production'da zarar vermez ama temizlenmeli
- **Action Required:** Bir sonraki sprint'te kaynak koddan temizlensin

**P1-2: Error page 500.html eksik**
- **Risk:** Server error durumunda kullanıcıya generic Apache error gösterilir
- **Durum:** `404.html` var ama `500.html` YOK
- **Fix:** 500.html sayfası oluştur ve `.htaccess`'e ekle: `ErrorDocument 500 /500.html`
- **Action Required:** (OPTIONAL) - cPanel hataları nadiren görülür ama best practice

**P1-3: Referrer-Policy header eksik**
- **Risk:** Analytics veri kaybı, privacy tracking sorunları
- **Durum:** Header yok
- **Fix:** ✅ **TAMAMLANDI** - `.htaccess.production`'a eklendi: `strict-origin-when-cross-origin`
- **Action Required:** Deploy ile otomatik aktif olacak

### 🟡 P2 - MEDIUM (Nice-to-have, opsiyonel)

**P2-1: Image optimization potansiyeli**
- **Durum:** JPEG/PNG dosyalar optimize edilmemiş olabilir
- **Impact:** Minimal - Astro zaten Sharp ile optimize ediyor
- **Recommendation:** (OPTIONAL) Production öncesi `pnpm run process-images` ile yeniden optimize et

**P2-2: Brotli compression desteği**
- **Durum:** Sadece gzip var, Brotli yok
- **Impact:** Minimal - gzip yeterli (Brotli cPanel'de nadiren desteklenir)
- **Recommendation:** cPanel'de mod_brotli varsa eklenebilir ama gerekli değil

**P2-3: SRI (Subresource Integrity) hash'leri yok**
- **Durum:** External CDN'lerden yüklenen kaynaklar (Google Fonts) için SRI yok
- **Impact:** Minimal - Google Fonts güvenilir
- **Recommendation:** (OPTIONAL) Future enhancement

---

## C) Exact Commands (Lokalde Çalıştırılacak)

### Pre-Deployment (Local Machine)

```bash
# 1. Proje klasörüne git
cd /Users/omeryasironal/Projects/A2reklam

# 2. Dependencies güncel mi kontrol et
pnpm install --frozen-lockfile

# 3. (OPTIONAL) Private image assets var mı kontrol et
# Eğer "RESİMLER SİTE ( YENİ )" klasöründen görsel kullanılacaksa:
pnpm run process-images

# 4. Production build oluştur
pnpm run build

# 5. Build output kontrol et
ls -lh dist/
# Beklenen: 341 HTML dosyası + assets + api/contact.php

# 6. Build içeriğini lokal test et (opsiyonel)
pnpm run preview
# Tarayıcıda http://localhost:4321 aç ve test et

# 7. .htaccess dosyasını production versiyonuyla değiştir
cp .htaccess.production dist/.htaccess

# 8. Dist klasörünün son halini kontrol et
du -sh dist/
# Beklenen: ~95MB

# 9. (OPSIYONEL) Repo safety check (private dosya sızıntısı kontrolü)
pnpm run repo:safety

# 10. Upload için dist klasörünü zip'le (FTP yerine zip upload daha hızlı)
cd dist
zip -r ../a2reklam-production-$(date +%Y%m%d-%H%M%S).zip .
cd ..

# Örnek output: a2reklam-production-20260124-143022.zip
```

### Build Verification Commands

```bash
# HTML sayfa sayısını doğrula
find dist -name "*.html" | wc -l
# Beklenen: 341

# PHP contact endpoint var mı kontrol et
ls -la dist/api/contact.php
# Beklenen: -rw-r--r-- ... contact.php

# .htaccess production versiyonu mu kontrol et
head -5 dist/.htaccess
# Beklenen: "# A2 REKLAM PRODUCTION HTACCESS"

# Sitemap var mı kontrol et
ls -la dist/sitemap-index.xml dist/robots.txt
# Beklenen: Her iki dosya da mevcut

# GTM container ID doğru mu kontrol et
grep -r "GTM-MXT449F9" dist/index.html
# Beklenen: GTM script tag bulunmalı

# Gereksiz dev dosyaları var mı kontrol et (olmamalı)
ls -la dist/ | grep -E "package\.json|tsconfig|node_modules|\.git"
# Beklenen: Hiçbir output olmamalı (temiz)
```

---

## D) cPanel Upload Dosya Haritası

### Dosya Upload Planı

#### ✅ UPLOAD EDİLECEK (dist/ → public_html/)

```
LOCAL (dist/)                        →  REMOTE (public_html/)
─────────────────────────────────────────────────────────────────
.htaccess                            →  .htaccess (OVERWRITE - production version)
robots.txt                           →  robots.txt
sitemap-index.xml                    →  sitemap-index.xml
sitemap-0.xml                        →  sitemap-0.xml
404.html                             →  404.html
index.html                           →  index.html
(tüm *.html dosyaları)               →  (aynı path)

_astro/                              →  _astro/ (CSS/JS bundles)
api/contact.php                      →  api/contact.php (EMAIL ENDPOINT)
assets/                              →  assets/ (static files)
blog/                                →  blog/
en/                                  →  en/
ar/                                  →  ar/
galeri/                              →  galeri/
hizmetler/                           →  hizmetler/
hizmet-bolgeleri/                    →  hizmet-bolgeleri/
tabela-rehberi/                      →  tabela-rehberi/
brand/                               →  brand/ (logos)
favicon.ico                          →  favicon.ico
android-chrome-*.png                 →  android-chrome-*.png
apple-touch-icon.png                 →  apple-touch-icon.png
site.webmanifest                     →  site.webmanifest
ai.txt                               →  ai.txt
```

#### ❌ UPLOAD EDİLMEYECEK (asla production'a gitmesin)

```
LOKAL KLASÖR                         SEBEP
────────────────────────────────────────────────────────────────
node_modules/                        Dev dependency (100+ MB)
src/                                 Kaynak kod (build'den sonra gereksiz)
.git/                                Git history (güvenlik riski)
.astro/                              Build cache
.env                                 Secret credentials (GİT'de de yok zaten)
package.json                         Dev dosyası
pnpm-lock.yaml                       Dev dosyası
tsconfig.json                        Dev dosyası
astro.config.mjs                     Dev dosyası
tailwind.config.js                   Dev dosyası
RESİMLER SİTE ( YENİ )/              Private source images
scripts/                             Build scripts (deploy'a gerek yok)
*.map                                Source maps (üretim gereksiz)
.htaccess.production                 Bu dosya dist/.htaccess olarak zaten kopyalandı
```

### Upload Methods (Önerilen Sıralama)

**Method 1: File Manager (cPanel) - RECOMMENDED for first deployment**
1. cPanel → File Manager aç
2. `public_html` klasörünü aç
3. **ÖNEMLİ:** Mevcut dosyaları yedekle (Download olarak indir veya `backup-YYYYMMDD` klasörüne taşı)
4. `a2reklam-production-YYYYMMDD-HHMMSS.zip` dosyasını Upload et
5. Upload bittiğinde sağ tıklayıp "Extract" ile aç
6. Dosya izinlerini kontrol et:
   - `.htaccess`: 644
   - `api/contact.php`: 644
   - Klasörler: 755
   - Diğer dosyalar: 644

**Method 2: FTP/SFTP - RECOMMENDED for updates**
1. FileZilla veya Cyberduck ile bağlan
2. Lokal: `dist/` → Remote: `public_html/`
3. Transfer mode: Binary
4. Overwrite: All files

**Method 3: rsync (Terminal + SSH) - ADVANCED**
```bash
# Sadece cPanel'de SSH erişimi varsa
rsync -avz --delete dist/ username@a2reklam.com:public_html/
```

### Critical Files Checklist (Upload sonrası mutlaka kontrol et)

- [ ] `.htaccess` (production version uploaded)
- [ ] `api/contact.php` (email endpoint)
- [ ] `robots.txt`
- [ ] `sitemap-index.xml`
- [ ] `index.html`
- [ ] `404.html`
- [ ] `_astro/*.css` ve `_astro/*.js` (bundled assets)
- [ ] `brand/a2reklam-logo.png`

---

## E) Production .htaccess (Tam İçerik)

✅ **Dosya hazır:** `.htaccess.production`

Deployment sırasında bu dosya `dist/.htaccess` olarak kopyalanacak ve `public_html/.htaccess` olarak upload edilecek.

### Önemli Özellikler

✅ **HTTPS Forced** - Tüm HTTP trafiği HTTPS'e yönlendiriliyor
✅ **WWW Forced** - `a2reklam.com` → `www.a2reklam.com` (SEO canonical)
✅ **Gzip Compression** - HTML/CSS/JS/SVG/fonts compress (mod_deflate)
✅ **Browser Caching** - Images: 1 year, CSS/JS: 1 month, HTML: 1 hour
✅ **Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
✅ **Legacy Redirects** - WordPress eski URL'leri yeni Astro URL'lerine 301 redirect
✅ **Trailing Slash** - Astro config'e uygun (her URL sonu `/` ile biter)
✅ **404 Error Page** - Custom 404.html
✅ **Hidden File Protection** - `.git`, `.env` gibi dosyalara erişim engellendi

### Deploy Sonrası Test Edilecek

```bash
# 1. HTTPS redirect test
curl -I http://a2reklam.com
# Beklenen: 301 Moved Permanently → https://www.a2reklam.com/

# 2. WWW redirect test
curl -I https://a2reklam.com
# Beklenen: 301 Moved Permanently → https://www.a2reklam.com/

# 3. Gzip compression test
curl -H "Accept-Encoding: gzip" -I https://www.a2reklam.com/
# Beklenen: Content-Encoding: gzip

# 4. Security headers test
curl -I https://www.a2reklam.com/
# Beklenen: X-Content-Type-Options: nosniff
#           X-Frame-Options: SAMEORIGIN
#           Referrer-Policy: strict-origin-when-cross-origin
#           Content-Security-Policy: (CSP rule)
```

---

## F) DB Planı

### Database Requirement: **YOK** ❌

Bu proje **tamamen statik** bir sitedir. WordPress'ten migration yapılmış ancak hiçbir dinamik içerik veya database kullanmıyor.

#### Neden Database YOK?

1. **Statik Site:** Astro build tüm içeriği compile-time'da HTML'e dönüştürüyor
2. **Content Management:** Markdown files (`src/content/`) ile yönetiliyor
3. **Contact Form:** PHP mail() function kullanıyor (database'e kayıt yapmıyor)
4. **Blog/Services:** Statik HTML olarak generate ediliyor

#### WordPress Database ile İlişki

- **Eski Site:** WordPress + MySQL database
- **Yeni Site:** Astro static (WordPress content markdown'a migrate edilmiş)
- **Migration Status:** Tamamlanmış (eski WordPress database artık kullanılmıyor)

#### Deploy Sırasında Yapılacaklar

1. ❌ phpMyAdmin'e giriş yapma - GEREKSİZ
2. ❌ SQL dump import etme - GEREKSİZ
3. ❌ wp-config.php düzenleme - GEREKSİZ (WordPress yok)
4. ✅ Sadece `dist/` klasörünü upload et - YETERLİ

#### Veri Yönetimi (Content Updates)

İçerik güncellemeleri için:
1. Lokal'de markdown dosyalarını düzenle (`src/content/`)
2. `pnpm run build` ile yeniden build et
3. `dist/` klasörünü yeniden upload et

#### Backup Stratejisi

Database YOK, bu yüzden backup sadece:
- `dist/` klasörü (production files)
- `src/content/` klasörü (markdown content - Git'de zaten versiyonlanıyor)

**SONUÇ:** cPanel'de database kurulumuna gerek YOK. Tamamen dosya tabanlı deploy.

---

## G) Smoke Test + Rollback Planı

### Smoke Test Listesi (Deploy Sonrası 15 Dakika)

#### 1. Core Functionality Tests

**1.1 Homepage Load (TR/EN/AR)**
- [ ] `https://www.a2reklam.com/` yükleniyor (200 OK)
- [ ] `https://www.a2reklam.com/en/` yükleniyor (200 OK)
- [ ] `https://www.a2reklam.com/ar/` yükleniyor (200 OK)
- [ ] Logo, hero image, navigation görünüyor
- [ ] GTM yükleniyor (browser console: `dataLayer` array var)

**1.2 Navigation**
- [ ] Ana menü linkleri çalışıyor (Hizmetler, Galeri, İletişim, vb.)
- [ ] Language switcher çalışıyor (TR ↔ EN ↔ AR)
- [ ] Footer linkleri çalışıyor

**1.3 HTTPS + Canonical**
- [ ] HTTP → HTTPS redirect çalışıyor (`http://a2reklam.com` → `https://www.a2reklam.com/`)
- [ ] non-www → www redirect çalışıyor (`https://a2reklam.com` → `https://www.a2reklam.com/`)
- [ ] Browser'da yeşil kilit ikonu görünüyor (SSL valid)
- [ ] Canonical tag doğru: `<link rel="canonical" href="https://www.a2reklam.com/" />`

**1.4 Mobile Responsiveness**
- [ ] Chrome DevTools → Mobile view (iPhone/Android) test et
- [ ] Touch navigation çalışıyor
- [ ] Mobile CTA buttons (WhatsApp, Call) görünüyor

#### 2. Critical Feature Tests

**2.1 Contact Form (EN ÖNEMLĠ)**
- [ ] `/iletisim/` sayfası açılıyor
- [ ] Form görünüyor (Ad Soyad, E-posta, Telefon, Hizmet Türü, Mesaj)
- [ ] Form submit edildiğinde **email gönderiliyor** (`info@a2reklam.com`)
  - Test: Gerçek bir form doldur ve gönder
  - Beklenen: "Başarıyla gönderildi" mesajı
  - Kontrol: `info@a2reklam.com` email geldi mi?
- [ ] GTM event `form_success` push ediliyor (DevTools → Network → GTM)

**2.2 WhatsApp + Call Buttons**
- [ ] WhatsApp button tıklanınca `wa.me/905316181672` açılıyor
- [ ] Call button tıklanınca `tel:+905316181672` açılıyor
- [ ] GTM event `cta_click` push ediliyor (DevTools → Console: `dataLayer`)

**2.3 Gallery (Lightbox)**
- [ ] `/galeri/` sayfası açılıyor
- [ ] Resimler yükleniyor
- [ ] Lightbox (GLightbox) açılıyor (resme tıkla)
- [ ] Keyboard navigation çalışıyor (← → tuşları)
- [ ] Mobile'da swipe çalışıyor

**2.4 Blog Posts**
- [ ] `/blog/` listing açılıyor
- [ ] Bir blog post açılıyor (örn: `/blog/post-1/`)
- [ ] Images yükleniyor
- [ ] Back button çalışıyor

#### 3. SEO + Performance Tests

**3.1 SEO Tags**
- [ ] View Source → `<title>` tag var
- [ ] `<meta name="description">` var
- [ ] `<link rel="canonical">` var
- [ ] `<link rel="alternate" hreflang="tr|en|ar">` var
- [ ] Open Graph tags var (`og:title`, `og:image`, `og:url`)
- [ ] Twitter Card tags var

**3.2 Sitemap + Robots**
- [ ] `https://www.a2reklam.com/robots.txt` açılıyor (200 OK)
  - İçinde `Sitemap: https://a2reklam.com/sitemap-index.xml` var mı kontrol et
- [ ] `https://www.a2reklam.com/sitemap-index.xml` açılıyor (200 OK)
- [ ] `https://www.a2reklam.com/sitemap-0.xml` açılıyor (200 OK)

**3.3 Performance**
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
  - URL: `https://www.a2reklam.com/`
  - Beklenen: Mobile: 60+, Desktop: 80+
- [ ] Chrome DevTools → Network:
  - [ ] Gzip compression aktif (Response Headers: `Content-Encoding: gzip`)
  - [ ] Cache headers var (Response Headers: `Cache-Control`, `Expires`)

**3.4 Security Headers**
- [ ] Chrome DevTools → Network → Headers (herhangi bir sayfa)
  - [ ] `X-Content-Type-Options: nosniff` var
  - [ ] `X-Frame-Options: SAMEORIGIN` var
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin` var
  - [ ] `Content-Security-Policy: ...` var

#### 4. Error Handling Tests

**4.1 404 Page**
- [ ] `https://www.a2reklam.com/nonexistent-page/` → Custom 404.html gösteriliyor
- [ ] 404 page'de navigation çalışıyor (home'a dönülebiliyor)

**4.2 Legacy Redirects**
- [ ] `https://www.a2reklam.com/iletisim-tabela/` → `/iletisim/` (301 redirect)
- [ ] `https://www.a2reklam.com/hakkinda/` → `/hakkimizda/` (301 redirect)

#### 5. Analytics + Tracking Tests

**5.1 GTM Container**
- [ ] Chrome DevTools → Console: `dataLayer` array görünüyor
- [ ] Tag Assistant: GTM container ID `GTM-MXT449F9` görünüyor

**5.2 DataLayer Events**
- [ ] Page load → `gtm.js` event push ediliyor
- [ ] CTA click → `cta_click` event push ediliyor
- [ ] Form submit → `form_success` event push ediliyor

**5.3 Google Tag Assistant**
- [ ] https://tagassistant.google.com/ → Connect et
- [ ] GTM container görünüyor
- [ ] No errors/warnings

---

### Rollback Planı (Disaster Recovery)

#### Senaryo 1: Site Tamamen Çalışmıyor (500/503 Error)

**Hızlı Rollback (5 dakika):**
1. cPanel → File Manager → `public_html`
2. Yeni dosyaları sil (veya rename: `public_html-broken`)
3. Backup klasörünü geri yükle (örn: `backup-20260124` → `public_html`)
4. `.htaccess` dosyasını eski versiyona geri al
5. Test: `https://www.a2reklam.com/` açılıyor mu?

**Root Cause Analysis:**
- cPanel → Error Logs: `/home/username/public_html/error_log`
- PHP error: `api/contact.php` syntax hatası olabilir
- .htaccess error: Syntax hatası (mod_rewrite kapalı olabilir)

#### Senaryo 2: Contact Form Çalışmıyor (Email Gönderilmiyor)

**Hızlı Fix:**
1. cPanel → File Manager → `public_html/api/contact.php`
2. Dosya izinlerini kontrol et (644 olmalı)
3. PHP mail() function test et:
   ```php
   <?php
   // test-email.php
   $result = mail('info@a2reklam.com', 'Test', 'Test email');
   echo $result ? 'Success' : 'Failed';
   ?>
   ```
4. Eğer mail() çalışmıyorsa:
   - cPanel → Email Accounts → `info@a2reklam.com` var mı kontrol et
   - cPanel → Email Deliverability → SPF/DKIM ayarlarını kontrol et

**Rollback (Contact Form):**
1. Eski `contact.php` dosyasını geri yükle
2. VEYA Formspree/Getform gibi 3rd party service'e geç (geçici)

#### Senaryo 3: SSL/HTTPS Çalışmıyor

**Hızlı Fix:**
1. cPanel → SSL/TLS Status → `a2reklam.com` ve `www.a2reklam.com` için SSL var mı kontrol et
2. Yoksa: cPanel → SSL/TLS → AutoSSL Run (Let's Encrypt)
3. `.htaccess` HTTPS redirect'i geçici kapat:
   ```apache
   # RewriteCond %{HTTPS} off
   # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

#### Senaryo 4: Redirectler Çalışmıyor (404 veya Loop)

**Hızlı Fix:**
1. `.htaccess` dosyasını kontrol et (syntax error olabilir)
2. cPanel → Error Logs: "Request exceeded the limit of 10 internal redirects" → Redirect loop
3. Fix: `.htaccess`'de RewriteCond satırlarını kontrol et (özellikle www redirect)
4. Test:
   ```bash
   curl -I https://a2reklam.com
   curl -I https://www.a2reklam.com
   ```

**Rollback:**
1. `.htaccess` dosyasını eski versiyona geri al
2. VEYA minimal .htaccess kullan (sadece HTTPS + trailing slash)

#### Senaryo 5: Images Yüklenmiyor

**Hızlı Fix:**
1. cPanel → File Manager → `public_html/assets/img/`
2. Klasör izinlerini kontrol et (755)
3. Dosya izinlerini kontrol et (644)
4. Image path kontrolü: `/assets/img/service-name/image.webp` doğru mu?

**Rollback:**
1. Demo images kullan (Git'de var: `public/assets/img/demo/`)
2. `public/images-manifest.demo.json` → `public/images-manifest.json` olarak kopyala

---

### Backup Stratejisi (Pre-Deployment)

#### Deploy Öncesi Yedekleme

**1. cPanel File Manager Backup:**
```
1. cPanel → File Manager → public_html
2. Tüm dosyaları seç
3. Compress → "backup-YYYYMMDD-HHMMSS.tar.gz"
4. Download to local machine
```

**2. Lokal Git Backup:**
```bash
# Deploy öncesi commit yap
git add .
git commit -m "Pre-deployment snapshot $(date +%Y%m%d-%H%M%S)"
git push origin main

# Tag oluştur (production release)
git tag -a v1.0.0-prod -m "Production deployment $(date +%Y-%m-%d)"
git push origin v1.0.0-prod
```

**3. Database Backup (WordPress eski site):**
```
ÖNEMLİ: Yeni Astro sitesi database kullanmıyor ama eski WordPress database'i
güvenli yerde sakla (phpmyadmin → Export → SQL dump)
```

#### Deploy Sonrası Doğrulama

- [ ] Backup dosyası indirildi (tar.gz)
- [ ] Git tag push edildi
- [ ] Backup dosyası güvenli yerde (cloud storage / external HDD)

---

### Emergency Contacts

**Hosting Support:**
- Provider: GüzelHosting
- Support: [hosting support bilgileri ekleyin]

**Developer:**
- Name: Ömer Yasir Önal
- Email: [email ekleyin]

**Deployment Owner:**
- Name: [proje sahibi]
- Contact: [iletişim bilgileri]

---

## DEPLOYMENT READY CHECKLIST ✅

### Pre-Deployment
- [x] Proje tipi tespit edildi (Astro Static + PHP)
- [x] Production risks audit tamamlandı
- [x] .htaccess.production oluşturuldu (gzip + CSP + security)
- [x] www vs non-www kararı verildi (www forced)
- [x] Build komutu test edildi (`pnpm run build`)
- [x] Contact form endpoint doğrulandı (`api/contact.php`)
- [ ] **ACTION REQUIRED:** Git backup tag oluştur
- [ ] **ACTION REQUIRED:** cPanel backup al (mevcut dosyalar)

### Deployment
- [ ] **ACTION REQUIRED:** Lokal build çalıştır (`pnpm run build`)
- [ ] **ACTION REQUIRED:** `.htaccess.production` → `dist/.htaccess` kopyala
- [ ] **ACTION REQUIRED:** `dist/` klasörünü zip'le
- [ ] **ACTION REQUIRED:** cPanel'e upload et (File Manager veya FTP)
- [ ] **ACTION REQUIRED:** File permissions kontrol et (.htaccess: 644, PHP: 644)

### Post-Deployment
- [ ] **ACTION REQUIRED:** Smoke test listesini çalıştır (yukarıda)
- [ ] **ACTION REQUIRED:** Contact form email testi yap
- [ ] **ACTION REQUIRED:** GTM tracking testi yap
- [ ] **ACTION REQUIRED:** SSL/HTTPS/WWW redirectleri test et
- [ ] **ACTION REQUIRED:** PageSpeed Insights test et
- [ ] **ACTION REQUIRED:** Google Search Console'a sitemap submit et

---

**DEPLOYMENT STATUS:** 🟢 READY TO DEPLOY

Herhangi bir soru veya sorun için bu dokümanı referans alın.
