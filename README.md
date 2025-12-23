# NX Hybrid Platform

A minimal hybrid platform demonstrating integration between Electron desktop app, React web app, and AWS Lambda serverless API, all managed within an Nx monorepo.

## Architecture

This project implements the simplified architecture from `ARCHITECTURE.md`:

- **3 Shared Packages**:
  - `@nx-hybrid-platform/data-models` - TypeScript interfaces for API requests/responses
  - `@nx-hybrid-platform/api-client` - HTTP client for Lambda API
  - `@nx-hybrid-platform/ui-components` - Shared React Button component with React Query integration

- **3 Applications**:
  - `apps/web` - React web app (Vite + React Query)
  - `apps/desktop` - Electron desktop app (React + React Query)
  - `apps/api` - AWS Lambda function (Serverless Framework v4)

## Key Features

- **Shared Button Component**: Both web and desktop apps use the same UI component
- **React Query Integration**: Consistent data fetching pattern across applications
- **Type Safety**: Shared TypeScript interfaces ensure type consistency
- **Monorepo Management**: Nx handles build orchestration and dependency management
- **Modern Tooling**: Latest versions of React 19, Vite 6, Electron 34, TypeScript 5.7

## Prerequisites

- **Node.js**: 24.12.0 or higher (see `.nvmrc`)
- **npm**: 10.0.0 or higher
- **AWS Account**: Required for deploying the Lambda API (optional for local development)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies for the root workspace and all packages/apps.

### 2. Build All Packages

```bash
npm run build:all
```

This builds all packages in the correct dependency order:
1. `data-models` (no dependencies)
2. `api-client` and `ui-components` (depend on data-models)
3. Applications (depend on all packages)

### 3. Run Applications

#### Web Application

```bash
npm run dev:web
```

- Opens at [http://localhost:5173](http://localhost:5173)
- Hot module replacement enabled

#### Desktop Application

```bash
npm run dev:desktop
```

- Launches Electron window
- DevTools enabled in development mode

## Project Structure

```
nx-hybrid-platform/
├── packages/
│   ├── data-models/          # TypeScript interfaces
│   ├── api-client/            # HTTP client
│   └── ui-components/         # React components
├── apps/
│   ├── web/                   # React Vite web app
│   ├── desktop/               # Electron desktop app
│   └── api/                   # AWS Lambda API
├── package.json               # Root workspace configuration
├── nx.json                    # Nx build orchestration
└── tsconfig.base.json         # Shared TypeScript config
```

## Development Workflow

### Build Individual Package

```bash
npx nx build <package-name>
```

Examples:
- `npx nx build data-models`
- `npx nx build ui-components`
- `npx nx build web`

### Clean Build Cache

```bash
npm run clean
```

This resets the Nx cache.

### Check Dependency Graph

```bash
npx nx graph
```

Opens an interactive visualization of package dependencies.

## AWS Lambda API Deployment

### Prerequisites

1. Configure AWS credentials:
   ```bash
   aws configure
   ```

2. Copy environment template:
   ```bash
   cd apps/api
   cp .env.example .env
   # Edit .env if needed (region, stage, etc.)
   ```

### Deploy to AWS

```bash
npm run deploy:api
```

This will:
1. Build the Lambda function with Serverless Framework v4
2. Create API Gateway HTTP API endpoint
3. Deploy to AWS
4. Output the API Gateway URL

### Update Application Configuration

After deployment, update the `.env` files for web and desktop apps:

**apps/web/.env**:
```
VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com
```

**apps/desktop/.env**:
```
VITE_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com
```

**Note**: Do NOT include `/api/echo` in the URL - the API client adds this automatically.

### View Lambda Logs

```bash
cd apps/api
npm run logs
```

### Remove Lambda Deployment

```bash
cd apps/api
npm run remove
```

## Building for Production

### Web Application

```bash
cd apps/web
npm run build
```

Output: `apps/web/dist/`

Deploy the `dist/` folder to any static hosting service (Vercel, Netlify, S3, etc.).

### Desktop Application

```bash
cd apps/desktop
npm run package
```

Output: `apps/desktop/out/`

This creates platform-specific installers using electron-builder:
- Windows: `.exe` (NSIS installer)
- macOS: `.dmg`
- Linux: `.AppImage`

## Technology Stack

### Core Technologies

- **Monorepo**: Nx 20.x + npm workspaces
- **Language**: TypeScript 5.7
- **UI Framework**: React 19
- **Build Tool**: Vite 6 (web), Vite 5 (desktop), electron-vite
- **Desktop**: Electron 34
- **Styling**: Tailwind CSS 3.4
- **Data Fetching**: @tanstack/react-query 5.62

### Backend

- **Serverless Framework**: v4.6
- **Runtime**: Node.js 22.x
- **Platform**: AWS Lambda + API Gateway HTTP API

## How It Works

### Button Component Flow

1. **User clicks Button** in web or desktop app
2. **React Query mutation** triggers API call via `apiClient`
3. **API Client** sends POST request to Lambda endpoint
4. **Lambda function** receives request, logs to CloudWatch, echoes back response
5. **React Query** updates UI with loading/success/error states

### Build Dependencies

Nx ensures correct build order:

```
data-models (Level 0)
    ↓
api-client, ui-components (Level 1)
    ↓
web, desktop, api (Level 2)
```

Running `npm run build:all` respects these dependencies and caches results.

## Troubleshooting

### Build Errors

**Q**: TypeScript can't find module declarations

**A**: Ensure packages are built first:
```bash
npx nx build data-models
npx nx build api-client
npx nx build ui-components
```

**Q**: Nx cache issues

**A**: Reset the cache:
```bash
npm run clean
npm run build:all
```

### Runtime Errors

**Q**: API calls failing in web/desktop apps

**A**:
1. Check if API is deployed and URL is correct in `.env` files
2. Verify CORS is enabled in Lambda response headers
3. Check browser/Electron DevTools console for errors

**Q**: Desktop app won't launch

**A**:
1. Rebuild desktop app: `npx nx build desktop`
2. Try clearing node_modules: `rm -rf apps/desktop/node_modules && npm install`
3. Check for Electron compatibility issues

### Deployment Issues

**Q**: Serverless deploy fails

**A**:
1. Verify AWS credentials: `aws sts get-caller-identity`
2. Check AWS region in `apps/api/.env`
3. Ensure sufficient AWS permissions (Lambda, API Gateway, CloudFormation)

## Next Steps

This is a minimal proof-of-concept. Future enhancements:

- [ ] Add authentication (AWS Cognito)
- [ ] Add data persistence (DynamoDB, SQLite)
- [ ] Add sync engine for offline-first desktop app
- [ ] Add more UI components
- [ ] Add comprehensive testing (Vitest, React Testing Library)
- [ ] Add CI/CD pipeline
- [ ] Add error monitoring (Sentry, CloudWatch)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Build and test: `npm run build:all`
5. Submit a pull request

## License

MIT
