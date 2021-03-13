const assetsSubDirectory = 'assets'

module.exports = {
  assetsSubDirectory,
  publicPath: '/rainbow/',
  outputDir: 'rainbow',
  report: process.env.npm_config_report,
  gzipOn: false,
  externals: [
    {
      packageName: 'axios',
      variableName: 'axios',
      from: 'node_modules/axios/dist/axios.min.js',
      to: `${assetsSubDirectory}/js/vendors/axios.min.js`
    },
    {
      packageName: 'react',
      variableName: 'React',
      from: 'node_modules/react/umd/react.production.min.js',
      to: `${assetsSubDirectory}/js/vendors/react.production.min.js`
    },
    {
      packageName: 'react-dom',
      variableName: 'ReactDOM',
      from: 'node_modules/react-dom/umd/react-dom.production.min.js',
      to: `${assetsSubDirectory}/js/vendors/react-dom.production.min.js`
    }
  ]
}
