const path = require('path');
const build = require('./build');
const buildTasks = require('./buildTasks');
const crx = require('./crx');
const updateVersion = require('./updateVersion');

module.exports = async (baseDir, distDir) => {
  const workDir = path.join(baseDir, 'virtualbrowser-extension');
  const manifestFilePath = path.join(workDir, 'src/manifest.json');
  const webpackConfigPath = path.join(workDir, 'webpack.config.js');
  const extensionPath = path.join(workDir, 'dist');
  const tasksDir = path.join(extensionPath, 'tasks');
  const version = await updateVersion(manifestFilePath);
  await build(webpackConfigPath);
  await buildTasks(baseDir, tasksDir);
  await crx('virtualbrowser', version, extensionPath, distDir);
}