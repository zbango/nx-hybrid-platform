import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@nx-hybrid-platform/api-client': path.resolve(__dirname, '../../packages/api-client/src/index.ts'),
      '@nx-hybrid-platform/data-models': path.resolve(__dirname, '../../packages/data-models/src/index.ts'),
      '@nx-hybrid-platform/ui-components': path.resolve(__dirname, '../../packages/ui-components/src/index.ts'),
    },
  },
});
