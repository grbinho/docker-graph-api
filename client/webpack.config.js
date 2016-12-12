var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=semantic/dist/themes/*/assets/fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'file?name=semantic/dist/themes/*/assets/images/[name].[ext]'
      }
    ]
  },
};