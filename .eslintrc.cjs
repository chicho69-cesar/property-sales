module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'import/extensions': [
      'off',
    ],
    'no-console': 'off',
    'no-unused-vars': ['off'],
    'import/no-extraneous-dependencies': [
      'off',
    ],
  },
}
