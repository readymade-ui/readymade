module.exports = ctx => ({
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-csso': ctx.env === 'prod' ? {} : false
  }
})