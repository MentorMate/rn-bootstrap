#!/usr/bin/env node
const { incrementVersion } = require('./incrementVersion');

function incPatchVersion(version) {
  const [major, minor, patch] = version.split('.');
  if (isNaN(Number(patch)))
    throw Error(`Version is not made up of numbers! '${version}'`);
  const newPatch = String(Number(patch) + 1);

  return [major, minor, newPatch].join('.');
}

incrementVersion(incPatchVersion);
