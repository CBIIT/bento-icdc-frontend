const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const paths = require('../config/paths');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = paths.servedPath;
const env = getClientEnvironment(publicUrl);

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new CopyPlugin({
      patterns: [
        {from: path.join(__dirname, 'public/**/*.js'), to: path.join(__dirname, 'dist')}
      ]
    })
  ],
});
