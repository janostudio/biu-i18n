const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/i18n", 
  output: {
    path: path.resolve(__dirname, "../dist"), 
    filename: "bue-i18n.min.js"
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'src')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
