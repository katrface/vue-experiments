/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['sonarjs'],
  extends: [
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:vuetify/base',
    'eslint:recommended',
    'plugin:sonarjs/recommended'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn'
  }
}
