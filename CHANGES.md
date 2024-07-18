# CHANGES for `@brettz9/eslint-plugin`

## 2.1.0

BREAKING:

Require Node ^18.18.0 || ^20.9.0 || >=21.1.0

- feat: add `name` to configs

## 2.0.1

- fix: TS

## 2.0.0

- feat: native ESM/flat config
- feat: TypeScript

## 1.0.4

- npm: Update devDeps.

## 1.0.3

- Avoid `postinstall` script which is problematic for non-pnpm dependents

## 1.0.2

- Fix: Point `meta.docs.url` to own fork
- Set `@brettz9/block-scoped-var` to `"off"` in ES5 config (in ESLint core)
- Set `@brettz9/arrow-parens` to `"off"` in ES6 config (in ESLint core)

## 1.0.1

- Fix: Resolution of configs

## 1.0.0 (Initial version)

- Forked from <https://github.com/mysticatea/eslint-plugin>
- Strips config down to unique rules and limited configs
