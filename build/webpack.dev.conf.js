const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/i18n.js", 
  output: {
    path: path.resolve(__dirname, "../dist"), 
    filename: "biu-i18n.js",
    library: ['biu-i18n'],
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
