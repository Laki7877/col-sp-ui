var angular = require('angular');

angular.module('widget', ['builder', 'builder.components', 'validator.rules']);

require('bulk-require')(__dirname, ['./**/*.js']);
require('./template.js');