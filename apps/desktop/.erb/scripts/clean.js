import { rimrafSync } from 'rimraf';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Calculate paths manually instead of importing webpack.paths (which is .ts)
const rootPath = join(__dirname, '../..');
const distPath = join(rootPath, 'release/app/dist');
const buildPath = join(rootPath, 'release/build');
const dllPath = join(__dirname, '../dll');

const foldersToRemove = [
  distPath,
  buildPath,
  dllPath,
];

foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) rimrafSync(folder);
});
