// prod.js
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map', // Enable source maps for production
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS in production
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CompressionPlugin(), // Enable gzip compression for production assets
    ],
    performance: {
        maxEntrypointSize: 400000,
        maxAssetSize: 100000,
        hints: 'warning',
    },
});
