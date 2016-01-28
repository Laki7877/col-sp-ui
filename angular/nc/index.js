var angular = require('angular');

require('angular-ui-bootstrap');
require('ui-select');
global.jQuery = require('jquery');
global.$ = require('jquery');
global._ = require('lodash');

angular.module('nc', ['ui.bootstrap', 'ui.select']);

require('bulk-require')(__dirname, ['./**/*.js']);
require('./template.js');