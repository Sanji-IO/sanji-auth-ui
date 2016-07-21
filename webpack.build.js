'use strict';

var webpack = require('webpack');
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
  'angular-local-storage': {
    root: 'LocalStorageModule',
    commonjs2: 'angular-local-storage',
    commonjs: 'angular-local-storage',
    amd: 'angular-local-storage'
  },
  'sanji-rest-ui': {
    root: 'sjRest',
    commonjs2: 'sanji-rest-ui',
    commonjs: 'sanji-rest-ui',
    amd: 'sanji-rest-ui'
  }
};

config.module.postLoaders = [
  {test: /\.js$/, loader: 'ng-annotate', exclude: /(node_modules)/}
];

config.plugins.push(
  new webpack.optimize.DedupePlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    }
  })
);
module.exports = config;
