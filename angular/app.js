'use strict';
//App Start here
var angular = require('angular');
var bulk = require('bulk-require')(__dirname, 
	['controllers/*.js', 'services/*.js', 'helpers/*.js', 
	'directives/*.js', 'filters/*.js', 'adapters/*.js']);
var config = require('./config');
var template = require('./template');

//External dependencies
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-file-upload');
require('angular-ui-tree');
require('angular-base64');

//Internal dependencies
var controllers = bulk.controllers;
var services = bulk.services;
var helpers = bulk.helpers;
var directives = bulk.directives;
var filters = bulk.filters;
var adapters = bulk.adapters;

var app = angular.module('colspApp', ['ngAnimate', 'angularFileUpload', 'ui.tree', 'base64', 'ui.bootstrap'])

//App config
.config(['$uibTooltipProvider', function($tooltipProvider) {
	//Default close tooltip when click again
	$tooltipProvider.setTriggers({
		'clickanystart' : 'clickanyend'
	});
	$tooltipProvider.options({
		trigger: 'clickanystart'
	});
}])

//App template cache load
.run(template)

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
.factory('productProxy', helpers.productProxy)

//Services
.factory('Product', services.product)
.factory('Image', services.image)
.factory('Category', services.category)
.factory('Shop', services.shop)
.factory('LocalCategory', services.localCategory)
.factory('GlobalCategory', services.globalCategory)
.factory('Attribute', services.attribute)
.factory('AttributeSet', services.attributeSet)
.factory('Brand', services.brand)
.factory('VariantPair', helpers.variantPair)
.factory('brandAdapter', adapters.brand)
.factory('simpleTagAdapter', adapters.simpleTags)
//Directives
.directive('ncTradableSelect', directives.ncTradableSelect)
.directive('ngDelegate', directives.ngDelegate)
.directive('ngCkeditor', directives.ngCkeditor)
.directive('ngSlideToggle', directives.ngSlideToggle)
.directive('ngTemplate', directives.ngTemplate)
.directive('popoverAny', directives.popoverAny)

//Filters
.filter('capitalize', filters.capitalize)
.filter('ordinal', filters.ordinal)

//Controllers
.controller('ProductListCtrl', controllers.productList)
.controller('ProductAddCtrl', controllers.productAdd)
.controller('ProductAddSelectCategoryCtrl', controllers.productAddSelectCategory)
.controller('ProductListLocalCategoryCtrl', controllers.productListLocalCategory)
.controller('LocalCategoryCtrl', controllers.localCategory)
.controller('AdminAttributeCtrl', controllers.adminAttribute)
.controller('AdminAttributeSetCtrl', controllers.adminAttributeSet)
.controller('AdminAttributeAddCtrl', controllers.adminAttributeAdd)
.controller('AdminAttributeSetAddCtrl', controllers.adminAttributeSetAdd)
.controller('AdminCategoryCtrl', controllers.adminCategory);
