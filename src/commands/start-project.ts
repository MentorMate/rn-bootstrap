import { GluegunCommand } from 'gluegun'
import { copyBoilerplate } from '../tools/filesystem-ext'

const command: GluegunCommand = {
  name: 'start-project',
  run: async toolbox => {
    const { meta, filesystem, parameters } = toolbox
    const { path } = filesystem
    const cliPath = path(`${meta.src}`, '..')
    const boilerplatePath = path(cliPath, 'boilerplate')

    await copyBoilerplate(toolbox, {
      boilerplatePath,
      projectName: parameters.first || ''
    })
  }
}

module.exports = command
