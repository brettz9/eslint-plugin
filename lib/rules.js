import arrowParens from './rules/arrow-parens.js';
import blockScopedVar from './rules/block-scoped-var.js';
import noInstanceofArray from './rules/no-instanceof-array.js';
import noInstanceofWrapper from './rules/no-instanceof-wrapper.js';
import noLiteralCall from './rules/no-literal-call.js';
import noThisInStatic from './rules/no-this-in-static.js';
import noUseIgnoredVars from './rules/no-use-ignored-vars.js';
import noUselessRestSpread from './rules/no-useless-rest-spread.js';
import preferForOf from './rules/prefer-for-of.js';

export default {
  'arrow-parens': arrowParens,
  'block-scoped-var': blockScopedVar,
  'no-instanceof-array': noInstanceofArray,
  'no-instanceof-wrapper': noInstanceofWrapper,
  'no-literal-call': noLiteralCall,
  'no-this-in-static': noThisInStatic,
  'no-use-ignored-vars': noUseIgnoredVars,
  'no-useless-rest-spread': noUselessRestSpread,
  'prefer-for-of': preferForOf,
}
