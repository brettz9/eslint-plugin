/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import {RuleTester} from 'eslint'
import rule from '../../../lib/rules/no-this-in-static.js'

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const tester = new RuleTester({ languageOptions: { ecmaVersion: 6 } })

tester.run('no-this-in-static', rule, {
  valid: [
    'function foo() { this }',
    '() => { this }',
    'class A { constructor() { this } }',
    'class A { foo() { this } }',
    'class A { static foo() { function foo() { this } } }',
  ],
  invalid: [
    {
      code: 'class A { static foo() { this } }',
      errors: ['Unexpected \'this\'.'],
    },
    {
      code: 'class A { static foo() { () => { this } } }',
      errors: ['Unexpected \'this\'.'],
    },
    {
      code: 'class A { static foo() { super.foo() } }',
      errors: ['Unexpected \'super\'.'],
    },
    {
      code: 'class A { static foo() { () => { super.foo() } } }',
      errors: ['Unexpected \'super\'.'],
    },
  ],
})
