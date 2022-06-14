import { join } from 'path';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { CopyRecursivelyOptions } from '../types/FileSystem';
import {
  AvailableGeneratorTemplates,
  FeaturePiece,
  FeaturePieceType,
  GENERATOR_TEMPLATES_DIR
} from '../types/CodeGenerator';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const {
    filesystem: { copy, cwd, path, dir },
    meta
  } = toolbox;
  const CLI_PATH = path(`${meta.src}`, '..');
  const BASE_PROJECT_PATH = path(CLI_PATH, 'baseProject');

  const copyRecursively = ({ from, to, excluded }: CopyRecursivelyOptions) => {
    // TODO: dir(from) does not make sense. Look into changing this to dir(to).
    dir(from);

    const copyTargets = getFsChildrenRecursively(from, true).filter(
      file =>
        !excluded?.find(exclusion =>
          exclusion instanceof RegExp
            ? exclusion.test(file)
            : exclusion === file
        )
    );

    for (const fileOrFolder of copyTargets) {
      copy(path(from, fileOrFolder), path(to, fileOrFolder));
    }
  };

  const getFsChildrenRecursively = (
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

  const getSourceFilesRecursivelyFromCurrentDir = () => {
    return getFsChildrenRecursively(path('.'), false, [
      '*.ts',
      '*.tsx',
      '*.js',
      '*.jsx',
      '*.json'
    ]);
  };

  const getGeneratorBaseDirPathParts = (generatorType: FeaturePieceType) => {
    return [toolbox.CLI_PATH, GENERATOR_TEMPLATES_DIR, generatorType];
  };

  const getGeneratorTemplatePathParts = (
    generatorType: FeaturePiece,
    templateFileName: AvailableGeneratorTemplates
  ) => {
    const templatesDirPath = getGeneratorBaseDirPathParts(generatorType);
    return [...templatesDirPath, templateFileName];
  };

  const getFileNamePathPartsForCurrentDir = (fileName: string, ext: string) => {
    return [process.cwd(), `${fileName}.${ext}`];
  };

  toolbox.copyRecursively = copyRecursively;
  toolbox.getFsChildrenRecursively = getFsChildrenRecursively;
  toolbox.getSourceFilesRecursivelyFromCurrentDir = getSourceFilesRecursivelyFromCurrentDir;
  toolbox.getGeneratorBaseDirPathParts = getGeneratorBaseDirPathParts;
  toolbox.getGeneratorTemplatePathParts = getGeneratorTemplatePathParts;
  toolbox.getFileNamePathPartsForCurrentDir = getFileNamePathPartsForCurrentDir;
  toolbox.CLI_PATH = CLI_PATH;
  toolbox.BASE_PROJECT_PATH = BASE_PROJECT_PATH;
};
