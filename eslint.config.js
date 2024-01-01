import globals from 'globals';
import js from '@eslint/js';
import index from './index.js';

export default [js.configs.recommended, ...index.configs.es2015, {
  files: ['tests/**'],
  languageOptions: {
    globals: {
      expect: true,
      ...globals.mocha
    }
  },
}, {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.es2015,
    }
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed']
  }
}];
