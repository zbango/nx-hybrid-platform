# @nx-hybrid-platform/ui-components

Shared React UI components library for web and desktop applications.

## Purpose

Provides reusable, styled React components that maintain a consistent UI/UX across both web and desktop platforms. Built with React 19, Tailwind CSS, and React Query for state management.

## Components

### Button

Interactive button component that sends messages to the API.

**Props:**
- `apiClient: ApiClient` - Instance of the API client
- `source: string` - Source identifier ('web' or 'desktop')

**Features:**
- Success/error state handling
- Loading states with React Query
- Mutation management
- Styled with Tailwind CSS

## Usage

```typescript
import { Button } from '@nx-hybrid-platform/ui-components';
import { ApiClient } from '@nx-hybrid-platform/api-client';
import '@nx-hybrid-platform/ui-components/styles';

const apiClient = new ApiClient('http://localhost:3000');

function App() {
  return <Button apiClient={apiClient} source="web" />;
}
```

## Dependencies

### Workspace Dependencies
- `@nx-hybrid-platform/data-models` - Type definitions
- `@nx-hybrid-platform/api-client` - API communication

### Peer Dependencies
- `react` ^19.0.0
- `react-dom` ^19.0.0
- `@tanstack/react-query` ^5.62.0

### Dev Dependencies
- Vite - Build tool
- Tailwind CSS - Styling
- TypeScript - Type checking

## Development

### Build
```bash
npm run build
```

Runs two build processes:
1. **Vite** - Bundles component code into `dist/index.js` and `dist/style.css`
2. **TypeScript** - Generates type declarations via `tsconfig.build.json`

### Clean
```bash
npm run clean
```

## Styling

Components use Tailwind CSS for styling. The compiled CSS is available at:
```typescript
import '@nx-hybrid-platform/ui-components/styles';
```

## TypeScript Configuration

### `tsconfig.json`
- Main configuration for development
- Extends workspace base configuration
- Includes all source files

### `tsconfig.build.json`
- Used during build process
- Extends `tsconfig.json`
- Emits declaration files only (Vite handles JS compilation)

## Build Output

- `dist/index.js` - Bundled component code (ES module)
- `dist/style.css` - Compiled Tailwind CSS
- `dist/index.d.ts` - TypeScript type declarations
- `dist/index.d.ts.map` - Source maps for types

## Notes

- All components are exported from `src/index.ts`
- Styles must be imported separately from the components
- Uses React Query for async state management
- Fully typed with TypeScript
- Built as ES modules for tree-shaking support
