//App Start here
var angular = require('angular');
require('angular-sanitize');
require('ui-select');

var bulk = require('bulk-require')(__dirname, [
  'controllers/*.js', 'services/*.js', 'helpers/*.js'
]);
var config = require('./config');

var controllers = bulk.controllers;
var services = bulk.services;
var helpers = bulk.helpers;

var app = angular.module('colspApp', ['ui.select', 'ngSanitize'])

// Configuration
.value('config', config)

// Services
.factory('common', helpers.common)
.factory('storage', helpers.storage)
.factory('util', helpers.util)
.factory('base64', helpers.base64)
.factory('Products', services.products)

// Controllers
.controller('ProductListCtrl', controllers.products_list)
.controller('ProductAddCtrl', controllers.products_add);
