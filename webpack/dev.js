// dev.js
const { merge } = require('webpack-merge');
const common = require('./common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('../config/env');
const paths = require('../config/paths');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: paths.appPublic,
            serveIndex: false,
        },
        compress: true,
        open: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Use style-loader in development
            },
        ],
    },
    plugins: [
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
        new HtmlWebpackPlugin(
          {
            template: path.resolve(__dirname, "public", "index.html"),
            inject: true,
            template: paths.appHtml,
          },
        ),
      ],
});

