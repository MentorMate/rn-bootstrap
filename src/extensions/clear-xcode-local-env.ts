import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

module.exports = (toolbox: RnBootstrapToolbox) => {
  const { filesystem } = toolbox;

  const clearXcodeLocalEnv = () => {
    const sourceDirectory = filesystem.path(
      process.cwd(),
      'ios',
      '.xcode.env.local',
    );
    filesystem.write(sourceDirectory, '');
  };

  toolbox.clearXcodeLocalEnv = clearXcodeLocalEnv;
};
