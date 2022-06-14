import { FeaturePiece } from '../types/CodeGenerator';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

export const shouldCreateOrOverwrite = async (
  { filesystem: { exists, path }, prompt: { confirm } }: RnBootstrapToolbox,
  filePathParts: string[]
) => {
  const filePath = path(...filePathParts);
  const existingFileOrDirType = exists(filePath);
  if (!existingFileOrDirType) {
    return true;
  }

  return await confirm(
    `A ${existingFileOrDirType} at ${filePath} already exists. Do you want to proceed and overwrite it?`,
    false
  );
};

export const shouldProceedInDir = async (
  { prompt: { confirm }, filesystem: { separator, cwd } }: RnBootstrapToolbox,
  generatorName: FeaturePiece
) => {
  const currentDir = cwd();
  const expectedParent = `${separator}${generatorName}`;
  if (!currentDir.includes(expectedParent)) {
    return await confirm(
      `${currentDir} does not have a parent of ${expectedParent}. Do you want to proceed in the current directory?`,
      true
    );
  }
  return Promise.resolve(true);
};

export const getValidFeaturePieceParentDirs = ({
  filesystem: { separator }
}: RnBootstrapToolbox) =>
  Object.values(FeaturePiece).map(
    generatorName => `${separator}${generatorName}`
  );

export const isCurrentDirValidFeaturePieceDir = (
  toolbox: RnBootstrapToolbox
) => {
  const currentDir = toolbox.filesystem.cwd();
  const validParents = getValidFeaturePieceParentDirs(toolbox);
  return validParents.some(parentDir => currentDir.includes(parentDir));
};
