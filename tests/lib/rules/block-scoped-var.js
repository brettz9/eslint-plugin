/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import {RuleTester} from 'eslint'
import globals from 'globals';
import rule from '../../../lib/rules/block-scoped-var.js'
new RuleTester().run('block-scoped-var', rule, {
  /**
   * @type {import('./types.js').FlatValidTestCases}
   */
  valid: [
    '{ var a; a; } { var a; a; }',
    '{ var a; a; } { { var a; a; } { var a; { a; } } }',
    'if (true) { var a; a; } else if (true) { var a; a; } else { var a; a; }',
    'while (true) { var a; a; } do { var a; a; } while (true);',
    {
      code:
                'for (var a = 0; a; a) { a; var b; b; } for (var a in []) { a; var b; b; } for (var a of []) { a; var b; b; }',
      languageOptions: { globals: globals.es2015 },
    },
    'switch (0) { case 0: var a; a; case 1: a; default: a; } { var a; a; }',
    'var a = {}; module.exports = a',

    // below should be warned by no-shadow rule.
    // this rule ignores those merely.
    'var a; function foo() { var a; }',
    'var a; function foo(a) { }',
    'function a() { var a; }',
    '(function a() { var a; })();',
    { code: 'class a { foo() { var a; } }', languageOptions: { globals: globals.es2015 }, },
    { code: '(class a { foo() { var a; } })();', languageOptions: { globals: globals.es2015 }, },
    { code: 'import a from "abc";', languageOptions: { globals: globals.es2015, sourceType: 'module'}},
  ],
  /**
   * @type {import('./types.js').FlatInvalidTestCases}
   */
  invalid: [
    {
      code: '{ var a; a; } a;',
      errors: [{ type: 'Identifier', message: '"a" is not defined.' }],
    },
    {
      code: 'a; { var a; a; }',
      errors: [{ type: 'Identifier', message: '"a" is not defined.' }],
    },
    {
      code: 'for (var a; a; a) { } a;',
      errors: [{ type: 'Identifier', message: '"a" is not defined.' }],
    },
    {
      code: 'a; for (var a; a; a) { }',
      errors: [{ type: 'Identifier', message: '"a" is not defined.' }],
    },
    {
      code: '{ var a; var a; }',
      errors: [
        { type: 'Identifier', message: '"a" is already defined.' },
      ],
    },
    {
      code: 'for (var a; a; a) { var a; }',
      errors: [
        { type: 'Identifier', message: '"a" is already defined.' },
      ],
    },
    {
      code: 'function foo(a) { var a; } var a;',
      errors: [
        { type: 'Identifier', message: '"a" is already defined.' },
      ],
    },
    {
      code: '{ var a; { var a; } }',
      errors: [
        {
          type: 'Identifier',
          message: '"a" is already defined in the upper scope.',
        },
      ],
    },
    {
      code: '{ var a; } { var a; a; }',
      errors: [
        {
          type: 'Identifier',
          message: '"a" is defined but never used.',
          column: 7,
        },
      ],
    },
    {
      code:
                '{ var {x: [a = 0]} = {x: [1]}; a; } { var a; ({x: [a = 0]} = {x: [1]}); }',
      languageOptions: { globals: globals.es2015 },
      errors: [
        {
          type: 'Identifier',
          message: '"a" is defined but never used.',
          column: 43,
        },
      ],
    },
  ],
})
