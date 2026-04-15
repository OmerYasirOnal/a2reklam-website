```markdown
# FAQ

## General

### What is A2 Reklam?
A2 Reklam is a modern, multilingual (TR/EN/AR) static-first website for a2reklam.com, built with Astro 5, focused on providing signage and advertising solutions.

### What are the requirements to run the project?
- **Node.js version:** 20.x
- **Package manager:** pnpm 10.x (`npm install -g pnpm`)

### How do I install the project?
To install the project, run the following command:
```bash
pnpm install --frozen-lockfile
```

### How do I run the development server?
You can start the development server with the following command:
```bash
pnpm run dev
```

### How do I build the project for production?
To build the project, use the command:
```bash
pnpm run build
```
The output will be written to the `dist/` folder.

### What does the `repo:safety` command do?
The `repo:safety` command is used to perform a safety check to prevent private assets from being tracked in the repository. You can run it using:
```bash
pnpm run repo:safety
```

### How does the contact form work?
The contact form submits data to `public/api/contact.php`, which processes the input and sends an email to `info@a2reklam.com`.

### What security measures are in place for the contact form?
The contact form includes several security features:
- Same-origin CORS policy
- Honeypot field to prevent spam
- Rate limiting (5 requests per IP per hour)
- Input validation and sanitization

### How do I test the contact form locally?
To test the contact form locally, you can use PHP's built-in server or the Astro development server:
```bash
# Option 1: Use PHP's built-in server
php -S localhost:8000 -t public

# Option 2: Use Astro dev server
pnpm run dev
```

### How do I deploy the project to cPanel?
Follow these steps to deploy to a2reklam.com:
1. Build the site:
   ```bash
   pnpm run build
   ```
2. Upload the contents of the `dist/` folder to the `public_html/` directory via FTP/SFTP or cPanel File Manager.
3. Ensure `public/api/contact.php` is uploaded to `public_html/api/contact.php`.

### What are demo assets and production assets?
- **Demo assets:** Located in `public/assets/img/demo/` and used for CI builds.
- **Production assets:** Full private assets generated locally and stored in a private directory not tracked by Git.

### How can I configure Google Tag Manager (GTM)?
The site uses Google Tag Manager (`GTM-MXT449F9`). You need to configure all analytics and conversion tracking inside the GTM container.

### How do I set up GTM conversion tracking?
1. Create click triggers for call-to-action elements using stable `data-track` attributes.
2. Create Google Ads conversion tags using the respective conversion IDs and attach the triggers.

### What should I do if I encounter setup issues?
For setup issues, ensure you're following the commands provided in the setup instructions. If problems persist, check for compatibility with Node.js and pnpm versions.

## Usage

### How can I use the vehicle wrapping service?
To inquire about vehicle wrapping, you can contact the A2 Reklam team through the website for a consultation.

### What are the typical timelines for vehicle wrapping projects?
The typical timeline for vehicle wrapping projects ranges from 1 to 3 days, depending on the extent of the wrapping (full or partial).

### What types of vinyl are used for vehicle wrapping?
- **Cast Vinyl:** Premium quality, 7-10 year lifespan.
- **Calendered Vinyl:** Economical option, 3-5 year lifespan.

### How do I maintain my vehicle wrap?
- Regularly wash with a soft cloth.
- Avoid car washes for the first two weeks to prevent damage.

### Can I remove the vehicle wrap without damaging the paint?
Yes, if removed professionally, the wrap protects the paint underneath.

### What should I do if I have further questions?
For more inquiries, please contact A2 Reklam directly via email or through the website's contact form.
```
