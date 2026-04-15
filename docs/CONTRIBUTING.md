```markdown
# Contributing to A2 Reklam

## Welcome
Welcome to the A2 Reklam project! We're excited to have you join our community of contributors. Whether you're reporting bugs, suggesting features, or submitting code, your contributions are vital to our project's success.

## How to Contribute
To contribute to the A2 Reklam project, please follow the steps below:

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone your fork**: Use the following command to clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/a2reklam-website.git
   ```
3. **Create a new branch**: Use descriptive names for your branch. For example:
   ```bash
   git checkout -b feature/my-new-feature
   ```
4. **Make your changes**: Implement your feature or fix a bug.
5. **Commit your changes**: Include a clear commit message. For example:
   ```bash
   git commit -m "Add my new feature"
   ```
6. **Push to your fork**: Push your changes to your fork on GitHub:
   ```bash
   git push origin feature/my-new-feature
   ```
7. **Submit a pull request**: Go to the original repository and click "New pull request".

## Development Setup
To set up your development environment, please follow these steps:

1. **Install Node.js and pnpm**: Ensure you have Node.js 20.x and pnpm 10.x installed. If you don’t have pnpm, you can install it globally using:
   ```bash
   npm install -g pnpm
   ```
2. **Install dependencies**: Run the following command in the project directory:
   ```bash
   pnpm install --frozen-lockfile
   ```
3. **Run the development server**: Start the local development server:
   ```bash
   pnpm run dev
   ```
4. **Safety check**: Perform a repository safety check to ensure private assets are not being tracked:
   ```bash
   pnpm run repo:safety
   ```

## Pull Request Process
When you're ready to submit your pull request, please ensure:

- Your code follows the project's coding standards.
- Your changes are well-documented and include tests if applicable.
- You have tested your changes locally.

After submitting your pull request, it will be reviewed by the maintainers. You may be asked to make further changes before it can be merged.

## Code of Conduct
We expect everyone to adhere to our [Code of Conduct](TODO: Add link to Code of Conduct).

## Coding Standards
Please ensure your code meets the following standards:

- Follow the project's existing style.
- Ensure all code is properly commented.
- Use meaningful variable and function names.

Thank you for contributing to A2 Reklam! We appreciate your help in making this project better.
```