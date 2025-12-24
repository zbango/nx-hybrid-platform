const fs = require('fs');
const path = require('path');
const { rimrafSync } = require('rimraf');

// Calculate paths manually instead of importing webpack.paths (which is .ts)
const rootPath = path.join(__dirname, '../..');
const distPath = path.join(rootPath, 'release/app/dist');
const distMainPath = path.join(distPath, 'main');
const distRendererPath = path.join(distPath, 'renderer');

function deleteSourceMaps() {
  if (fs.existsSync(distMainPath))
    rimrafSync(path.join(distMainPath, '*.js.map'), {
      glob: true,
    });
  if (fs.existsSync(distRendererPath))
    rimrafSync(path.join(distRendererPath, '*.js.map'), {
      glob: true,
    });
}

module.exports = deleteSourceMaps;
