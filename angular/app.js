'use strict'
// App Start here
var angular = require('angular')
var bulk = require('bulk-require')(__dirname, ['controllers/*.js', 'services/*.js', 'helpers/*.js',
  'directives/*.js', 'filters/*.js', 'libs/*.js', 'template-options/*.js'
])
var config = require('./config')
var route = require('./route')
var template = require('./template')
var skeemas = require('skeemas');

// External dependencies
global._ = require('lodash')
global.pluralize = require('pluralize');
require('angular-clipboard')
require('angular-ui-bootstrap')
require('angular-animate')
require('angular-file-upload')
require('angular-ui-tree')
require('angular-base64')
require('angular-sanitize')
require('angular-scroll')
require('angular-cookies')
require('angular-aria')
require('angular-material')
require('angular-bootstrap-datetimepicker')
require('ng-file-upload')
require('ui-select/dist/select.js')
require('angular-chart.js')
require('angular-input-masks')

// Nc package
require('./modules/nc')
require('./modules/angular-print')
require('./modules/product-detail')
require('./modules/schematics')

// Internal dependencies
var controllers = bulk.controllers
var services = bulk.services
var helpers = bulk.helpers
var directives = bulk.directives
var filters = bulk.filters

var app = angular.module('colspApp', ['ngPatternRestrict',
  'nc', 'ui.bootstrap.datetimepicker',
  'duScroll', 'ngSanitize', 'ngAnimate', 'ngMaterial',
  'angularFileUpload', 'angular-clipboard', 'ui.tree', 'ui.select',
  'ui.bootstrap', 'base64', 'ngCookies', 'chart.js', 'productDetail', 'ngFileUpload',
  'ui.sortable',
  'dndLists'
])

  // App config
  .config(function (uiSelectConfig, $ncPaginationProvider, $ncAlertProvider) {
      'ngInject';
      $ncPaginationProvider.paginationSizes = [10, 20, 50, 100];
      uiSelectConfig.taggingTokens = '[ENTER|,]';
    }
  )

  // App template cache load
.run(template)

  // Configuration
  .value('config', config)
.value('route', route)
  .value('$templateOptionsCache', bulk['template-options'])

  // Helpers
  .factory('base64', helpers.base64)
.factory('common', helpers.common)
  .factory('skeemas', skeemas)
.factory('storage', helpers.storage)
.factory('util', helpers.util)

  // Services
  .factory('$exceptionHandler', services.exceptionHandler)
  .factory('AdminAccountService', services.adminAccountService)
  .factory('AdminMasterProductService', services.adminMasterProductService) // newer version
  .factory('AdminPermissionService', services.adminPermissionService)
  .factory('AdminRoleService', services.adminRoleService)
  .factory('AdminShopService', services.adminShopService)
  .factory('AdminShoptypeService', services.adminShoptypeService)
  .factory('Alert', services.alert)
.factory('Attribute', services.attribute)
  .factory('AttributeService', services.attributeService) // newer version
.factory('AttributeSet', services.attributeSet)
  .factory('AttributeSetService', services.attributeSetService) // newer version
  .factory('Blocker', services.blocker)
.factory('Brand', services.brand)
  .factory('BrandService', services.brandService) // newer version
  .factory('Category', services.category)
  .factory('Credential', services.credential)
  .factory('Dashboard', services.Dashboard)
  .factory('FileService', services.fileService)
  .factory('GlobalCategory', services.globalCategory)
  .factory('GlobalCategoryService', services.globalCategoryService) // newer version
  .factory('GlobalCouponService', services.globalCouponService)
  .factory('ImageService', services.imageService)
  .factory('InventoryService', services.inventoryService) // newer version
  .factory('KnownException', services.knownException)
  .factory('LocalCategory', services.localCategory)
  .factory('LocalCategoryService', services.localCategoryService)
  .factory('NewsletterService', services.newsletterService)
  .factory('Onboarding', services.Onboarding)
  .factory('OnTopCredit', services.OnTopCredit)
  .factory('OnTopCreditService', services.OnTopCreditService)
  .factory('OrderService', services.orderService)
  .factory('Product', services.product)
  .factory('ProductReviewService', services.productReviewService)
.factory('SellerAccountService', services.sellerAccountService)
  .factory('SellerCouponService', services.sellerCouponService)
  .factory('SellerPermissionService', services.sellerPermissionService)
  .factory('ReturnRequestService', services.returnRequestService)
.factory('SellerRoleService', services.sellerRoleService)
  .factory('Shop', services.shop)
  .factory('ShopAppearanceService', services.shopAppearanceService)
.factory('ShopPermissionService', services.shopPermissionService)
  .factory('ShopProfileService', services.shopProfileService)
  .factory('ProductTempService', services.productTempService)

  // Directives
.directive('ncTradableSelect', directives.ncTradableSelect)
  .directive('ngCkeditor', directives.ngCkeditor)
  .directive('ngDateBefore', directives.ngDateBefore)
  .directive('ngDelegate', directives.ngDelegate)
  .directive('ngMatch', directives.ngMatch)
  .directive('ngMaxnumber', directives.ngMaxnumber)
  .directive('ngMinnumber', directives.ngMinnumber)
.directive('ngPermission', directives.ngPermission)
.directive('ngSlideToggle', directives.ngSlideToggle)
.directive('ngTemplate', directives.ngTemplate)

  // Filters
.filter('capitalize', filters.capitalize)
.filter('ordinal', filters.ordinal)
.filter('html', filters.html)
.filter('truth', filters.truth)
.filter('exclude', filters.exclude)
.filter('excludeCategory', filters.excludeCategory)
.filter('truncate', filters.truncate)
.filter('slice', filters.slice)
.filter('leadingzero', filters.leadingzero)
.filter('variantValue', filters.variantValue)
.filter('importGuidelineExample', filters.importGuidelineExample)

  // Controllers
.controller('RootCtrl', controllers.root)
.controller('IndexCtrl', controllers.index)
.controller('ProductListCtrl', controllers.productList)
.controller('ProductImageManagementCtrl', controllers.productImageManagement)
.controller('ProductAddSelectCategoryCtrl', controllers.productAddSelectCategory)
.controller('ProductListLocalCategoryCtrl', controllers.productListLocalCategory)
.controller('ProductImportCtrl', controllers.productImport)
.controller('ProductReviewCtrl', controllers.productReview)
.controller('ProductExportCtrl', controllers.productExport)

.controller('LocalCategoryCtrl', controllers.localCategory)
  .controller('SellerProductDetailCtrl', controllers.sellerProductDetail)
.controller('SellerShopSettingCtrl', controllers.sellerShopSetting)
.controller('SellerAccountCtrl', controllers.sellerAccount)
.controller('SellerAccountAddCtrl', controllers.sellerAccountAdd)
.controller('SellerRoleCtrl', controllers.sellerRole)
.controller('SellerRoleAddCtrl', controllers.sellerRoleAdd)
.controller('SellerShopSettingCtrl', controllers.sellerShopSetting)
  .controller('SellerShopAppearanceCtrl', controllers.sellerShopAppearance)
.controller('SellerInventoryListCtrl', controllers.sellerInventoryList)
  .controller('SellerOnboardingCtrl', controllers.sellerOnboarding)
  .controller('SellerNewsletterCtrl', controllers.sellerNewsletter)
  .controller('SellerDashboardCtrl', controllers.sellerDashboard)
  .controller('SellerCouponCtrl', controllers.sellerCoupon)
  .controller('SellerCouponAddCtrl', controllers.sellerCouponAdd)
  .controller('SellerReturnRequestCtrl', controllers.sellerReturnRequest)
  .controller('SellerReturnRequestAddCtrl', controllers.sellerReturnRequestAdd)
  .controller('SellerOrderCtrl', controllers.sellerOrder)
  .controller('SellerOrderAddCtrl', controllers.sellerOrderAdd)
  .controller('SellerPendingProductCtrl', controllers.sellerPendingProduct)
  .controller('SellerPendingProductsGroupCtrl', controllers.sellerPendingProductsGroup)


.controller('AdminAttributeCtrl', controllers.adminAttribute)
.controller('AdminAttributeSetCtrl', controllers.adminAttributeSet)
.controller('AdminAttributeAddCtrl', controllers.adminAttributeAdd)
.controller('AdminAttributeSetAddCtrl', controllers.adminAttributeSetAdd)
.controller('AdminCategoryCtrl', controllers.adminCategory)
.controller('AdminBrandCtrl', controllers.adminBrand)
.controller('AdminBrandAddCtrl', controllers.adminBrandAdd)
  .controller('AdminSellerAccountCtrl', controllers.adminSellerAccount)
.controller('AdminAccountCtrl', controllers.adminAccount)
.controller('AdminAccountAddCtrl', controllers.adminAccountAdd)
.controller('AdminRoleCtrl', controllers.adminRole)
.controller('AdminRoleAddCtrl', controllers.adminRoleAdd)
.controller('AdminShopCtrl', controllers.adminShop)
.controller('AdminShopAddCtrl', controllers.adminShopAdd)
.controller('AdminShoptypeCtrl', controllers.adminShoptype)
.controller('AdminShoptypeAddCtrl', controllers.adminShoptypeAdd)
  .controller('AdminGlobalCouponCtrl', controllers.adminGlobalCoupon)
  .controller('AdminGlobalCouponAddCtrl', controllers.adminGlobalCouponAdd)
  .controller('AdminSellerCouponCtrl', controllers.adminSellerCoupon)
  .controller('AdminSellerCouponAddCtrl', controllers.adminSellerCouponAdd)
  .controller('AdminNewsletterCtrl', controllers.adminNewsletter)
  .controller('AdminPendingProductCtrl', controllers.adminPendingProduct)
  .controller('AdminProductApprovalDetailCtrl', controllers.adminProductApprovalDetail)
.controller('AdminProductApprovalListCtrl', controllers.adminProductApprovalList)
.controller('AdminProductListCtrl', controllers.adminProductList)
  .controller('AdminProductDetailCtrl', controllers.adminProductDetail)
  .controller('AdminMasterProductCtrl', controllers.adminMasterProduct)
  .controller('AdminMasterProductAddCtrl', controllers.adminMasterProductAdd)

.controller('LoginCtrl', controllers.login)
  .controller('AdminLoginCtrl', controllers.adminLogin)
  
.controller('AbstractListCtrl', controllers.abstractList)
.controller('AbstractAdvanceListCtrl', controllers.abstractAdvanceList)
.controller('AbstractAddCtrl', controllers.abstractAdd)
  .controller('AbstractPendingProductGroupCtrl', controllers.abstractPendingProductGroup)

.controller('AdminOnTopCreditCtrl', controllers.adminOnTopCreditAdd)
.controller('AdminOnTopCreditListCtrl', controllers.adminOnTopCreditList)

.controller('TestCtrl', controllers.test)
