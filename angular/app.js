'use strict';
//App Start here
var angular = require('angular');
var bulk = require('bulk-require')(__dirname, 
	['controllers/*.js', 'services/*.js', 'helpers/*.js', 
	'directives/*.js', 'filters/*.js', 'libs/*.js']);
var config = require('./config');
var template = require('./template');

//External dependencies
global._ = require('lodash');
require('angular-ui-bootstrap');
require('angular-animate');
require('angular-file-upload');
require('angular-ui-tree');
require('angular-base64');
require('angular-sanitize');
require('angular-scroll');
require('angular-bootstrap-datetimepicker');
require('ui-select');

//Nc package
require('./nc');

//Internal dependencies
var controllers = bulk.controllers;
var services = bulk.services;
var helpers = bulk.helpers;
var directives = bulk.directives;
var filters = bulk.filters;

var app = angular.module('colspApp', ['ngPatternRestrict', 'nc','ui.bootstrap.datetimepicker', 'duScroll','ngSanitize','ui.select', 'ngAnimate', 'angularFileUpload', 'ui.tree', 'ui.select', 'ui.bootstrap', 'base64'])

//App config
.config(['$uibTooltipProvider', 'uiSelectConfig', '$ncPaginationProvider', '$ncAlertProvider', function($tooltipProvider, uiSelectConfig, $ncPaginationProvider, $ncAlertProvider) {

	//Default close tooltip when click again
	$tooltipProvider.setTriggers({
		'clickanystart' : 'clickanyend'
	});
	$tooltipProvider.options({
		trigger: 'clickanystart'
	});
	$ncPaginationProvider.paginationSizes = [10, 20, 50, 100];
	uiSelectConfig.taggingTokens = '[ENTER|,]';

}])

//App template cache load
.run(template)

//App init
.run(['$rootScope', 'storage', '$window', '$location', function($rootScope, storage, $window, $location) {
	
	$rootScope.Profile = storage.getCurrentUserProfile();
	$rootScope.Imposter = storage.getImposterProfile();

	if(!$rootScope.Profile && $window.location.pathname != "/login"){
		storage.put('redirect', $window.location.pathname);
		$window.location.href = "/login";
	}

	//Create generic form validator functions
	$rootScope.isInvalid = function(form) {
		if(angular.isDefined(form) && 
			angular.isDefined(form.$invalid) && 
			angular.isDefined(form.$dirty)) {
			return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
		}
		return false;
	};

	
	//Prevent image dragdrop on other elements
	$window.addEventListener("dragover",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);
	$window.addEventListener("drop",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);

	//Match route with
	$rootScope.isUrl = function(url) {
		if(url.length > 0) {
			var path = $window.location.pathname;
			if(path == url) {
				return true;
			} else if (path.startsWith(url) && path.charAt(url.length) != '/') {
				return false;
			} else  {
				return path.startsWith(url);
			}
		} else {
			return false;
		}
	};

	$rootScope.activeParentUrl = function(url,sub) {
		return {
			'active': $rootScope.isUrl(url)
		};
	};

	//For active class url
	$rootScope.activeUrl = function(url) {
		return {
			'active': $window.location.pathname == url
		};
	};
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
.factory('Attribute', services.attribute)
.factory('AttributeService', services.attributeService) //newer version
.factory('AttributeSet', services.attributeSet)
.factory('AttributeSetService', services.attributeSetService) //newer version
.factory('Brand', services.brand)
.factory('SellerAccountService', services.sellerAccountService)
.factory('SellerRoleService', services.sellerRoleService)
.factory('SellerPermissionService', services.sellerPermissionService)
.factory('AdminAccountService', services.adminAccountService)
.factory('AdminRoleService', services.adminRoleService)
.factory('AdminPermissionService', services.adminPermissionService)
.factory('AdminShopService', services.adminShopService)
.factory('AdminShoptypeService', services.adminShoptypeService)
.factory('ShopPermissionService', services.shopPermissionService)
.factory('VariantPair', helpers.variantPair)
.factory('Alert', services.alert)
.factory('Blocker', services.blocker)
.factory('Credential', services.credential)

//Directives
.directive('ncTradableSelect', directives.ncTradableSelect)
.directive('ngDelegate', directives.ngDelegate)
.directive('ngCkeditor', directives.ngCkeditor)
.directive('ngSlideToggle', directives.ngSlideToggle)
.directive('ngTemplate', directives.ngTemplate)
.directive('uiSelectMaxlength', directives.uiSelectMaxlength)
.directive('ngMatch', directives.ngMatch)
.directive('ngMinnumber', directives.ngMinnumber)
.directive('ngMaxnumber', directives.ngMaxnumber)
.directive('popoverAny', directives.popoverAny)

//Filters
.filter('capitalize', filters.capitalize)
.filter('ordinal', filters.ordinal)
.filter('html', filters.html)
.filter('truth', filters.truth)
.filter('exclude', filters.exclude)
.filter('excludeCategory', filters.excludeCategory)
.filter('truncate', filters.truncate)
.filter('slice', filters.slice)
.filter('leadingzero', filters.leadingzero)

//Controllers
.controller('RootCtrl', controllers.root)
.controller('ProductListCtrl', controllers.productList)
.controller('ProductAddCtrl', controllers.productAdd)
.controller('ProductImageManagementCtrl', controllers.productImageManagement)
.controller('ProductAddSelectCategoryCtrl', controllers.productAddSelectCategory)
.controller('ProductListLocalCategoryCtrl', controllers.productListLocalCategory)
.controller('ProductImportCtrl', controllers.productImport)
.controller('LocalCategoryCtrl', controllers.localCategory)
.controller('SellerAccountCtrl', controllers.sellerAccount)
.controller('SellerAccountAddCtrl', controllers.sellerAccountAdd)
.controller('SellerRoleCtrl', controllers.sellerRole)
.controller('SellerRoleAddCtrl', controllers.sellerRoleAdd)
.controller('AdminAttributeCtrl', controllers.adminAttribute)
.controller('AdminAttributeSetCtrl', controllers.adminAttributeSet)
.controller('AdminAttributeAddCtrl', controllers.adminAttributeAdd)
.controller('AdminAttributeSetAddCtrl', controllers.adminAttributeSetAdd)
.controller('AdminCategoryCtrl', controllers.adminCategory)
.controller('AdminBrandCtrl',controllers.adminBrand)
.controller('AdminBrandAddCtrl', controllers.adminBrandAdd)
.controller('AdminAccountCtrl', controllers.adminAccount)
.controller('AdminAccountAddCtrl', controllers.adminAccountAdd)
.controller('AdminRoleCtrl', controllers.adminRole)
.controller('AdminRoleAddCtrl', controllers.adminRoleAdd)
.controller('AdminShopCtrl', controllers.adminShop)
.controller('AdminShopAddCtrl', controllers.adminShopAdd)
.controller('AdminShoptypeCtrl', controllers.adminShoptype)
.controller('AdminShoptypeAddCtrl', controllers.adminShoptypeAdd)
.controller('LoginCtrl', controllers.login)
.controller('AbstractListCtrl', controllers.abstractList)
.controller('AbstractAddCtrl', controllers.abstractAdd)

.controller('TestCtrl', controllers.test)
