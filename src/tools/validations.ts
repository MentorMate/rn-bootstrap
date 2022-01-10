import { GluegunToolbox } from 'gluegun'

const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i

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

export function validateProjectName(toolbox: GluegunToolbox): string {
  const { parameters, strings, print, runtime } = toolbox
  const { isBlank } = strings

  const projectName = (parameters.first || '').toString()

  if (isBlank(projectName)) {
    print.info(`${runtime?.brand} new <projectName>\n`)
    print.error('Project name is required')
    process.exit(1)
  }

  if (parameters.second) {
    print.info(
      `Info: You provided more than one argument for <projectName>. The first one (${projectName}) will be used and the rest are ignored.`
    )
  }

  if (
    !String(projectName).match(NAME_REGEX) ||
    reservedNames.includes(projectName.toLowerCase())
  ) {
    print.error('Invalid Project Name.')
    process.exit(1)
  }

  return projectName
}

export function validateBundleIdentifier(
  toolbox: GluegunToolbox,
  bundleID: string | undefined
): string | undefined {
  const { print } = toolbox

  if (bundleID === undefined) return undefined

  const id = bundleID.split('.')
  const validBundleID = /^([a-zA-Z]([a-zA-Z0-9_])*\.)+[a-zA-Z]([a-zA-Z0-9_])*$/u
  if (id.length < 2) {
    print.error(
      'Invalid Bundle Identifier. Add something like "com.travelapp" or "com.junedomingo.travelapp"'
    )
    process.exit(1)
  }
  if (!validBundleID.test(bundleID)) {
    print.error(
      'Invalid Bundle Identifier. It must have at least two segments (one or more dots). Each segment must start with a letter. All characters must be alphanumeric or an underscore [a-zA-Z0-9_]'
    )
    process.exit(1)
  }

  return bundleID
}
