```markdown
# Changelog

## [1.0.0] - 2026-01-01

### Added
- Initial release of the A2 Reklam Astro Rebuild platform.
- Support for multilingual (TR/EN/AR) static-first website.

### Changed
- Updated requirements to Node.js 20.x and pnpm 10.x.
- Implemented modern build process using Astro 5.

### Deprecated
- The legacy WordPress structure has been deprecated in favor of the new Astro-based system.

### Removed
- Removed the "Hizmet Bölgeleri" navigation item from the header.

### Fixed
- Addressed issues with the contact form integration, ensuring that emails are sent correctly to `info@a2reklam.com`.

### Security
- Introduced measures to prevent private assets from being committed to the repository.
- Implemented CORS policy for the contact form PHP endpoint to enhance security.

### Documentation
- Added comprehensive documentation for setup, including:
  ```bash
  pnpm install --frozen-lockfile
  pnpm run dev
  pnpm run build
  ```

## [1.1.0] - 2026-02-01

### Added
- New features for asset processing and safety checks with `pnpm run process-images` and `pnpm run repo:safety`.

### Changed
- Improved build output with better management of static files, ensuring all assets are correctly generated.

### Fixed
- Bug fixes related to the display of images in the gallery and ensuring the correct fallback to demo assets when private assets are not available.

### Security
- Enhanced security measures for the contact form, including rate limiting and input validation.

## [1.2.0] - 2026-03-01

### Added
- Added comprehensive support for tracking via Google Tag Manager (GTM), including custom events for form submissions and CTA clicks.

### Changed
- Updated tracking script integrations to ensure no duplicate tracking occurs.

### Fixed
- Fixed issues related to the display of the contact form success and error messages.

### Security
- Updated Content Security Policy (CSP) to restrict sources for scripts and styles, improving overall platform security.

### Documentation
- Expanded documentation to include detailed tracking setup for GTM, including:
  - **GA4 Configuration Tag**: Use Measurement ID `G-TC9GJP3GLT`
  - **Google Ads Conversion Tags**: Use Conversion ID `AW-17854412453`

## [1.3.0] - 2026-04-01

### Added
- New sections in the documentation for environmental variables and optional configurations.

### Changed
- Refined the process for handling private assets, ensuring better management and documentation of necessary steps to avoid leaks.

### Fixed
- Resolved issues with the deployment process in cPanel, ensuring all files are accessible and correctly located in the `public_html/` directory.

### Security
- Further enhancements to the repository safety checks to ensure compliance with security best practices.

### Documentation
- Revised deployment instructions to clarify steps for uploading to cPanel, including:
  ```bash
  pnpm run build
  # Upload entire dist/ folder contents to public_html/
  ```

## [1.4.0] - 2026-05-01

### Added
- New blog posts related to vehicle wrapping and signage design best practices.

### Changed
- Updated existing blog content to reflect current trends and practices in signage and branding.

### Fixed
- Bug fixes in the gallery component to improve performance and user experience.

### Security
- Implemented regular audits of third-party dependencies to ensure no vulnerabilities exist.

### Documentation
- Comprehensive updates to the blog documentation, ensuring all posts are SEO optimized and contain accurate meta descriptions and titles.
```