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
      description: 'disallow \'instanceof\' for wrapper objects',
      category: 'Best Practices',
      url:
                'https://github.com/brettz9/eslint-plugin/blob/v1.0.2/docs/rules/no-instanceof-wrapper.md',
    },
    fixable: 'code',
    schema: [],
    type: 'problem',
  },

  create(context) {
    const {sourceCode} = context;
    const targetTypes = [
      'Boolean',
      'Number',
      'String',
      'Object',
      'Function',
      'Symbol',
    ]

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

        for (const ctorName of targetTypes) {
          const typeName = ctorName.toLowerCase()
          const variable = globalScope.set.get(ctorName)

          // Skip if undefined or shadowed
          /* c8 ignore next 3 -- Always present? */
          if (variable == null || variable.defs.length > 0) {
            continue
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
                                'Unexpected \'instanceof\' operator. Use \'typeof x === "{{typeName}}"\' instead.',
              data: { typeName },
              fix: fixer =>
                fixer.replaceText(
                  node,
                  `typeof ${sourceCode.getText(
                    node.left
                  )} === "${typeName}"`
                ),
            })
          }
        }
      },
    }
  },
}
