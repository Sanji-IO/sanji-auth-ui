const webpack = require('webpack');
const config = require('./webpack.config.js');

config.devtool = 'source-map';
config.entry = {
  'sanji-ui': './component/index.js'
};
config.output.filename = 'sanji-auth-ui.js';
config.output.libraryTarget = 'umd';
config.output.library = 'sjAuth';
config.externals = ['angular', 'angular-cookies', 'angular-http-auth', 'angular-local-storage', 'sanji-rest-ui'];

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      dead_code: true
    }
  })
);
module.exports = config;
