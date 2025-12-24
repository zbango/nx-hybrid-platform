import { execSync } from 'child_process';
import fs from 'fs';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Calculate paths manually instead of importing webpack.paths (which is .ts)
const rootPath = join(__dirname, '../..');
const appPath = join(rootPath, 'release/app');
const appNodeModulesPath = join(appPath, 'node_modules');
const packageJsonPath = join(__dirname, '../../release/app/package.json');

let dependencies = {};
if (fs.existsSync(packageJsonPath)) {
  dependencies = JSON.parse(readFileSync(packageJsonPath, 'utf-8')).dependencies || {};
}

if (
  Object.keys(dependencies).length > 0 &&
  fs.existsSync(appNodeModulesPath)
) {
  const electronRebuildCmd =
    '../../node_modules/.bin/electron-rebuild --force --types prod,dev,optional --module-dir .';
  const cmd =
    process.platform === 'win32'
      ? electronRebuildCmd.replace(/\//g, '\\')
      : electronRebuildCmd;
  execSync(cmd, {
    cwd: appPath,
    stdio: 'inherit',
  });
}
