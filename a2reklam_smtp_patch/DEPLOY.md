# A2 Reklam SMTP Mail Deployment Guide

## Overview

This patch replaces PHP `mail()` with SMTP authentication via PHPMailer for the contact and quote forms.

---

## File Upload Mapping

Upload files to cPanel in this exact structure:

| Local File | Upload To |
|------------|-----------|
| `smtp_config.php` | `/home/areklamc/smtp_config.php` (**OUTSIDE public_html!**) |
| `api/_lib/MailerFactory.php` | `/home/areklamc/public_html/api/_lib/MailerFactory.php` |
| `api/contact.php` | `/home/areklamc/public_html/api/contact.php` |
| `api/quote.php` | `/home/areklamc/public_html/api/quote.php` |
| `api/.htaccess` | `/home/areklamc/public_html/api/.htaccess` |

---

## Step-by-Step Deployment

### 1. Create Required Directories

In cPanel File Manager, create:
- `/home/areklamc/public_html/api/_lib/`
- `/home/areklamc/public_html/api/_data/`

### 2. Upload SMTP Config (CRITICAL)

1. Open `smtp_config.php` in a text editor
2. **Set your SMTP password** on line 17:
   ```php
   'password' => 'YOUR_ACTUAL_PASSWORD_HERE',
   ```
3. Upload to `/home/areklamc/smtp_config.php`
   - Use cPanel File Manager → navigate to `/home/areklamc/` (NOT public_html)
   - Click Upload → select file
4. Set permissions to `600` (owner read/write only)

### 3. Upload API Files

Upload in this order:
1. `api/_lib/MailerFactory.php` → `/home/areklamc/public_html/api/_lib/`
2. `api/contact.php` → `/home/areklamc/public_html/api/`
3. `api/quote.php` → `/home/areklamc/public_html/api/`
4. `api/.htaccess` → `/home/areklamc/public_html/api/`

### 4. Set File Permissions

```
/home/areklamc/smtp_config.php           → 600
/home/areklamc/public_html/api/_lib/     → 755
/home/areklamc/public_html/api/_data/    → 755
/home/areklamc/public_html/api/*.php     → 644
/home/areklamc/public_html/api/.htaccess → 644
```

### 5. Verify PHPMailer Installation

Ensure PHPMailer exists at:
```
/home/areklamc/public_html/api/vendor/PHPMailer/src/
├── Exception.php
├── PHPMailer.php
└── SMTP.php
```

If missing, download from https://github.com/PHPMailer/PHPMailer and upload the `src/` folder.

---

## Testing Checklist

### Quick Tests

1. **Test .htaccess Protection**
   ```
   # These should return 403 Forbidden:
   https://a2reklam.com/api/vendor/
   https://a2reklam.com/api/_lib/
   https://a2reklam.com/api/_data/
   https://a2reklam.com/api/contact_error.log
   ```

2. **Test Contact Endpoint (JSON)**
   ```bash
   curl -X POST https://a2reklam.com/api/contact.php \
     -H "Content-Type: application/json" \
     -d '{
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "+90 555 123 4567",
       "serviceType": "Tabela",
       "message": "Bu bir test mesajıdır. En az 10 karakter."
     }'
   ```
   Expected: `{"ok":true,"message":"Mesajınız başarıyla gönderildi..."}`

3. **Test Quote Endpoint (Form POST)**
   ```bash
   curl -X POST https://a2reklam.com/api/quote.php \
     -d "fullName=Test User" \
     -d "email=test@example.com" \
     -d "phone=+90 555 123 4567" \
     -d "serviceType=Tabela" \
     -d "projectDetails=Test proje detayları burada yer alıyor."
   ```
   Expected: Redirect to `/teklif-al/?success=1`

4. **Test Rate Limiting**
   - Send 6+ requests within 1 hour from same IP
   - Expected: 429 response or `?error=rate_limit` redirect

5. **Test Honeypot**
   - Include `"website": "spam"` in JSON body
   - Should return success but NOT send email

### Frontend Integration Tests

1. Submit contact form on website → check email inbox
2. Submit quote form on website → verify redirect and email
3. Test on mobile devices
4. Verify form validation messages appear correctly

---

## Troubleshooting

### "Server configuration error" (500)

- Check `smtp_config.php` exists at `/home/areklamc/smtp_config.php`
- Verify password is set (not empty)
- Check file permissions (600)

### "Mail gönderilemedi" (SMTP Error)

1. Check error logs:
   ```
   /home/areklamc/public_html/api/contact_error.log
   /home/areklamc/public_html/api/quote_error.log
   ```

2. Common SMTP issues:
   - **Authentication failed**: Verify username/password in config
   - **Connection timeout**: Try fallback host `mail.a2reklam.com`
   - **Port blocked**: Try port 587 with `'secure' => 'tls'`

3. Update `smtp_config.php` with fallback settings:
   ```php
   'host'   => 'mail.a2reklam.com',  // Try alternate host
   'port'   => 587,                   // Try STARTTLS port
   'secure' => 'tls',                 // Change from 'ssl' to 'tls'
   ```

### Rate Limit Data Files

If rate limiting isn't working:
- Check `/home/areklamc/public_html/api/_data/` directory exists
- Verify directory is writable (755)
- Rate limit files are created automatically:
  - `contact_rate_limit.json`
  - `quote_rate_limit.json`

### CORS Issues

If frontend fetch fails with CORS error:
- Verify request originates from `a2reklam.com` or `www.a2reklam.com`
- For local development, `localhost:4321` is allowed

---

## Security Notes

1. **Never commit** `smtp_config.php` with real password to git
2. Config file is **outside public_html** for protection
3. `.htaccess` blocks direct access to:
   - `*.log` files
   - `*.json` files
   - `vendor/` directory
   - `_lib/` directory
   - `_data/` directory
4. Rate limiting prevents abuse (5 requests/hour per IP)
5. Honeypot field catches automated spam

---

## Form Field Reference

### contact.php

Accepts these field names (JSON or form-urlencoded):

| Field | Required | Alternatives |
|-------|----------|--------------|
| `fullName` | Yes | `name` |
| `email` | Yes | - |
| `phone` | Yes | - |
| `serviceType` | Yes | `service` |
| `message` | Yes | - |
| `website` | No | Honeypot (leave empty) |

### quote.php

Accepts these field names (form-urlencoded):

| Field | Required | Alternatives |
|-------|----------|--------------|
| `fullName` | Yes | `name`, `ad_soyad` |
| `email` | Yes | `eposta` |
| `phone` | Yes | `telefon` |
| `company` | No | `firma` |
| `serviceType` | No* | `service`, `hizmet` |
| `projectDetails` | No* | `message`, `mesaj`, `detaylar` |
| `budget` | No | `butce` |
| `deadline` | No | `sure` |
| `website` | No | Honeypot (leave empty) |

*At least one of `serviceType` or `projectDetails` is required.

---

## Support

For issues:
1. Check error logs first
2. Verify all files are uploaded correctly
3. Test SMTP credentials via cPanel Webmail

Last updated: January 2026
