import { spawnProgress } from '../tools/spawn'
import { MMRNCliToolbox } from '../types/types'

module.exports = (toolbox: MMRNCliToolbox) => {
  const renameProject = (projectName: string, bundleIdentifier: string) => {
    const renameCmd = `npx react-native-rename ${projectName} -b ${bundleIdentifier}`
    return spawnProgress(renameCmd)
  }
  toolbox.renameProject = renameProject
}
