/* eslint-env node */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    curly: ['error', 'multi-line'],
    'no-implicit-coercion': 'error',
    'prefer-template': 'error',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { node: true },
    },
  ],
};