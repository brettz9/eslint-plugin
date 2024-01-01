/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

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
      description: 'Disallow `this`/`super` in static methods',
      category: 'Best Practices',
      url:
                'https://github.com/brettz9/eslint-plugin/blob/v1.0.2/docs/rules/no-this-in-static.md',
    },
    fixable: undefined,
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    /* c8 ignore next -- earlier ESLint compatibility */
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    /**
     * @typedef {{
     *   static: boolean,
     *   upper: FuncInfo|null
     * }} FuncInfo
     */

    /** @type {FuncInfo|null} */
    let funcInfo = null

    /**
         * Checks whether the given function node is a static method or not.
         *
         * @param {import('eslint').Rule.Node} node - The function node to check.
         * @returns {boolean} `true` if the node is a static method.
         */
    function isStaticMethod(node) {
      return (
        node.type === 'FunctionExpression' &&
                node.parent.type === 'MethodDefinition' &&
                node.parent.static === true
      )
    }

    /**
         * Updates the stack of function information.
         *
         * @param {import('eslint').Rule.Node} node - The function node to make information.
         * @returns {void}
         */
    function enterFunction(node) {
      funcInfo = {
        upper: funcInfo,
        static: isStaticMethod(node),
      }
    }

    /**
         * Updates the stack of function information.
         *
         * @returns {void}
         */
    function exitFunction() {
      funcInfo = /** @type {FuncInfo} */ (funcInfo).upper
    }

    /**
         * Reports the `this`/`super` node if this is inside of a static method.
         *
         * @param {import('eslint').Rule.Node} node - The node to report.
         * @returns {void}
         */
    function reportIfStatic(node) {
      if (funcInfo != null && funcInfo.static) {
        context.report({
          node,
          loc: /** @type {import('estree').SourceLocation} */ (node.loc),
          message: 'Unexpected \'{{type}}\'.',
          data: { type: sourceCode.getText(node) },
        })
      }
    }

    return {
      FunctionDeclaration: enterFunction,
      FunctionExpression: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      'FunctionExpression:exit': exitFunction,
      ThisExpression: reportIfStatic,
      Super: reportIfStatic,
    }
  },
}
