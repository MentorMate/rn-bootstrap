const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
{{#if hasStorybook}}
module.exports = (async () => {
    const defaultConfig = await getDefaultConfig(__dirname)
    // Add the transformer option to your custom config
    const customConfig = {
        resolver: {
            resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
        },
        transformer: {
            unstable_allowRequireContext: true,
        },
    };
    // Merge your custom config with the default config
    return mergeConfig(defaultConfig, customConfig);
})();
{{else}}
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
{{/if}}
