import { GluegunCommand } from 'gluegun'
import { copyBoilerplate } from '../tools/filesystem-ext'

const command: GluegunCommand = {
  name: 'start-project',
  run: async toolbox => {
    const { meta, filesystem } = toolbox
    const { path } = filesystem
    const { validateProjectName } = require('../tools/validations')

    const projectName = validateProjectName(toolbox)

    const cliPath = path(`${meta.src}`, '..')
    const boilerplatePath = path(cliPath, 'boilerplate')

    await copyBoilerplate(toolbox, {
      boilerplatePath,
      projectName
    })
  }
}

module.exports = command
