const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports =
  process.env.NODE_ENV === 'development'
    ? require('./build/webpack.dev.config')
    : smp.wrap(require('./build/webpack.prod.config'))
