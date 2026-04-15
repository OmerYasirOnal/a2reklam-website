## Development Documentation for A2 Reklam Astro Rebuild

### Prerequisites

To set up the A2 Reklam project locally, ensure you have the following tools installed:

- **Node.js**: Version 20.x
- **pnpm**: Version 10.x (Install with `npm install -g pnpm`)

### Local Setup

Follow these steps to get the project running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/OmerYasirOnal/a2reklam-website.git
   cd a2reklam-website
   ```

2. **Install dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```

3. **Start development server**:
   ```bash
   pnpm run dev
   ```

4. **Run repo safety check** (to prevent private assets from being tracked):
   ```bash
   pnpm run repo:safety
   ```

### Commands

The following commands are available for development, building, and testing the application:

- **Development**: Start the local development server
  ```bash
  pnpm run dev
  ```

- **Build**: Create a production build
  ```bash
  pnpm run build
  ```

- **Preview**: Preview the production build
  ```bash
  pnpm run preview
  ```

- **Process Images**: Process images for production
  ```bash
  pnpm run process-images
  ```

- **Repo Safety Check**: Ensure no private assets are tracked
  ```bash
  pnpm run repo:safety
  ```

- **Content Lint**: Lint content files
  ```bash
  pnpm run content:lint
  ```

### Environment Variables

The following environment variables are required for the application to run correctly:

- `PUBLIC_FORM_ENDPOINT`: Form submission endpoint (optional). If not set, forms will fall back to mailto/WhatsApp.
  ```bash
  PUBLIC_FORM_ENDPOINT="https://formspree.io/f/your-id"
  ```

### Troubleshooting

TODO: Add troubleshooting information related to common issues and their fixes. 

Make sure to check the repo safety and ensure that all dependencies are properly installed to avoid any conflicts. If you encounter issues with the development server, verify that you are using the correct Node.js and pnpm versions as specified in the prerequisites.