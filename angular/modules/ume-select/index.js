var angular = require('angular');


angular.module('umeSelect', []);

require('bulk-require')(__dirname, ['./**/*.js']);
require('./template.js');