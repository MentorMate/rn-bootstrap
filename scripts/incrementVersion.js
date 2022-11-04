const fs = require('fs')
const { getLatestVersion } = require('./getLatestVersion')
const { saveVersion } = require('./saveVersion')

function incrementVersion(incrementer) {
    // read and parse package.json
    const rawPackage = fs.readFileSync('./package.json')
    const parsedPackage = JSON.parse(rawPackage)

    // get latest published version
    const latestVersion = getLatestVersion(parsedPackage)

    // update the version
    const nextVersion = incrementer(latestVersion)
    parsedPackage.version = nextVersion

    // save and commit the package.json
    saveVersion(parsedPackage)
}

module.exports = { incrementVersion }
