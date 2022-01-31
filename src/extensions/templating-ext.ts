import Handlebars from 'handlebars'
import { MMRNCliToolbox } from '../types/types'

Handlebars.registerHelper('includes', function(elem: any, list: any, options) {
  if (list.includes(elem)) {
    return options.fn(this)
  }
  return options.inverse(this)
})

module.exports = (toolbox: MMRNCliToolbox) => {
  const { filesystem } = toolbox

  const compileTemplate = (pathParts: string[], props: Record<string, any>) => {
    const filePath = filesystem.path(...pathParts)
    const rawFileContent = filesystem.read(filePath)
    if (!rawFileContent) {
      return toolbox.throwExitError(
        `Couldn't compile template. File not found at ${filePath}`
      )
    }
    filesystem.write(filePath, Handlebars.compile(rawFileContent)(props))
  }

  toolbox.compileTemplate = compileTemplate
}
