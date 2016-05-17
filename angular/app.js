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

// IE fix
require('./iefix.js')

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
require('angular-ui-sortable/jquery-ui.js')
require('angular-ui-sortable/sortable.js')
require('angular-drag-and-drop-list/angular-drag-and-drop-lists.js')
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
var controllers = bulk.controllers
var services = bulk.services
var helpers = bulk.helpers
var directives = bulk.directives
var filters = bulk.filters

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
       Rollbar.configure({logLevel: "warning"});
  }])

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
  .factory('CMSService', services.cmsService)
  .factory('CMSMasterService', services.adminCMSMasterService)
  .factory('Buy1Get1Service', services.Buy1Get1Service)
  //.factory('CMSCollectionService', services.cmsCollectionService)
  .factory('CMSMasterService', services.cmsMasterService)

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
  .directive('ngUppercase', directives.ngUppercase)
  .directive('ngLowercase', directives.ngLowercase)
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
  .controller('SellerReportCtrl', controllers.sellerReport)

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

  .controller('LoginCtrl', controllers.login)
  .controller('AdminLoginCtrl', controllers.adminLogin)
  
  .controller('AbstractListCtrl', controllers.abstractList)
  .controller('AbstractAdvanceListCtrl', controllers.abstractAdvanceList)
  .controller('AbstractAddCtrl', controllers.abstractAdd)
  .controller('AbstractPendingProductGroupCtrl', controllers.abstractPendingProductGroup)

  .controller('AdminOnTopCreditCtrl', controllers.adminOnTopCreditAdd)
  .controller('AdminOnTopCreditListCtrl', controllers.adminOnTopCreditList)

    // Create By Col Dev (Natee)
  .controller('AdminCMSCategoryListCtrl', controllers.adminCMSCategoryList)
  .controller('AdminCMSCategoryAddCtrl', controllers.adminCMSCategoryAdd)

  .controller('AdminCMSGroupListCtrl', controllers.adminCMSGroupList)
  .controller('AdminCMSGroupAddCtrl', controllers.adminCMSGroupAdd)

  .controller('AdminCMSMasterListCtrl', controllers.adminCMSMasterList)
  .controller('AdminCMSMasterAddCtrl', controllers.adminCMSMasterAdd)

  .controller('AdminStdSaleReportSellerCtrl', controllers.adminStdSaleReportSellerList)

  //iOATH
  .controller('AdminBuy1Get1AddCtrl',controllers.adminBuy1Get1Add)
  .controller('AdminBuy1Get1ListCtrl',controllers.adminBuy1Get1List)

  .controller('TestCtrl', controllers.test)


var _rollbarConfig = {
    accessToken: config.ROLLBAR.token,
    captureUncaught: true,
    payload: {
        environment: config.ROLLBAR.environment
    }
};
!function(r){function o(e){if(t[e])return t[e].exports;var n=t[e]={exports:{},id:e,loaded:!1};return r[e].call(n.exports,n,n.exports,o),n.loaded=!0,n.exports}var t={};return o.m=r,o.c=t,o.p="",o(0)}([function(r,o,t){"use strict";var e=t(1).Rollbar,n=t(2);_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||"https://d37gvrvc0wt4s1.cloudfront.net/js/v1.8/rollbar.min.js";var a=e.init(window,_rollbarConfig),i=n(a,_rollbarConfig);a.loadFull(window,document,!_rollbarConfig.async,_rollbarConfig,i)},function(r,o){"use strict";function t(r){return function(){try{return r.apply(this,arguments)}catch(o){try{console.error("[Rollbar]: Internal error",o)}catch(t){}}}}function e(r,o,t){window._rollbarWrappedError&&(t[4]||(t[4]=window._rollbarWrappedError),t[5]||(t[5]=window._rollbarWrappedError._rollbarContext),window._rollbarWrappedError=null),r.uncaughtError.apply(r,t),o&&o.apply(window,t)}function n(r){var o=function(){var o=Array.prototype.slice.call(arguments,0);e(r,r._rollbarOldOnError,o)};return o.belongsToShim=!0,o}function a(r){this.shimId=++s,this.notifier=null,this.parentShim=r,this._rollbarOldOnError=null}function i(r){var o=a;return t(function(){if(this.notifier)return this.notifier[r].apply(this.notifier,arguments);var t=this,e="scope"===r;e&&(t=new o(this));var n=Array.prototype.slice.call(arguments,0),a={shim:t,method:r,args:n,ts:new Date};return window._rollbarShimQueue.push(a),e?t:void 0})}function l(r,o){if(o.hasOwnProperty&&o.hasOwnProperty("addEventListener")){var t=o.addEventListener;o.addEventListener=function(o,e,n){t.call(this,o,r.wrap(e),n)};var e=o.removeEventListener;o.removeEventListener=function(r,o,t){e.call(this,r,o&&o._wrapped?o._wrapped:o,t)}}}var s=0;a.init=function(r,o){var e=o.globalAlias||"Rollbar";if("object"==typeof r[e])return r[e];r._rollbarShimQueue=[],r._rollbarWrappedError=null,o=o||{};var i=new a;return t(function(){if(i.configure(o),o.captureUncaught){i._rollbarOldOnError=r.onerror,r.onerror=n(i);var t,a,s="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(t=0;t<s.length;++t)a=s[t],r[a]&&r[a].prototype&&l(i,r[a].prototype)}return r[e]=i,i})()},a.prototype.loadFull=function(r,o,e,n,a){var i=function(){var o;if(void 0===r._rollbarPayloadQueue){var t,e,n,i;for(o=new Error("rollbar.js did not load");t=r._rollbarShimQueue.shift();)for(n=t.args,i=0;i<n.length;++i)if(e=n[i],"function"==typeof e){e(o);break}}"function"==typeof a&&a(o)},l=!1,s=o.createElement("script"),u=o.getElementsByTagName("script")[0],p=u.parentNode;s.crossOrigin="",s.src=n.rollbarJsUrl,s.async=!e,s.onload=s.onreadystatechange=t(function(){if(!(l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)){s.onload=s.onreadystatechange=null;try{p.removeChild(s)}catch(r){}l=!0,i()}}),p.insertBefore(s,u)},a.prototype.wrap=function(r,o){try{var t;if(t="function"==typeof o?o:function(){return o||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._wrapped){r._wrapped=function(){try{return r.apply(this,arguments)}catch(o){throw o._rollbarContext=t()||{},o._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=o,o}},r._wrapped._isWrap=!0;for(var e in r)r.hasOwnProperty(e)&&(r._wrapped[e]=r[e])}return r._wrapped}catch(n){return r}};for(var u="log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError".split(","),p=0;p<u.length;++p)a.prototype[u[p]]=i(u[p]);r.exports={Rollbar:a,_rollbarWindowOnError:e}},function(r,o){"use strict";r.exports=function(r,o){return function(t){if(!t&&!window._rollbarInitialized){var e=window.RollbarNotifier,n=o||{},a=n.globalAlias||"Rollbar",i=window.Rollbar.init(n,r);i._processShimQueue(window._rollbarShimQueue||[]),window[a]=i,window._rollbarInitialized=!0,e.processPayloads()}}}}]);

