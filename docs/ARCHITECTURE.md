```markdown
## Overview

The A2 Reklam platform is a modern multilingual static-first website designed for advertising and signage solutions, built with Astro 5. The architecture supports dynamic content rendering, ensuring that services are presented clearly and attractively to users across Turkish, English, and Arabic locales.

The system is structured to provide a seamless experience for both users and administrators, with a focus on performance and security. The architecture incorporates a static site generator approach, ensuring fast load times and optimal SEO performance.

## Components

### Major Components/Services

1. **Frontend (Astro)**:
   - Handles the rendering of the website, including pages, components, and layouts.
   - Supports multilingual content with routing for TR, EN, and AR locales.

2. **Contact Form API (PHP)**:
   - Located at `public/api/contact.php`, this component manages form submissions, validation, and email sending to `info@a2reklam.com`.

3. **Content Management**:
   - Content is organized into collections for services, districts, and blogs, allowing easy management and updates.
   - Markdown files are used for blog entries and service descriptions, enhancing flexibility in content presentation.

4. **Image Processing**:
   - Uses a script for processing images, ensuring that assets are optimized for the web.

5. **Analytics and Tracking**:
   - Integrates Google Tag Manager for tracking user interactions and conversions across the site.

## Data Flow

1. **User Interaction**:
   - Users interact with the website through the frontend, navigating through service offerings and blog posts.

2. **Form Submission**:
   - When a user submits the contact form located on pages like `/iletisim/`, the frontend sends a request to the PHP endpoint at `/api/contact.php` using the `fetch()` API.

3. **API Processing**:
   - The PHP script processes the incoming data, performs validations, and sends an email on successful submission.

4. **Content Delivery**:
   - Static resources are served from the `dist/` folder after building the site using the command:
     ```bash
     pnpm run build
     ```

5. **Analytics Tracking**:
   - Events are pushed to Google Tag Manager for tracking user engagement, including form submissions and CTA clicks, leveraging the `dataLayer`.

## Technology Stack

- **Frontend**: Astro 5, React
- **Styling**: Tailwind CSS
- **Image Processing**: Sharp
- **Backend**: PHP (for contact form)
- **Package Manager**: pnpm 10.x
- **Node.js**: 20.x

## Setup Instructions

To set up the project locally, follow these commands:

1. Install dependencies:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```

3. Build the project for production:
   ```bash
   pnpm run build
   ```

4. Process images for deployment:
   ```bash
   pnpm run process-images
   ```

5. Run repo safety check:
   ```bash
   pnpm run repo:safety
   ```

## Conclusion

The A2 Reklam architecture is designed to provide a robust and efficient platform for delivering high-quality signage and advertising solutions. By utilizing modern web technologies and a scalable architecture, the platform ensures a consistent and engaging user experience across multiple languages.
```