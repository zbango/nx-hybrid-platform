# Web Application

Modern web application built with React, Vite, and Tailwind CSS.

## Purpose

Browser-based application providing access to the platform's features through a responsive web interface. Shares components and business logic with the desktop application for a consistent user experience.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management
- **TypeScript** - Type safety

## Features

- Fast development with Vite HMR (Hot Module Replacement)
- Shared UI components with desktop app
- Type-safe API communication
- Responsive design with Tailwind CSS
- Optimized production builds

## Development

### Start Dev Server
```bash
npm run dev
```

Starts the Vite dev server at `http://localhost:5173` with:
- Hot module replacement
- Fast refresh
- Source maps

### Build for Production
```bash
npm run build
```

Creates an optimized production build in `dist/`:
- Minified JavaScript
- CSS extraction and optimization
- Code splitting
- Asset optimization

### Preview Production Build
```bash
npm run preview
```

Locally preview the production build.

### Lint
```bash
npm run lint
```

## Project Structure

```
src/
├── App.tsx           # Main application component
├── App.css           # Application styles
├── main.tsx          # Application entry point
├── index.css         # Global styles
└── vite-env.d.ts     # Vite type declarations
```

## Environment Variables

Create a `.env` file in the app root:

```env
VITE_API_URL=http://localhost:3000
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Dependencies

### Workspace Packages
- `@nx-hybrid-platform/data-models` - Shared types
- `@nx-hybrid-platform/api-client` - API communication
- `@nx-hybrid-platform/ui-components` - Shared UI components

### External Dependencies
- `@tanstack/react-query` - Server state management
- `react` - UI framework
- `react-dom` - DOM rendering

## TypeScript Configuration

### `tsconfig.json`
- Main configuration for app source
- Extends `tsconfig.base.json` for path mappings
- Module: ESNext with bundler resolution
- **Important**: Source file imports resolve to workspace package source files, not dist

### `tsconfig.node.json`
- Configuration for Vite config files
- Node.js module resolution

## Build Configuration

### Vite (`vite.config.ts`)
- React plugin with Fast Refresh
- PostCSS with Tailwind CSS
- Source maps in development
- Optimized builds for production

### Tailwind CSS (`tailwind.config.js`)
- Configured for React (.tsx files)
- Scans workspace UI components for classes
- Custom theme extensions available

## Notes

- Default port: 5173 (configurable in `vite.config.ts`)
- Hot reload works with workspace package changes
- Path mappings resolve imports to source files for better DX
- Production builds are served from `dist/`
