# @brettz9/eslint-plugin

[![npm version](https://img.shields.io/npm/v/@brettz9/eslint-plugin.svg)](https://www.npmjs.com/package/@brettz9/eslint-plugin)
[![Downloads/month](https://img.shields.io/npm/dm/@brettz9/eslint-plugin.svg)](http://www.npmtrends.com/@brettz9/eslint-plugin)
[![Build Status](https://github.com/brettz9/eslint-plugin/workflows/CI/badge.svg)](https://github.com/brettz9/eslint-plugin/actions)
[![Dependency Status](https://david-dm.org/brettz9/eslint-plugin.svg)](https://david-dm.org/brettz9/eslint-plugin)

Additional ESLint rules and ESLint configurations. A fork of [@mysticatea/eslint-plugin](https://github.com/mysticatea/eslint-plugin) which extracts the rules
without all of the config.

## 💿 Installation

```
npm install --save-dev eslint @brettz9/eslint-plugin
```

## 📖 Usage

Add to your ESLint configuration: <https://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin>

### Configs

- `plugin:@brettz9/es5` - Contains configuration of the project's rules
    suitable for ES5 (disabling arrow functions, etc.).
- `plugin:@brettz9/es6` - Contains configuration suitable for ES2015
    and above. For setting ES6+ globals, you will need to set `env`
    [accordingly](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments).
- `plugin:@brettz9/es2015` - Alias for `es6` config.

### Rules

- [@brettz9/arrow-parens](docs/rules/arrow-parens.md) enforces parens of argument lists (excludes too redundant parens) (fixable).
- [@brettz9/block-scoped-var](docs/rules/block-scoped-var.md) handles variables which are declared by `var` declaration as block-scoped. It disallows redeclarations, uses from outside of the scope, shadowing.
- [@brettz9/no-instanceof-array](docs/rules/no-instanceof-array.md) disallows 'instanceof' for Array (fixable).
- [@brettz9/no-instanceof-wrapper](docs/rules/no-instanceof-wrapper.md) disallows 'instanceof' for wrapper objects (fixable).
- [@brettz9/no-literal-call](docs/rules/no-literal-call.md) disallows a call of a literal.
- [@brettz9/no-this-in-static](docs/rules/no-this-in-static.md) disallows `this`/`super` in static methods.
- [@brettz9/no-use-ignored-vars](docs/rules/no-use-ignored-vars.md) disallows a use of ignored variables.
- [@brettz9/no-useless-rest-spread](docs/rules/no-useless-rest-spread.md) disallows unnecessary rest/spread operators (fixable).
- [@brettz9/prefer-for-of](docs/rules/prefer-for-of.md) requires `for-of` statements instead of `Array#forEach` or something like (fixable).

## 🚥 Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/) and
[ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## 📰 Changelog

- [GitHub Releases](https://github.com/brettz9/eslint-plugin/releases)

## ❤️ Contributing

Contributons are welcome!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm run clean` removes the coverage result of `npm test` command.
- `npm run coverage` shows the coverage result of `npm test` command.
- `npm run update` updates auto-generated files.
- `npm run watch` runs tests and measures coverage when source code are changed.
