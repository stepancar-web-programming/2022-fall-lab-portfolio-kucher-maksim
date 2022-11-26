module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': process.env.NODE_ENV === 'prod' ? 'unix' : 'windows',
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    camelcase: 0,
    'no-undef': 0,
    semi: 0,
    'no-plusplus': 0,
    'func-names': 0,
    'no-console': 0,
    'default-case': 0,
    'no-multi-assign': 0
  }
}
