'use strict';
//App Start here
var angular = require('angular');
var bulk = require('bulk-require')(__dirname, ['controllers/*.js', 'services/*.js', 'helpers/*.js', 'directives/*.js']);
var config = require('./config');

//External dependencies
require('angular-file-upload');
require('angular-base64');

//Internal dependencies
var controllers = bulk.controllers;
var services = bulk.services;
var helpers = bulk.helpers;
var directives = bulk.directives;

var app = angular.module('colspApp', ['angularFileUpload', 'base64'])

//App init
.run(['$base64', 'storage', function($base64, storage) {
	//TODO: login page
	storage.storeSessionToken($base64.encode('duckvader:vader'));
}])
//Configuration
.value('config', config)

//Services
.factory('common', helpers.common)
.factory('storage', helpers.storage)
.factory('util', helpers.util)
.factory('base64', helpers.base64)
.factory('Product', services.product)
.factory('Image', services.image)

//Directives
.directive('ngDelegate', directives.ngDelegate)

//Controllers
.controller('ProductListCtrl', controllers.productList)
.controller('ProductAddCtrl', controllers.productAdd);
