import { spawnProgress } from '../tools/spawn-progress';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

module.exports = (toolbox: RnBootstrapToolbox) => {
  toolbox.renameProject = (projectName: string, bundleIdentifier: string) => {
    const renameCmd = `npx react-native-rename@^2.9.0 ${projectName} -b ${bundleIdentifier}`;
    return spawnProgress(renameCmd);
  };
};
