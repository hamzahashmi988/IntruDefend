module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.png', '.jpg', '.jpeg'],
          alias: {
            '@': './',
            '@components': './components',
            '@assets': './assets',
            '@services': './services',
            '@store': './store',
            '@utils': './utils',
            '@form': './form',
          },
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};
