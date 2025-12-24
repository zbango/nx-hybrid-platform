# @nx-hybrid-platform/api-client

HTTP client for communicating with the platform API.

## Purpose

Provides a typed, Promise-based API client that handles all HTTP communication with the backend. This package abstracts the networking layer and ensures type-safe API calls across web and desktop applications.

## Features

- Type-safe API methods using shared data models
- Promise-based asynchronous operations
- Configurable base URL
- Consistent error handling
- Support for both browser (web) and Node.js (desktop) environments

## Usage

```typescript
import { ApiClient } from '@nx-hybrid-platform/api-client';
import type { ApiRequest, ApiResponse } from '@nx-hybrid-platform/data-models';

const client = new ApiClient('http://localhost:3000');

const request: ApiRequest = {
  source: 'web',
  timestamp: Date.now()
};

const response = await client.sendMessage(request);
console.log(response.message);
```

## Dependencies

### Workspace Dependencies
- `@nx-hybrid-platform/data-models` - For type definitions

### External Dependencies
None (uses native `fetch` API)

## Development

### Build
```bash
npm run build
```

Compiles TypeScript and generates:
- `dist/index.js` - Compiled JavaScript
- `dist/index.d.ts` - Type declarations

### Clean
```bash
npm run clean
```

## API Methods

### `sendMessage(request: ApiRequest): Promise<ApiResponse>`

Sends a message to the API endpoint.

**Parameters:**
- `request` - API request object with `source` and `timestamp`

**Returns:**
- Promise resolving to `ApiResponse` with server message and timestamp

## TypeScript Configuration

- **Module**: ESNext
- **Module Resolution**: Bundler
- Extends workspace base configuration
- Generates declaration files and source maps

## Notes

- Uses modern `fetch` API (available in Node.js 18+)
- All requests are JSON-encoded
- Errors are propagated as rejected Promises
- The client is stateless - safe to create multiple instances
