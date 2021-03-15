const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { resolve, assetsPath, getEntries, getHtmlPlugins } = require('./utils')
const config = require('./config')

const ENV = process.env.NODE_ENV
const isDev = ENV === 'development'

const globalCssHandlers = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  'postcss-loader'
]

const localCssHandlers = globalCssHandlers.map((handler, i) =>
  i == 1
    ? {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            localIdentName: isDev
              ? '[path][name]__[local]'
              : '[name]--[hash:base64:5]'
          }
        }
      }
    : handler
)

module.exports = {
  entry: getEntries(),

  output: {
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@': resolve('src')
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [...globalCssHandlers]
      },

      {
        test: /\.modules?.css$/,
        exclude: [/node_modules/],
        use: [...localCssHandlers]
      },

      {
        test: /[^modules?]\.less$/,
        use: [
          ...globalCssHandlers,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },

      {
        test: /\.modules?\.less$/,
        exclude: [/node_modules/],
        use: [
          ...localCssHandlers,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|htc)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 4096,
            name: assetsPath('fonts/[name].[hash:6].[ext]')
          }
        }
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: assetsPath('images/[name].[hash:6].[ext]')
        }
      }
    ]
  },

  plugins: [
    ...getHtmlPlugins(),

    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.assetsSubDirectory,
        ignore: ['.*', '*_manifest.json']
      }
    ]),

    new webpack.DefinePlugin({
      'process.env': `${JSON.stringify(ENV)}`
    }),

    new webpack.ProgressPlugin()
  ]
}
