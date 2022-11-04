const { spawnSync } = require('child_process')

const gitAdd = () => spawnSync('git', ['add', 'package.json'])
const gitCommit = (message) => spawnSync('git', ['commit', `-m '${message}'`])

module.exports = { gitAdd, gitCommit }
