const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const customConfig = {
  // Add any custom Metro configuration options here
};

const config = mergeConfig(defaultConfig, customConfig);

// Wrap the configuration with Reanimated's Metro config
module.exports = wrapWithReanimatedMetroConfig(config);
