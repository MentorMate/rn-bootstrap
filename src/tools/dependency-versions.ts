export const navigationDeps = [
  '@react-navigation/bottom-tabs@^6.5.9',
  '@react-navigation/native@^6.1.8',
  '@react-navigation/stack@^6.3.18',
  '@react-navigation/elements@^1.3.19',
  'react-native-safe-area-context@^4.7.2',
  'react-native-screens@^3.25.0'
];

export const reduxDeps = ['@reduxjs/toolkit@^1.9.7', 'react-redux@^8.1.3'];

export const styleDeps = ['styled-components@^6.1.0'];
export const styleDevDeps = ['@types/styled-components-react-native@^5.2.3'];
export const gluestackUICoreDeps = [
  '@gluestack-ui/themed',
  '@gluestack-style/react',
  'react-native-svg@13.4.0'
];
export const gluestackUIThemedDefaultDeps = [
  '@gluestack-ui/themed',
  '@gluestack-style/react',
  'react-native-svg@13.4.0',
  '@gluestack-ui/config@latest'
];

//TODO: find a way to add npx gluestack-ui-scripts eject-theme to the postinstall script
export const gluestackUIThemedMMDeps = [
  '@gluestack-ui/themed',
  '@gluestack-style/react',
  'react-native-svg@13.4.0',
  '@gluestack-ui/config@latest'
];
