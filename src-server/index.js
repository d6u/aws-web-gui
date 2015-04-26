'use strict';

const express = require('express');
const config  = require('config');
const http    = require('http');
const morgan  = require('morgan');
const AWS     = require('aws-sdk');

AWS.config.update(config.get('aws.creds'));

const apiRouters = require('./api-v1');

const app = express();

app.set('x-powered-by', false);
app.use(morgan('dev'));

for (let i = 0; i < apiRouters.length; i++) {
  app.use('/api/v1', apiRouters[i]);
}

const webConf = config.get('web');

http.createServer(app).listen(webConf.port, webConf.hostname, function () {
  var host = webConf.hostname === '0.0.0.0' ? 'localhost' : webConf.hostname;
  console.log('Web server started');
  console.log(`Listening at http://${host}:${webConf.port}`);
});
