const fs = require('fs-extra');
const semver = require('semver');

const maxVersion = 99;

module.exports = async (manifestFilePath) => {
  const manifest = await fs.readJSON(manifestFilePath);

  const {
    version
  } = manifest;

  if (version) {
    const {
      minor,
      patch,
    } = semver.parse(version);

    if (patch < maxVersion) {
      manifest.version = semver.inc(version, 'patch');
    } else if (minor < maxVersion) {
      manifest.version = semver.inc(version, 'minor');
    } else {
      manifest.version = semver.inc(version, 'major');
    }
  } else {
    manifest.version = semver.minVersion('').version;
  }

  await fs.writeJSON(manifestFilePath, manifest, { spaces: 2 });

  return manifest.version;
}