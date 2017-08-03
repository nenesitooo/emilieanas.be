const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, './src/js/components'),
  entry: ['./animations', './navigation', './registration', './errorTracking'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true
}
