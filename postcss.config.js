module.exports = ctx => ({
  plugins: {
<<<<<<< HEAD
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-csso': ctx.env === 'prod' ? {} : false
=======
    'postcss-nested': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-csso': { debug: true }
>>>>>>> dev
  }
})