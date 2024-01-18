import 'react-native-gesture-handler/jestSetup';
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
{{#if hasStorybook}}
jest.mock('@storybook/addon-actions/dist/modern/preset/addArgs', () => jest.fn());
{{/if}}
jest.useFakeTimers();
