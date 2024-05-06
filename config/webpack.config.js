'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
// const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  // Webpack uses `publicPath` to determine where the app is being served from.
  // It requires a trailing slash, or the file assets will get an incorrect path.
  // In development, we always serve from the root. This makes config easier.
  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/';
  // Some apps do not use client-side routing with pushState.
  // For these, "homepage" can be set to "." to enable relative asset paths.
  const shouldUseRelativeAssetPaths = publicPath === './';

  // `publicUrl` is just like `publicPath`, but we will provide it to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  const publicUrl = isEnvProduction
    ? publicPath.slice(0, -1)
    : isEnvDevelopment && '';
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(publicUrl);

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'eval-source-map',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: './src/index.js',
    output: {
      path: paths.appBuild,
      filename: isEnvProduction
          ? 'static/js/[name].[chunkhash:8].js'
          : isEnvDevelopment && 'static/js/bundle.js',
      publicPath: publicPath,
    },
    // output: {
    //   // The build folder.
    //   path: isEnvProduction ? paths.appBuild : undefined,
    //   // Add /* filename */ comments to generated require()s in the output.
    //   pathinfo: isEnvDevelopment,
    //   // There will be one main bundle, and one file per asynchronous chunk.
    //   // In development, it does not produce real files.
    //   filename: isEnvProduction
    //     ? 'static/js/[name].[chunkhash:8].js'
    //     : isEnvDevelopment && 'static/js/bundle.js',
    //   // There are also additional JS chunk files if you use code splitting.
    //   chunkFilename: isEnvProduction
    //     ? 'static/js/[name].[chunkhash:8].chunk.js'
    //     : isEnvDevelopment && 'static/js/[name].chunk.js',
    //   // We inferred the "public path" (such as / or /my-project) from homepage.
    //   // We use "/" in development.
    //   publicPath: publicPath,
    //   // Point sourcemap entries to original disk location (format as URL on Windows)
    //   devtoolModuleFilenameTemplate: isEnvProduction
    //     ? info =>
    //         path
    //           .relative(paths.appSrc, info.absoluteResourcePath)
    //           .replace(/\\/g, '/')
    //     : isEnvDevelopment &&
    //       (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    // },
    // optimization: {
    //   minimize: isEnvProduction,
    //   minimizer: [
    //     // This is only used in production mode
    //     new TerserPlugin({
    //       terserOptions: {
    //         parse: {
    //           // we want terser to parse ecma 8 code. However, we don't want it
    //           // to apply any minfication steps that turns valid ecma 5 code
    //           // into invalid ecma 5 code. This is why the 'compress' and 'output'
    //           // sections only apply transformations that are ecma 5 safe
    //           // https://github.com/facebook/create-react-app/pull/4234
    //           ecma: 8,
    //         },
    //         compress: {
    //           ecma: 5,
    //           warnings: false,
    //           // Disabled because of an issue with Uglify breaking seemingly valid code:
    //           // https://github.com/facebook/create-react-app/issues/2376
    //           // Pending further investigation:
    //           // https://github.com/mishoo/UglifyJS2/issues/2011
    //           comparisons: false,
    //           // Disabled because of an issue with Terser breaking valid code:
    //           // https://github.com/facebook/create-react-app/issues/5250
    //           // Pending futher investigation:
    //           // https://github.com/terser-js/terser/issues/120
    //           inline: 2,
    //         },
    //         mangle: {
    //           safari10: true,
    //         },
    //         output: {
    //           ecma: 5,
    //           comments: false,
    //           // Turned on because emoji and regex is not minified properly using default
    //           // https://github.com/facebook/create-react-app/issues/2488
    //           ascii_only: true,
    //         },
    //       },
    //       // Use multi-process parallel running to improve the build speed
    //       // Default number of concurrent runs: os.cpus().length - 1
    //       parallel: true,
    //     }),
    //     // This is only used in production mode
    //     new OptimizeCSSAssetsPlugin({
    //       cssProcessorOptions: {
    //         parser: safePostCssParser,
    //         map: shouldUseSourceMap
    //           ? {
    //               // `inline: false` forces the sourcemap to be output into a
    //               // separate file
    //               inline: false,
    //               // `annotation: true` appends the sourceMappingURL to the end of
    //               // the css file, helping the browser find the sourcemap
    //               annotation: true,
    //             }
    //           : false,
    //       },
    //     }),
    //   ],
    //   // Automatically split vendor and commons
    //   // https://twitter.com/wSokra/status/969633336732905474
    //   // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    //   splitChunks: {
    //     chunks: 'all',
    //     name: false,
    //   },
    //   // Keep the runtime chunk separated to enable long term caching
    //   // https://twitter.com/wSokra/status/969679223278505985
    //   runtimeChunk: true,
    // },
    // resolveLoader: {
    //   plugins: [
    //     // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
    //     // from the current package.
    //     PnpWebpackPlugin.moduleLoader(module),
    //   ],
    // },
    module: {
      rules: [
        // Process application JS with Babel.
        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', {runtime:"automatic"}],
              ]
            }
          }
        },
        { 
          test: /\.css$/i,                
          use: [                  {                    
            loader: MiniCssExtractPlugin.loader,                                       
            options: { publicPath: "" },
          },                  
          "css-loader",                                                  
          ],              
        },
        {
          test: /\.(png|jpe?g|svg)$/i,
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        }
      ],
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        template: paths.appHtml,
      }),
    ]
  };
};
