module.exports = ctx => ({
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-url': { url: 'inline' },
    'postcss-csso': { debug: false }
  }
})