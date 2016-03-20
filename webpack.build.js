'use strict';

var webpack = require('webpack');
var bourbon = require('node-bourbon').includePaths;
var config = require('./webpack.config.js');

config.devtool = 'source-map';
config.entry = {
  'sanji-ui': './component/index.js'
};
config.output.filename = 'sanji-auth-ui.js';
config.output.libraryTarget = 'umd';
config.output.library = 'sjAuth';
config.externals = {
  angular: {
    root: 'angular',
    commonjs2: 'angular',
    commonjs: 'angular',
    amd: 'angular'
  },
  'angular-cookies': {
    root: 'ngCookies',
    commonjs2: 'angular-cookies',
    commonjs: 'angular-cookies',
    amd: 'angular-cookies'
  },
  'angular-http-auth': {
    root: 'angularHttpAuth',
    commonjs2: 'angular-http-auth',
    commonjs: 'angular-http-auth',
    amd: 'angular-http-auth'
  },
  'sanji-rest-ui': {
    root: 'sjRest',
    commonjs2: 'sanji-rest-ui',
    commonjs: 'sanji-rest-ui',
    amd: 'sanji-rest-ui'
  }
};

config.plugins.push(
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
);
module.exports = config;
