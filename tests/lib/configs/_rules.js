/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

import {readFileSync} from 'fs';
import index from '../../../index.js'

const { rules: PluginRulesIndex } = index;

const pluginRules = new Map(
  Object.keys(PluginRulesIndex).map(key => [
    `@brettz9/${key}`,
    PluginRulesIndex[/** @type {keyof PluginRulesIndex} */ (key)],
  ])
)
const allRules = new Map(pluginRules)

const deprecatedRuleNames = new Set(
  Array.from(allRules)
    .filter(([, rule]) => rule && rule.meta && rule.meta.deprecated)
    .map(([ruleId]) => ruleId)
)
const removedRuleNames = new Set(
  Object.keys(JSON.parse(
    readFileSync('./node_modules/eslint/conf/replacements.json', 'utf8')
  ).rules)
)

export default {
  /**
   * Validate the given config object.
   * @param {any} config The config object to check.
   * @returns {void}
   */
  validateConfig(config) {
    for (const ruleId of Object.keys(config.rules || {})) {
      const rule = allRules.get(ruleId)
      if (rule == null) {
        throw new Error(`The '${ruleId}' rule does not exist.`)
      }
      if (deprecatedRuleNames.has(ruleId)) {
        throw new Error(`The '${ruleId}' rule was deprecated.`)
      }
      if (removedRuleNames.has(ruleId)) {
        throw new Error(`The '${ruleId}' rule was removed.`)
      }
    }
  },

  /**
   * Get the rule definition of the given ID.
   * @param {string} ruleId The rule ID to get.
   * @returns {import('eslint').Rule.RuleModule & {
   *   meta?: {
   *     docs?: {
   *       version?: string
   *     }
   *   }
   * }|undefined} The rule definition.
   */
  getRuleDefinition(ruleId) {
    return allRules.get(ruleId)
  },

  /**
   * Get the plugin rules.
   * @param {"brettz9"} pluginName The plugin name to get.
   * @returns {string[]} The core rules. Keys are rule IDs and values are each rule definition.
   */
  getPluginRuleNames(pluginName) {
    return Object.keys(PluginRulesIndex)
      .filter(ruleId =>
        pluginName === 'brettz9'
          ? !ruleId.includes('/')
          : ruleId.startsWith(`${pluginName}/`)
      )
      .map(ruleId => `@brettz9/${ruleId}`)
      .filter(
        ruleId =>
          !deprecatedRuleNames.has(ruleId) &&
                    !removedRuleNames.has(ruleId)
      )
  },

  /**
   * @param {import('eslint').Linter.FlatConfig} config
   */
  *iterateRulesOfConfig(config) {
    if (config.rules) {
      yield* Object.entries(config.rules)
    }
  },

  /**
   * @param {import('eslint').Linter.FlatConfig} config
   */
  getRulesOfConfig(config) {
    /** @type {{[key: string]: import('eslint').Linter.RuleEntry<any[]>}} */
    const rules = {}
    for (const [key, value] of this.iterateRulesOfConfig(config)) {
      rules[key] = /** @type {import('eslint').Linter.RuleEntry<any[]>} */ (value)
    }
    return rules
  },
}
