## Prerequisites

Before setting up the A2 Reklam project, ensure you have the following tools installed:

- **Node.js**: Version 20.x
- **Package Manager**: pnpm 10.x (Install with `npm install -g pnpm`)

## Local Setup

To get the A2 Reklam project running locally, follow these steps:

1. **Install Dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Start Development Server**:
   ```bash
   pnpm run dev
   ```

3. **Run Repo Safety Check**:
   ```bash
   pnpm run repo:safety
   ```

## Commands

Here are the essential commands used during development, build, testing, and linting:

| Command              | Description                                    |
|---------------------|------------------------------------------------|
| `pnpm run dev`      | Starts the development server.                 |
| `pnpm run build`    | Builds the project for production.             |
| `pnpm run preview`  | Previews the built project.                    |
| `pnpm run process-images` | Processes images for production.          |
| `pnpm run repo:safety` | Checks the repository for safety issues.    |
| `pnpm run content:lint` | Lints the content files.                   |

## Environment Variables

The following environment variables are required for the project:

- `PUBLIC_FORM_ENDPOINT`: Form submission endpoint (default is mailto/WhatsApp if not set).
  - Example: 
    ```bash
    PUBLIC_FORM_ENDPOINT="https://formspree.io/f/your-id"
    ```
  
## Troubleshooting

TODO: Add common issues and fixes.