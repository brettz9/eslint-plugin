/**
 * @fileoverview Tests for no-literal-call rule.
 * @author Toru Nagashima
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {RuleTester} from 'eslint'
import globals from 'globals';
import rule from '../../../lib/rules/no-literal-call.js'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester()

ruleTester.run('no-literal-call', rule, {
  /**
   * @type {import('./types.js').FlatValidTestCases}
   */
  valid: [
    'foo();',
    'obj.foo();',
    '(function() {})();',
    { code: '(() => 0)();', languageOptions: { globals: globals.es2015 }, },
    'new foo();',
    'new obj.foo();',
    'new (function() {})();',
    { code: 'new (class {})();', languageOptions: { globals: globals.es2015 }, },
    { code: 'new (() => 0)();', languageOptions: { globals: globals.es2015 }, },
    { code: 'foo``;', languageOptions: { globals: globals.es2015 }, },
    { code: 'obj.foo``;', languageOptions: { globals: globals.es2015 }, },
    { code: '(function() {})``;', languageOptions: { globals: globals.es2015 }, },
    { code: '(() => 0)``;', languageOptions: { globals: globals.es2015 }, },
  ],
  /**
   * @type {import('./types.js').FlatInvalidTestCases}
   */
  invalid: [
    { code: 'true();', errors: ['This is not a function.'] },
    { code: 'false();', errors: ['This is not a function.'] },
    { code: 'null();', errors: ['This is not a function.'] },
    { code: '100();', errors: ['This is not a function.'] },
    { code: '"hello"();', errors: ['This is not a function.'] },
    { code: '/abc/();', errors: ['This is not a function.'] },
    { code: '[1,2,3]();', errors: ['This is not a function.'] },
    { code: '({foo: 0})();', errors: ['This is not a function.'] },
    {
      code: '`hello`();',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '(class A {})();',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    { code: 'new true();', errors: ['This is not a function.'] },
    { code: 'new false();', errors: ['This is not a function.'] },
    { code: 'new null();', errors: ['This is not a function.'] },
    { code: 'new 100();', errors: ['This is not a function.'] },
    { code: 'new "hello"();', errors: ['This is not a function.'] },
    { code: 'new /abc/();', errors: ['This is not a function.'] },
    { code: 'new [1,2,3]();', errors: ['This is not a function.'] },
    { code: 'new ({foo: 0})();', errors: ['This is not a function.'] },
    {
      code: 'new `hello`();',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: 'true``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: 'false``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: 'null``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '100``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '"hello"``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '/abc/``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '[1,2,3]``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '({foo: 0})``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '`hello```;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
    {
      code: '(class A {})``;',
      languageOptions: { globals: globals.es2015 },
      errors: ['This is not a function.'],
    },
  ],
})
