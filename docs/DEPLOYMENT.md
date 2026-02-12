```markdown
# Deployment Documentation for A2 Reklam Astro Rebuild

## Prerequisites

To successfully deploy the A2 Reklam website, ensure you have the following infrastructure requirements:

- **Node.js**: Version 20.x
- **Package Manager**: pnpm version 10.x (Install using the command):
  ```bash
  npm install -g pnpm
  ```

## Environment Variables

The following environment variables are required for the deployment:

- `PUBLIC_FORM_ENDPOINT`: The endpoint for form submissions. If not set, forms will fall back to mailto/WhatsApp. Set this in your `.env` file during the build:
  ```bash
  PUBLIC_FORM_ENDPOINT="https://formspree.io/f/your-id"
  ```

## Build & Deploy

Follow these steps to deploy the A2 Reklam website:

1. **Install Dependencies**:
   Run the following command to install all necessary dependencies:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Build the Site Locally**:
   Execute the build command to generate the static files:
   ```bash
   pnpm run build
   ```
   This creates the `dist/` folder containing all static files.

3. **Upload to cPanel**:
   - Connect to your cPanel via FTP/SFTP or use the File Manager.
   - Upload the entire contents of the `dist/` folder to the `public_html/` directory.
   - Ensure that the `public/api/contact.php` file is uploaded to `public_html/api/contact.php`. This PHP file handles contact form email submissions.
   - Verify that the `/api/` directory exists in `public_html/`.

4. **Verify Required Files**:
   Make sure the following files are present:
   - `.htaccess` (for URL rewriting) should be in `public_html/`.
   - `api/contact.php` should be accessible at `https://a2reklam.com/api/contact.php`.

5. **Test Critical Features**:
   After deployment, test the following features:
   - Phone call button (should push `cta_click` event to GTM).
   - WhatsApp button (should push `cta_click` event to GTM).
   - Contact form submission (should send email and push `form_success` event).
   - Gallery lightbox functionality (GLightbox with swipe/keyboard support).

6. **Configure Google Tag Manager (GTM)**:
   Set up Google Ads conversion tags inside GTM. Use `[data-track="whatsapp"]` and `[data-track="call"]` as trigger selectors. Utilize the `form_success` custom event for form conversion tracking.

## Monitoring

### Health Checks
TODO: Add health check procedures.

### Logging
TODO: Add logging configuration.

### Alerting
TODO: Add alerting instructions.

## Rollback

In case of a bad deployment, follow these steps to rollback:

1. Restore the previous version of the `dist/` folder from your backups.
2. Ensure that all necessary files are uploaded correctly to `public_html/`.
3. Test the site functionalities to confirm the rollback is successful.

For further assistance, please refer to the README documentation or contact the development team.
```