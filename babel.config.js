const fs = require('fs')
const path = require('path')

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3
        }
      ],
      '@babel/react'
    ],

    plugins: [
      ['@babel/proposal-decorators', { legacy: true }],
      ['@babel/proposal-class-properties'],
      [
        'import',
        {
          // 组件库的名字,可以根据你发布的库的package.json的name自行更改
          libraryName: 'ts-react-component',

          camel2DashComponentName: false,

          // 默认打包是lib,不用更改
          libraryDirectory: 'lib/components',

          // 如果有样式文件,因为打包后样式统一放在/lib/theme下,所以需要稍微转换下
          style: name => {
            const libDirIndex = name.lastIndexOf('/')
            const libDir = name.substring(0, libDirIndex)
            const fileName = name.substr(libDirIndex + 1)
            const stylesheetPath = `${libDir}/${fileName}/index.css`

            return fs.existsSync(path.join('node_modules', stylesheetPath))
              ? stylesheetPath
              : false
          }
        }
      ],
      process.env.NODE_ENV === 'development' && 'react-refresh/babel'
    ].filter(Boolean)
  }
}
