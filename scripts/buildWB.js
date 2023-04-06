const path = require('path');
const build = require('./build');
const crx = require('./crx');
const updateVersion = require('./updateVersion');

module.exports = async (baseDir, distDir) => {
  const workDir = path.join(baseDir, 'workbrowser-extension');
  const manifestFilePath = path.join(workDir, 'src/manifest.json');
  const webpackConfigPath = path.join(workDir, 'webpack.config.js');
  const extensionPath = path.join(workDir, 'dist');
  const version = await updateVersion(manifestFilePath);
  await build(webpackConfigPath);
  await crx('workbrowser', version, extensionPath, distDir);
}