const path = require('path');
const webpack = require('webpack');
const paths = require('../config/paths');
const getClientEnvironment = require('../config/env');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicUrl = paths.servedPath;
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: paths.appIndexTs,
  cache: {
    type: 'filesystem', // Caches files to disk for persistent builds
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'thread-loader', // Use multi-threading to improve performance
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // Works with thread-loader for faster builds
            },
          },
        ],
        exclude: paths.appNodeModules,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: paths.appNodeModules,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Enable Babel caching
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|png|jpe?g|JPG)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@assets': path.resolve(__dirname, '../src/assets'),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified), // Define environment variables
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      PUBLIC_URL: publicUrl,
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // Automatically clean old build files
    publicPath: '/',
  },
};
