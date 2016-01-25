require('./vendor.js');
require('./config.js');
require('bulk-require')(__dirname, ['**/*.js']);

angular.module('app', []);