var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();
var cors = require('cors');

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 8080;
var publicPath = path.resolve(__dirname, 'app/client');
var config = require('./webpack.config');

app.use(express.static(publicPath));

if (!isProduction) {
  var bundle = require('./server.bundle.js');
  bundle();

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
 
  app.use('/',cors(), require('./api/server')(express)); 
  app.all(config.output.publicPath+'*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:3000'
    });
  });

}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});