module.exports = ctx => ({
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-csso': { debug: true }
  }
})