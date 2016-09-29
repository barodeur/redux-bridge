var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './web/main.js',
  output: { path: __dirname, filename: 'bundle.js' },
  externals: [
    {
      "window": "window"
    }
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
};
