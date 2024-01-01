import configs from './lib/configs.js';
import rules from './lib/rules.js';

const index = {
  configs,
  rules,
};

for (const obj of index.configs.es2015) {
  obj.plugins = {
    '@brettz9': index
  }
}

index.configs.es5.plugins = {
  '@brettz9': index
};

for (const obj of index.configs.es6) {
  obj.plugins = {
    '@brettz9': index
  }
}

export default index;
