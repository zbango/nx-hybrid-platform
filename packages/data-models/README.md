# @nx-hybrid-platform/data-models

Shared data models and TypeScript types used across the entire platform.

## Purpose

This package provides a centralized location for all shared data structures, interfaces, and types. By keeping data models in a single package, we ensure consistency across the web and desktop applications.

## Contents

- **API Request Types** - Request payloads and parameters
- **API Response Types** - Response structures and data models
- **Shared Interfaces** - Common interfaces used throughout the platform

## Usage

```typescript
import { ApiRequest, ApiResponse } from '@nx-hybrid-platform/data-models';

const request: ApiRequest = {
  source: 'web',
  timestamp: Date.now()
};
```

## Dependencies

- No runtime dependencies
- TypeScript for type definitions

## Development

### Build
```bash
npm run build
```

Compiles TypeScript files and generates type declarations in the `dist/` directory.

### Clean
```bash
npm run clean
```

## TypeScript Configuration

This package uses:
- **Module**: ESNext
- **Module Resolution**: Bundler
- Extends the workspace base configuration for consistency
- Path mappings are inherited from `tsconfig.base.json` for monorepo integration

## Notes

- This is a **leaf package** with no dependencies on other workspace packages
- All types are exported from `src/index.ts`
- Used by `@nx-hybrid-platform/api-client` and `@nx-hybrid-platform/ui-components`
