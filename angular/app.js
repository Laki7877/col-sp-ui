'use strict'

// App Start here
var angular = require('angular');
var bulk = require('bulk-require')(__dirname, ['controllers/*.js', 'services/*.js', 'helpers/*.js',
  'directives/*.js', 'filters/*.js', 'libs/*.js', 'template-options/*.js'
]);
var config = require('./config');
var route = require('./route');
var template = require('./template');

// IE fix
require('./iefix.js');
require('./datefix.js');

// External dependencies
global._ = require('lodash')
global.pluralize = require('pluralize');
require('angular-animate')
// require('angular-aria')
require('angular-base64')
require('angular-bootstrap-datetimepicker')
require('angular-chart.js')
require('angular-clipboard')
require('angular-cookies')
require('angular-file-upload')
require('angular-input-masks')
require('angular-drag-and-drop-lists')
// require('angular-material')
require('angular-sanitize')
require('angular-scroll')
require('angular-ui-bootstrap')
require('angular-ui-tree')
require('ng-file-upload')
require('ui-select/dist/select.js')
require('angular-ui-sortable')
require('angular-drag-and-drop-lists')
require('angular-chart.js')
require('angular-input-masks')

// Nc package
require('./modules/angular-print')
require('./modules/angular-scroll')
require('./modules/angular-draggable')
require('./modules/nc')
require('./modules/product-detail')
require('./modules/schematics')
require('./modules/ume-select')


String.prototype.startsWith = String.prototype.startsWith || function() {

}

// Internal dependencies
var controllers = bulk.controllers;
var services = bulk.services;
var helpers = bulk.helpers;
var directives = bulk.directives;
var filters = bulk.filters;

var app = angular.module('colspApp', ['ngPatternRestrict', 'dndLists',
  'nc', 'ui.bootstrap.datetimepicker', 'ngDraggable',
  'duScroll', 'smoothScroll', 'ngSanitize', 'ngAnimate',
  'angularFileUpload', 'angular-clipboard', 'ui.tree', 'ui.select',
  'ui.bootstrap', 'base64', 'ngCookies', 'chart.js', 'productDetail', 'ngFileUpload',
  'schematics', 'AngularPrint', 'ui.utils.masks', 'umeSelect',
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
  .run([function(){

  }])

  // Configuration
  .value('config', config)
  .value('route', route)
  .value('$templateOptionsCache', bulk['template-options'])

  // Helpers
  .factory('base64', helpers.base64)
  .factory('common', helpers.common)
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
  .factory('ShippingService', services.shippingService) // newer version
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
  .factory('ShopService', services.shopService)
  .factory('ReturnRequestService', services.returnRequestService)
  .factory('SellerRoleService', services.sellerRoleService)
  .factory('Shop', services.shop)
  .factory('ShopAppearanceService', services.shopAppearanceService)
  .factory('ShopPermissionService', services.shopPermissionService)
  .factory('ShopProfileService', services.shopProfileService)
  .factory('ProductTempService', services.productTempService)
  .factory('PermissionService', services.permissionService)

    // Col Dev (Natee)
  .factory('CMSCategoryService', services.cmsCategoryService)
  .factory('CMSGroupService', services.cmsGroupService)
  // .factory('CMSService', services.cmsService)
  // .factory('CMSMasterService', services.adminCMSMasterService)
  .factory('Buy1Get1Service', services.Buy1Get1Service)
  //.factory('CMSCollectionService', services.cmsCollectionService)
  .factory('CMSMasterService', services.cmsMasterService)
  .factory('StdReportSaleService', services.stdSaleReportService)
  .factory('StdReportStockService', services.stdStockReportService)
  .factory('StdReportOnHoldService', services.stdOnHoldReportService)
  .factory('StdReportReturnService', services.stdReturnReportService)

  // Col Dev (Natcharin)
  .factory('StdOiReportService', services.stdOiReportService)
  .factory('StdNonMoveReportService', services.stdNonMoveReportService)
  .factory('SumCreateAndApproveService', services.sumCreateAndApproveService)
  .factory('SumProductStatusService', services.sumProductStatusService)
  .factory('SumProductInfoService', services.sumProductInfoService)
  .factory('SumProductOnWebService', services.sumProductOnWebService)
  .factory('SumSKUEffectiveService', services.sumSKUEffectiveService)
  .factory('SumSKUNotEffectiveService', services.sumSKUNotEffectiveService)


  // Directives
  .directive('ncTradableSelect', directives.ncTradableSelect)
  .directive('ngCkeditor', directives.ngCkeditor)
  .directive('ngDateBefore', directives.ngDateBefore)
  .directive('ngDelegate', directives.ngDelegate)
  .directive('ngMatch', directives.ngMatch)
  .directive('ngMaxnumber', directives.ngMaxnumber)
  .directive('ngMinnumber', directives.ngMinnumber)
  // .directive('ngPermission', directives.ngPermission)
  .directive('ngSlideToggle', directives.ngSlideToggle)
  .directive('ngTemplate', directives.ngTemplate)
  .directive('ngUppercase', directives.ngUppercase)
  .directive('ngLowercase', directives.ngLowercase)
  .directive('ngMatch', directives.ngMatch)
  .directive('ngMinnumber', directives.ngMinnumber)
  .directive('ngMaxnumber', directives.ngMaxnumber)
  .directive('ngDateBefore', directives.ngDateBefore)
  .directive('ngEnter', directives.ngEnter)

  // Filters
  .filter('capitalize', filters.capitalize)
  .filter('ordinal', filters.ordinal)
  .filter('html', filters.html)
  .filter('truth', filters.truth)
  .filter('lies', filters.lies)
  .filter('exclude', filters.exclude)
  .filter('excludeCategory', filters.excludeCategory)
  .filter('truncate', filters.truncate)
  .filter('slice', filters.slice)
  .filter('leadingzero', filters.leadingzero)
  .filter('variantValue', filters.variantValue)
  .filter('importGuidelineExample', filters.importGuidelineExample)
  .filter('propsFilter', filters.propsFilter) // Col Dev (Natee)
  .filter('statusValue', filters.statusValue) // Col Dev (Natee)

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
  .controller('SellerOrderShippingListCtrl', controllers.sellerOrderShippingList)
  .controller('SellerOrderAddCtrl', controllers.sellerOrderAdd)
  .controller('SellerPendingProductCtrl', controllers.sellerPendingProduct)
  .controller('SellerPendingProductGroupAddCtrl', controllers.sellerPendingProductGroupAdd)
  .controller('SellerPendingProductsGroupCtrl', controllers.sellerPendingProductsGroup)
  .controller('SellerProductGroupAddCtrl', controllers.sellerProductGroupAdd)
  // .controller('SellerReportCtrl', controllers.sellerReport)
  .controller('StdSaleReportSellerCtrl', controllers.StdSaleReportSellerList)
  .controller('SellerBuy1Get1AddCtrl',controllers.sellerBuy1Get1Add)
  .controller('SellerBuy1Get1ListCtrl',controllers.sellerBuy1Get1List)

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
  .controller('AdminPendingProductGroupAddCtrl', controllers.adminPendingProductGroupAdd)
  .controller('AdminProductApprovalDetailCtrl', controllers.adminProductApprovalDetail)
  .controller('AdminProductApprovalListCtrl', controllers.adminProductApprovalList)
  .controller('AdminProductListCtrl', controllers.adminProductList)
  .controller('AdminProductReviewCtrl', controllers.adminProductReview)
  .controller('AdminProductDetailCtrl', controllers.adminProductDetail)
  .controller('AdminMasterProductCtrl', controllers.adminMasterProduct)
  .controller('AdminMasterProductAddCtrl', controllers.adminMasterProductAdd)
  .controller('AdminProductGroupAddCtrl', controllers.adminProductGroupAdd)

  .controller('LoginCtrl', controllers.login)
  .controller('AdminLoginCtrl', controllers.adminLogin)

  .controller('AbstractListCtrl', controllers.abstractList)
  .controller('AbstractAdvanceListCtrl', controllers.abstractAdvanceList)
  // .controller('AbstractAdvanceListCtrl', controllers.abstractAdvanceList)
  .controller('AbstractAddCtrl', controllers.abstractAdd)
  .controller('AbstractProductGroupAddCtrl', controllers.abstractProductGroupAdd)

  .controller('AdminOnTopCreditCtrl', controllers.adminOnTopCreditAdd)
  .controller('AdminOnTopCreditListCtrl', controllers.adminOnTopCreditList)

    // Create By Col Dev (Natee)
  .controller('AdminCMSCategoryListCtrl', controllers.adminCMSCategoryList)
  .controller('AdminCMSCategoryAddCtrl', controllers.adminCMSCategoryAdd)

  .controller('AdminCMSGroupListCtrl', controllers.adminCMSGroupList)
  .controller('AdminCMSGroupAddCtrl', controllers.adminCMSGroupAdd)

  .controller('AdminCMSMasterListCtrl', controllers.adminCMSMasterList)
  .controller('AdminCMSMasterAddCtrl', controllers.adminCMSMasterAdd)

   //Report iOath
  .controller('SellerStdSaleReportSellerCtrl', controllers.sellerStdSaleReportSellerList)
  .controller('SellerStdStockReportCtrl', controllers.sellerStdStockReportList)
  .controller('SellerStdOnHoldReportCtrl', controllers.sellerStdOnHoldReportList)
  .controller('SellerStdReturnReportCtrl', controllers.sellerStdReturnReportList)
    //Report by Natcharin
  .controller('SellerStdOiReportCtrl', controllers.sellerStdOiReportList)
  .controller('SellerStdNonMoveReportCtrl', controllers.sellerStdNonMoveReportList)

  //iOATH
  .controller('AdminBuy1Get1AddCtrl',controllers.adminBuy1Get1Add)
  .controller('AdminBuy1Get1ListCtrl',controllers.adminBuy1Get1List)

  .controller('TestCtrl', controllers.test)

  //Summary by Natcharin
  .controller('AdminSumCreateAndApproveCtrl', controllers.adminSumCreateAndApprove)
  .controller('AdminSumProductStatusCtrl', controllers.adminSumProductStatus)
  .controller('AdminSumProductInfoCtrl', controllers.adminSumProductInfo)
  .controller('AdminSumProductOnWebCtrl',controllers.adminSumProductOnWeb)
  .controller('AdminSumSKUEffectiveCtrl',controllers.adminSumSKUEffective)
  .controller('AdminSumSKUNotEffectiveCtrl',controllers.adminSumSKUNotEffective)

  //CMS Seller
  .controller('SellerCMSMasterListCtrl', controllers.sellerCMSMasterList)
  .controller('SellerCMSMasterAddCtrl', controllers.sellerCMSMasterAdd)

  .controller('SellerCMSGroupListCtrl', controllers.sellerCMSGroupList)
  .controller('SellerCMSGroupAddCtrl', controllers.sellerCMSGroupAdd)

  .controller('SellerCMSCollectionListCtrl', controllers.sellerCMSGroupList)

  .controller('SellerCMSCategoryListCtrl', controllers.sellerCMSCategoryList)
  .controller('SellerCMSCategoryAddCtrl', controllers.sellerCMSCategoryAdd)

  
