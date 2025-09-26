# Welcome to Comuneo Recursive Todo!

A modern, production-ready application for managing recursive todo lists built with Remix and Appwrite.

## Features

- 🚀 Server-side rendering with Remix
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🔐 Authentication with Appwrite
- 📖 [Remix docs](https://remix.run/docs/en/main)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

### Code Formatting

Format your code with Prettier:

```bash
npm run format
```

Check formatting without making changes:

```bash
npm run format:check
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t comuneo-recursive-todo .

# Run the container
docker run -p 3000:3000 comuneo-recursive-todo
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Appwrite Configuration

This application uses Appwrite as its backend. You'll need to:

1. Set up an Appwrite project
2. Create a database and collection for todos
3. Configure authentication
4. Set the appropriate environment variables in your `.env` file:

```
VITE_APPWRITE_ENDPOINT=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_TODOS_COLLECTION_ID=your-collection-id
```

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/    # Server-side code and static assets
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling, configured with PostCSS.

## CI/CD Pipeline

### Overview

A robust CI/CD pipeline is essential for maintaining code quality and enabling rapid, reliable deployments. Below is a proposed CI/CD pipeline for this project:

### Pipeline Steps

1. **Install Dependencies**
   - Install npm packages
   - Cache dependencies to speed up future builds

2. **Code Quality Checks**
   - Run linting with ESLint
   - Check formatting with Prettier
   - Run TypeScript type checking

3. **Testing**
   - Run unit tests
   - Run integration tests
   - Generate test coverage reports

4. **Build**
   - Build the application for production
   - Optimize assets

5. **Deployment**
   - Deploy to staging environment for PR reviews
   - Deploy to production after merge to main branch
   - Run post-deployment health checks

### Recommended Tools

#### GitHub Actions
GitHub Actions would be ideal for this project due to:
- Tight integration with GitHub repositories
- Easy configuration with YAML files
- Extensive marketplace of pre-built actions
- Free tier for public repositories
- Matrix testing capabilities for different Node.js versions

Example workflow file structure:
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run format:check
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: build/

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: build
      # Deployment steps would go here
```

#### Alternatives

**GitLab CI/CD**
- Good option if the repository is hosted on GitLab
- Built-in CI/CD capabilities
- Container registry integration

**Jenkins**
- More suitable for larger organizations with existing Jenkins infrastructure
- Highly customizable but requires more setup and maintenance

### Environment Configuration

The pipeline should handle different environments:
- Development: For local development and feature branches
- Staging: For testing before production
- Production: The live environment

Environment variables should be securely stored in the CI/CD platform's secrets management system.

---

Built with ❤️ using Remix and Appwrite.
