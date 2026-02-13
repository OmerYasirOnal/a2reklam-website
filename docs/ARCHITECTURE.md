```markdown
# Architecture Documentation for A2 Reklam

## Overview
The A2 Reklam platform is designed as a modern multilingual static-first website built with Astro 5. It serves as a comprehensive solution for advertising services, including signage and vehicle wrapping, with a focus on user engagement and functionality. The architecture supports multiple languages (TR/EN/AR) and is designed to be easily deployable and maintainable.

### Component Diagram
TODO: Add component diagram

## Components
### Major Components/Services
1. **Frontend (Astro)**
   - **Responsibilities**: Renders static pages; handles routing for different locales.
   - **Key Files**: 
     - `src/pages/index.astro`: Main entry point for the application.
     - `src/components/`: Contains reusable UI components.

2. **Backend (PHP)**
   - **Responsibilities**: Processes form submissions and handles email notifications.
   - **Key Files**:
     - `public/api/contact.php`: PHP script for handling contact form submissions.

3. **Deployment Environment**
   - **Responsibilities**: Hosts the static site and PHP backend.
   - **Key Files**: 
     - `.htaccess`: Manages URL rewriting and redirects.
     - `public/`: Contains all publicly accessible assets.

4. **Image Processing**
   - **Responsibilities**: Prepares and optimizes images for the website.
   - **Key Commands**: 
     ```bash
     pnpm run process-images
     ```

5. **Content Management**
   - **Responsibilities**: Manages service and district content dynamically.
   - **Key Files**:
     - `src/content/`: Contains markdown files for services and blogs.

## Data Flow
1. **User Interaction**
   - Users access the website and navigate through various services (e.g., vehicle wrapping, signage).
   - Contact forms are filled out on `/iletisim/` or language-specific contact pages.

2. **Form Submission**
   - Form data is sent via JavaScript's `fetch()` method to the PHP endpoint (`/api/contact.php`).
   - The PHP script validates input, performs anti-spam checks, and sends email notifications.

3. **Image Handling**
   - Images are processed via a script that generates optimized assets for the site.
   - The site loads `images-manifest.json` for image references.

4. **Static Site Generation**
   - The static site is built using the command:
     ```bash
     pnpm run build
     ```
   - The output is deployed to the `dist/` folder for hosting.

## Technology Stack
- **Languages**: JavaScript, PHP, TypeScript
- **Frameworks**: Astro 5, React
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Deployment**: cPanel for PHP, static hosting for HTML/CSS/JS

## Additional Notes
- Ensure to run the safety check to prevent private assets from being tracked:
  ```bash
  pnpm run repo:safety
  ```

- Follow the deployment instructions carefully to ensure all files are correctly placed in the hosting environment, especially the PHP scripts and `.htaccess` configuration.

- For continuous integration, ensure that the build process is validated regularly to maintain the integrity of the application.

## Security Considerations
- The application implements a Same-origin CORS policy, input validation, and sanitization in the PHP script to ensure security against common web vulnerabilities.

- All private assets must never be committed to the repository to avoid security breaches.

```
