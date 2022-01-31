import { MMRNCliToolbox } from '../types/types'

const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i
const BUNDLE_ID_REGEX = /^([a-zA-Z]([a-zA-Z0-9_])*\.)+[a-zA-Z]([a-zA-Z0-9_])*$/u
const JAVA_KEYWORDS = [
  'abstract',
  'continue',
  'for',
  'new',
  'switch',
  'assert',
  'default',
  'goto',
  'package',
  'synchronized',
  'boolean',
  'do',
  'if',
  'private',
  'this',
  'break',
  'double',
  'implements',
  'protected',
  'throw',
  'byte',
  'else',
  'import',
  'public',
  'throws',
  'case',
  'enum',
  'instanceof',
  'return',
  'transient',
  'catch',
  'extends',
  'int',
  'short',
  'try',
  'char',
  'final',
  'interface',
  'static',
  'void',
  'class',
  'finally',
  'long',
  'strictfp',
  'volatile',
  'const',
  'float',
  'native',
  'super',
  'while'
]
const reservedNames = ['react', 'react-native', ...JAVA_KEYWORDS]

module.exports = (toolbox: MMRNCliToolbox) => {
  const { parameters, strings, print, runtime } = toolbox
  const { isBlank } = strings

  const getProjectName = () => {
    const projectName = (parameters.first || '').toString()

    if (isBlank(projectName)) {
      print.info(
        `Please use ${runtime?.brand} start-project <projectName> <bundleIdentifier>`
      )
      return toolbox.throwExitError('Project name is required')
    }

    if (
      !String(projectName).match(NAME_REGEX) ||
      reservedNames.includes(projectName.toLowerCase())
    ) {
      return toolbox.throwExitError('Invalid project name')
    }

    return projectName
  }

  const getBundleId = () => {
    const bundleId = (parameters.second || '').toString()

    if (isBlank(bundleId)) {
      print.info(
        `Please provide a bundle id ${
          runtime?.brand
        } start-project ${getProjectName()} <bundleIdentifier>`
      )
      return toolbox.throwExitError('Bundle ID is required')
    }
    const id = bundleId.split('.')

    if (id.length < 2) {
      return toolbox.throwExitError(
        'Invalid Bundle Identifier. Add something like "com.travelapp" or "com.junedomingo.travelapp'
      )
    }

    if (!BUNDLE_ID_REGEX.test(bundleId)) {
      return toolbox.throwExitError(
        'Invalid Bundle Identifier. It must have at least two segments (one or more dots). Each segment must start with a letter. All characters must be alphanumeric or an underscore [a-zA-Z0-9_]'
      )
    }

    return bundleId
  }

  toolbox.getProjectName = getProjectName
  toolbox.getBundleId = getBundleId
}
