'use strict';
//App Start here
var angular = require('angular');
var bulk = require('bulk-require')(__dirname, ['controllers/*.js', 'services/*.js', 'helpers/*.js', 'directives/*.js', 'filters/*.js']);
var config = require('./config');

//External dependencies
require('angular-file-upload');
require('angular-base64');

//Internal dependencies
var controllers = bulk.controllers;
var services = bulk.services;
var helpers = bulk.helpers;
var directives = bulk.directives;
var filters = bulk.filters;

var app = angular.module('colspApp', ['angularFileUpload', 'base64'])

//App init
.run(['$base64', 'storage', function($base64, storage) {
	//TODO: login page
	storage.storeSessionToken($base64.encode('duckvader:vader'));
}])
//Configuration
.value('config', config)

//Helpers
.factory('common', helpers.common)
.factory('storage', helpers.storage)
.factory('util', helpers.util)
.factory('base64', helpers.base64)

//Services
.factory('Product', services.product)
.factory('Image', services.image)
.factory('Category', services.category)
.factory('Shop', services.shop)
.factory('LocalCategory', services.localCategory)
.factory('GlobalCategory', services.globalCategory)
.factory('AttributeSet', services.attributeSet)
.factory('Brand', services.brand)
.factory('VariantPair', helpers.variantPair)
//Directives
.directive('ngDelegate', directives.ngDelegate)

//Filters
.filter('capitalize', filters.capitalize)
.filter('ordinal', filters.ordinal)

//Controllers
.controller('ProductListCtrl', controllers.productList)
.controller('ProductAddCtrl', controllers.productAdd)
.controller('ProductSelectCatCtrl', controllers.productSelectCat);
