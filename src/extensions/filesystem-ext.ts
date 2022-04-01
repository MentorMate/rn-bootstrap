import { join } from 'path';
import { MMRNCliToolbox } from '../types/types';
import { CopyBoilerplateOptions } from '../types/CopyBoilerplateOptions';

module.exports = (toolbox: MMRNCliToolbox) => {
  const {
    filesystem: { copy, cwd, path, dir },
    meta
  } = toolbox;
  const CLI_PATH = path(`${meta.src}`, '..');
  const baseProjectPath = path(CLI_PATH, 'baseProject');

  const copyBoilerplate = (options: CopyBoilerplateOptions) => {
    dir(options.projectName);

    const filesAndFolders = getFsChildren(baseProjectPath, true);
    const copyTargets = filesAndFolders.filter(
      file =>
        !options.excluded?.find(exclusion =>
          exclusion instanceof RegExp
            ? exclusion.test(file)
            : exclusion === file
        )
    );

    for (const fileOrFolder of copyTargets) {
      copy(
        path(baseProjectPath, fileOrFolder),
        path(options.projectName, fileOrFolder)
      );
    }
  };

  const getFsChildren = (
    path: string,
    isRelative: boolean = false,
    matching: string | string[] = '*'
  ): string[] => {
    const dirs = cwd(path).find({
      matching,
      directories: false,
      recursive: true,
      files: true
    });
    if (isRelative) {
      return dirs;
    } else {
      return dirs.map(dir => join(path, dir));
    }
  };

  const getSourceFilesInCurrentDir = () => {
    return getFsChildren(path('.'), false, [
      '*.ts',
      '*.tsx',
      '*.js',
      '*.jsx',
      '*.json'
    ]);
  };

  toolbox.copyBoilerplate = copyBoilerplate;
  toolbox.getFsChildren = getFsChildren;
  toolbox.getSourceFilesInCurrentDir = getSourceFilesInCurrentDir;
  toolbox.CLI_PATH = CLI_PATH;
};
