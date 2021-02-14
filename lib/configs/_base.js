'use strict'

module.exports = {
  root: true,
  plugins: ['@brettz9'],
  rules: {
    '@brettz9/arrow-parens': 'off',
    '@brettz9/block-scoped-var': 'off', // Now in ESLint core
    '@brettz9/no-instanceof-array': 'error',
    '@brettz9/no-instanceof-wrapper': 'error',
    '@brettz9/no-literal-call': 'error',
    '@brettz9/no-this-in-static': 'off',
    '@brettz9/no-use-ignored-vars': ['error', '^_(?:[^_].*)?$'],
    '@brettz9/no-useless-rest-spread': 'off',
    '@brettz9/prefer-for-of': 'off',
  },
}
