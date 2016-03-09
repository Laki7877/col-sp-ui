'use strict'
// App Start here
var angular = require('angular')
var bulk = require('bulk-require')(__dirname, ['controllers/*.js', 'services/*.js', 'helpers/*.js',
  'directives/*.js', 'filters/*.js', 'libs/*.js', 'template-options/*.js'
])
var config = require('./config')
var route = require('./route')
var template = require('./template')

// External dependencies
global._ = require('lodash')
require('angular-clipboard')
require('angular-ui-bootstrap')
require('angular-animate')
require('angular-file-upload')
require('angular-ui-tree')
require('angular-base64')
require('angular-sanitize')
require('angular-scroll')
require('angular-cookies')
require('angular-bootstrap-datetimepicker')
require('ng-file-upload')
require('ui-select/dist/select.js')
require('angular-chart.js')

// Nc package
require('./modules/nc')
require('./modules/product-detail')

// Internal dependencies
var controllers = bulk.controllers
var services = bulk.services
var helpers = bulk.helpers
var directives = bulk.directives
var filters = bulk.filters

var app = angular.module('colspApp', ['ngPatternRestrict',
  'nc', 'ui.bootstrap.datetimepicker',
  'duScroll', 'ngSanitize', 'ngAnimate',
  'angularFileUpload', 'angular-clipboard', 'ui.tree', 'ui.select',
  'ui.bootstrap', 'base64', 'ngCookies', 'chart.js', 'productDetail', 'ngFileUpload'
])

  // App config
  .config(['uiSelectConfig', '$ncPaginationProvider', '$ncAlertProvider',
    function (uiSelectConfig, $ncPaginationProvider, $ncAlertProvider) {
      $ncPaginationProvider.paginationSizes = [10, 20, 50, 100]
      uiSelectConfig.taggingTokens = '[ENTER|,]'
    }
  ])

  // App template cache load
  .run(template)

  // Configuration
  .value('config', config)
  .value('route', route)
  .value('$templateOptionsCache', bulk['template-options'])

  // Helpers
  .factory('common', helpers.common)
  .factory('storage', helpers.storage)
  .factory('util', helpers.util)
  .factory('base64', helpers.base64)

  // Services
  .factory('Product', services.product)
  .factory('ProductReviewService', services.productReviewService)
  .factory('ImageService', services.imageService)
  .factory('FileService', services.fileService)
  .factory('CouponService', services.coupon)
  .factory('Category', services.category)
  .factory('Shop', services.shop)
  .factory('LocalCategory', services.localCategory)
  .factory('LocalCategoryService', services.localCategoryService)
  .factory('GlobalCategory', services.globalCategory)
  .factory('GlobalCategoryService', services.globalCategoryService) // newer version
  .factory('Attribute', services.attribute)
  .factory('AttributeService', services.attributeService) // newer version
  .factory('AttributeSet', services.attributeSet)
  .factory('AttributeSetService', services.attributeSetService) // newer version
  .factory('Brand', services.brand)
  .factory('BrandService', services.brandService) // newer version
  .factory('InventoryService', services.inventoryService) // newer version
  .factory('SellerAccountService', services.sellerAccountService)
  .factory('SellerRoleService', services.sellerRoleService)
  .factory('SellerPermissionService', services.sellerPermissionService)
  .factory('AdminAccountService', services.adminAccountService)
  .factory('AdminRoleService', services.adminRoleService)
  .factory('AdminPermissionService', services.adminPermissionService)
  .factory('AdminShopService', services.adminShopService)
  .factory('AdminShoptypeService', services.adminShoptypeService)
  .factory('ShopPermissionService', services.shopPermissionService)
  .factory('NewsletterService', services.newsletterService)
  .factory('VariantPair', helpers.variantPair)
  .factory('Alert', services.alert)
  .factory('Blocker', services.blocker)
  .factory('Credential', services.credential)
  .factory('$exceptionHandler', services.exceptionHandler)
  .factory('KnownException', services.knownException)
  .factory('OnTopCreditService', services.OnTopCreditService)
  .factory('OnTopCredit', services.OnTopCredit)
  .factory('Onboarding', services.Onboarding)

  // Directives
  .directive('ncTradableSelect', directives.ncTradableSelect)
  .directive('ngPermission', directives.ngPermission)
  .directive('ngDelegate', directives.ngDelegate)
  .directive('ngCkeditor', directives.ngCkeditor)
  .directive('ngSlideToggle', directives.ngSlideToggle)
  .directive('ngTemplate', directives.ngTemplate)
  .directive('ngMatch', directives.ngMatch)
  .directive('ngMinnumber', directives.ngMinnumber)
  .directive('ngMaxnumber', directives.ngMaxnumber)
  .directive('ngDateBefore', directives.ngDateBefore)

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
  .controller('SellerProductDetailCtrl', controllers.sellerProductDetail)
  .controller('ProductImageManagementCtrl', controllers.productImageManagement)
  .controller('ProductAddSelectCategoryCtrl', controllers.productAddSelectCategory)
  .controller('ProductListLocalCategoryCtrl', controllers.productListLocalCategory)
  .controller('ProductImportCtrl', controllers.productImport)
  .controller('ProductReviewCtrl', controllers.productReview)
  .controller('ProductExportCtrl', controllers.productExport)

  .controller('LocalCategoryCtrl', controllers.localCategory)
  .controller('SellerShopSettingCtrl', controllers.sellerShopSetting)
  .controller('SellerAccountCtrl', controllers.sellerAccount)
  .controller('SellerAccountAddCtrl', controllers.sellerAccountAdd)
  .controller('SellerRoleCtrl', controllers.sellerRole)
  .controller('SellerRoleAddCtrl', controllers.sellerRoleAdd)
  .controller('SellerShopSettingCtrl', controllers.sellerShopSetting)
  .controller('SellerInventoryListCtrl', controllers.sellerInventoryList)
  .controller('SellerOnboardingCtrl', controllers.sellerOnboarding)
  .controller('SellerNewsletterCtrl', controllers.sellerNewsletter)

  .controller('AdminAttributeCtrl', controllers.adminAttribute)
  .controller('AdminAttributeSetCtrl', controllers.adminAttributeSet)
  .controller('AdminAttributeAddCtrl', controllers.adminAttributeAdd)
  .controller('AdminAttributeSetAddCtrl', controllers.adminAttributeSetAdd)
  .controller('AdminCategoryCtrl', controllers.adminCategory)
  .controller('AdminBrandCtrl', controllers.adminBrand)
  .controller('AdminBrandAddCtrl', controllers.adminBrandAdd)
  .controller('AdminAccountCtrl', controllers.adminAccount)
  .controller('AdminAccountAddCtrl', controllers.adminAccountAdd)
  .controller('AdminRoleCtrl', controllers.adminRole)
  .controller('AdminRoleAddCtrl', controllers.adminRoleAdd)
  .controller('AdminShopCtrl', controllers.adminShop)
  .controller('AdminShopAddCtrl', controllers.adminShopAdd)
  .controller('AdminShoptypeCtrl', controllers.adminShoptype)
  .controller('AdminShoptypeAddCtrl', controllers.adminShoptypeAdd)
  .controller('AdminCouponCtrl', controllers.adminCoupon)
  .controller('AdminCouponAddCtrl', controllers.adminCouponAdd)

  .controller('AdminProductApprovalListCtrl', controllers.adminProductApprovalList)
  .controller('AdminProductListCtrl', controllers.adminProductList)
  .controller('AdminProductDetailCtrl', controllers.adminProductDetail)

  .controller('LoginCtrl', controllers.login)
  .controller('AbstractListCtrl', controllers.abstractList)
  .controller('AbstractAdvanceListCtrl', controllers.abstractAdvanceList)
  .controller('AbstractAddCtrl', controllers.abstractAdd)

  .controller('AdminOnTopCreditCtrl', controllers.adminOnTopCreditAdd)
  .controller('AdminOnTopCreditListCtrl', controllers.adminOnTopCreditList)

  .controller('TestCtrl', controllers.test)
