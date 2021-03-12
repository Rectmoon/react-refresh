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
    presets: ['@babel/preset-env', '@babel/preset-react'],

    plugins: [
      ['@babel/proposal-decorators', { legacy: true }],
      ['@babel/proposal-class-properties'],
      process.env.NODE_ENV === 'development' && 'react-refresh/babel'
    ].filter(Boolean)
  }
}
