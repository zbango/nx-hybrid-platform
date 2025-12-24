/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import path from 'path';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        // Handle ES module .js files from workspace packages
        test: /\.js$/,
        include: /node_modules[/\\]@nx-hybrid-platform/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false, // Allow extensionless imports
        },
      },
      {
        test: /\.[jt]sx?$/,
        exclude: (modulePath) => {
          // Exclude node_modules but allow workspace packages
          if (/node_modules/.test(modulePath)) {
            // Allow workspace packages to be processed
            if (
              /node_modules[/\\]@nx-hybrid-platform/.test(modulePath) ||
              /packages[/\\]/.test(modulePath)
            ) {
              return false;
            }
            return true;
          }
          return false;
        },
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            configFile: path.resolve(__dirname, '../../tsconfig.json'),
            compilerOptions: {
              module: 'esnext',
              moduleResolution: 'bundler',
            },
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: { type: 'commonjs2' },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // Explicit aliases for workspace packages to ensure they resolve to source files
    alias: {
      '@nx-hybrid-platform/api-client': path.resolve(__dirname, '../../../../packages/api-client/src/index.ts'),
      '@nx-hybrid-platform/data-models': path.resolve(__dirname, '../../../../packages/data-models/src/index.ts'),
      '@nx-hybrid-platform/ui-components': path.resolve(__dirname, '../../../../packages/ui-components/src/index.ts'),
    },
    plugins: [
      new TsconfigPathsPlugins({
        configFile: path.resolve(__dirname, '../../tsconfig.json'),
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
    ],
    // Support ES modules from workspace packages
    conditionNames: ['source', 'import', 'require', 'default'],
    // Allow extensionless imports for workspace packages
    extensionAlias: {
      '.js': ['.js', '.ts', '.tsx'],
    },
    // Allow extensionless imports globally
    fullySpecified: false,
  },

  plugins: [new webpack.EnvironmentPlugin({ NODE_ENV: 'production' })],
};

export default configuration;
