const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  webpack: (config, { isServer }) => {
    // Add babel-loader for node_modules that need transpilation
    config.module.rules.push({
      test: /\.js$/,
      include: [
        /node_modules\/react-resizable/,
        /node_modules\/react-draggable/
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                node: 'current'
              }
            }]
          ],
          plugins: [
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator'
          ]
        }
      }
    })
    return config
  }
})
