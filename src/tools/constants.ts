export const NAME_REGEX = /^[$A-Z_][0-9A-Z_$]*$/i;
// tslint:disable-next-line
export const BUNDLE_ID_REGEX = /^([a-zA-Z]([a-zA-Z0-9_])*\.)+[a-zA-Z]([a-zA-Z0-9_])*$/u;

export const IS_WINDOWS = process.platform === 'win32';

// According to react-native's CLI init command
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
];
export const RESERVED_NAMES = ['react', 'react-native', ...JAVA_KEYWORDS];

export const RCFILE_MODULE_NAME = 'rnbootstrap';

export const RCFILE_FULL_NAME = `.${RCFILE_MODULE_NAME}rc`;

export const TESTS_DIR = `__tests__`;
