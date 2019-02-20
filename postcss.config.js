module.exports = ctx => ({
  plugins: {
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'cssnano': ctx.env === 'prod' ? {} : false
  }
})