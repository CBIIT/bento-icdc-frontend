const path = require('path');
const webpack = require('webpack');
const paths = require('../config/paths');
const getClientEnvironment = require('../config/env');

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
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // Automatically clean old build files
    publicPath: '/',
  },
};
