const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
{{#if hasStorybook}}
const path = require('path');
const { generate } = require('@storybook/react-native/scripts/generate');
{{/if}}
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
let config = {};
{{#if hasStorybook}}

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
