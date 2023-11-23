import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const { filesystem } = toolbox;

  const replaceFile = (sourceFile: string, destinationFile: string) => {
    const sourceDirectory = filesystem.path(
      process.cwd(),
      'config',
      'storybook',
      sourceFile
    );
    const destinationDirectory = filesystem.path(
      process.cwd(),
      destinationFile
    );
    filesystem.copy(sourceDirectory, destinationDirectory, {
      overwrite: true
    });
  };

  toolbox.replaceFile = replaceFile;
};
