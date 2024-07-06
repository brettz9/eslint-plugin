import configs from './lib/configs.js';
import rules from './lib/rules.js';
import base from './lib/configs/_base.js';

const index = {
  configs,
  rules,
};

base.plugins = {
  '@brettz9': index
};

export default index;
