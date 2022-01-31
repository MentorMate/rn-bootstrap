import { LibrarySelectionPrompts } from '../tools/constants'
import {
  getDependenciesToInstallFromSelectedOptions,
  getTemplateParamsFromSelectedOptions,
  getOptionalFilePathsFromSelectedOptions,
  getFilePathsToExclude
} from '../tools/selected-options'
import { spawnProgress } from '../tools/spawn'
import { yarn } from '../tools/yarn'
import { MMRNCliCommand, OptionSelectionResult } from '../types/types'

const command: MMRNCliCommand = {
  name: 'start-project',
  run: async toolbox => {
    const { meta, filesystem, prompt, print } = toolbox
    const { path } = filesystem

    const projectName = toolbox.getProjectName()
    const bundleId = toolbox.getBundleId()
    const selectedOptions = await prompt.ask<OptionSelectionResult>(
      LibrarySelectionPrompts
    )

    const cliPath = path(`${meta.src}`, '..')
    const boilerplatePath = path(cliPath, 'boilerplate')

    const optionalFilesFromSelection = getOptionalFilePathsFromSelectedOptions(
      selectedOptions
    )
    const filesToExclude = getFilePathsToExclude(optionalFilesFromSelection)

    toolbox.copyBoilerplate({
      boilerplatePath,
      projectName,
      excluded: filesToExclude
    })
    process.chdir(projectName)

    const dependenciesToInstall = getDependenciesToInstallFromSelectedOptions(
      selectedOptions
    )

    await yarn.install()
    await yarn.add(dependenciesToInstall.dependencies)
    await yarn.add(dependenciesToInstall.devDependencies, { dev: true })
    await toolbox.renameProject(projectName, bundleId)
    await yarn.run('pod-install')

    print.info('Your project has been automatically renamed.')
    print.info(
      'Please note you might have to use Xcode to change the iOS bundle ID!'
    )
    print.info('Screenshot for reference: https://bit.ly/ios-bundle-id-change')

    const templateParams = getTemplateParamsFromSelectedOptions(selectedOptions)
    toolbox.compileTemplate(['App.tsx'], templateParams)
    print.success('Compiled templates.')
    print.success('Setup done.')
  }
}

module.exports = command
