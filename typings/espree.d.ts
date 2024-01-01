declare module 'espree' {
  interface Options {
    ecmaVersion: number,
    tokens: boolean,
    loc: boolean,
    range: boolean,
    comment: boolean
  }
  const parse: (text: string, opts: Options) => import('eslint').AST.Program
}
