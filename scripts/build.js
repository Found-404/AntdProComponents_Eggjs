const webpack = require('webpack');
const {
  pathToFileURL,
} = require('url');

module.exports = async (webpackConfigPath) => {
  const {
    default: webpackConfig,
  } = await import(pathToFileURL(webpackConfigPath));
  await new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
  
      if (stats.hasErrors()) {
        reject(stats.toString());
        return;
      }
  
      resolve();
    });
  });
}
