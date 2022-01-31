import { filesystem } from 'gluegun'
import { join } from 'path'
import { MMRNCliToolbox } from '../types/types'
import { CopyBoilerplateOptions } from '../types/CopyBoilerplateOptions'

module.exports = (toolbox: MMRNCliToolbox) => {
  const { filesystem } = toolbox

  const copyBoilerplate = (options: CopyBoilerplateOptions) => {
    const { copy, path, dir } = filesystem

    dir(options.projectName)

    const filesAndFolders = children(options.boilerplatePath, true)
    const copyTargets = filesAndFolders.filter(
      file =>
        !options.excluded?.find(exclusion =>
          exclusion instanceof RegExp
            ? exclusion.test(file)
            : exclusion === file
        )
    )

    for (const fileOrFolder of copyTargets) {
      copy(
        path(options.boilerplatePath, fileOrFolder),
        path(options.projectName, fileOrFolder)
      )
    }
  }

  toolbox.copyBoilerplate = copyBoilerplate
}

function children(path: string, isRelative = false, matching = '*'): string[] {
  const dirs = filesystem.cwd(path).find({
    matching,
    directories: false,
    recursive: true,
    files: true
  })
  if (isRelative) {
    return dirs
  } else {
    return dirs.map(dir => join(path, dir))
  }
}
