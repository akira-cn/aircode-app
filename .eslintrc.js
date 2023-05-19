module.exports = {
  globals: {
    globalThis: true,
  },
  extends: 'eslint-config-sprite',
  rules: {
    complexity: ['warn', 25],
    'no-unused-vars': 'warn',
    'no-restricted-globals': 'off',
    'max-params': ['warn', 7],
    'no-console': 'warn',
    'no-new-func': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-return-await': 'off',
  },
};
