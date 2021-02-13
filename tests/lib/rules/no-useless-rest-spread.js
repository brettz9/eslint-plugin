/**
 * @fileoverview Tests for no-useless-rest-spread rule.
 * @author Toru Nagashima
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {RuleTester, SourceCode} = require('eslint');
const espree = require('espree');
const rule = require('../../../lib/rules/no-useless-rest-spread');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
  },
});

function simulateOldParser () {
  const text = 'function foo(a, ...[,]) {}';
  const ast = espree.parse(text, {
    ecmaVersion: 2018, tokens: true, loc: true, range: true, comment: true
  });

  const rest = ast.body[0].params[1];
  rest.parent = ast.body[0];

  // Simulate old type
  rest.type = 'RestProperty'

  const results = {};
  rule.create({
    report ({data: {type1, type2}}) {
      results.type1 = type1;
      results.type2 = type2;
    },
    getSourceCode () {
      return new SourceCode({ast, text});
    }
  }).RestProperty(rest);

  expect(results.type1).to.equal('rest');
  expect(results.type2).to.equal('parameter');
}
simulateOldParser();

ruleTester.run('no-useless-rest-spread', rule, {
  valid: [
    'let list = [...a, ...b]',
    'foo(...a, ...b)',
    'let [a, b, c, ...d] = list',
    'function foo(a, b, c, ...d) {}',
    'let obj = {...a, ...b}',
    'let {a, ...b} = obj',
    'let [a, ...{b, c}] = list',
    'function foo(a, ...{b, c}) {}',
    'foo(...{a}, ...{b})',
    'let list = [...{a}]',
    'let obj = {...[a]}',
    'f(...g())',
  ],
  invalid: [
    {
      code: 'let list = [...[x, y, x], ...b]',
      output: 'let list = [x, y, x, ...b]',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'foo(...a, ...[x, y, x])',
      output: 'foo(...a, x, y, x)',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'let [a, ...[b, c, ...d]] = obj',
      output: 'let [a, b, c, ...d] = obj',
      errors: ['Redundant rest element.'],
    },
    {
      code: 'function foo(a, ...[b, c, ...d]) {}',
      output: 'function foo(a, b, c, ...d) {}',
      errors: ['Redundant rest parameter.'],
    },
    {
      code: 'let obj = {...{x, y, x}, ...b}',
      output: 'let obj = {x, y, x, ...b}',
      errors: ['Redundant spread property.'],
    },

    // Trailing commas
    {
      code: 'let list = [...[x, y, x, ], ...b]',
      output: 'let list = [x, y, x, ...b]',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'foo(...a, ...[x, y, x, ])',
      output: 'foo(...a, x, y, x)',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'let [a, ...[b, c, ]] = obj',
      output: 'let [a, b, c] = obj',
      errors: ['Redundant rest element.'],
    },
    {
      code: 'function foo(a, ...[b, c, ]) {}',
      output: 'function foo(a, b, c) {}',
      errors: ['Redundant rest parameter.'],
    },
    {
      code: 'let obj = {...{x, y, x, }, ...b}',
      output: 'let obj = {x, y, x, ...b}',
      errors: ['Redundant spread property.'],
    },

    // Empty literals
    {
      code: 'let list = [...[], ...b]',
      output: 'let list = [ ...b]',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'foo(...a, ...[])',
      output: 'foo(...a)',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'foo(...[])',
      output: 'foo()',
      errors: ['Redundant spread element.'],
    },
    {
      code: 'let [a, ...[]] = obj',
      output: 'let [a] = obj',
      errors: ['Redundant rest element.'],
    },
    {
      code: 'let obj = {...{}, ...b}',
      output: 'let obj = { ...b}',
      errors: ['Redundant spread property.'],
    },

    // Don't auto-fix if the inner array has holes.
    {
      code: 'let list = [a, ...[,]]',
      output: null,
      errors: ['Redundant spread element.'],
    },
    {
      code: 'let list = [a, ...[b,,c]]',
      output: null,
      errors: ['Redundant spread element.'],
    },
    {
      code: 'foo(a, ...[,])',
      output: null,
      errors: ['Redundant spread element.'],
    },
    {
      code: 'let [a, ...[,]] = list',
      output: null,
      errors: ['Redundant rest element.'],
    },
    {
      code: 'function foo(a, ...[,]) {}',
      output: null,
      errors: ['Redundant rest parameter.'],
    },
  ],
})
