```markdown
# FAQ

## General

### What is A2 Reklam?
A2 Reklam is a modern multilingual (TR/EN/AR) static-first website for a2reklam.com, focusing on professional signage solutions and advertising.

### What technologies does A2 Reklam use?
The project is built with Astro 5, utilizing React and Tailwind CSS for a responsive design.

### What are the project requirements?
To run the project, the following software is required:
- Node.js 20.x
- pnpm 10.x (install using `npm install -g pnpm`)

### How do I install the project?
To install the project dependencies, run:
```bash
pnpm install --frozen-lockfile
```

### How can I start the development server?
To develop the project locally, use:
```bash
pnpm run dev
```

### How do I build the project for production?
To build the project, execute:
```bash
pnpm run build
```
The output will be written to the `dist/` folder.

### How does the contact form work?
The contact form sends emails to `info@a2reklam.com` through a PHP endpoint located at `public/api/contact.php`. The JavaScript on the contact pages sends form data via `fetch()` to the PHP endpoint.

### What security features are implemented for the contact form?
The contact form includes:
- Same-origin CORS policy
- Honeypot field for spam prevention
- Rate limiting (5 requests per IP per hour)
- Input validation and sanitization

### What should I do if I encounter issues with installation or setup?
If you face any installation or setup issues, ensure that you have the correct versions of Node.js and pnpm installed, and that you follow the setup instructions carefully.

## Usage

### How do I test the contact form locally?
To test the contact form locally, run a local PHP server:
```bash
php -S localhost:8000 -t public
```
Alternatively, you can use the Astro development server, but note that form submissions will not work without a PHP server running.

### How do I integrate Google Tag Manager?
This site uses Google Tag Manager (`GTM-MXT449F9`). All analytics and conversion tracking must be configured inside the GTM container to avoid double tracking.

### What are the key directories in the project?
- `src/content/`: Contains markdown content for services, districts, and blog.
- `src/components/`: Holds reusable UI components.
- `public/assets/img/demo/`: Stores demo images tracked in git for CI purposes.
- `dist/`: Output directory for built static files.

### How do I report a bug or request a feature?
To report bugs or request features, please contact the development team via the email provided on the website.

### How do I deploy the project to cPanel?
To deploy the project to a2reklam.com using cPanel, follow these steps:
1. Build the site locally:
   ```bash
   pnpm run build
   ```
2. Upload the contents of the `dist/` folder to `public_html/`.
3. Ensure that `public/api/contact.php` is uploaded to `public_html/api/contact.php`.
4. Verify that the required files such as `.htaccess` and `api/contact.php` are correctly placed.

## Troubleshooting

### What should I do if private assets are tracked in the Git repository?
Private assets must never be committed. If they leak into history, you can purge them with `git filter-repo` and force-push the changes.

### How can I improve the performance of the site?
To enhance performance, ensure you follow best practices for image optimization and utilize lazy loading where possible. Additionally, regularly check for updates in dependencies.

### What if I have questions not covered in this FAQ?
If your question is not addressed here, please reach out to the support team through the contact information available on the website.
```