var path = require('path');
var webpack = require('webpack');

var babelQuery = {
  presets: ['es2015', 'react', 'stage-0'],
};

module.exports = {
  devTool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './web/main.js',
  ],
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
        loaders: ['react-hot-loader/webpack', `babel-loader?${JSON.stringify(babelQuery)}`],
        exclude: /node_modules/
      }
    ]
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
};
