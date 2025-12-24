// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
import { TextEncoder, TextDecoder } from 'node:util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Calculate paths manually instead of importing webpack.paths (which is .ts)
const rootPath = join(__dirname, '../..');
const distPath = join(rootPath, 'release/app/dist');
const distMainPath = join(distPath, 'main');
const distRendererPath = join(distPath, 'renderer');

const mainPath = path.join(distMainPath, 'main.js');
const rendererPath = path.join(distRendererPath, 'renderer.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "npm run build:main"',
    ),
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "npm run build:renderer"',
    ),
  );
}

// JSDOM does not implement TextEncoder and TextDecoder
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}
