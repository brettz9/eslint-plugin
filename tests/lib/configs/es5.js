/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

import assert from 'assert'
import Rules from './_rules.js'
import config from '../../../lib/configs/es5.js'

/**
 * Checks whether a given core rule is an ES6 rule or not.
 *
 * @param {string} ruleId - The name of a core rule.
 * @returns {boolean} `true` if the rule is an ES6 rule.
 */
function isES6Rule(ruleId) {
  const def = Rules.getRuleDefinition(ruleId)
  const version = def && def.meta && def.meta.docs && def.meta.docs.version

  return version === 'es6'
}

describe('\'es5.js\'', () => {
  const configuredRules = Rules.getRulesOfConfig(config)
  const existingRules = Rules.getPluginRuleNames('brettz9')

  it('should be a valid config.', () => {
    Rules.validateConfig(config)
  })

  for (const ruleId of existingRules) {
    it(`should include existing rule '${ruleId}'.`, () => {
      assert(ruleId in configuredRules)
    })

    if (isES6Rule(ruleId)) {
      it(`should disable ES2015 rule '${ruleId}'.`, () => {
        assert.strictEqual(configuredRules[ruleId], 'off')
      })
    }
  }
})
