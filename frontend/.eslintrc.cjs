/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    // tailwind.config.js - error - 'module' is not defined - no-undef
    // https://eslint.org/docs/rules/no-undef
    node: true
  },
  rules: {
    'vue/multi-word-component-names': 'off'
  }
};
