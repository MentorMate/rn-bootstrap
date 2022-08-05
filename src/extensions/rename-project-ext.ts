import { spawnProgress } from '../tools/spawn-progress';
import { RnBootstrapToolbox } from '../types/RnBootstrapToolbox';

module.exports = (toolbox: RnBootstrapToolbox) => {
  toolbox.renameProject = (projectName: string, bundleIdentifier: string) => {
    // Using a forked and slightly altered version of react-native-rename due to the package not working with react-native 0.69:
    // https://github.com/junedomingo/react-native-rename/issues/159
    const renameCmd = `npx --yes @mmbiser/react-native-rename ${projectName} -b ${bundleIdentifier}`;
    return spawnProgress(renameCmd);
  };
};
