var angular = require('angular');


angular.module('productDetail', []);

require('bulk-require')(__dirname, ['./**/*.js']);
require('./template.js');