module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
