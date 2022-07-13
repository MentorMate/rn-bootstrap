import { join } from 'path';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';
import { CopyRecursivelyOptions } from '../types/FileSystem';
import {
  FeaturePiece,
  GENERATOR_TEMPLATES_DIR,
  GeneratorConfig,
  Template
} from '../types/CodeGenerator';
import { TESTS_DIR } from '../tools/constants';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const {
    filesystem: { copy, cwd, path },
    meta
  } = toolbox;
  const CLI_PATH = path(`${meta.src}`, '..');
  const BASE_PROJECT_PATH = path(CLI_PATH, 'baseProject');

  const copyRecursively = ({ from, to, excluded }: CopyRecursivelyOptions) => {
    const copyTargets = getFsChildrenRecursively(from, true).filter(
      file =>
        !excluded?.find(exclusion =>
          exclusion instanceof RegExp
            ? exclusion.test(file)
            : exclusion === file
        )
    );
    console.log(copyTargets);

    for (const fileOrFolder of copyTargets) {
      copy(path(from, fileOrFolder), path(to, fileOrFolder));
    }
  };

  const getFsChildrenRecursively = (
    path: string,
    isRelative: boolean = false,
    matching: string | string[] = '*'
  ): string[] => {
    console.log(cwd(path));
    const dirs = cwd(path).find({
      matching,
      directories: false,
      recursive: true,
      files: true
    });
    console.log(dirs);

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

  const getGeneratorBaseDirPathParts = (featurePiece: FeaturePiece) => {
    return [toolbox.CLI_PATH, GENERATOR_TEMPLATES_DIR, featurePiece];
  };

  const getGeneratorTemplatePathParts = (
    Config: GeneratorConfig,
    template: Template
  ) => {
    const templatesDirPath = getGeneratorBaseDirPathParts(Config.Piece);
    return [...templatesDirPath, Config[template]];
  };

  const getFileNamePathPartsForCurrentDir = (
    fileName: string,
    ext: string,
    template: Template
  ) => {
    return template === Template.Tests
      ? [process.cwd(), TESTS_DIR, `${fileName}.test.${ext}`]
      : [process.cwd(), `${fileName}.${ext}`];
  };

  const getCurrentDirLastPart = () => {
    const {
      filesystem: { cwd, separator }
    } = toolbox;
    const currentDirParts = cwd().split(separator);
    return currentDirParts[currentDirParts.length - 1];
  };

  const getFeaturePieceFromCurrentDir = (): FeaturePiece => {
    const lastDirPart = getCurrentDirLastPart();
    return FeaturePiece[lastDirPart];
  };

  const removeFileExtension = (filename: string) => {
    return filename.substring(0, filename.lastIndexOf('.')) || filename;
  };

  toolbox.copyRecursively = copyRecursively;
  toolbox.getFsChildrenRecursively = getFsChildrenRecursively;
  toolbox.getSourceFilesRecursivelyFromCurrentDir = getSourceFilesRecursivelyFromCurrentDir;
  toolbox.getGeneratorBaseDirPathParts = getGeneratorBaseDirPathParts;
  toolbox.getGeneratorTemplatePathParts = getGeneratorTemplatePathParts;
  toolbox.getFileNamePathPartsForCurrentDir = getFileNamePathPartsForCurrentDir;
  toolbox.getFeaturePieceFromCurrentDir = getFeaturePieceFromCurrentDir;
  toolbox.removeFileExtension = removeFileExtension;
  toolbox.CLI_PATH = CLI_PATH;
  toolbox.BASE_PROJECT_PATH = BASE_PROJECT_PATH;
};
