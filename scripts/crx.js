const fs = require('fs-extra');
const path = require('path');
const rsa = require("node-rsa");
const ChromeExtension = require('crx');

const pkcs = "pkcs1-private-pem";

module.exports = async function(extensionName, extensionVersion, extensionPath, distDir) {
  const extensionManifestPath = path.join(distDir, 'manifest.json');
  const key = await Promise.resolve(new rsa({ b: 2048 }));
  const privateKey = key.exportKey(pkcs);
  const crx = new ChromeExtension({
    privateKey,
  });
  
  const loadedCrx = await crx.load( extensionPath );
  const crxBuffer = await loadedCrx.pack();
    
  const appId = crx.generateAppId();
      
  await fs.writeFile(path.join(distDir, `${extensionName}.${extensionVersion}.crx`), crxBuffer);

  const isManifestExist = await fs.pathExists(extensionManifestPath);
  const extensionManifest = isManifestExist ? await fs.readJSON(extensionManifestPath) : {};

  await fs.writeJSON(extensionManifestPath, {
    ...extensionManifest,
    [extensionName]: {
      version: extensionVersion,
      appId,
    }
  }, {
    spaces: 2
  });
};