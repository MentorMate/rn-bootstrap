import { spawnProgress } from '../tools/spawn-progress';
import { MMRNCliToolbox } from '../types/types';

module.exports = (toolbox: MMRNCliToolbox) => {
  const renameProject = (projectName: string, bundleIdentifier: string) => {
    const renameCmd = `npx react-native-rename@^2.9.0 ${projectName} -b ${bundleIdentifier}`;
    return spawnProgress(renameCmd);
  };
  toolbox.renameProject = renameProject;
};
