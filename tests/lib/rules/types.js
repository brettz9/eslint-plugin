/**
 * @typedef {(string|(import('eslint').RuleTester.ValidTestCase & {
 *   languageOptions?: {
 *     globals?: {},
 *     sourceType?: "script"|"module",
 *     ecmaVersion?: number
 *   }
 * }))[]} FlatValidTestCases
 */

/**
 * @typedef {(import('eslint').RuleTester.InvalidTestCase & {
 *   languageOptions?: {
 *     globals?: {},
 *     sourceType?: "script"|"module",
 *     ecmaVersion?: number
 *   }
 * })[]} FlatInvalidTestCases
 */
