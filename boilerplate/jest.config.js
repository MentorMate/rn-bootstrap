module.exports = {
  preset: 'jest-expo',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/config/jest/jestSetup.ts'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'babel-jest',
    '\\.(png|jpg|jpeg||gif|svg)$': '<rootDir>/config/jest/transformAssets.js'
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname', 'jest-watch-select-projects'],
  transformIgnorePatterns: ['/!node_modules\\/@b9/react-native-autocomplete-search/'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
};
