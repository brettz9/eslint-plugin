'use strict';

module.exports = {
  root: true,
  env: {
    es6: true
  },
  overrides: [
    {
      files: 'tests/**',
      env: {mocha: true}
    }
  ],
  globals: {
    __dirname: 'readonly',
    module: 'readonly',
    require: 'readonly'
  },
  extends: [
    'eslint:recommended',
    './lib/configs/es6'
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed']
  }
};
