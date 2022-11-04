const fs = require('fs')
const { gitAdd, gitCommit } = require('./simpleGit')

function saveVersion(packageJson) {
    const { version } = packageJson

    fs.writeFile(
        './package.json',
        Buffer.from(JSON.stringify(packageJson, null, 2)),
        { encoding: 'utf8' },
        (err) => {
            if (err) {
                return console.log('Error!', err)
            }

            gitAdd()
            gitCommit(`chore: increment version: ${version}`)

            return console.log(
                `Successfully updated and committed package.json to version ${version}`,
            )
        },
    )
}

module.exports = { saveVersion }
