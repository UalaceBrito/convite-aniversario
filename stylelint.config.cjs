module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['layer', 'supports', 'media'] }],
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'color-function-notation': 'modern',
    'alpha-value-notation': 'number',
    'font-family-name-quotes': 'always-where-recommended',
  },
  ignoreFiles: ['dist/**', 'node_modules/**', 'coverage/**'],
};