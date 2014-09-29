/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  if ('production' === env) {
    app.set('views', config.root + '/public/');
    app.set('appPath', config.root + '/public/');
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use('/app', express.static(path.join(config.root, 'public/app')));
    app.use('/bower_components', express.static(path.join(config.root, 'public/bower_components')));
    app.use('/robots.txt', function(req, res, next) {
      res.sendfile(path.join(config.root, 'public/robots.txt'));
    });
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.set('views', config.root + '/client/');
    app.set('appPath', config.root + '/client/');
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use('/app', express.static(path.join(config.root, 'client/app')));
    app.use('/bower_components', express.static(path.join(config.root, 'client/bower_components')));
    app.use('/robots.txt', function(req, res, next) {
      res.sendfile(path.join(config.root, 'client/robots.txt'));
    });
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};