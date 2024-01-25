import { spawnProgress } from '../tools/spawn-progress';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

module.exports = (toolbox: RnBootstrapToolbox) => {
  toolbox.renameProject = (projectName: string, bundleIdentifier: string) => {
    const renameCmd = `npx react-native-rename@3.2.14 ${projectName} -b ${bundleIdentifier} --skipGitStatusCheck`;
    return spawnProgress(renameCmd);
  };
};
