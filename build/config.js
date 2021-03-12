module.exports = {
  assetsSubDirectory: 'assets',
  publicPath: '/hera/',
  outputDir: 'hera',
  report: process.env.npm_config_report,
  gzipOn: false,
  externals: {
    axios: 'axios'
  }
}
