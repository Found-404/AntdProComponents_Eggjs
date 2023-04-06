#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const buildVB = require('./buildVB');
const buildWB = require('./buildWB');

const baseDir = path.join(__dirname, '..', 'packages');
const distDir = path.join(baseDir, 'rpa-server/app/public');

fs.ensureDirSync(distDir);
fs.emptyDirSync(distDir);

buildWB(baseDir, distDir)
  .then(() => buildVB(baseDir, distDir))
  .catch(console.error);

