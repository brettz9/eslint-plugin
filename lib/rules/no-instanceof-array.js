/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    docs: {
      description: 'disallow \'instanceof\' for Array',
      category: 'Best Practices',
      url:
                'https://github.com/brettz9/eslint-plugin/blob/v1.0.2/docs/rules/no-instanceof-array.md',
    },
    fixable: 'code',
    schema: [],
    type: 'problem',
  },

  create(context) {
    const {sourceCode} = context;

    /**
         * Checks whether the given node is RHS of instanceof.
         *
         * @param {import('eslint').Rule.Node} node - The node to check.
         * @returns {boolean} `true` if the node is RHS of instanceof.
         */
    function isRhsOfInstanceof(node) {
      return (
        node.parent.type === 'BinaryExpression' &&
                node.parent.operator === 'instanceof' &&
                node.parent.right === node
      )
    }

    return {
      'Program:exit'(node) {
        const globalScope = sourceCode.getScope(node)
        const variable = globalScope.set.get('Array')

        // Skip if undefined or shadowed
        /* c8 ignore next 3 -- Always present? */
        if (variable == null || variable.defs.length > 0) {
          return
        }

        for (const reference of variable.references) {
          const id =
            /**
             * @type {import('estree').Identifier & {
             *   parent: import('estree').BinaryExpression &
             *     import('eslint').Rule.NodeParentExtension
             * }}
             */ (reference.identifier)
          const node = id.parent

          // Skip if it's not instanceof
          if (!isRhsOfInstanceof(id)) {
            continue
          }

          // Report
          context.report({
            node,
            loc: /** @type {import('estree').SourceLocation} */ (node.loc),
            message:
                            'Unexpected \'instanceof\' operator. Use \'Array.isArray\' instead.',
            fix: fixer =>
              fixer.replaceText(
                node,
                `Array.isArray(${sourceCode.getText(
                  node.left
                )})`
              ),
          })
        }
      },
    }
  },
}
