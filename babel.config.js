module.exports = function (api) {
  api.cache(true);
  return {
    // babel-preset-expo already injects react-native-worklets/plugin when
    // reanimated is installed; listing it again applies the transform twice.
    presets: ['babel-preset-expo'],
  };
};
