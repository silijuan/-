/**
 * @file
 * Created by Zhangyunlu on 16/8/8.
 * Just start a server for production
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var webpack = require('webpack');
var proxy = require('http-proxy-middleware');
var url = require('url');
var querystring = require('querystring');
var webpackConfig = require('./webpack.prod.config.js');

// default port where dev server listens for incoming traffic
var port = 8001;


var app = express();
// serve pure static assets
app.use('/static', express.static('./static'));
app.use('/fonts', express.static('./fonts'));

// serve pure static jsonp
app.get('/api/:id', function (req, res, next) {

    var urlPath = url.parse(req.url).pathname;
    var cbname = querystring.parse(req.url.split('?')[1]);

    var filepath = path.join(__dirname, '../api/') + req.params.id + '.json';
    fs.readFile(filepath, function (err, data) {
        if (err) {
            throw err;
        }
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        var context = cbname.callback + '(' + data + ')';
        res.end(context);
    });

});

var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + port + '\n');
});