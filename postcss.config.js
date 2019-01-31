module.exports = ctx => ({
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-csso': ctx.env === 'prod' ? {} : false
  }
})