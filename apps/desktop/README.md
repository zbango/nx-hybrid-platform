# Desktop Application

Cross-platform desktop application built with Electron, React, and Webpack.

## Origin

This application is based on the [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) template, with customizations to support our monorepo structure.

**Template**: `electron-react-boilerplate/electron-react-boilerplate`

**Key Monorepo Customizations:**
- Dual TypeScript configurations (`tsconfig.json` + `tsconfig.node.json`)
- Webpack configuration modified to handle workspace packages
- Path mappings integration for source file resolution
- ts-node configuration via `TS_NODE_PROJECT` environment variable
- Support for importing workspace packages from source instead of dist

## Purpose

Native desktop application providing the platform's features as a standalone installable app for Windows, macOS, and Linux. Shares components and business logic with the web application while providing native OS integration.

## Tech Stack

- **Electron 35** - Desktop app framework
- **React 19** - UI framework
- **Webpack 5** - Build tool and bundler
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Server state management
- **TypeScript** - Type safety

## Architecture

The application uses Electron's multi-process architecture:

- **Main Process** (`.erb/configs/webpack.config.main.*`)
  - Node.js environment
  - Window management
  - Native OS APIs
  - Background tasks

- **Renderer Process** (`src/renderer/`)
  - Chromium browser environment
  - React application
  - UI rendering

- **Preload Scripts** (`.erb/configs/webpack.config.preload.*`)
  - Bridge between main and renderer
  - Secure IPC communication

## Development

### Start Dev Server
```bash
npm run dev
# or
npm start
```

Starts the application in development mode with:
- Hot module replacement
- DevTools enabled
- Source maps
- Automatic reload on changes

### Build for Production
```bash
npm run build
```

Creates optimized production bundles:
- Main process bundle
- Renderer process bundle
- Minified and optimized code

### Package Application
```bash
npm run package
```

Creates distributable packages for the current platform in `release/build/`.

### Other Commands

```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix linting issues
npm run rebuild       # Rebuild native dependencies
```

## Project Structure

```
apps/desktop/
├── src/
│   ├── renderer/        # React app (runs in Chromium)
│   │   ├── App.tsx      # Main React component
│   │   ├── App.css      # App styles
│   │   └── index.tsx    # Renderer entry point
│   └── main/            # Main process (Node.js)
├── .erb/                # Electron React Boilerplate configs
│   ├── configs/         # Webpack configurations
│   │   ├── webpack.config.base.ts
│   │   ├── webpack.config.main.*.ts
│   │   ├── webpack.config.renderer.*.ts
│   │   └── webpack.config.preload.*.ts
│   └── scripts/         # Build scripts
├── release/             # Build output
│   ├── app/            # Packaged app
│   └── build/          # Distributables
├── tsconfig.json        # TypeScript config for app source
└── tsconfig.node.json   # TypeScript config for build scripts
```

## Dependencies

### Workspace Packages
- `@nx-hybrid-platform/data-models` - Shared types
- `@nx-hybrid-platform/api-client` - API communication
- `@nx-hybrid-platform/ui-components` - Shared UI components

### External Dependencies
- `electron` - Desktop app framework
- `@tanstack/react-query` - Server state management
- `react` & `react-dom` - UI framework

## TypeScript Configuration

### `tsconfig.json` (App Source)
- For `src/**/*` files (renderer, main, preload)
- Extends `tsconfig.base.json` for path mappings
- Module: ESNext with bundler resolution
- **Important**: Workspace imports resolve to source files, not dist
- Used by Webpack's ts-loader

### `tsconfig.node.json` (Build Scripts)
- For `.erb/**/*` files (webpack configs, scripts)
- Module: CommonJS with Node resolution
- Used by ts-node when running build scripts
- **Environment Variable**: `TS_NODE_PROJECT=tsconfig.node.json`

## Build Configuration

### Webpack (`webpack.config.base.ts`)

**Key Features:**
- Processes workspace packages from source
- Path mappings via `tsconfig-paths-webpack-plugin`
- Handles ES modules from workspace packages
- TypeScript loader with transpileOnly mode

**Important Settings:**
```typescript
{
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    configFile: path.resolve(__dirname, '../../tsconfig.json')
  }
}
```

### Electron Builder

Configuration in `package.json`:
- App ID: `org.erb.ElectronReact`
- Supports Windows (NSIS), macOS (DMG), Linux (AppImage)
- Code signing ready
- Auto-updater enabled

## Environment Variables

Set in the environment or `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Access in code:
```typescript
const apiUrl = process.env.VITE_API_URL;
```

## Path Mappings & Source Resolution

The desktop app uses TypeScript path mappings from `tsconfig.base.json` to resolve workspace packages to their **source files**:

```typescript
import { Button } from '@nx-hybrid-platform/ui-components';
// ↓ Resolves to:
// packages/ui-components/src/index.ts (not dist/)
```

**Benefits:**
- No need to rebuild packages during development
- Changes reflect immediately
- Better debugging with source maps
- Faster development workflow

**How It Works:**
1. `tsconfig.json` extends `tsconfig.base.json`
2. Inherits path mappings: `@nx-hybrid-platform/*` → `packages/*/src/index.ts`
3. Webpack uses `tsconfig-paths-webpack-plugin` to apply these mappings
4. Both TypeScript and Webpack resolve to source files

## Build Scripts & ts-node

Build scripts use ts-node to run TypeScript webpack configs. The `TS_NODE_PROJECT` environment variable ensures ts-node uses the correct TypeScript configuration:

```json
{
  "build:main": "cross-env TS_NODE_PROJECT=tsconfig.node.json ...",
  "build:renderer": "cross-env TS_NODE_PROJECT=tsconfig.node.json ..."
}
```

This prevents ts-node from using `tsconfig.json` (which has bundler resolution) and instead uses `tsconfig.node.json` (Node.js resolution) for build scripts.

## Notes

- **Module Resolution**: App code uses bundler resolution; build scripts use Node resolution
- **Path Mappings**: Inherited from workspace root `tsconfig.base.json`
- **Source Imports**: Workspace packages are imported from source, not dist
- **Hot Reload**: Changes to workspace packages trigger reload
- **Native Dependencies**: Run `npm run rebuild` after adding native modules
- **Code Signing**: Configure certificates for production builds
- **Auto Updates**: Configured but requires update server setup

## Template Documentation

For questions about the base Electron React Boilerplate setup, refer to the [original template documentation](https://electron-react-boilerplate.js.org/docs/installation).

**Note**: Not all original template documentation applies due to monorepo customizations. When in doubt, refer to this README for monorepo-specific configurations.
