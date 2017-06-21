/**
 * @file
 * Created by Zhangyunlu on 16/8/8.
 * Just product file
 */
var webpack = require('webpack');
var path = require('path');

// 引入webpack基本文件
var webpackConfig = require('./webpack.prod.config');
var shell = require('shelljs');

var assetsPath = path.join(path.resolve(__dirname, '../dist'), '');

// 静态文件直接打包
shell.rm('-rf', assetsPath);
shell.mkdir('-p', assetsPath);
shell.cp('-R', 'static/', assetsPath);

webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
});