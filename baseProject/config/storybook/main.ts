import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/stories/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: ['@gluestack-ui/themed', '@gluestack-ui/config'],
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  webpackFinal: async cfg => {
    if (cfg.resolve) {
      cfg.resolve.alias = {
        ...cfg.resolve.alias,
        'react-native$': 'react-native-web',
      };
    }
    return cfg;
  },
};

export default config;
