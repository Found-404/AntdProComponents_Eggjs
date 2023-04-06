const fs = require('fs-extra');
const path = require('path');
const build = require('./build');

module.exports = async (baseDir, distDir) => {
  const workDir = path.join(baseDir, 'rpa-tasks');
  const webpackConfigPath = path.join(workDir, 'webpack.config.js');
  const sourceDir = path.join(workDir, 'dist');
  await fs.emptyDir(distDir);
  await build(webpackConfigPath);
  await fs.copy(sourceDir, distDir);
}