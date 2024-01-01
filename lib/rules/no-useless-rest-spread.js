/**
 * @fileoverview Rule to disallow unnecessary spread operators.
 * @author Toru Nagashima
 */

/**
 * @see https://github.com/babel/babel/commit/8d90dc0d10e091ec1effc764c847a35f5614ff14
 * @typedef {import('eslint').Rule.Node & {
 *   type: "SpreadProperty",
 *   argument: import('eslint').Rule.Node & import('estree').Expression
 * }} SpreadProperty
 */

/**
 * @see https://github.com/babel/babel/commit/8d90dc0d10e091ec1effc764c847a35f5614ff14
 * @typedef {import('eslint').Rule.Node & {
*   type: "RestProperty",
*   argument: import('eslint').Rule.Node & import('estree').Expression
* }} RestProperty
*/

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const FUNC_TYPE = /^(?:FunctionDeclaration|(?:New|Call|(?:Arrow)?Function)Expression)$/u
const PROPERTY_PATTERN = /^(?:Experimental)?(Rest|Spread)Property$/u

/**
 * Checks whether the given token is a comma.
 *
 * @param {import('eslint').AST.Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma.
 */
function isCommaToken(token) {
  return token.type === 'Punctuator' && token.value === ','
}

/**
 * Check whether a given node is a hole.
 * @param {import('estree').Node|null} element The node to check.
 * @returns {boolean} `true` if the node is a hole.
 */
function isHole(element) {
  return element == null
}

/**
 * Gets the last token of the given node's elements.
 * This skips trailing commas.
 *
 * @param {import('eslint').SourceCode} sourceCode - The source code object to get tokens.
 * @param {import('eslint').Rule.Node} node - The node to get. This is one of ArrayExpression,
 * ArrayPattern, ObjectExpression, and ObjectPattern.
 * @returns {import('eslint').AST.Token} The last element token.
 */
function getLastElementToken(sourceCode, node) {
  const token = /** @type {import('eslint').AST.Token} */ (
    sourceCode.getLastToken(node, 1)
  )

  if (isCommaToken(token)) {
    return /** @type {import('eslint').AST.Token} */ (sourceCode.getTokenBefore(token))
  }
  return token
}

/**
 * Defines a fixer function.
 *
 * @param {import('eslint').SourceCode} sourceCode - The source code object to get tokens.
 * @param {import('eslint').Rule.Node & (SpreadProperty|RestProperty|
 *   import('estree').SpreadElement|import('estree').RestElement)} node - A node to fix.
 * @returns {import('eslint').Rule.ReportFixer} A fixer function.
 */
function defineFixer(sourceCode, node) {
  return fixer => {
    const child = /** @type {import('eslint').Rule.Node} */ (node.argument)

    // If the inner array includes holes, do nothing.
    if ('elements' in child && child.elements != null && child.elements.some(isHole)) {
      return null
    }

    // Remove this element if it's empty.
    if (
      (('elements' in child && child.elements) ||
      /* c8 ignore next -- TS guard */
      ('properties' in child && child.properties) ||
      {length: 0}).length === 0
    ) {
      const next = /** @type {import('eslint').AST.Token} */ (sourceCode.getTokenAfter(node))
      if (isCommaToken(next)) {
        return fixer.removeRange([/** @type {[number, number]} */ (
          node.range
        )[0], next.range[1]])
      }

      const prev = /** @type {import('eslint').AST.Token} */ (
        sourceCode.getTokenBefore(node)
      )
      if (isCommaToken(prev)) {
        return fixer.removeRange([prev.range[0], /** @type {[number, number]} */ (
          node.range
        )[1]])
      }

      return fixer.remove(node)
    }

    // Unwrap.
    const first = /** @type {import('eslint').AST.Token} */ (
      sourceCode.getFirstToken(child, 1)
    )
    const last = getLastElementToken(sourceCode, child)
    const replaceText = sourceCode.text.slice(first.range[0], last.range[1])
    return fixer.replaceText(node, replaceText)
  }
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule & {
*   meta: {
  *     docs: {
  *       version?: string
  *     }
  *   }
  * }}
  */
export default {
  meta: {
    docs: {
      version: 'es6',
      description: 'Disallow unnecessary spread operators.',
      category: 'Best Practices',
      recommended: false,
      url:
                'https://github.com/brettz9/eslint-plugin/blob/v1.0.2/docs/rules/no-useless-rest-spread.md',
    },
    fixable: 'code',
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    /**
     * Verify the given SpreadElement or RestElement.
     * @param {import('eslint').Rule.Node & (SpreadProperty|RestProperty|
     * import('estree').SpreadElement|import('estree').RestElement)} node The node to verify.
     * @returns {void}
     */
    function verify(node) {
      const nodeType = node.type.replace(
        PROPERTY_PATTERN,
        (_, t) => `${t}Element`
      )
      const parentType = node.parent.type
      const argumentType = node.argument.type
      const isArray = argumentType.startsWith('Array')
      const isObject = !isArray && argumentType.startsWith('Object')
      const isRedundant =
                ((isArray || isObject) && argumentType === parentType) ||
                (isArray && FUNC_TYPE.test(parentType))

      if (isRedundant) {
        const isRestParameter =
                    nodeType === 'RestElement' && argumentType !== parentType
        const type1 = nodeType === 'RestElement' ? 'rest' : 'spread'

        const type2 = isRestParameter
          ? 'parameter'
          : isArray
            ? 'element'
            : /* otherwise */ 'property'

        context.report({
          node,
          message: 'Redundant {{type1}} {{type2}}.',
          data: { type1, type2 },
          fix: defineFixer(sourceCode, node),
        })
      }
    }

    return {
      SpreadElement: verify,
      RestElement: verify,

      // Legacy for espree and babel-eslint.
      // SpreadProperty and RestProperty were replaced by SpreadElement and RestElement.
      SpreadProperty: verify,
      RestProperty: verify,
      ExperimentalSpreadProperty: verify,
      ExperimentalRestProperty: verify,
    }
  },
}
