const { spawnSync } = require('child_process')

function getLatestVersion(packageJson) {
    let latestVersion
    const latestPublishedVersion = spawnSync('npm', [
        'show',
        packageJson.name,
        'version',
    ])

    if (latestPublishedVersion.stderr.toString()) {
        // The package has never been published
        latestVersion = packageJson.version
    } else {
        latestVersion = latestPublishedVersion.stdout.toString().trim()
    }

    return latestVersion
}

module.exports = { getLatestVersion }
