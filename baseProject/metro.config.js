const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
{{#if hasStorybook}}
const path = require('path');
const { generate } = require('@storybook/react-native/scripts/generate');
{{/if}}
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
let config = {};
{{#if hasStorybook}}

const storybookSourceExt =
  process.env.STORYBOOK_ENABLED === 'true'
    ? ['storybook.tsx', 'storybook.ts', 'storybook.js', 'storybook.jsx']
    : [];

if (process.env.STORYBOOK_ENABLED) {
  defaultConfig.resolver.sourceExts = [...storybookSourceExt, ...defaultConfig.resolver.sourceExts];
}

generate({
    configPath: path.resolve(__dirname, './.storybook'),
  });

config = {
    transformer: {
      unstable_allowRequireContext: true,
    },
    resolver: {
      sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs'],
    },
  };
{{/if}}

module.exports = mergeConfig(defaultConfig, config);
