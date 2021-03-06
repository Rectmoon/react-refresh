const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const optimizeCss = require('optimize-css-assets-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

const { name, author, description, version } = require('../package.json')
const baseConfig = require('./webpack.config.base')
const config = require('./config')

const { resolve, assetsPath } = require('./utils')

const commonOptions = {
  chunks: 'all',
  reuseExistingChunk: true
}

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: 'source-map' && false,

  output: {
    filename: assetsPath('js/[name].[chunkhash:6].min.js'),
    chunkFilename: assetsPath('js/[id].[chunkhash:6].min.js'),
    publicPath: config.publicPath,
    path: resolve(config.outputDir)
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),

    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash:6].css'),
      chunkFilename: assetsPath('css/[id].[contenthash:6].css')
    }),

    new optimizeCss({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: true //是否将插件信息打印到控制台
    }),

    new webpack.BannerPlugin({
      banner: [
        `@project: ${name}`,
        `@author: ${author}`,
        `@date: ${new Date()}`,
        `@description: ${description}`,
        `@version: ${version}`
      ].join('\n'),
      entryOnly: true,
      exclude: /manifest|polyfill|styles/
    }),

    new HtmlWebpackTagsPlugin({
      tags: [
        {
          path: `${config.assetsSubDirectory}/js/dll`,
          glob: '*.dll.js',
          globPath: `static/js/dll`
        }
      ],
      append: false
    }),

    new DllReferencePlugin({
      context: __dirname,
      manifest: resolve('static/js/dll/react.manifest.json')
    }),
    /**
     *  第一种方式：
     * 使用dll预打包
     * { filepath: resolve('static/dll/*_dll.js') }
     *
     * 
     * 
      new HtmlWebpackTagsPlugin({
        tags: [
          {
            path: `${config.assetsSubDirectory}/js/dll`,
            glob: '*.dll.js',
            globPath: `static/js/dll`
          }
        ],
        append: false
      }),
    
      new DllReferencePlugin({
          context: __dirname,
          manifest: require('../static/js/dll/react_manifest.json')
      }),
     * 
     *  第二种方式
     *  配置 externals, 并在html直接引入 polyfill.min.js, react.min.js, react-dom.min.js
     *  externals: {
     *    react: 'React',
     *   'react-dom': 'ReactDOM'
     *  }
     *
     *  其他方式
     *  直接将入口和 react、react-dom混在一起, 并在入口按需引入相关依赖
     */

    // new CopyWebpackPlugin(
    //   config.externals.map(({ from }) => ({
    //     from,
    //     to: `${config.assetsSubDirectory}/js/vendors`,
    //     ignore: ['!*?(.production).min.js', '*.test.*'],
    //     flatten: true
    //   }))
    // ),

    // new HtmlWebpackTagsPlugin({
    //   /**
    //    *  tags: ['https://cdn.bootcss.com/axios/0.19.0/axios.min.js'],
    //    *  publicPath: false
    //    *  append: false
    //    */
    //   tags: [],
    //   scripts: config.externals.map(({ packageName, variableName, to }) => ({
    //     path: to,
    //     external: {
    //       packageName,
    //       variableName
    //     },
    //     attributes: {
    //       type: 'text/javascript'
    //     }
    //   }))
    // }),

    config.report && new BundleAnalyzerPlugin()
  ].filter(Boolean),

  // externals: config.externals.reduce((acc, next) => {
  //   acc[next.packageName] = next.variableName
  //   return acc
  // }, {}),

  optimization: {
    moduleIds: 'hashed',

    runtimeChunk: {
      name: 'manifest'
    },

    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4
      })
    ],

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        polyfill: {
          test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
          name: 'polyfill',
          priority: 30,
          ...commonOptions
        },

        styles: {
          name: 'styles',
          test: /(reset|common|base|widget)\.(s?css|sass|styl|less)/,
          minSize: 1,
          ...commonOptions
        }
      }
    }
  }
})
