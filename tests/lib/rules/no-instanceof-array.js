/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {RuleTester} from 'eslint'
import rule from '../../../lib/rules/no-instanceof-array.js'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const tester = new RuleTester()

tester.run('no-instanceof-array', rule, {
  valid: [
    'var Array = 5',
    'Array',
    'Array.isArray(x)',
    'function foo(Array) { x instanceof Array }',
  ],
  invalid: [
    {
      code: 'x instanceof Array',
      output: 'Array.isArray(x)',
      errors: [
        'Unexpected \'instanceof\' operator. Use \'Array.isArray\' instead.',
      ],
    },
  ],
})
