module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/config/jest/jestSetup.ts'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jestSetupAfterEnv.ts'],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/config/jest/transformAssets.js',
  },
  {{#if hasAnyGluestackUIOption}}
    transformIgnorePatterns: [
      '<rootDir>/node_modules/(?!((jest-)?react-native|@react-native(-community)?)|@expo?/.*|@gluestack-ui|@gluestack-ui/.*|@legendapp/motion)',
    ],
  {{/if}}
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};
