const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./common');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const paths = require('../config/paths');
const getClientEnvironment = require('../config/env');

const publicUrl = paths.servedPath;
const env = getClientEnvironment(publicUrl);

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // Split chunks above 20KB
      maxSize: 244000, // Target size for optimal loading and caching
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public/injectEnv.js'),
          to: './[name].js',
        },
        {
          from: path.join(__dirname, '../public/js/session.js'),
          to: './js/[name].js',
        },
        {
          from: path.join(__dirname, '../public/manifest.json'),
          to: './[name].json',
        },
        {
          from: path.join(__dirname, '../public/404.html'),
          to: './[name].html',
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new HtmlWebpackPlugin({
      template: paths.appProdHtml, // Environment-specific HTML template
      inject: true,
    }),
  ],
});
