import { MMRNCliToolbox } from '../types/types';

export const shouldCreateOrOverwriteFile = async (
  { filesystem: { exists, path }, prompt: { confirm } }: MMRNCliToolbox,
  filePathParts: string[]
) => {
  const filePath = path(...filePathParts)
  if (!exists(filePath)) {
    return true;
  }

  return await confirm(
    `${filePath} already exists. Do you want to overwrite it?`,
    false
  );
};
