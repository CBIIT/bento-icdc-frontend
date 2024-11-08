const { merge } = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../config/paths');
const getClientEnvironment = require('../config/env');

const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    open: true,
    port: 7000,
    client: {
      overlay: false, // Set to true to display build errors directly in the browser
    },
    hot: true, // Enable Hot Module Replacement (HMR) for faster reloads
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10000, // Smaller threshold for faster reloads
      maxSize: 244000, // Keeps chunks under the warning threshold
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: paths.appDevHtml, // Environment-specific template
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR plugin for dev mode
  ],
});
