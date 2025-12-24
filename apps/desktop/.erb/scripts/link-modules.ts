import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Calculate paths manually instead of importing webpack.paths (which is .ts)
const rootPath = join(__dirname, '../..');
const srcPath = join(rootPath, 'src');
const erbPath = join(__dirname, '..');
const srcNodeModulesPath = join(srcPath, 'node_modules');
const appNodeModulesPath = join(rootPath, 'release/app/node_modules');
const erbNodeModulesPath = join(erbPath, 'node_modules');

if (fs.existsSync(appNodeModulesPath)) {
  if (!fs.existsSync(srcNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
  }
  if (!fs.existsSync(erbNodeModulesPath)) {
    fs.symlinkSync(appNodeModulesPath, erbNodeModulesPath, 'junction');
  }
}
