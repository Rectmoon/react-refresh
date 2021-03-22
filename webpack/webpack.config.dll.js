const webpack = require('webpack')

const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: resolve('static/js/dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: resolve('static/js/dll/[name].manifest.json')
    })
  ]
}
