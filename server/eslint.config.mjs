// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.browser,
    },
    rules: {
      indent: ['error', 2],
      'keyword-spacing': 'error',
      'linebreak-style': 'error',
      quotes: ['error', 'single'],
      semi: 'error',
      'space-before-blocks': 'error',
      //"space-before-function-paren": "error",
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
