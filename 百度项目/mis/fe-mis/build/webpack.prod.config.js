/**
 * @file
 * Created by Zhangyunlu on 16/8/8.
 * Just production webpack config
 */
var webpack = require('webpack');
var config = require('./webpack.base.config');
var merge = require('webpack-merge');
var utils = require('./util');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = merge(config, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: true,
            extract: true
        })
    },
    // devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './' + utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: true,
            extract: true
        })
    },
    plugins: [
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource
                    && /\.js$/.test(module.resource)
                    && module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunks: ['app', 'vendor', 'manifest']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        })
    ]
});

module.exports = webpackConfig;