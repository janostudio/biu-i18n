const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/i18n", 
  output: {
    path: path.resolve(__dirname, "../dist"), 
    filename: "bue-i18n.js"
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'src')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
