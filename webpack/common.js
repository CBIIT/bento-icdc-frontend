// common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../config/paths');

module.exports = {
    entry: paths.appIndexTs,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: paths.appNodeModules,
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: paths.appNodeModules,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: "defaults" }]]
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|png|jpe?g|svg|JPG)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[hash][ext][query]',
                },
            },
        ],
    },
    resolve: {
        extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtml
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: '/',
    },
};
