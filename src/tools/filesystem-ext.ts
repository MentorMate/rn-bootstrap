import { filesystem } from 'gluegun'
import { join } from 'path'
import { GluegunToolbox } from 'gluegun'

type CopyBoilerplateOptions = {
  boilerplatePath: string
  projectName: string
  excluded?: Array<string | RegExp>
}

export async function copyBoilerplate(
  toolbox: GluegunToolbox,
  options: CopyBoilerplateOptions
) {
  const { filesystem } = toolbox
  const { copyAsync, path, dirAsync } = filesystem

  await dirAsync(options.projectName)

  const filesAndFolders = children(options.boilerplatePath, true)
  const copyTargets = filesAndFolders.filter(
    file =>
      !options.excluded?.find(exclusion =>
        exclusion instanceof RegExp ? exclusion.test(file) : exclusion === file
      )
  )

  const copyPromises = copyTargets.map(fileOrFolder =>
    copyAsync(
      path(options.boilerplatePath, fileOrFolder),
      path(options.projectName, fileOrFolder)
    )
  )

  return Promise.all(copyPromises)
}

export function children(
  path: string,
  isRelative = false,
  matching = '*'
): string[] {
  const dirs = filesystem.cwd(path).find({
    matching,
    directories: true,
    recursive: false,
    files: true
  })
  if (isRelative) {
    return dirs
  } else {
    return dirs.map(dir => join(path, dir))
  }
}
