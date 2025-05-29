const pluginMicrosoftSdl = require('@microsoft/eslint-plugin-sdl');

module.exports = [
  ...pluginMicrosoftSdl.configs.recommended,
  {
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    rules: {
      'no-eval': 'error',
      '@microsoft/sdl/no-inner-html': 'error',
    },
  },
];
