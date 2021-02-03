'use strict';

module.exports = {
  extends: [
    '@futagoza/globals/node'
  ],
  env: {
    node: true
  },
  settings: {
    node: {
      tryExtensions: [
        '.vue',
        '.tsx',
        '.ts',
        '.mjs',
        '.cjs',
        '.js',
        '.json',
        '.node',
      ],
    },
  },
  overrides: [
    {
      files: ['*.mjs', '*.ts', '*.tsx', '*.vue'],
      extends: [require.resolve('./+modules.js')]
    },
  ]
};
