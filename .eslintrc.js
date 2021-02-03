'use strict';

module.exports = {
  root: true,
  env: {
    es6: true
  },
  extends: [
    'eslint:recommended',
    './lib/configs/+mocha',
    './lib/configs/+node',
    './lib/configs/es2015'
  ],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed']
  }
};
