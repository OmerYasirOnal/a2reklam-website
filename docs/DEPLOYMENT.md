```markdown
# Deployment Documentation for A2 Reklam Astro Rebuild

## Prerequisites

Before deploying the A2 Reklam website, ensure you have the following infrastructure requirements:

- **Node.js**: Version 20.x
- **Package Manager**: pnpm 10.x (Install with `npm install -g pnpm`)

## Environment Variables

The following environment variables are required for deploying the application:

- `PUBLIC_FORM_ENDPOINT`: Form submission endpoint (default is `mailto` or WhatsApp if not set).

## Build & Deploy

Follow these steps to build and deploy the A2 Reklam website:

1. **Install Dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Build the Site**:
   ```bash
   pnpm run build
   ```
   - This command generates the output in the `dist/` folder, containing 341 static HTML pages.

3. **Upload to cPanel**:
   - Connect to your cPanel via FTP/SFTP or use the File Manager.
   - Upload the contents of the `dist/` folder to the `public_html/` directory.
   - Ensure to upload `public/api/contact.php` to `public_html/api/contact.php`.

4. **Verify Required Files**:
   - Check that the `.htaccess` file is present in the `public_html/` directory for URL rewriting.
   - Ensure that the `api/contact.php` file is accessible at `https://a2reklam.com/api/contact.php`.

5. **Test Critical Features**:
   - Verify functionality of the phone call button (should push `cta_click` event to GTM).
   - Verify functionality of the WhatsApp button (should push `cta_click` event to GTM).
   - Test the contact form submission (should send email and push `form_success` event).
   - Check the gallery lightbox functionality (GLightbox should support swipe/keyboard).

6. **Configure Google Tag Manager (GTM)**:
   - Set up Google Ads conversion tracking tags inside GTM.
   - Use `[data-track="whatsapp"]` and `[data-track="call"]` as trigger selectors.
   - Use the `form_success` custom event for form conversion tracking.

## Monitoring

TODO: Add monitoring details (health checks, logging, alerting).

## Rollback

TODO: Add rollback instructions for reverting to a previous deployment.
```