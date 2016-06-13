var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeModulesPath = path.join(__dirname, 'node_modules');
var componentsPath = path.join(__dirname, 'src/components');
var utilsPath = path.join(__dirname, 'src/utils');

module.exports = {
  // devtool: 'source-map',
  // devtool: 'eval-source-map',
  devtool: 'cheap-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/static/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url?limit=25000',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({
    //   'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      'Block': path.join(componentsPath, 'Block'),
      'Container': path.join(componentsPath, 'Container'),
      'Options': path.join(componentsPath, 'Options'),
      'auth': path.join(utilsPath, 'auth'),
      'helper': path.join(utilsPath, 'helper'),
      'params': path.join(utilsPath, 'params'),
      'time': path.join(utilsPath, 'time'),
      'url': path.join(utilsPath, 'url'),
      'webApi': path.join(utilsPath, 'webApi'),
    },
  },
};
