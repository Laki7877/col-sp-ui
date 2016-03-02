(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles attribute listing
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.admin')
	.controller('AdminAttributeListCtrl', ["$scope", "$controller", "AttributeService", "config", function($scope, $controller, AttributeService, config) {
		$controller('AbstractListCtrl', {
			$scope: $scope,
			options: {
				url: '/admin/attributes',
				service: AttributeService,
				item: 'Attribute',
				order: 'UpdatedDt',
				id: 'AttributeId',
				actions: ['View', 'Delete'],
				bulks: ['Delete'],
				filters: [
					{ name: "All", value: 'All'},
					{ name: "Free Text", value: 'FreeText'},
					{ name: "Dropdown", value: 'Dropdown'},
					{ name: "HTML Box", value: 'HTMLBox'},
					{ name: "Allow Variation", value: 'HasVariation'},
					{ name: "Do Not Allow Variation", value: 'NoVariation'}
				]
			}
		});
		console.log($scope);
		$scope.yesNoDropdown = config.DROPDOWN.YES_NO_DROPDOWN;
		$scope.dataTypeDropdown = config.DROPDOWN.DATA_TYPE_DROPDOWN;
	}]);
},{}],2:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * This module handle all admin functionality
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
angular.module('colsp.admin', [
	require('../core')
]);
/* require all */
(function () {var f = require("./index.js");f["controllers"]=({"adminAttributeListCtrl":require("./controllers\\adminAttributeListCtrl.js")});f["index"]=require("./index.js");f["services"]=({"attributeService":require("./services\\attributeService.js")});return f;})();
/**
 * Export angular module
 */
module.exports = 'colsp.admin';
},{"../core":19,"./controllers\\adminAttributeListCtrl.js":1,"./index.js":2,"./services\\attributeService.js":3}],3:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Provide resource service for Attributes
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.admin')
	.factory('AttributeService', ["common", "util", "config", function(common, util, config) {
		var service = common.makeRestObject('/Attributes');
		var find = function(array, value) {
			return array.find(function(element) {
				if (element.value === value) {
					return true;
				}
				return false;
			});
		};
		var boolOptions = config.DROPDOWN.YES_NO_DROPDOWN;
		var variantOptions = config.DROPDOWN.VARIANT_DROPDOWN;
		var dataTypeOptions = config.DROPDOWN.DATA_TYPE_DROPDOWN;
		var validationOptions = config.DROPDOWN.VALIDATION_DROPDOWN;
		service.generate = function() {
			return {
				AttributeNameEn: '',
				AttributeNameTh: '',
				DisplayNameEn: '',
				DisplayNameTh: '',
				Required: boolOptions[0],
				Filterable: boolOptions[0],
				DataValidation: validationOptions[0],
				DataType: dataTypeOptions[0],
				VariantStatus: boolOptions[0],
				HB: {
					DefaultValue: ''
				},
				LT: {
					AttributeValues: [{}]
				},
				ST: {
					DataValidation: validationOptions[0],
					DefaultValue: ''
				},
				ShowGlobalSearchFlag: boolOptions[0],
				ShowLocalSearchFlag: boolOptions[0],
				VariantDataType: variantOptions[0]
			};
		};
		service.deserialize = function(data) {
			var processed = angular.merge(service.generate(), data);
			processed.VariantStatus = find(boolOptions,data.VariantStatus);
			processed.VariantDataType = find(variantOptions,data.VariantDataType);
			processed.DataType = find(dataTypeOptions,data.DataType);
			processed.DataValidation = find(validationOptions, data.DataValidation);
			processed.ShowLocalSearchFlag = find(boolOptions, data.ShowLocalSearchFlag);
			processed.ShowGlobalSearchFlag = find(boolOptions, data.ShowGlobalSearchFlag);
			processed.Required = find(boolOptions, data.Required) || boolOptions[0];
			processed.Filterable = find(boolOptions, data.Filterable) || boolOptions[0];

			switch(data.DataType) {
				case 'ST':
					processed['ST'] = {
						DefaultValue: processed.DefaultValue
					};
				break;
				case 'LT':
					processed['LT'] = {
						AttributeValues: processed.AttributeValues,
						DefaultValue: processed.DefaultValue
					};
				break;
				case 'HB':
					processed['HB'] = {
						DefaultValue: processed.DefaultValue
					}
				break;
			}
			return processed;
		};
		service.serialize = function(data) {
			var processed = angular.extend(service.generate(), data);

			processed.VariantStatus = processed.VariantStatus ? processed.VariantStatus.value : undefined;
			processed.VariantDataType = processed.VariantDataType ? processed.VariantDataType.value : undefined;
			processed.DataType = processed.DataType ? processed.DataType.value : undefined;
			processed.ShowLocalSearchFlag = processed.ShowLocalSearchFlag ? processed.ShowLocalSearchFlag.value : undefined;
			processed.ShowGlobalSearchFlag = processed.ShowGlobalSearchFlag ? processed.ShowGlobalSearchFlag.value : undefined;
			processed.Required = processed.Required ? processed.Required.value : undefined;
			processed.Filterable = processed.Filterable ? processed.Filterable.value : undefined;

			switch(processed.DataType) {
				case 'ST':
					processed.DefaultValue = data.ST.DefaultValue;
					delete processed['AttributeValues'];
				break;
				case 'LT':
					processed.AttributeValues = data.LT.AttributeValues;
					processed.DefaultValue = data.LT.DefaultValue;
				break;
				case 'HB':
					processed.DefaultValue = data.HB.DefaultValue;
					delete processed['AttributeValues'];
				break;
			}

			angular.forEach(dataTypeOptions, function(item) {
				delete processed[item.value];
			});
			return processed
		};
		return service;
	}]);
},{}],4:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Main app module
 *
 * @version    1.0.0
 * @author     ahancer
 */
angular.module('colsp', [
	require('./core'),
	require('./seller'),
	require('./admin')
])
/**
 * App configuration
 */
.config(["uiSelectConfig", "$ncPaginationProvider", "$cookiesProvider", "route", function(uiSelectConfig, $ncPaginationProvider, $cookiesProvider, route) {
	//Set default pagination sizes
	$ncPaginationProvider.paginationSizes = [10, 20, 50, 100];

	//Set default tagging uiSelectConfig
	uiSelectConfig.taggingTokens = '[ENTER|,]';
}])
.value('config', require('./config.js'))
.run(require('./template.js'))
/**
 * Export angular module
 */
module.exports = 'colsp';
},{"./admin":2,"./config.js":5,"./core":19,"./seller":54,"./template.js":55}],5:[function(require,module,exports){
module.exports = {
	DEBUG_API: true,
	REST_SERVICE_BASE_URL: 'http://colsp-dev.azurewebsites.net/api',
	MAX_GLOBAL_CAT_COLUMN : 4,
    HANDLE_EXCEPTION: false,
    MAX_IMAGE_UPLOAD_SIZE: 5242880,
	CK_DEFAULT_OPTIONS: {
	   filebrowserBrowseUrl : '/ckfinder/ckfinder.html',
	   filebrowserImageBrowseUrl : '/ckfinder/ckfinder.html?type=Images',
	   filebrowserFlashBrowseUrl : '/ckfinder/ckfinder.html?type=Flash',
	   filebrowserUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
	   filebrowserImageUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
	   filebrowserFlashUploadUrl : '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
	},
	TYPEAHEAD_IMPORT_GUIDELINE_LIMIT: 8,
	TYPEAHEAD_DELAY: 150,
	DROPDOWN: {
		DEFAULT_STATUS_DROPDOWN: [
			{
				name: 'Inactive',
				value: 'NA'
			},
			{
				name: 'Active',
				value: 'AT'
			}
		],
		YES_NO_DROPDOWN: [
			{
				name: 'No',
				value: false
			},
			{
				name: 'Yes',
				value: true
			}
		],
		VISIBLE_DROPDOWN: [
			{
				name: 'Visible',
				value: true
			},
			{
				name: 'Not Visible',
				value: false
			}
		],
		DATA_TYPE_DROPDOWN: [
			{
				name: 'Free Text',
				value: 'ST'
			},
			{
				name: 'Dropdown',
				value: 'LT'
			},
			{
				name: 'HTML Box',
				value: 'HB'
			}
		],
		VARIANT_DROPDOWN: [
			{
				name: 'Image',
				value: 'IO'
			},
			{
				name: 'Textbox',
				value: 'TO'
			},
			{
				name: 'Dropdown',
				value: 'DD'
			}
		],
		VALIDATION_DROPDOWN: [
			{
				name: 'No Validation',
				value: 'NO'
			},
			{
				name: 'Number Only',
				value: 'NU'
			},
			{
				name: 'Text Only',
				value: 'TX'
			},
			{
				name: 'Email Address',
				value: 'EM'
			},
			{
				name: 'Phone Number',
				value: 'PH'
			}
		]
	},
	SHOP_STATUS: [
		{
			name: 'Inactive',
			value: 'NA',
			color: 'color-red'
		},
		{
			name: 'Active',
			value: 'AT',
			color: 'color-green'
		}
	],
	SHOP_GROUP: [
		{
			name: 'BU',
			value: 'BU'
		},
		{
			name: 'INDY',
			value: 'IN'
		},
		{
			name: 'Seller',
			value: 'SE'
		}
	],
	INVENTORY_STATUS: [
		{
			name: 'Normal Stock',
			color: ''
		},
		{
			name: 'Low Stock',
			color: 'color-red'
		},
		{
			name: 'Out of Stock',
			color: 'color-red'
		}
	],
	PRODUCT_REVIEW_STATUS: [
		{
			name: 'Not Approved',
			value: 'WA',
			color: 'color-grey'
		},
		{
			name: 'Approved',
			value: 'AP',
			color: 'color-green'
		}
	],
	PRODUCT_REVIEW_BUTTON: [
		{
			name: 'Unapprove',
			value: 'AP'
		},
		{
			name: 'Approve',
			value: 'WA'
		}
	],
	PRODUCT_REVIEW_MAX_RATING: 5.0,
	PRODUCT_STATUS: [
		{
			name: 'Draft',
			value: 'DF',
			color: 'color-grey',
			icon: 'fa-circle-o'
		},
		{
			name: 'Wait for Approval',
			value: 'WA',
			color: 'color-yellow',
			icon: 'fa-clock-o'
		},
		{
			name: 'Approved',
			value: 'AP',
			color: 'color-green',
			icon: 'fa-check-circle-o'
		},
		{
			name: 'Not Approved',
			value: 'RJ',
			color: 'color-red',
			icon: 'fa-ban'
		}
	],
	CATEGORY_SYNC_DELAY: 1200, //Category wait for x millisecond before actually saving
	DEFAULT_SUCCESS_MESSAGE: 'Your changes have been saved successfully.',
	DEFAULT_ERROR_MESSAGE: 'Unable to save because required fields are missing or incorrect.',
	TITLE: {
		CREATE: 'Add {{content}}',
		DETAIL: '{{content}} Detail'
	},
	ERROR_MESSAGE: {
		WRONG_IMAGE_SIZE: 'Maximum file size reached. Please upload only under 5 MB per image',
		WRONG_IMAGE_FORMAT: 'Wrong file format. Please upload only JPG or PNG file'
	}
};

},{}],6:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Create inheritable controller for adding form
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.controller('AbstractAddCtrl', ["$scope", "$window", "NcAlert", "util", "common", "router", "options", function($scope, $window, NcAlert, util, common, router, options) {
		$scope.formData = {};
		$scope.form = {};
		$scope.alert = new NcAlert();
		$scope.saving = false; //prevent multiple saving
		$scope.loading = false;

		//Custom pre-init function
		(options.preInit || _.noop)($scope);

		//Pop up javascript warning message on leave
		util.warningOnLeave(function() {
			return $scope.form.$dirty;
		});

		$scope.init = function() {
			//Fetch GET Params
			if(!_.isUndefined(router.GET.id)) {
				$scope.id = _.isInteger(_.parseInt(router.GET.id)) ? _.parseInt(router.GET.id) : 0;
			}
			//Custom init
			if(options.init) {
				options.init($scope)
			}
			//Edit mode
			if($scope.id > 0) {
				$scope.loading = true;
				$scope.title = util.getTitle($scope.id,options.item);

				//Get by id
				options.service.get($scope.id)
					.then(function(data) {
						$scope.formData = options.service.deserialize(data);
						$scope.loading = false;
						(options.onLoad || _.noop)($scope, true);

						if(options.dateFields){
							options.dateFields.forEach(function(df){
									$scope.formData[df] = new Date($scope.formData[df]);
							});
						}

					}, function() {
						//Jump back
						util.page404();
					});
			} else {
				//Create mode
				$scope.id = 0;
				$scope.formData = options.service.generate();
				(options.onLoad || _.noop)($scope, false);
			}
		};
		$scope.cancel = function() {
			//Back to listing
			$window.location.href = options.url;
		};
		$scope.save = function() {
			//Already saving
			if($scope.saving) return;

			if(options.onSave && options.onSave($scope)) return;

			//Activate form submission
			$scope.form.$setSubmitted();

			//Form validation
			if($scope.form.$valid) {
				$scope.saving = true;
				$scope.alert.close();
				var data = options.service.serialize($scope.formData);
				var restoreDf = {};
				if(options.dateFields){
					options.dateFields.forEach(function(df){
							restoreDf[df] = angular.copy($scope.formData[df]);
							$scope.formData[df] = moment($scope.formData[df]).format('LLL');
					});
				}

				if($scope.id > 0) {
					//Edit mode
					options.service.update($scope.id, data)
						.then(function(result) {
							$scope.formData = options.service.deserialize(result);
							$scope.alert.success(util.saveAlertSuccess(options.successItem || options.item, options.url));
							$scope.form.$setPristine(true);
						}, function(err) {
							$scope.alert.error(common.getError(err));
						})
						.finally(function() {
							$scope.saving = false;
							if(options.dateFields){
								options.dateFields.forEach(function(df){
										$scope.formData[df] = restoreDf[df];
								});
							}
						});
				} else {
					//Save mode
					options.service.create(data)
						.then(function(result) {
							//Set both id and formData[id]
							$scope.id = result[options.id];
							$scope.formData = options.service.deserialize(result);
							$scope.alert.success(util.saveAlertSuccess(options.successItem || options.item, options.url));
							$scope.form.$setPristine(true);
						}, function(err) {
							$scope.alert.error(common.getError(err));
						})
						.finally(function() {
							$scope.saving = false;
							if(options.dateFields){
								options.dateFields.forEach(function(df){
									$scope.formData[df] = restoreDf[df];
								});
							}
						});
				}
			} else {
				//Form id
				$scope.alert.error(util.saveAlertError());
			}
		};
		$scope.$watch('id', function(val) {
			//Change title according to state
			$scope.title = util.getTitle(val,options.item);
		});
		$scope.init();
	}]);
},{}],7:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Create inheritable controller for all table advance listing
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.controller('AbstractAdvanceListCtrl', ["$scope", "$controller", "options", "LocalCategoryService", "GlobalCategoryService", "BrandService", "Category", function($scope, $controller, options, LocalCategoryService, GlobalCategoryService, BrandService, Category) {
		var overrideReload = function(newObj, oldObj) {
			if(!_.isUndefined(newObj) && !_.isUndefined(oldObj)) {
				if(newObj.searchText !== oldObj.searchText) {
					$scope.params._offset = 0;
					$scope.bulkContainer.length = 0;
				}
				if(newObj._filter !== oldObj._filter) {
					$scope.params._offset = 0;
					$scope.bulkContainer.length = 0;
				}
			}

			$scope.loading = true;

			//Advance search mode on/off
			if(!$scope.advanceSearchMode) {
				options.service.list($scope.params)
					.then(function(data) {
						$scope.list = data;
					})
					.finally(function() {
						$scope.loading = false;
					});
			} else {
				options.service.advanceList(_.extend({searchText: ''}, $scope.params, $scope.serializeAdvanceSearch($scope.advanceSearchParams)))
					.then(function(data) {
						$scope.list = data;
					})
					.finally(function() {
						$scope.loading = false;
					});
			}
		};
		$controller('AbstractListCtrl', {
			$scope: $scope,
			options: _.extend({}, options, { reload: overrideReload })
		});
		$scope.advanceSearchOptions = {};
		$scope.advanceSearch = false;  //toggling advance search form state
		$scope.advanceSearchMode = false; //search type
		var isSearchingList = $scope.isSearching;
		$scope.isSearching = function() {
			return $scope.advanceSearchMode ? ( isSearchingList() ) : ( !_.isEmpty($scope.params.searchText ) );
		};
		$scope.serializeAdvanceSearch = function(formData) {
			var processed = _.extend({}, formData);

			processed.ProductNames = _.compact([processed.ProductName]);
			processed.Pids = _.compact([processed.Pid]);
			processed.Skus = _.compact([processed.Sku]);
			processed.Brands = _.map(processed.Brands, function(e) { return _.pick(e, ['BrandId']); });
			processed.GlobalCategories = _.map(processed.GlobalCategories, function(e) { return _.pick(e, ['Lft', 'Rgt']); });
			processed.LocalCategories = _.map(processed.LocalCategories, function(e) { return _.pick(e, ['Lft', 'Rgt']); });

			if(!_.isEmpty(processed.PriceTo)) processed.PriceTo = _.toInteger(processed.PriceTo);
			if(!_.isEmpty(processed.PriceFrom)) processed.PriceFrom = _.toInteger(processed.PriceFrom);

			processed = _.omitBy(_.omit(processed, ['ProductName', 'Pid', 'Sku', 'GlobalCategory']), function(e) {
				if(_.isArrayLike(e)) return _.isEmpty(e);
				if(_.isObjectLike(e)) return false; //don't omit
				if(_.isNumber(e)) return _.isNaN(e);
				return false;
			});

			return processed;
		};
		$scope.onSearch = function() {
			$scope.advanceSearchMode = false;
			return false;
		};
		$scope.onAdvanceSearch = function(item, flag) {
			if(flag) {
				$scope.advanceSearchMode = true;
				$scope.advanceSearch = false;
				$scope.params.searchText = '';
			}
			return false;
		};

		//Load all Brands
		BrandService.list()
			.then(function(data) {
				$scope.advanceSearchOptions.Brands = data;
			});

		//Load Global category
		GlobalCategoryService.list()
			.then(function(data) {
				$scope.advanceSearchOptions.GlobalCategories = Category.transformNestedSetToUITree(data);
			});

		//Load Global category
		LocalCategoryService.list()
			.then(function(data) {
				$scope.advanceSearchOptions.LocalCategories = Category.transformNestedSetToUITree(data);
			});

		//Watch for advanceSearchParams
		$scope.$watch('advanceSearchParams', function(newObj, oldObj) {
			//Reset offset if advance param changes
			if(!_.isEqual(newObj, oldObj)) {
				$scope.params._offset = 0;
				$scope.bulkContainer.length = 0;
			}
			$scope.reload();
		});
	}]);
},{}],8:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Create inheritable controller for all table listing
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.controller('AbstractListCtrl' , ["$scope", "$window", "$timeout", "NcAlert", "util", "options", function($scope, $window, $timeout, NcAlert, util, options) {
		var a = _.includes(['a','e','i','o','u'], _.lowerCase(options.item.charAt(0))) ? 'an' : 'a';
		$scope.alert = new NcAlert();
		$scope.tableOptions = {
			emptyMessage: 'You do not have any ' + _.lowerCase(options.item),
			searchEmptyMessage: 'No ' + _.lowerCase(options.item) + ' match your search criteria'
		};

		$scope.loading = false;

		//Table variables
		$scope.params = {
			_order: options.order,
			_limit: 10,
			_offset: 0,
			_direction: options.direction || 'desc'
		};
		$scope.list = {
			total: 0,
			data: []
		};

		$scope.reload = options.reload || function(newObj, oldObj) {
			$scope.loading = true;
			(options.onReload || _.noop)(newObj, oldObj);
			if(!_.isUndefined(newObj) && !_.isUndefined(oldObj)) {
				if(newObj.searchText !== oldObj.searchText) {
					$scope.params._offset = 0;
					$scope.bulkContainer.length = 0;
				}
				if(newObj._filter !== oldObj._filter) {
					$scope.params._offset = 0;
					$scope.bulkContainer.length = 0;
				}
			}

			options.service.list($scope.params)
				.then(function(data) {
					$scope.list = data;
				})
				.finally(function() {
					$scope.loading = false;
				});
		};
		$scope.onLoad = function() {
			$scope.loading = true;
		};
		if(!_.isEmpty(options.filters)) {
			$scope.filterOptions = options.filters;
			$scope.params._filter = options.filters[0].value;
		}
		$scope.bulkContainer = [];
		$scope.toggleEye = util.eyeToggle(options.service, options.id, $scope.alert);

		if(_.isUndefined(options.bulks)) {
			$scope.bulks= [
				util.bulkDelete(options.service, options.id, options.item, $scope.alert, $scope.reload, $scope.onload)
			];
		} else {
			$scope.bulks = _.compact(_.map(options.bulks, function(item) {

				if(_.isFunction(item)) {
					return item($scope);
				}
				if(_.isString(item)) {
					switch(item) {
						case 'Delete':
							return util.bulkDelete(options.service, options.id, options.item, $scope.alert, $scope.reload, $scope.onload);
						case 'Show':
							return util.bulkShow(options.service, options.id, options.item, $scope.alert, $scope.reload);
						case 'Hide':
							return util.bulkHide(options.service, options.id, options.item, $scope.alert, $scope.reload);
					}
				}

				if(_.isObjectLike(item)) {
					return item;
				}
				return null;
			}));
		}

		//Handle array of string options.actions
		if(_.isUndefined(options.actions)) {
			$scope.actions = [
				util.actionView(options.url, options.id),
				util.actionDelete(options.service, options.id, options.item, $scope.alert, $scope.reload, function(obj, id) {
					_.remove($scope.bulkContainer, function(e) {
						return e[id] === obj[id];
					});
				})
			];
		} else {
			$scope.actions = _.compact(_.map(options.actions, function(item) {

				if(_.isString(item)) {
					switch(item) {
						case 'View':
							return util.actionView(options.url, options.id);
						case 'View Only':
							return util.actionView(options.url, options.id, 'View');
						case 'Delete':
							return util.actionDelete(options.service, options.id, options.item, $scope.alert, $scope.reload, function(obj, id) {
									_.remove($scope.bulkContainer, function(e) {
										return e[id] === obj[id];
									})
								});
						case 'Duplicate':
							return util.actionDuplicate(options.service, options.id, options.item, $scope.alert, $scope.reload);
					}
				}

				if(_.isObject(item)) {
					return item;
				}
				return null;
			}));

		}

		$scope.isSearching = function() {
			return !_.isEmpty($scope.params.searchText) || ( _.isUndefined($scope.params._filter) ? false :  $scope.params._filter != options.filters[0].value);
		};

		$scope.$watch('params', function(a,b) {
			if(_.isEqual(a,b)) {
				return;
			}
			$scope.reload(a,b);
		}, true);

		$timeout(function() {
			$scope.reload();
			(options.onInit || _.noop)($scope);
		}, 0);
	}]);

},{}],9:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handle login page
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
  .controller('LoginCtrl', ["$scope", "CredentialService", "$window", "NcAlert", "$uibModal", "storage", "config", function ($scope, CredentialService, $window, NcAlert, $uibModal, storage, config) {
    $scope.uform = {};
    $scope.loginForm = {};
    $scope.events = {};
    $scope.alert = new NcAlert();
    var redir = storage.get('redirect');
    var profile = storage.getCurrentUserProfile();
    if (profile && profile.User.IsAdmin) {
      $window.location.href = CredentialService.getRedirPath(profile)
    }
    if(redir && redir != '/') {
      $scope.alert.open(false, 'Your session has timed out', '');
      storage.remove('redirect');
    }

    $scope.doLogin = function () {
      if ($scope.loginForm.$invalid) {
        if(_.isEmpty($scope.events)) {
          $scope.events.user = false;
          $scope.events.pass = false;
        }
        return;
      }
      $scope.loading = true;
      $scope.error = false;
      var user = $scope.uform.user;
      var pass = $scope.uform.pass;
      CredentialService.login(user, pass).then(function (r) {
        $scope.loading = false;
        if (!redir) {
          redir = CredentialService.getRedirPath(r);
        }
        $window.location.href = redir;
      }, function (err) {
        storage.clear();
        $scope.error = true;
        $scope.loading = false;
        $scope.loginForm.$setPristine();
      });
    }
  }]);

},{}],10:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles functionalities exposed to every pages 
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.controller('RootCtrl', ["$rootScope", "$scope", "$controller", "$window", "storage", "router", function ($rootScope, $scope, $controller, $window, storage, router) {
		//Globally exposed var
		$rootScope._ = _;
		$rootScope.$route = router;
		//Initialize PHP params
		$rootScope.initialize = function(get, post) {
			if(!_.isEmpty(get)) {
				router.GET = _.extend(get, router.GET);
			}
			if(!_.isEmpty(post)) {
				router.POST = post;
			}
			$rootScope.$route = router;
		};
		/**
		 * Handle menu active rendering
		 */
		$rootScope.activeMenuItem = function (item) {
			if(item.hover) {
				return 'active';
			}
			for (var i = 0; i < item.submenu.length; i++) {
				if($rootScope.activeSubmenuItem(item.submenu[i]).length > 0) {
					return 'active';
				}
			}
			return '';
		};
		$rootScope.activeSubmenuItem = function (item) {
			if(item.urls.length == 0) {
				return router.isActive(item.url) ? 'active' : '';
			} else {
				for (var i = 0; i < item.urls.length; i++) {
					if(router.isActive(item.urls[i])) {
						return 'active';
					}
				}
			}
			return '';
		};
		/**
		 * Handle user login state
		 */
		$rootScope.Profile = storage.getCurrentUserProfile();
		$rootScope.Imposter = storage.getImposterProfile();
		//Redirect to login if isnt logged
		if(_.isNil($rootScope.Profile) && router.currentPath != router.route.login.path) {
    		storage.put('redirect', $window.location.pathname);
    		router.go('login');
		}
		/**
		 * Prevent default drag-n-drop behavior
		 */
		$window.addEventListener("dragover", function(e) {
		  e = e || event;
		  e.preventDefault();
		}, false);
		$window.addEventListener("drop", function(e) {
		  e = e || event;
		  e.preventDefault();
		}, false);
		
		//Derived controller
		if(!_.isNil($rootScope.$route.current.controller)) {
			$controller($rootScope.$route.current.controller, {
				$scope: $scope
			});
		}
	}]);
},{}],11:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Dynamic ng-controller
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
  .directive('ngDynamicController', ["$compile", "$parse", function($compile, $parse) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function(scope, elem) {
        var name = $parse(elem.attr('ng-dynamic-controller'))(scope);
        elem.removeAttr('ng-dynamic-controller');
        if(!_.isEmpty(name)) {
          elem.attr('ng-controller', name);
          $compile(elem)(scope);
        }
      }
    };
  }]);
},{}],12:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Ng-include with no isolate scope
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.directive('ngIncludeEx', ["$compile", "$templateCache", function ($compile, $templateCache) {
		return {
		    restrict: 'AE',
		    link: function(scope, element, attrs) {
              scope.$watch(attrs.ngIncludeEx, function (value) {
                if (value) {
                  loadTemplate(value);
                }
              });
              function loadTemplate(ngIncludeEx) {
                  element.html($templateCache.get(ngIncludeEx));
                  $compile(element.contents())(scope);                    
              };
            } 
		};
	}]);
},{}],13:[function(require,module,exports){
angular.module('colsp.core')
    .directive('ngTemplate', ["$templateCache", "$compile", function ($templateCache, $compile) {
        var originalAttr = {};
        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                options: '=ngTemplateOptions'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get(attrs.ngTemplate);
                var templateElement = angular.element(templateHTML);
                return templateHTML;
            }
        };
    }]);
},{}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
/**
 * Handle all common http related functions
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.provider('common', function () {
		var vm = this;
		this.makeRequestErrorHandler = _.noop;
		this.$get = ["$http", "$q", "$window", "storage", "config", function ($http, $q, $window, storage, config) {
			'ngInject';
			var service = {
				/**
				 * Make $http request to REST API endpoint
				 * API base url fetched defined in config.js
				 *
				 * @method     makeRequest
				 * @param      {Object}  options  override $http() options
				 * @return     {Promise}  $q promise
				 */
				makeRequest: function (options) {
					var deferred = $q.defer();
					var accessToken = storage.getSessionToken();
					if(!options.headers) {
						options.headers = {};
					}
					if (accessToken && !options.headers.Authorization) {
	                    options.headers.Authorization = 'Basic ' + accessToken;
	                }
	                if (options.url.indexOf("http") !== 0) {
	                    options.url = config.REST_SERVICE_BASE_URL + options.url;
	                }
	                $http(options)
	                    .success(function (data) {
	                        deferred.resolve(data);
	                    })
	                    .error(function (data, status, headers, config) {
	                        if (config.DEBUG_API) {
	                        	console.warn(status, config.method, config.url, data);
				            }
				            vm.makeRequestErrorHandler(data, status, headers, config);
	                        deferred.reject(data || {"error": "Unknown error"});
	                    });
	                return deferred.promise;
				},
				/**
				 * Get error message
				 *
				 * @method     getError
				 * @param      {Object|string}  response  API error response
				 * @return     {string}  error message
				 */
				getError: function(response) {
		            if(!_.isUndefined(response.message))
		                return response.message;
		            if(!_.isUndefined(response.error))
		                return response.error;
		            if(!_.isUndefined(response.Message))
		                return response.Message;
		            return response;
				},
				/**
				 * Define commonly used resource methods
				 * 
				 * 	List of supported REST methods:
				 * 	- get(id)
				 * 	- list(params)
				 * 	- delete([id])
				 * 	- update(id, object)
				 * 	- create(object)
				 * 	
				 * 	List of supported extended-REST methods:
				 * 	- duplicate(id)
				 * 	- visible([{id, Visibility}])
				 * 	- advanceList(params)
				 * 	
				 * 	List of should-override serialization methods:
				 * 	- generate()
				 * 	- serialize(model)
				 * 	- deserialize(raw_json)
				 *
				 * @version     1.0.0
				 * @method     createRestObject
				 * @param      {string}  resourceUri  { description }
				 * @return     {Object}  { description_of_the_return_value }
				 */
				makeRestObject: function(resourceUri) {
		            return {
		            	/**
		            	 * Get single resource by resource id
		            	 *
		            	 * @method     get
		            	 * @param      {string|number}  id      resource id
		            	 * @return     {Promise}  $q promise with single resource object
		            	 */
		            	get: function(id) {
			                return service.makeRequest({
			                    method: 'GET',
			                    url: resourceUri + '/' + id
			                });
			            },
			            /**
			             * List all resources by parameter criteria
			             *
			             * @method     list
			             * @param      {Object}  params  custom endpoint parameters
			             * @return     {Promise}  $q promise with Array|Object of resources
			             */
			            list: function(params) {
			                return service.makeRequest({
			                    method: 'GET',
			                    url: resourceUri,
			                    params: params
			                });
			            },
			            /**
			             * Delete all resources by resource id
			             *
			             * @method     delete
			             * @param      {Array}  array   array of resource object with id
			             * @return     {Promise}  $q promise
			             */
			            delete: function(array) {
			                return service.makeRequest({
			                    method: 'DELETE',
			                    url: resourceUri,
			                    data: array,
			                    headers: {
			                        'Content-Type': 'application/json;charset=UTF-8'
			                    }
			                });
			            },
			            /**
			             * Update one resource by resource id
			             *
			             * @method     update
			             * @param      {string|number}  id      resource id
			             * @param      {Object}  obj     updated resource object
			             * @return     {Promise}  $q promise with updated resource
			             */
			            update: function(id, obj) {
			                return service.makeRequest({
			                    method: 'PUT',
			                    url: resourceUri + '/' + id,
			                    data: obj
			                });
			            },
			            /**
			             * Create new resource
			             *
			             * @method     create
			             * @param      {Object}  obj     new resource object
			             * @return     {Promise}  $q promise with newly created resource
			             */
			            create: function(obj) {
			                return service.makeRequest({
			                    method: 'POST',
			                    url: resourceUri,
			                    data: obj
			                });
			            },
			            /**
			             * Generate empty resource object
			             * 
			             * Should be overrided
			             *
			             * @method     generate
			             * @return     {Object}  empty resource
			             */
						generate: function() {
							//TODO: override generate()
			                return {};
			            },
			            /**
			             * Serialize user-defined form object structure into queryable resource structure
			             *
			             * Should be overrided
			             *
			             * @method     serialize
			             * @param      {Object}  data    object with user-defined structure
			             * @return     {Object}  resource object
			             */
			            serialize: function(data) {
			            	//TODO: override serialize(data)
			                return data;
			            },
			            /**
			             * Deserialize resource structure into user-defined form object
			             *
			             * Should be overrided
			             *
			             * @method     deserialize
			             * @param      {Object}  data    resource object
			             * @return     {Object}  object with user-defined structure
			             */
			            deserialize: function(data) {
			            	//TODO: override deserialize(data)
			                return data;
			            },
			            /**
			             * Duplicate resource by resource id
			             *
			             * @method     duplicate
			             * @param      {string|number}  resource id      
			             * @return     {Object}  duplicated resource object
			             */
			            duplicate: function(id) {
			                return service.makeRequest({
			                    method: 'POST',
			                    url: resourceUri + '/' + id
			                });
			            },
			            /**
			             * Set visibility of list of resources
			             *
			             * @method     visible
			             * @param      {Array}  array	Array of resource object
			             * @return     {Array}	Array of updated resource objects  
			             */
			            visible: function(array) {
			                return service.makeRequest({
			                    method: 'PUT',
			                    url: resourceUri + '/Visibility',
			                    data: array,
			                    headers: {
			                        'Content-Type': 'application/json;charset=UTF-8'
			                    }
			                });
			            },
			            /**
			             * List all resources by advance paramter criteria (POST object)
			             *
			             * @method     advanceList
			             * @param      {Object}  obj     advance parameters
			             * @return     {Object}  Object with list of resources and meta data
			             */
			            advanceList: function(obj) {
			                return service.makeRequest({
			                    method: 'POST',
			                    url: resourceUri + '/Search',
			                    data: obj
			                });
			            }
			        }
				}
			};
			return service;
		}];
	});
},{}],16:[function(require,module,exports){
/**
 * Handle storing data for cross-browser access
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.factory('storage', ["$cookies", function ($cookies){
		return {
			/**
			 * Get custom object by key
			 *
			 * @method     get
			 * @param      {string}  key     hash key
			 * @return     {Object}  custom stored object
			 */
			get: function(key) {
				return $cookies.getObject('central.seller.portal.shared.' + key);
			},
			/**
			 * Store custom object by key
			 *
			 * @method     put
			 * @param      {string}  key     hash key
			 * @param      {Object}  object  stored object
			 */
			put: function(key, object) {
				$cookies.putObject('central.seller.portal.shared.' + key, object);
			},
			/**
			 * Check for key existence
			 *
			 * @method     has
			 * @param      {string}   key     hash key
			 * @return     {boolean}  if key exist
			 */
			has: function(key) {
	        	return !_.isUndefined(this.get(key));
			},
			/**
			 * Remove custom object by key
			 *
			 * @method     remove
			 * @param      {string}  key     hash key
			 */
			remove: function(key) {
				$cookies.remove('central.seller.portal.shared.' + key);
			},
			/**
			 * Get stored authorization token
			 *
			 * @method     getSessionToken
			 * @return     {string}  auth token
			 */
			getSessionToken: function() {
				return $cookies.get('central.seller.portal.auth.token');
			},
			/**
			 * Store authorization token
			 *
			 * @method     storeSessionToken
			 * @param      {string}  token   auth token
			 */
			storeSessionToken: function(token) {
				$cookies.put('central.seller.portal.auth.token', token);
			},
			/**
			 * Get current user profile
			 *
			 * @method     getCurrentUserProfile
			 * @return     {Object}  user object
			 */
			getCurrentUserProfile: function() {
				return $cookies.getObject('central.seller.portal.auth.profile');
			},
			/**
			 * Store user profile
			 *
			 * @method     storeCurrentUserProfile
			 * @param      {Object}  profile  user object
			 */
			storeCurrentUserProfile: function(profile) {
				$cookies.putObject('central.seller.portal.auth.profile', profile);
			},

		    storeImposterProfile: function (profile){
			profile = angular.toJson(profile);
		        sessionStorage.setItem('central.seller.portal.auth.imposter', profile);
		    },
			
		    getImposterProfile: function () {
		        var profile = sessionStorage.getItem('central.seller.portal.auth.imposter');
		        return angular.fromJson(profile);
		    },
		    
		    clearImposterProfile: function () {
		         sessionStorage.removeItem('central.seller.portal.auth.imposter');
		    },

		    /**
		     * Utility method to clear the sessionStorage
		     */
		    clear: function () {
		        sessionStorage.removeItem('central.seller.portal.auth.token');
		        sessionStorage.removeItem('central.seller.portal.auth.profile');
			    sessionStorage.removeItem('central.seller.portal.auth.imposter');
		        localStorage.removeItem('central.seller.portal.auth.actions');
		        localStorage.removeItem('central.seller.portal.auth.profile');
		    }
		};
}]);
},{}],17:[function(require,module,exports){
/**
 * Handle all common http related functions
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.factory('$formCache', function() {
		var cache = {};
		return {
			putAll: function(object) {
				
			},
			put: function(key, json) {
				cache[key] = json;
			},
			get: function(key, json) {
				return cache[key];
			}
		};
	});
},{}],18:[function(require,module,exports){
/**
 * Handle storing data for cross-browser access
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.factory('util', ["config", function(config) {
		var service = { variant: {} };

	    service.variant.toString = function (a, b) {
	        var left = null;
	        var right = null;
	        left = (a.ValueEn || a.AttributeValueEn || a.AttributeValues.length && a.AttributeValues[0].AttributeValueEn || '');
	        right = (b.ValueEn || b.AttributeValueEn || b.AttributeValues.length > 0 && b.AttributeValues[0].AttributeValueEn || '');
	        console.log(a,b, 'toString variant');
	        return left + (right ? ", " + right : "");
	    };

	    service.uniqueSet = function (a, prop) {
	        // var seen = new Set();
	        // return a.filter(function (x) {
	        //     var y = x;
	        //     if (prop) y = x[prop];
	        //     return !seen.has(y) && seen.add(y);
	        // })
	        return _.uniqWith(a, function(x,y){
	            if(x == y) return true;
	            if(prop && _.get(x, prop) && _.get(y, prop)){
	                return _.get(x, prop) == _.get(y, prop);
	            }
	            return false;
	        });
	    };

	    service.nullOrUndefined = function (a) {
	        return _.isNil(a);
	    };

	    var DataTypeDropDown = {};
	    if (!('DROPDOWN' in config)) throw new KnownException("Config is malformed. Expect 'DROPDOWN'");
	    if (!('DATA_TYPE_DROPDOWN' in config.DROPDOWN)) throw new KnownException("Config is malformed. Expect 'DROPDOWN.DATA_TYPE_DROPDOWN'");
	    config.DROPDOWN.DATA_TYPE_DROPDOWN.forEach(function (dt) {
	        DataTypeDropDown[dt.value] = dt.name;
	    });


	    service.isFreeTextDataType = function (dataType) {
	        if (!('ST' in DataTypeDropDown)) throw new KnownException("FreeText in no longer 'ST' in config");
	        return (dataType == "ST");
	    };

	    service.isListDataType = function (dataType) {
	        if (!('LT' in DataTypeDropDown)) throw new KnownException("List in no longer 'LT' in config");
	        return (dataType == "LT");
	    };

	    service.isHtmlDataType = function (dataType) {
	        if (!('HB' in DataTypeDropDown)) throw new KnownException("HTML Box in no longer 'HB' in config");
	        return (dataType == 'HB');
	    }

	    //Goto 404
	    service.page404 = function () {
	        $window.location.href = "/error";
	    };
	    service.warningOnLeave = function (fn) {
	        $window.onbeforeunload = function () {
	            if (!fn()) {
	                //not dirty
	                return null;
	            }

	            var message = "Your changes will not be saved.",
	                e = e || window.event;
	            // For IE and Firefox
	            if (e) {
	                e.returnValue = message;
	            }

	            // For Safari
	            return message;
	        };
	    };
	    service.saveAlertError = function () {
	        return config.DEFAULT_ERROR_MESSAGE;
	    };
	    service.saveAlertSuccess = function (itemName, link) {
	        return config.DEFAULT_SUCCESS_MESSAGE + ' View <a href="' + link + '">' + itemName + ' List</a>';
	    };
	    service.bulkTemplate = function (actionName, restFn, id, item, confirmOpts) {
	        return function (scope) {
	             return {
	                name: actionName,
	                fail: function() {
	                    scope.alert.error('Unable to ' + actionName.toLowerCase() + '. Please select ' + item + ' for this action.');
	                },
	                fn: function (array, cb) {
	                    scope.alert.close();

	                    //Only pass ShopId
	                    var array = _.map(array, function (e) {
	                        return _.pick(e, [id]);
	                    });

	                    //On launch endpoint
	                    scope.onLoad();

	                    //generic bulk
	                    restFn(array)
	                        .then(function () {
	                            scope.alert.success(actionName + ' successful.');
	                            cb();
	                        }, function (err) {
	                            scope.alert.error(common.getError(err));
	                        })
	                        .finally(scope.reload);
	                },
	                confirmation: _.extend({
	                    title: 'Confirm to ' + actionName.toLowerCase(),
	                    message: 'Are you sure you want to '+ actionName.toLowerCase() + ' {{model.length}} items?'
	                }, confirmOpts || {})
	            };
	        };
	    };
	    service.bulkDelete = function (rest, id, item, alert, reload, onload) {
	        return {
	            name: 'Delete',
	            fail: function() {
	                alert.error('Unable to delete. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    return _.pick(e, [id]);
	                });

	                //On launch endpoint
	                (onload || _.noop)();

	                //Delete bulk
	                rest.delete(array)
	                    .then(function () {
	                        alert.success('Delete successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to delete',
	                message: 'Are you sure you want to delete {{model.length}} items?',
	                btnConfirm: 'Delete',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	    service.bulkShow = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Show',
	            fail: function() {
	                alert.error('Unable to change visibility. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    var i = _.pick(e, [id]);
	                    i.Visibility = true;
	                    return i;
	                });

	                //Delete bulk
	                rest.visible(array)
	                    .then(function () {
	                        alert.success('Changed successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to show',
	                message: 'Are you sure you want to change visibility of {{model.length}} items?',
	                btnConfirm: 'Show'
	            }
	        };
	    };
	    service.bulkHide = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Hide',
	            fail: function() {
	                alert.error('Unable to hide. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    var i = _.pick(e, [id]);
	                    i.Visibility = false;
	                    return i;
	                });

	                //Delete bulk
	                rest.visible(array)
	                    .then(function () {
	                        alert.success('Changed successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to hide',
	                message: 'Are you sure you want to hide {{model.length}} items?',
	                btnConfirm: 'Hide',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	    service.actionView = function (uri, id, name) {
	        return {
	            name: name || 'View / Edit',
	            fn: function (item) {
	                $window.location.href = uri + '/' + item[id];
	            }
	        };
	    };
	    service.actionDelete = function (rest, id, item, alert, reload, cb) {
	        return {
	            name: 'Delete',
	            fn: function (obj) {
	                alert.close();

	                //Only pass id
	                var obj = _.pick(obj, [id]);


	                //Delete bulk
	                rest.delete([obj])
	                    .then(function () {
	                        alert.success('Delete successful.');
	                        cb(obj, id);
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Delete',
	                message: 'Are you sure you want to delete selected ' + item + '?',
	                btnConfirm: 'Delete',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	    service.actionDuplicate = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Duplicate',
	            fn: function (obj) {
	                alert.close();

	                //Delete bulk
	                rest.duplicate(obj[id])
	                    .then(function () {
	                        alert.success('Duplicate successful.');
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Duplicate',
	                message: 'Are you sure you want to duplicate selected ' + item + '?',
	                btnConfirm: 'Duplicate'
	            }
	        };
	    };
	    service.eyeToggle = function (rest, id, alert, reload) {
	        return function (item) {
	            item.Visibility = !item.Visibility;
	            rest.visible([_.pick(item, [id, 'Visibility'])])
	                .then(function () {
	                    //success
	                }, function (err) {
	                    alert.error(common.getError(err));
	                })
	                .finally(reload);
	        };
	    };
	    service.getDropdownItem = function (array, value) {
	        return array.find(function (element) {
	            if (element.value === value) {
	                return true;
	            }
	            return false;
	        });
	    };
	    service.getTitle = function (id, item) {
	        var scope = $rootScope.$new(true);
	        var content = '';
	        scope.content = item;

	        if (id > 0) {
	            content = $interpolate(config.TITLE.DETAIL)(scope);
	        } else {
	            content = $interpolate(config.TITLE.CREATE)(scope);
	        }
	        return content;
	    };
	    return service;		
	}]);
},{}],19:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Contains all core functionality of the portal
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core', [
	'colsp.vendor',
	require('../nc')
])
.constant('route', require('../route.js'));
/* require all */
(function () {var f = require("./index.js");f["controllers"]=({"abstractAddCtrl":require("./controllers\\abstractAddCtrl.js"),"abstractAdvanceListCtrl":require("./controllers\\abstractAdvanceListCtrl.js"),"abstractListCtrl":require("./controllers\\abstractListCtrl.js"),"loginCtrl":require("./controllers\\loginCtrl.js"),"rootCtrl":require("./controllers\\rootCtrl.js")});f["directives"]=({"ngDynamicController":require("./directives\\ngDynamicController.js"),"ngIncludeEx":require("./directives\\ngIncludeEx.js"),"ngTemplate":require("./directives\\ngTemplate.js")});f["helpers"]=({"category":require("./helpers\\category.js"),"common":require("./helpers\\common.js"),"storage":require("./helpers\\storage.js"),"templateForm":require("./helpers\\templateForm.js"),"util":require("./helpers\\util.js")});f["index"]=require("./index.js");f["services"]=({"credentialService":require("./services\\credentialService.js"),"globalCategoryService":require("./services\\globalCategoryService.js"),"localCategoryService":require("./services\\localCategoryService.js"),"routerService":require("./services\\routerService.js")});return f;})();
/**
 * Export angular module
 */
module.exports = 'colsp.core';
},{"../nc":51,"../route.js":53,"./controllers\\abstractAddCtrl.js":6,"./controllers\\abstractAdvanceListCtrl.js":7,"./controllers\\abstractListCtrl.js":8,"./controllers\\loginCtrl.js":9,"./controllers\\rootCtrl.js":10,"./directives\\ngDynamicController.js":11,"./directives\\ngIncludeEx.js":12,"./directives\\ngTemplate.js":13,"./helpers\\category.js":14,"./helpers\\common.js":15,"./helpers\\storage.js":16,"./helpers\\templateForm.js":17,"./helpers\\util.js":18,"./index.js":19,"./services\\credentialService.js":20,"./services\\globalCategoryService.js":21,"./services\\localCategoryService.js":22,"./services\\routerService.js":23}],20:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles user credential
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.factory('CredentialService', ["common", "$base64", "storage", "$q", "$rootScope", function(common, $base64, storage, $q, $rootScope) {
		var service = {};

	    service.changePassword = function(object){
	    	return common.makeRequest({
	    		url: '/Users/ChangePassword',
	    		method: 'PUT',
	    		data: object
	    	});
	    };

	    service.getRedirPath = function(profile){
	        if(profile.User.IsAdmin === true){
	            return '/admin'
	        }
	        return '/products'
	    }

		service.login = function(user, pass, remember){
			var deferred = $q.defer();
			storage.storeSessionToken($base64.encode(user + ":" + pass), true);
			common.makeRequest({
				type: 'GET',
				url: '/Users/Login/'
			}).then(function(r){
				storage.storeCurrentUserProfile(r, true);
				deferred.resolve(r);
			}, deferred.reject);

			return deferred.promise;
		};

		service.loginAs = function(User){
			var deferred = $q.defer();
		 	common.makeRequest({
				type: 'GET',
				url: '/Users/Admin/Login/' + User.UserId
			}).then(function(r){
				storage.storeCurrentUserProfile(r, true);
				storage.storeImposterProfile(User);
				deferred.resolve(r);
			}, deferred.reject);

			return deferred.promise;
		};

		service.logoutAs = function(){
			var deferred = $q.defer();
			common.makeRequest({
				type: 'GET',
				url: '/Users/Admin/LogoutAs'
			}).then(function(r){
	            storage.clearImposterProfile();
				storage.storeCurrentUserProfile(r, true);
	            deferred.resolve(r);
			}, deferred.reject);

			return deferred.promise;
		};
	    
	    service.logout = function(){
			storage.clear();
		};

		return service;
	}]);

},{}],21:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],22:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],23:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles parsing routev1
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.provider('router', ["route", function (route) {
		/**
		 * Create renderable tree-array of menu items from tree-object
		 *
		 * @method     generateMenu
		 * @param      {Object}  routeMenu  Tree-object
		 * @return     {Array}   Tree-array
		 */
		var generateMenu = function (routeMenu) {
			var menu = [];
			_.forOwn(routeMenu, function(object, header) {
				var token = header.split('|');
				var menuItem = {
					header: token[0],
					submenu: []
				};

				if(token.length > 1) {
					menuItem.icon = token[1];
				}

				if(!_.isEmpty(object)) {
					_.forOwn(object, function(routeObj, subheader) {
						var urls = [];
						var url = null;
						if(_.isString(routeObj)) {
							url = routeObj;
						}
						else if(_.isArray(routeObj)) {
							_.forEach(routeObj, function(v, k) {
								if(k == 0) {
									url = _.isObject(v) ? v.path : v;
									urls.push(url);
								}
								urls.push(_.isObject(v) ? v.path : v);
							});
						} else if(_.isObject(routeObj)) {
							url = routeObj.path;
						}
						var token2 = subheader.split('|');
						var submenuItem = {
							header: token2[0],
							css: '',
							url: url,
							urls: urls
						};
						
						if(token2.length > 1) {
							submenuItem.css += token2[1];
						}

						menuItem.submenu.push(submenuItem);
					});
					if(menuItem.submenu.length > 0) {
						menuItem.url = menuItem.submenu[0].url;
					}
				}

				menu.push(menuItem);
			});
			return menu;
		};
		/**
		 * Check if path match with matcher
		 *
		 * @method     isActive
		 * @param      {string}   matcher     url-formated string
		 * @param      {string}   path    relative path
		 * @return     {boolean}  is match
		 */
		var isActive = function (matcher, path) {
			var regex = new RegExp('^' + matcher.replace(/\:[a-zA-Z0-9_]+/g, '[A-Z0-9_-]+') + '$');
			return regex.test(path);
		};
		/**
		 * Parse get params
		 *
		 * @method     getParams
		 * @param      {string}  matcher  { description }
		 * @param      {<type>}  path     { description }
		 */
		var getParams = function (matcher, path) {
			var tmp = matcher.split('/');
			var tokens = [];
			for (var i = 0; i < tmp.length; i++) {
				if(tmp[i].startsWith(':')) {
					tokens.push(tmp[i].substring(1));
				}
			}
			//check if token exist
			if(tokens.length > 0) {
				var regex = new RegExp('^' + matcher.replace(/\:[a-zA-Z0-9_]+/g, '([A-Z0-9_-])+') + '$');
				var match = regex.exec(path);
				var obj = {};
				_.forEach(match, function(item) {
					obj[tokens.pop()] = item;
				});
				return obj;
			} else {
				//empty
				return {};
			}
		};
		var traverseRoute = function (tree, context) {
			if(_.has(tree, 'path')) {
				//is leaf
				if(isActive(tree.path, window.location.pathname)) {
					return _.extend({}, context, tree);
				} else {
					return null;
				}
			} else {
				//is branch
				var ctx = _.extend({}, context);
				if(_.has(tree, '$default')) {
					ctx = _.extend(ctx, tree.$default);
				}
				var subtree;
				_.forOwn(tree, function(v,k) {
					if(!k.startsWith('$')) {
						if(_.isNil(subtree))	 {
							subtree = traverseRoute(v, ctx);
						}
					}
				});
				return subtree;
			}
		};
		/* service bootstrap */
		this.$get = ["$window", function($window) {
			'ngInject';
			//Current route object
			var currentPath = $window.location.pathname;
			var currentRoute = traverseRoute(route.route, {});
			//Assign menu
			if(!_.isNil(currentRoute) && !_.isNil(currentRoute.menu) && _.has(route.menu, currentRoute.menu)) {
				currentRoute.menu = generateMenu(route.menu[currentRoute.menu]);
			} else {
				currentRoute.menu = null;
			}
			return {
				isActive: function(matcher) {
					return isActive(matcher, currentPath);
				},
				currentPath: currentPath,
				current: currentRoute,
				route: route.route,
				GET: getParams(currentRoute.path, currentPath),
				POST: {}, //parse elsewhere
				go: function(path) {
					$window.location.href = _.get(this.route, path + '.path');
				},
				get: function(path) {
					return _.get(this.route, path + '.path');
				},

			};
		}];
	}]);
},{}],24:[function(require,module,exports){
angular.module('nc')
	.directive('ncAction', ["$templateCache", "$uibModal", function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				options: '=ncActionFn'
			},
			template: $templateCache.get('common/ncAction.html'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, []);
				scope.call = function(action) {
					if(action.confirmation) {
						var modal = $uibModal.open({
							animation: true,
							size: 'size-warning',
							templateUrl: 'common/ncActionModal.html',
							controller: ["$scope", "$uibModalInstance", "options", "$interpolate", function($scope, $uibModalInstance, options, $interpolate) {
								$scope.title = options.title;
								$scope.message = $interpolate(options.message)(scope);
								$scope.btnNo = options.btnNo || 'Cancel';
								$scope.btnYes = options.btnYes || 'Confirm';
								$scope.btnClass = options.btnClass || 'btn-blue';
								$scope.yes = function() {
									$uibModalInstance.close();
								};
								$scope.no = function() {
									$uibModalInstance.dismiss();
								}
							}],
							resolve: {
								options: function() {
									return {
										title: action.confirmation.title,
										message: action.confirmation.message,
										btnNo: action.confirmation.btnCancel,
										btnYes: action.confirmation.btnConfirm,
										btnClass: action.confirmation.btnClass
									}
								}
							}
						});

						//Modal
						modal.result.then(function() {
							action.fn(scope.model);
						});
					} else {
						action.fn(scope.model);
					}
				};
			}
		}
	}]);

},{}],25:[function(require,module,exports){
angular.module('nc')
	.directive('ncAdvanceSearch', ["$templateCache", "$timeout", "$uibModal", function($templateCache, $timeout, $uibModal) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				open: '=ncAdvanceSearchToggle',
				options: '=?ncAdvanceSearchOptions',
				callback: '=?ncAdvanceSearchEvent'
			},
			template: function(elem, attrs) {
				if(attrs.ncAdvanceSearch) {
					return $templateCache.get(attrs.ncAdvanceSearch);
				} else {
					return $templateCache.get('common/ncAdvanceSearch.html');
				}
			},
			link: function(scope, elem, attrs) {
				scope.formData = {};
				scope.form = {};
				scope.callback = scope.callback || function() { return false };
				scope.options = _.defaults(scope.options, {
					Tags: [],
					Brands: [],
					LocalCategories: [],
					GlobalCategories: [],
					Admin: true
				});
				scope.search = function() {
					if(scope.callback(scope.formData, true)) return;
					scope.model = _.extend({}, scope.formData);
				};
				scope.clear = function() {
					if(scope.callback(scope.formData, false)) return;
					scope.formData = {};
				};
			}
		};
	}])
	.directive('ncAdvanceSearchButton', ["$templateCache", function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel'
			},
			template: function(elem, attrs) {
				if(attrs.ncAdvanceSearch) {
					return $templateCache.get(attrs.ncAdvanceSearch);
				} else {
					return $templateCache.get('common/ncAdvanceSearchButton.html');
				}
			},
			link: function(scope, elem, attrs) {
				scope.toggle = function() {
					scope.model = !scope.model;
				};
			}
		};
	}]);
},{}],26:[function(require,module,exports){
angular.module('nc')
	.provider('$ncAlert', function() {
		this.defaultErrorMessage = 'Error';
		this.defaultSuccessMessage = 'Success';
		this.$get = function() {
			return this;
		};
	})
	.directive('ncAlert', ["$templateCache", function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				alert: '=ncModel'
			},
			template: $templateCache.get('common/ncAlert.html')
		}
	}])
	.factory('NcAlert', ["$document", "$timeout", "$ncAlert", function($document, $timeout, $ncAlert) {
		return function() {
			var vm = this;
			this.type = 'red';
			this.show = false;
			this.close = function() {
				this.show = false;
			};
			this.open = function(success, msg, color) {
				color = _.isNil(color) ? 'red' : color;
				this.type = (success) ? 'green' : color;

				if(msg) {
					this.message = msg;
				} else {
					this.message = success ? $ncAlert.defaultSuccessMessage : $ncAlert.defaultErrorMessage;
				}

				this.show = true;
			};
			this.error = function(obj) {
				this.open(false, obj);
				
				$timeout(function() {
					var section = vm.element || $document;
					section.scrollTopAnimated(0, 1000);
				}, 10);
			};
			this.success = function(obj) {
				this.open(true, obj);
				
				$timeout(function() {
					var section = vm.element || $document;
					section.scrollTopAnimated(0, 1000);
				}, 10);
			};
			this.message = '';
		};
	}]);
},{}],27:[function(require,module,exports){
angular.module('nc')
	.directive('ncBindCompile', ["$compile", "$templateCache", function($compile, $templateCache) {
       return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.ncBindCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
	}])
    .directive('ncBindTemplate', ["$compile", "$templateCache", function($compile, $templateCache) {
       return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.ncBindTemplate);
                }, function (value) {
                    var content = $templateCache.get(value);
                    element.html(content);
                    $compile(element.contents())(scope);
                });
            }
        };
    }]);
},{}],28:[function(require,module,exports){
angular.module('nc')
	.directive('ncBreadcrumbSelect', ["$templateCache", "$filter", "$timeout", function($templateCache, $filter, $timeout) {
		var _globalOptions = {};
		var encodedSeparator = '>>>>';
		function constructBreadcrumbFromTree(tree, breadcrumb, parentObj) {
			if(_.isUndefined(breadcrumb)) {
				breadcrumb = [];
			}
			if(_.isArray(tree) && tree.length > 0) {
				_.forEach(tree, function(item) {
					var encodedName = $filter('escapeHtml')(item[_globalOptions.nameKey]);
					var name = _.isUndefined(parentObj) ? encodedName : parentObj.name + encodedSeparator + encodedName;
					var obj = {
						displayName: name,
						name: item[_globalOptions.nameKey],
						id: item[_globalOptions.idKey],
						item: item
					};
					breadcrumb.push(obj);
					breadcrumb 	= constructBreadcrumbFromTree(item[_globalOptions.childrenKey], breadcrumb, obj);
				});
			}
			return breadcrumb;		
		};
		return {
			restrict: 'E',
			scope: {
				originalModel: '=ncModel',
				tree: '=ncBreadcrumbSelectTree',
				options: '=?ncBreadcrumbSelectOptions',
				name: '@name'
			},
			template: $templateCache.get('common/ncBreadcrumbSelect.html'),
			link: function(scope) {
				scope.searchable = [];
				scope.model = {ptr: []};
				scope.options = _.defaults(scope.options, {
					nameKey: 'NameEn',
					childrenKey: 'nodes',
					idKey: 'CategoryId',
					placeholder: '',
					limit: 10,
					tagCount: 5,
					seperator: ' <span class="fa fa-angle-right"></span> '
				});
				_globalOptions = scope.options;
				scope.encodedSeparator = encodedSeparator;
				scope.$watchCollection('model.ptr', function(newObj, oldObj) {
					scope.originalModel = [];
					var newArr = _.compact(_.map(scope.model.ptr, 'item'));
					_.forEach(newArr, function(e) {
						scope.originalModel.push(e);
					});
				});
				scope.$watchCollection('originalModel', function(newObj, oldObj) {
					if(_.isUndefined(newObj)) {
						scope.originalModel = [];
					}
					if(_.isArray(scope.originalModel)) {
						scope.model.ptr = [];
						_.forEach(scope.originalModel, function(e) {
							var search = { item: {} };
							search['item'][scope.options.idKey] = e[scope.options.idKey];
							var found = _.find(scope.searchable, search);
							if(_.isObject(found)) {
								scope.model.ptr.push(found);
							}
						});
					}
				});
				scope.$watchCollection('tree', function(newObj, oldObj) {
					scope.searchable = constructBreadcrumbFromTree(scope.tree, []);
				});
			}
		};
	}])
},{}],29:[function(require,module,exports){
angular.module('nc')
    .directive('ncBreadcrumbTitle', ["$templateCache", function ($templateCache) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                title: '=ncTitles',
                link: '=ncLinks',
                css: '=?ncClass'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('partials/breadcrumb-title.html');
                return templateHTML;
            }
        };
    }]);
},{}],30:[function(require,module,exports){
angular.module('nc')
	.service('NcBulk', function() {
	    this.template = function (actionName, restFn, id, item, confirmOpts) {
	        return function (scope) {
	             return {
	                name: actionName,
	                fail: function() {
	                    scope.alert.error('Unable to ' + actionName.toLowerCase() + '. Please select ' + item + ' for this action.');
	                },
	                fn: function (array, cb) {
	                    scope.alert.close();

	                    //Only pass ShopId
	                    var array = _.map(array, function (e) {
	                        return _.pick(e, [id]);
	                    });

	                    //On launch endpoint
	                    scope.onLoad();

	                    //generic bulk
	                    restFn(array)
	                        .then(function () {
	                            scope.alert.success(actionName + ' successful.');
	                            cb();
	                        }, function (err) {
	                            scope.alert.error(common.getError(err));
	                        })
	                        .finally(scope.reload);
	                },
	                confirmation: _.extend({
	                    title: 'Confirm to ' + actionName.toLowerCase(),
	                    message: 'Are you sure you want to '+ actionName.toLowerCase() + ' {{model.length}} items?'
	                }, confirmOpts || {})
	            };
	        };
	    };
	    this.delete = function (rest, id, item, alert, reload, onload) {
	        return {
	            name: 'Delete',
	            fail: function() {
	                alert.error('Unable to delete. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    return _.pick(e, [id]);
	                });

	                //On launch endpoint
	                (onload || _.noop)();

	                //Delete bulk
	                rest.delete(array)
	                    .then(function () {
	                        alert.success('Delete successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to delete',
	                message: 'Are you sure you want to delete {{model.length}} items?',
	                btnConfirm: 'Delete',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	    this.show = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Show',
	            fail: function() {
	                alert.error('Unable to change visibility. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    var i = _.pick(e, [id]);
	                    i.Visibility = true;
	                    return i;
	                });

	                //Delete bulk
	                rest.visible(array)
	                    .then(function () {
	                        alert.success('Changed successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to show',
	                message: 'Are you sure you want to change visibility of {{model.length}} items?',
	                btnConfirm: 'Show'
	            }
	        };
	    };
	    this.hide = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Hide',
	            fail: function() {
	                alert.error('Unable to hide. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    var i = _.pick(e, [id]);
	                    i.Visibility = false;
	                    return i;
	                });

	                //Delete bulk
	                rest.visible(array)
	                    .then(function () {
	                        alert.success('Changed successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to hide',
	                message: 'Are you sure you want to hide {{model.length}} items?',
	                btnConfirm: 'Hide',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	})
	.directive('ncBulk', ["$templateCache", "$uibModal", function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			template: $templateCache.get('common/ncBulk.html'),
			scope: {
				model: '=ncModel',
				options: '=ncBulkFn',
				select: '=?ncBulkSelect',
				id: '@ncBulkTrackBy',
				tag: '@ncTag'
			},
			link: function(scope) {
				var defaultOption = {
					name: '- Choose Action -',
					fn: function() {

					}
				};
				scope.options = _.concat(defaultOption, _.defaults(scope.options, []));
				scope.model = _.defaults(scope.model, []);

				scope.id = _.defaults(scope.id, null);
				scope.select = scope.options[0];

				scope.uniq = function(e) {
					if(scope.id != null) {
						if(_.isUndefined(e[scope.id])) {
							throw 'Object does not contain property of ncBulkTrackBy = "' + scope.id + '"';
						}
						return e[scope.id];
					} else {
						return e;
					}
				};
				scope.selectOption = function(option) {
					scope.select = option;
				}
				scope.onChildChange = function(value, obj) {
					if(value) {
						scope.model = _.uniq(_.concat(scope.model, obj), scope.uniq);
					} else {
						if(_.isArray(obj)) {
							_.pullAllBy(scope.model, obj, scope.uniq);
						} else {
							_.pullAllBy(scope.model, [obj], scope.uniq);
						}
					}
				};
				scope.findChild = function(obj) {
					if(_.isArray(obj)) {
						return _.differenceBy(scope.model, obj, scope.uniq).length == (scope.model.length - obj.length);
					} else {
						return !_.isUndefined(_.find(scope.model, function(e) {
							return scope.uniq(e) === scope.uniq(obj);
						}));
					}
				};
				scope.call = function() {
					if(scope.select != scope.options[0]) {
						if(scope.select.fail && scope.model.length == 0) {
							scope.select.fail(scope.model);
							return;
						}
						if(scope.select.confirmation) {
							var modal = $uibModal.open({
								animation: true,
								size: 'size-warning',
								templateUrl: 'common/ncBulkModal.html',
								controller: ["$scope", "$uibModalInstance", "options", "$interpolate", function($scope, $uibModalInstance, options, $interpolate) {
									$scope.title = options.title;
									$scope.message = $interpolate(options.message)(scope);
									$scope.btnNo = options.btnNo || 'Cancel';
									$scope.btnYes = options.btnYes || 'Confirm';
									$scope.btnClass = options.btnClass || 'btn-blue';
									$scope.yes = function() {
										$uibModalInstance.close();
									};
									$scope.no = function() {
										$uibModalInstance.dismiss();
									}
								}],
								resolve: {
									options: function() {
										return {
											title: scope.select.confirmation.title,
											message: scope.select.confirmation.message,
											btnNo: scope.select.confirmation.btnCancel,
											btnYes: scope.select.confirmation.btnConfirm,
											btnClass: scope.select.confirmation.btnClass
										}
									}
								}
							});
							//Modal 
							modal.result.then(function() {
								scope.select.fn(scope.model, function() {
									//cb to clear all entries
									scope.model = [];
								});
							});
						} else {
							scope.select.fn(scope.model, function() {
								//cb to clear all entries
								scope.model = [];
							});
						}
					}
				};
			}
		}
	}])
	.directive('ncBulkCheckbox', ["$document", "$templateCache", function($document, $templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				tag: '@ncTag'
			},
			template: $templateCache.get('common/ncBulkCheckbox.html'),
			link: function(scope) {
				if (_.isUndefined(scope.tag)) {
					scope.parent = angular.element(document).find('nc-bulk').isolateScope();
				} else {
					scope.parent = angular.element(document).find('nc-bulk[ncTag="' + scope.tag + '"]').isolateScope();
				}

				scope.prevent = false;
				scope.checkbox = false;
				

				var updateModel = function(val, val2) {
					var checkbox = scope.parent.findChild(scope.model);
					if(checkbox !== scope.checkbox) {
						scope.prevent = true;
						scope.checkbox = checkbox;
					}
				};

				scope.$watch('model', updateModel, true);
				scope.$watch('checkbox', function(val, val2) {
					if(scope.prevent) {
						scope.prevent = false;
						return;
					}
					scope.parent.onChildChange(val, scope.model);
				});
				scope.parent.$watch('model', updateModel, true);
			}
		}
	}]);
},{}],31:[function(require,module,exports){
angular.module('nc')
    .directive('ncDateRange', ["$rootScope", "$templateCache", "$compile", "$templateOptionsCache", "KnownException", "$parse", function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException, $parse) {
            return {
                restrict: 'A',
                replace: true,
                priority: 1010,
                scope: {
                    optionsPath: '@ncTemplateOptionsPath',
                    startLabel: '@?ncStartLabel',
                    startDate: '=ncModelStart',
                    endLabel: '@?ncEndLabel',
                    label: '@?ncLabel',
                    endDate: '=ncModelEnd',
                    startMinView: '@ncStartMinView',
                    endMinView: '@ncEndMinView',
                    errorText: '@ncErrorText'
                },
                template: function (element, attrs) {
                    var templateHTML = $templateCache.get(attrs.ncDateRange);
                    if(!templateHTML){
                        throw new KnownException("Unable to load specified nc-daterange template " + attrs.ncDateRange);
                    }
                    return templateHTML;
                },
                link: function (scope, element, attrs, ctrl, transclude) {
                    var pathComp
                    var opt = {};
                    if(scope.optionsPath){
                        pathComp = scope.optionsPath.split('/');
                        opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                    }

                    if (!opt) {
                        throw new KnownException('Warning: nc-date-range cannot find ' + scope.optionsPath);
                        opt = {};
                    }

                    if(!('error' in opt)){
                        opt.error = {};
                    };


                    scope.options = opt;
                    scope.config1 = { dropdownSelector: '#date_range_vertical_dropdown1', minView: (scope.startMinView || 'hour') }
                    scope.config2 = { dropdownSelector: '#date_range_vertical_dropdown2', minView: (scope.endMinView || 'hour') }
                }
            };
        }]);

},{}],32:[function(require,module,exports){
angular.module('nc')
	.directive('ncEmpty', ["$templateCache", function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncEmpty'
			},
			template: $templateCache.get('common/ncEmpty.html'),
			link: function(scope) {
				scope.message = _.extend('Empty content', scope.message);
			}
		};
	}]);
},{}],33:[function(require,module,exports){
angular.module('nc')
	.directive('ncEye', ["$templateCache", function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				callback: '&ncEyeOnToggle'
			},
			template: $templateCache.get('common/ncEye.html'),
			link: function(scope) {
				scope._toggle = function() {
					scope.model =!scope.model;
					scope.$eval(scope.callback);
				};
			}
		}
	}]);
},{}],34:[function(require,module,exports){
angular.module('nc')
	.directive('ncFilter', ["$templateCache", function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				model: '=ncModel',
				filters: '=ncFilterOptions',
				callback: '=?ncFilterEvent'
			},
			template: $templateCache.get('common/ncFilter.html'),
			link: function(scope) {
				scope.callback = scope.callback || function() { return false };
				scope.select = function(value) {
					if(scope.callback()) return;
					scope.model = value;
				}
			}
		}
	}])
},{}],35:[function(require,module,exports){
angular.module('nc')
	.directive('ncImageGallery', ["$templateCache", "$uibModal", function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				model: '=ncModel',
				options: '=ncImageGalleryOptions',
				lock: '&?ncImageGalleryDisabled'
			},
			template: $templateCache.get('common/ncImageGallery.html'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, {
					actions: [],
					size: 10, //max size of gallery
					urlKey: 'url', //image[urlKey] to get src
					loaderImg: '/assets/img/loader.gif', //when image[urlKey] = ''
					emptyImg: '/assets/img/placeholder-no-image-blank.png' //when image = null 
				});
				scope.lock = _.defaults(scope.lock, function() { return false; });
				scope.getSrc = function(image) {
					if(image == null) {
						//Empty
						return scope.options.emptyImg;
					} else if(image[scope.options.urlKey] == '') {
						return scope.options.loaderImg;
					} else {
						return image[scope.options.urlKey];
					}
				};
				scope.isDisabled = function(image) {
					return _.isNull(image) || scope.lock();
				};
				scope.call = function(action, image) {
					if(scope.isDisabled(image)) return;
					var index = scope.model.indexOf(image);
					
					if(action.confirmation) {
						var modal = $uibModal.open({
							size: 'size-warning',
							templateUrl: 'common/ncActionModal.html',
							controller: ["$scope", "$uibModalInstance", "options", "$interpolate", function($scope, $uibModalInstance, options, $interpolate) {
								$scope.title = options.title;
								$scope.message = $interpolate(options.message)(scope);
								$scope.yes = function() {
									$uibModalInstance.close();
								};
								$scope.no = function() {
									$uibModalInstance.dismiss();
								}
							}],
							resolve: {
								options: function() {
									return {
										title: action.confirmation.title,
										message: action.confirmation.message
									}
								}
							}
						});

						modal.result.then(function() {
							action.fn(image, scope.model, index);
						})
					} else {
						action.fn(image, scope.model, index);
					}
				}
				var load = function() {
					scope.images = _.clone(scope.model);
					for (var i = 0; i < scope.options.size - scope.model.length; i++) {
						scope.images.push(null);
					};
				};
				scope.$watch('model', load, true);
			}
		};
	}])
	.directive('ncImageDropzone', ["$templateCache", "$compile", "FileUploader", function($templateCache, $compile, FileUploader) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				originalUploader: '=ncImageUploader',
				options: '=?ncImageDropzoneOptions',
				onEvent: '&?ncImageDropzoneOnEvent',
				onError: '&?ncImageDropzoneOnError',
				onSuccess: '&?ncImageDropzoneOnSuccess',
				isUploading: '=?isUploading',
				template: '@ncImageTemplate'
			},
			link: function(scope, element) {
				scope.uploader = new FileUploader(scope.originalUploader);
				scope.template = scope.template || 'common/ncImageDropzoneTemplate.html';
				scope.options = _.defaults(scope.options, {
					urlKey: 'url',
					onQueueLimit: _.noop,
					onEvent: _.noop,
					onResponse: function(item) { return item; },
					onUpload: function(item) {}
				});
				scope.onError = scope.onError || _.noop;
				scope.onSuccess = scope.onSuccess || _.noop;
				scope.update = function() {
					var html = $templateCache.get(scope.template);
					element.html(html);
					$compile(element.contents())(scope);
				};
	
				scope.upload = function() {
					element.find('input').trigger('click');
				};

				scope.triggerEvent = function(eventName) {
					scope.onEvent({$eventName: eventName});
				};

				//Upload
				scope.uploader.onAfterAddingFile = function(item) {
					if(scope.uploader.queueLimit == scope.model.length) {
						if(scope.options.onQueueLimit) {
							scope.options.onQueueLimit(item, scope.model);
						}
						item.cancel();
						item.remove();
					} else {
						var obj = {};
						obj[scope.options.urlKey] = '';
						scope.model.push(obj);
						item.obj = obj;
						item.indx = scope.model.length-1;
					}
				};
				scope.uploader.onWhenAddingFileFailed = function(item, filter) {
			    	scope.onError({$response : filter});
				};
			    scope.uploader.onSuccessItem = function(item, response, status, headers) {
					scope.model[item.indx][scope.options.urlKey] = response[scope.options.urlKey];			    	
			    };
			    scope.uploader.onErrorItem = function(item, response, status, headers) {
			    	scope.model.splice(scope.model.indexOf(item.obj), 1);
			    	scope.onError({$response : response});
			    };

				scope.update();
				scope.$watch('template', scope.update);
				scope.$watch('uploader.isUploading', function(val) {
					scope.isUploading = val;
				});
			}
		};
	}])
},{}],36:[function(require,module,exports){
angular.module('nc')
.directive('ncImageIntegrity', function() {
    //Only show if image loaded by <img> integrity is OK (100% finished loading)
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    if(element.naturalWidth !== 0){
                        element.css('display', 'inherit');
                    }
                    
                });
                element.bind('error', function(){
                    element.css('display', 'inherit');
                    console.error("Unable to load image - integrity check failed", element); //should retry
                });
            }
        };
    })
},{}],37:[function(require,module,exports){
angular.module('nc')
	.directive('ncLoading', ["$templateCache", function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncLoading'
			},
			template: $templateCache.get('common/ncLoading.html'),
			link: function(scope) {
				scope.message = _.extend('Loading...', scope.message);
			}
		};
	}])
	.directive('ncLoadingSmall', ["$templateCache", function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncLoadingSmall'
			},
			template: $templateCache.get('common/ncLoadingSmall.html'),
			link: function(scope) {
				scope.message = _.extend('Loading...', scope.message);
			}
		};
	}]);
},{}],38:[function(require,module,exports){
angular.module('nc')
    .directive('ncPageTitle', ["$templateCache", function ($templateCache) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            priority: 1010,
            scope: {
                title: '@ncTitle'
            },
            template: function (element, attrs) {
                var templateHTML = $templateCache.get('partials/page-title.html');
                return templateHTML;
            }
        };
    }]);
},{}],39:[function(require,module,exports){
angular.module('nc')
	.provider('$ncPagination', function() {
		this.paginationSizes = [10,20,30];
		this.$get = function() {
			return this;
		}
	})
	.directive('ncPagination', ["$templateCache", "$ncPagination", function($templateCache, $ncPagination) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				params: '=ncModel',
				total: '=ncPaginationTotal',
				paginationOptions: '=?ncPaginationSizes',
				callback: '=?ncPaginationEvent'
			},
			template: $templateCache.get('common/ncPagination.html'),
			link: function(scope, element, attrs) {
				scope.paginationOptions = scope.paginationOptions || $ncPagination.paginationSizes;
				scope.params._limit = scope.paginationOptions[0];
				scope.callback = scope.callback || function() { return false };
				scope.page = function() {
					if(scope.total == 0) {
						return 0;
					}
					return Math.ceil(scope.params._offset / scope.params._limit) + 1;
				};
				scope.pageSize = function() {
					return scope.params._limit; 
				};	
				scope.totalPage = function() {
					return Math.ceil(scope.total / scope.params._limit);
				};
				scope.nextPage = function(offset) {
					var page = scope.page();
					var total = scope.totalPage();
					if(page + offset > total ||
						page + offset <= 0)
						return;
					if(scope.callback(scope.params._offset + (offset) * scope.params._limit, 'offset')) {
						return;
					}
					scope.params._offset += offset * scope.params._limit;
				};
				scope.setPage = function(i) {
					scope.params._offset = (i-1) * scope.params._limit;
				};
				scope.setPageSize = function(n) {
					if(scope.params._limit == n) {
						return;
					}
					if(scope.callback(n, 'size')) {
						return;
					}
					scope.params._limit = n;
					
				};
				scope.$watch('params._limit', function() {
					if(scope.params._limit > scope.total) {
						scope.setPage(1);
					}
				});
			}
		}
	}]);
},{}],40:[function(require,module,exports){
angular.module('nc')
	.provider('ncPermissionProvider', function() {
		this.permission = function() {
			return [];
		};
		this.$get = function() {
			return this;
		};
	})
	.directive('ncClassPermission', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {

			}
		}
	})
	.directive('ncShowPermission', function() {
		
	});
},{}],41:[function(require,module,exports){
angular.module('nc')
	.directive('ncSearch', ["$templateCache", function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				placeholder: '=ncSearchPlaceholder',
				event: '=?ncSearchEvent'
			},
			template: $templateCache.get('common/ncSearch.html'),
			link: function(scope) {
				scope.event = scope.event || function() { return false };
				scope.searchText = '';
				scope.callback = function() {
					if(scope.event(scope.searchText)) return;
					scope.model = scope.searchText;
				}
			}
		};
	}]);
},{}],42:[function(require,module,exports){
angular.module('nc')
	.provider('$ncTable', function() {
		this.tableOptions = {
			loadingMessage: 'Loading...',
			searchEmptyMessage: 'No search result',
			emptyMessage: 'You do not have an Entry'
		};
		this.tableParams = {
			_order: '',
			_limit: 10,
			_offset: 0,
			_direction: 'asc'
		};
		this.$get = function() {
			return this;
		};
	})
	.directive('ncTable', ["$log", "$templateCache", "$ncTable", function($log, $templateCache, $ncTable) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: $templateCache.get('common/ncTable.html'),
			scope: {
				model: '=ncModel',
				options: '=ncTableOptions',
				params: '=ncTableParams',
				loading: '=ncIsLoading',
				searching: '=ncIsSearching'
			},
			controller: ["$scope", function($scope) {
				this.sort = function(id, direction) {
					$scope.params._order = id;
					$scope.params._direction = direction ? 'desc' : 'asc';
				};
				this.isOrderBy = function(id) {
					return $scope.params._order === id;
				};
				this.direction = function() {
					return $scope.params._direction == 'desc' ? true : false;
				}
			}],
			link: function(scope, element, attrs, controller) {
				//Default values
				var defaultTableModel = {
					data: [],
					total: 0
				};

				//Aggregriate default value
				scope.options = _.defaults(scope.options, $ncTable.tableOptions);
				scope.params = _.defaults(scope.params, $ncTable.tableParams);
				scope.model = _.merge(scope.model, defaultTableModel);
			}
		};
	}])
	.directive('ncSort', ["$templateCache", "$log", function($templateCache, $log) {
		return {
			restrict: 'A',
			require: '^ncTable',
			transclude: true,
			scope: {
				sort: '@ncSort'
			},
			template: $templateCache.get('common/ncTableSort.html'),
			link: function(scope, element, attrs, parent) {
				scope.isCurrent = function() {
					return parent.isOrderBy(scope.sort);
				};
				scope.click = function() {
					scope.direction = !scope.direction;
					parent.sort(scope.sort, scope.direction);
				};
				scope.direction = scope.isCurrent() ? parent.direction() : false;
			}
		}
	}])
	.directive('ncLink', function() {
		return {
			restrict: 'A',
			require: '^ncTable',
			transclude: true,
			scope: {
				link: '@ncLink'
			},
			template: '<a ng-href="{{link}}" ng-transclude></a>',
		}
	});
},{}],43:[function(require,module,exports){
angular.module('nc')
    .directive('ncTemplate', ["$rootScope", "$templateCache", "$compile", "$templateOptionsCache", "KnownException", "$parse", "KnownException", function ($rootScope, $templateCache, $compile, $templateOptionsCache, KnownException,  $parse, KnownException) {
            return {
                restrict: 'A',
                transclude: true,
                replace: true,
                priority: 1010,
                scope: {
                    optionsPath: '@ncTemplateOptionsPath',
                    templateField: '&ncTemplateForm',
                    viewBag: '=?ncViewBag',
                    label: '@ncLabel'
                },
                template: function (element, attrs) {
                    var templateHTML = $templateCache.get(attrs.ncTemplate);
                    if(!templateHTML){
                        throw new KnownException("Unable to load specified nc-template " + attrs.ncTemplate);
                    }
                    return templateHTML;
                },
                link: function (scope, element, attrs, ctrl, transclude) {


                    scope.isInvalid = function(form) {
                        if(angular.isDefined(form) &&
                            angular.isDefined(form.$invalid) &&
                            angular.isDefined(form.$dirty)) {
                            return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
                        }
                        return false;
                    };

                    var pathComp
                    var opt = {};
                    if(scope.optionsPath){
                        pathComp = scope.optionsPath.split('/');
                        opt = $templateOptionsCache[pathComp[0]][pathComp[1]];
                    }


                    if (!opt) {
                        throw new KnownException('Warning: nc-template cannot find ' + scope.optionsPath);
                        opt = {};
                    }

                    if(!('error' in opt)){
                        opt.error = {};
                    };

                    scope.options = opt;

                }
            };
        }]);

},{}],44:[function(require,module,exports){
angular.module('nc')
	.directive('ncTreeSelect', ["$interpolate", "$templateCache", function($interpolate, $templateCache) {
		/**
		 * Hold data for column object
		 */
		function Column() {
			this.__list = [];
			this.__active = -1;

			/**
			 * Get or set array of child object
			 *
			 * @param  {Array} list Set children to this if passed
			 * @return {Array}      Array of child
			 */
			this.list = function(list) {
				return _.isUndefined(list) ? this.__list : (this.__list = list);
			};

			/**
			 * Get or set active index for this column
			 *
			 * @param  {Number} active Set active index to this if passed
			 * @return {Number}        Active index, -1 if none
			 */
			this.active = function(active) {
				return _.isUndefined(active) ? this.__active : (this.__active = active);
			};
		};

		/**
		 * Collection of Column object
		 * @param {Array} tree Root nested tree
		 * @param {Number} size Number of columns
		 * @param {Object} options Extra params
		 */
		function Columns(tree, size, options) {
			/**
			 * Declare extra options for this class
			 */
			options = _.extend({
				childrenKey: 'nodes',
				parentKey: 'parent'
			}, options);

			var childrenKey = options.childrenKey;
			var parentKey = options.parentKey;

			/**
			 * Get columns as array of Column
			 *
			 * @return {Array} Array of Column object
			 */
			this.list = function() {
				return this.columns;
			};

			/**
			 * Clear all columns to default empty
			 *
			 * @param  {Boolean} activeOnly If only active flag is clear
			 */
			this.clear = function(activeOnly) {
				// Initialize empty
				for (var i = 0; i < this.columns.length; i++) {
					if(_.isUndefined(activeOnly) || !activeOnly) {
						this.columns[i].list([]);
					}
					this.columns[i].active(-1);
				};
			};

			/**
			 * Clear all columns and set first to tree
			 */
			this.clearToDefault = function() {
				this.clear();
				this.columns[0].list(this.__tree);
			};

			/**
			 * [select description]
			 * @param  {[type]} item [description]
			 * @return {[type]}      [description]
			 */
			this.select = function(item) {

				// Not an item or null
				if(_.isNil(item)) {
					// Select nothing
					this.clear(true);
					return;
				}

				/* Traverse and get all array of item to be pushed into display columns */
				var collection = [];
				var ctx = item;

				//Push leaf if any
				if(!_.isEmpty(ctx[childrenKey])) {
					collection.push({
						list: ctx[childrenKey],
						active: -1
					})
				}

				while(!_.isUndefined(ctx[parentKey])) {
					//Bubble up the tree
					collection.push({
						list: ctx[parentKey][childrenKey],
						active: _.indexOf(ctx[parentKey][childrenKey], ctx)
					});
					ctx = ctx[parentKey];
				}

				// Make sure this item is descendent of the tree
				var index = _.indexOf(this.__tree, ctx);

				if(index >= 0) {
					// Push root
					collection.push({
						list: this.__tree,
						active: index
					});

					// Assign to column
					for (var i = 0; i < this.__size; i++) {
						if(collection.length > 0) {
							// Assign collection to display list
							var col = collection.pop();
							this.columns[i].list(col.list);
							this.columns[i].active(col.active);
						} else {
							// No more children
							this.columns[i].list([]);
							this.columns[i].active(-1);
						}
					}
				} else {
					// Select nothing
					this.clearToDefault();
				}
			};


			/* Class main
			 ------------------------------- */
			this.columns = [];
			for (var i = 0; i < size; i++) {
			 	this.columns.push(new Column());
			};
			this.columns[0].list(tree);
			this.__tree = tree;
			this.__size = size;

		};

		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				tree: '=ncTreeSelectTree',
				title: '@ncTreeSelectTitle',
				options: '=?ncTreeSelectOptions'
			},
			template: $templateCache.get('common/ncTreeSelect.html'),
			link: function(scope, element, attrs) {
				// Directive options
				scope.options = _.defaults(scope.options, {
					columnSize: 4,
					contentTemplate: '{{$item.NameEn}}' //basic tree item
				});
				scope.columns = new Columns(scope.tree, scope.options.columnSize);

				// Watch for tree change
 				scope.$watch('tree', function(newObj, oldObj) {
 					var arr = newObj;
					if(_.isArray(arr)) {
						// Recreate container from arr
						scope.columns = new Columns(arr, scope.options.columnSize);
						scope.columns.select(scope.model);
					}
				});

				// Watch for model change
				scope.$watch('model', function(newObj, oldObj) {
					if(newObj != oldObj) {
						scope.columns.select(scope.model);
					}
				});

				scope.setModel = function(item) {
					scope.model = item;
				};

				scope.getContent = function(item) {
					return $interpolate(scope.options.contentTemplate)({$item: item});
				};
			},
			controller: ["$scope", function($scope) {
				this.setHeader = function(html) {
					$scope.header = html;
				};
				this.setFooter = function(html) {
					$scope.footer = html;
				};
			}]
		};
	}]);

},{}],45:[function(require,module,exports){
angular.module('nc')
    .directive('ncTagValidator', function () {
        return {
            restrict: 'A',
            require: ['ngModel', 'uiSelect'],
            link: function ($scope, element, attrs, ctrl) {
                var maxTagCount = 1000;
                var maxTagLength = 30;
                var tagPattern = false;

                var $select = ctrl[1];
                var $model = ctrl[0];

                $select.onSelectCallback = function () {
                    var array = ($model.$modelValue || []);
                    var item = (array[array.length - 1] || "");
                    var _pass = true;
                    $model.$error = {};

                    if (array.length > maxTagCount) {
                        $model.$error.maxtagcount = true;
                        _pass = false;
                    };

                    if (item.length > maxTagLength) {
                        $model.$error.maxtaglength = true;
                        _pass = false;
                    };

                    if (tagPattern && !item.match(tagPattern)) {
                        $model.$error.pattern = true;
                        _pass = false;
                    }

                    if (!_pass) {
                        $model.$modelValue.pop();
                        $model.$viewValue = $model.$modelValue;
                    }

                };

                attrs.$observe('ncMaxTagCount', function (val) {
                    if (!val) return;
                    maxTagCount = Number(val);
                });

                attrs.$observe('ncTagPattern', function (val) {
                    if (!val) return;
                    tagPattern = val;
                });

                attrs.$observe('ncMaxTagLength', function (val) {
                    if (!val) return;
                    maxTagLength = Number(val);
                });

            }
        }
    });
},{}],46:[function(require,module,exports){
angular.module('nc')
	.filter('compact', function() {
		return function(input) {
			return _.compact(input);
		};
	});
},{}],47:[function(require,module,exports){
angular.module('nc')
	.filter('dateTh', ["$filter", function($filter) {
		return function(input) {
			return $filter('date')(input, 'dd/MM/yy', '+700');
		}
	}])
	.filter('timeTh', ["$filter", function($filter) {
		return function(input) {
			return $filter('date')(input, 'H:m', '+700');
		}
	}]);
},{}],48:[function(require,module,exports){
angular.module('nc')
    .filter('escapeHtml', function () {
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

        return function(str) {
            return String(str).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }
    });
},{}],49:[function(require,module,exports){
/*
 Return dropdown[value] if input == dropdown[name]
 */
angular.module('nc')
	.filter('mapDropdown', function() {
		//Return property
		return function(input, collections, name) {
			if(_.isUndefined(collections)) {
				return input;
			}

			if(_.isUndefined(name)) {
				name = 'name';
			}

			var find = _.find(collections, function(o) {
				return o.value == input;
			}) 

			return _.isUndefined(find) ? input : find[name];
		}
	});
},{}],50:[function(require,module,exports){
angular.module('nc')
	.filter('replace', function() {
		return function(input, from, to) {
			return input.replace(from, to);
		};
	});
},{}],51:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';

angular.module('nc', ['ngSanitize', 'ui.bootstrap', 'ui.select', 'duScroll', 'angularFileUpload'])
.run(require('./template.js'));
(function () {var f = require("./index.js");f["directives"]=({"ncAction":require("./directives\\ncAction.js"),"ncAdvanceSearch":require("./directives\\ncAdvanceSearch.js"),"ncAlert":require("./directives\\ncAlert.js"),"ncBindCompile":require("./directives\\ncBindCompile.js"),"ncBreadcrumbSelect":require("./directives\\ncBreadcrumbSelect.js"),"ncBreadcrumbTitle":require("./directives\\ncBreadcrumbTitle.js"),"ncBulk":require("./directives\\ncBulk.js"),"ncDateRange":require("./directives\\ncDateRange.js"),"ncEmpty":require("./directives\\ncEmpty.js"),"ncEye":require("./directives\\ncEye.js"),"ncFilter":require("./directives\\ncFilter.js"),"ncImageGallery":require("./directives\\ncImageGallery.js"),"ncImageIntegrity":require("./directives\\ncImageIntegrity.js"),"ncLoading":require("./directives\\ncLoading.js"),"ncPageTitle":require("./directives\\ncPageTitle.js"),"ncPagination":require("./directives\\ncPagination.js"),"ncPermission":require("./directives\\ncPermission.js"),"ncSearch":require("./directives\\ncSearch.js"),"ncTable":require("./directives\\ncTable.js"),"ncTemplate":require("./directives\\ncTemplate.js"),"ncTreeSelect":require("./directives\\ncTreeSelect.js"),"ncUiSelect":require("./directives\\ncUiSelect.js")});f["filters"]=({"compact":require("./filters\\compact.js"),"date":require("./filters\\date.js"),"escapeHtml":require("./filters\\escapeHtml.js"),"map":require("./filters\\map.js"),"replace":require("./filters\\replace.js")});f["index"]=require("./index.js");f["template"]=require("./template.js");return f;})();
module.exports = 'nc';
},{"./directives\\ncAction.js":24,"./directives\\ncAdvanceSearch.js":25,"./directives\\ncAlert.js":26,"./directives\\ncBindCompile.js":27,"./directives\\ncBreadcrumbSelect.js":28,"./directives\\ncBreadcrumbTitle.js":29,"./directives\\ncBulk.js":30,"./directives\\ncDateRange.js":31,"./directives\\ncEmpty.js":32,"./directives\\ncEye.js":33,"./directives\\ncFilter.js":34,"./directives\\ncImageGallery.js":35,"./directives\\ncImageIntegrity.js":36,"./directives\\ncLoading.js":37,"./directives\\ncPageTitle.js":38,"./directives\\ncPagination.js":39,"./directives\\ncPermission.js":40,"./directives\\ncSearch.js":41,"./directives\\ncTable.js":42,"./directives\\ncTemplate.js":43,"./directives\\ncTreeSelect.js":44,"./directives\\ncUiSelect.js":45,"./filters\\compact.js":46,"./filters\\date.js":47,"./filters\\escapeHtml.js":48,"./filters\\map.js":49,"./filters\\replace.js":50,"./index.js":51,"./template.js":52}],52:[function(require,module,exports){
module.exports = ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('common/ncAction.html',
    "<a class=\"action-gear\" href=\"javascript:;\"  uib-popover-template=\"'common/ncActionPopover.html'\" popover-placement=\"bottom\" popover-append-to-body=\"true\" popover-trigger=\"outsideClick\" class=\"action-gear\">\r" +
    "\n" +
    "\t<i class=\"fa fa-gear color-dark-grey icon-size-20\"></i>\r" +
    "\n" +
    "\t<i class=\"fa fa-caret-down color-dark-grey\"></i>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );


  $templateCache.put('common/ncActionModal.html',
    "<div class=\"modal-header no-border\">\r" +
    "\n" +
    "\t<button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"no()\"><span class=\"padding-left-15\" aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body confirmation-modal no-margin\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<div class=\"col-xs-12 margin-bottom-30\">\r" +
    "\n" +
    "\t\t\t<h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2>\r" +
    "\n" +
    "\t\t\t<div ng-bind-html=\"message\"></div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"confirmation-action no-margin\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-white\" ng-click=\"no()\">{{btnNo}}</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn {{btnClass}}\" ng-click=\"yes()\">{{btnYes}}</button>\r" +
    "\n" +
    "\t\t</div> <!-- end .col-xs-12 -->\r" +
    "\n" +
    "\t</div> <!-- end .row -->\r" +
    "\n" +
    "</div> <!-- end .modal-body -->\r" +
    "\n"
  );


  $templateCache.put('common/ncActionPopover.html',
    "<div ng-repeat=\"action in options\"><a ng-click=\"call(action)\" >{{action.name}}</a></div>"
  );


  $templateCache.put('common/ncAdvanceSearch.html',
    "<div class=\"row margin-top-30\" ng-show=\"open\">\r" +
    "\n" +
    "\t<div class=\"col-xs-12\">\r" +
    "\n" +
    "\t\t<div class=\"form-section\">\r" +
    "\n" +
    "\t\t\t<div class=\"form-section-header\"><h2>Advance Search</h2></div>\r" +
    "\n" +
    "\t\t\t<div class=\"form-section-content\">\r" +
    "\n" +
    "\t\t\t\t<form name=\"form\" class=\"ah-form\" novalidate>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.ProductName\" nc-label=\"Product Name\" nc-template-options-path=\"searchForm/ProductName\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"ProductName\" ng-model=\"formData.ProductName\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Pid\" nc-label=\"PID\" nc-template-options-path=\"searchForm/Pid\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"Pid\" ng-model=\"formData.Pid\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Sku\" nc-label=\"SKU\" nc-template-options-path=\"searchForm/Sku\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"Sku\" ng-model=\"formData.Sku\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Brand\" nc-label=\"Brand Name\" nc-template-options-path=\"searchForm/Brands\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t    <ui-select ng-model=\"formData.Brands\" name=\"Brands\" nc-tag-validator multiple tagging-tokens=\",|ENTER\" tagging-label=\"\" nc-tag-field>\r" +
    "\n" +
    "\t                                <ui-select-match>\r" +
    "\n" +
    "\t                                    {{$item.BrandNameEn}}\r" +
    "\n" +
    "\t                                </ui-select-match>\r" +
    "\n" +
    "\t                                <ui-select-choices repeat=\"item in options.Brands | filter:{BrandNameEn: $select.search} track by $index\">\r" +
    "\n" +
    "\t                                    {{item.BrandNameEn}}\r" +
    "\n" +
    "\t                                </ui-select-choices>\r" +
    "\n" +
    "\t                            </ui-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.GlobalCategories\" nc-label=\"Global Category Name\" nc-template-options-path=\"searchForm/GlobalCategories\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<nc-breadcrumb-select name=\"GlobalCategories\" nc-model=\"formData.GlobalCategories\" nc-breadcrumb-select-tree=\"options.GlobalCategories\"></nc-breadcrumb-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.LocalCategories\" nc-label=\"Local Category Name\" nc-template-options-path=\"searchForm/LocalCategories\" ng-show=\"!options.Admin\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<nc-breadcrumb-select name=\"LocalCategories\" nc-model=\"formData.LocalCategories\" nc-breadcrumb-select-tree=\"options.LocalCategories\"></nc-breadcrumb-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Tags\" nc-label=\"Search Tag\" nc-template-options-path=\"searchForm/Tags\" class=\"ui-select-dropdown-hide\" >\r" +
    "\n" +
    "\t\t\t\t\t\t\t    <ui-select ng-model=\"formData.Tags\" name=\"Tags\" nc-tag-validator tagging tagging-label=\"\" multiple nc-tag-field>\r" +
    "\n" +
    "\t                                <ui-select-match>\r" +
    "\n" +
    "\t                                    {{$item}}\r" +
    "\n" +
    "\t                                </ui-select-match>\r" +
    "\n" +
    "\t                                <ui-select-choices repeat=\"item in options.Tags\">\r" +
    "\n" +
    "\t                                \t{{item}}\r" +
    "\n" +
    "\t                                </ui-select-choices>\r" +
    "\n" +
    "\t                            </ui-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.Price\" nc-label=\"Sale Price\" nc-template-options-path=\"searchForm/Price\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<input type=\"text\" name=\"Price\" ng-maxnumber=\"{{formData.PriceTo}}\" ng-model=\"formData.PriceFrom\" class=\"form-control\" ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<input type=\"text\" ng-model=\"formData.PriceTo\" class=\"form-control\" ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.CreatedDate\" nc-label=\"Created Date\" nc-template-options-path=\"searchForm/CreatedDate\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtFrom | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker name=\"CreatedDate\" ng-date-before=\"{{formData.CreatedDtTo}}\" data-ng-model=\"formData.CreatedDtFrom\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtTo | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.CreatedDtTo\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.ModifiedDate\" nc-label=\"Modified Date\" nc-template-options-path=\"searchForm/ModifiedDate\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown3\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtFrom | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.ModifyDtFrom\" name=\"ModifiedDate\" ng-date-before=\"{{formData.ModifiedDtTo}}\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown3', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown4\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtTo | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.ModifyDtTo\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown4', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label\"><label class=\"control-label\"></label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"button-size-normal\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<a class=\"button-size-normal btn btn-blue btn-width-xl\" ng-click=\"search()\">Search</a>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"button-size-normal\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<a class=\"button-size-normal margin-left-10 btn btn-white btn-width-xl\" ng-click=\"clear()\">Clear</a>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</form>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('common/ncAdvanceSearchButton.html',
    "<div class=\"search-section-item\">\r" +
    "\n" +
    "\t<button class=\"btn btn-default btn-toggle {{model ? 'active' : ''}}\" type=\"button\" ng-click=\"toggle()\">Advanced Search</button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('common/ncAlert.html',
    "<div ng-show=\"alert.show\" uib-alert template-url=\"common/ncAlertTemplate.html\" type=\"{{ alert.type }}\" close=\"alert.close()\"><span ng-bind-html=\"alert.message\"></span></div>"
  );


  $templateCache.put('common/ncAlertTemplate.html',
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning')]\" class=\"alert alert-dismissable\" role=\"alert\" >\r" +
    "\n" +
    "\t<span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=\"true\"  ng-show=\"closeable\" ng-click=\"close({$event: $event})\">&times;</span>\r" +
    "\n" +
    "    <ng-transclude><ng-transclude/>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncBreadcrumbSelect.html',
    "<ui-select name=\"{{name}}\" ng-model=\"model.ptr\" nc-tag-validator nc-max-tag-count=\"{{options.tagCount}}\" multiple>\r" +
    "\n" +
    "\t<ui-select-match><span ng-bind-html=\"$item.item[options.nameKey]\"></span></ui-select-match>\r" +
    "\n" +
    "\t<ui-select-choices repeat=\"value in searchable | filter: { name: $select.search } | limitTo: options.limit track by $index\">\r" +
    "\n" +
    "\t\t<div ng-bind-html=\"value.displayName | highlight: $select.search | replace: encodedSeparator: options.seperator\"></div>\r" +
    "\n" +
    "\t</ui-select-choices>\r" +
    "\n" +
    "</ui-select>"
  );


  $templateCache.put('common/ncBulk.html',
    "<div class=\"btn-group search-section-item\" role=\"group\">\r" +
    "\n" +
    "  <div class=\"btn-group\" role=\"group\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-default dropdown-toggle bulk-action-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" uib-dropdown-toggle>\r" +
    "\n" +
    "      <span class=\"\">{{ select.name }}</span>\r" +
    "\n" +
    "      <span class=\"caret\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <ul uib-dropdown-menu role=\"menu\" class=\"dropdown-menu\">\r" +
    "\n" +
    "      <li ng-repeat=\"option in options\" ><a ng-click=\"selectOption(option)\">{{ option.name }}</a></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\t<button type=\"button\" class=\"btn btn-default btn-action\" ng-click=\"call()\">\r" +
    "\n" +
    "    Confirm <span ng-show=\"model.length > 0\">({{ model.length }})</span>\r" +
    "\n" +
    "  </button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('common/ncBulkCheckbox.html',
    "<input type=\"checkbox\" ng-model=\"checkbox\" />"
  );


  $templateCache.put('common/ncBulkModal.html',
    "<div class=\"modal-header no-border\">\r" +
    "\n" +
    "\t<button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"no()\"><span class=\"padding-left-15\" aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body confirmation-modal no-margin\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<div class=\"col-xs-12 margin-bottom-30\">\r" +
    "\n" +
    "\t\t\t<h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2>\r" +
    "\n" +
    "\t\t\t<div ng-bind-html=\"message\"></div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"confirmation-action no-margin\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-white\" ng-click=\"no()\">{{btnNo}}</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn {{btnClass}}\" ng-click=\"yes()\">{{btnYes}}</button>\r" +
    "\n" +
    "\t\t</div> <!-- end .col-xs-12 -->\r" +
    "\n" +
    "\t</div> <!-- end .row -->\r" +
    "\n" +
    "</div> <!-- end .modal-body -->\r" +
    "\n"
  );


  $templateCache.put('common/ncEmpty.html',
    "<div class=\"local-category-page margin-bottom-20\">\r" +
    "\n" +
    "  <div class=\"local-category-empty-section margin-top-20\">\r" +
    "\n" +
    "    <span class=\"\">\r" +
    "\n" +
    "      <span class=\"zero-category-image\">\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "    <span class=\"local-category-empty-text\">\r" +
    "\n" +
    "      {{ message }}\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncEye.html',
    "<a ng-click=\"_toggle()\">\r" +
    "\n" +
    "\t<i ng-class=\"{'fa fa-eye-slash color-grey eye-icon' : !model,\r" +
    "\n" +
    "                            'fa fa-eye color-dark-grey eye-icon' : model}\">\r" +
    "\n" +
    "    </i>\r" +
    "\n" +
    "</a>"
  );


  $templateCache.put('common/ncFilter.html',
    "<div class=\"filter-section\">\r" +
    "\n" +
    "  <div class=\"filter-container\">\r" +
    "\n" +
    "    <span>Filters:</span>\r" +
    "\n" +
    "    <a class=\"filter-seperator\" ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=\"select(filter.value)\">{{ filter.name }}</a>\r" +
    "\n" +
    "  \t<span ng-transclude></span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncImage.html',
    "<li class=\"list-item\">\r" +
    "\n" +
    "\t<div class=\"image-thumbs-actions\">\r" +
    "\n" +
    "\t\t<div class=\"image-thumbs-img-wrapper\">\r" +
    "\n" +
    "\t\t\t<img ng-src=\"{{ model.ImageUrlEn.length > 0 && model.ImageUrlEn  || '/assets/img/loader.gif' }}\" />\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div ng-if=\"actions.length > 0\" class=\"actions-wrapper\" ng-style=\"width: {{100 / actions.length}}%;\">\r" +
    "\n" +
    "\t\t\t<a ng-repeat=\"action in options.actions\" class=\"action\" \r" +
    "\n" +
    "\t\t\tng-click=\"action.fn(model, parent, $index)\"><i class=\"fa\" ng-class=\"{{action.icon}}\"></i></a>\r" +
    "\n" +
    "\t\t\t<!-- fa-search-icon fa-trash -->\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</li>"
  );


  $templateCache.put('common/ncImageDropzone.html',
    "<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t<input nv-file-select=\"\" uploader=\"uploader\" accept=\".png, .jpg, .jpeg\" type=\"file\" multiple/>\r" +
    "\n" +
    "\t<div nv-file-drop=\"\" uploader=\"uploader\" class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "\t\t\t<p><i class=\"fa fa-image fa-3x color-theme\"></i></p>\r" +
    "\n" +
    "\t\t\t<p>Drop images here</p>\r" +
    "\n" +
    "\t\t\t<p><a ng-click=\"upload()\">or select images</a></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncImageDropzoneInline.html',
    "<div class=\"drop-zone-container\">\r" +
    "\n" +
    "\t<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t\t<input type=\"file\" />\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t\t<div class=\"image-drop-zone-text\" ng-bind-compile=\"content\">\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management1\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management1\">or select images</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Wait for Approval']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management3\", 'texts' =>['This product is already approved', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management3\">Click here to edit</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management4\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management4\">or select images</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Reach Max Photos']]) ?>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncImageDropzoneTemplate.html',
    "<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t<input nv-file-select uploader=\"uploader\" type=\"file\" multiple/>\r" +
    "\n" +
    "\t<div nv-file-drop uploader=\"uploader\" class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "\t\t\t<p><i class=\"fa fa-image fa-3x color-theme\"></i></p>\r" +
    "\n" +
    "\t\t\t<p>Drop images here</p>\r" +
    "\n" +
    "\t\t\t<p><a ng-click=\"upload()\">or select images</a></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncImageGallery.html',
    "<div>\r" +
    "\n" +
    "\t<p class=\"featured-image-wrapper\">Featured Image</p>\r" +
    "\n" +
    "\t<ul class=\"image-management-list\">\r" +
    "\n" +
    "\t\t<li class=\"list-item\" ng-repeat=\"image in images track by $index\">\r" +
    "\n" +
    "\t\t\t<div class=\"image-thumbs-actions\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"image-thumbs-img-wrapper\">\r" +
    "\n" +
    "\t\t\t\t\t<img ng-src=\"{{ getSrc(image) }}\" />\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t<div class=\"actions-wrapper\" >\r" +
    "\n" +
    "\t\t\t\t\t<a class=\"action {{ isDisabled(image) ? 'disabled' : ''}}\" ng-repeat=\"action in options.actions\" style=\"width: {{100 / options.actions.length }}%;\" ng-click=\"call(action, image, model)\">\r" +
    "\n" +
    "\t\t\t\t\t\t<i class=\"fa {{action.icon}}\"></i>\r" +
    "\n" +
    "\t\t\t\t\t</a>\r" +
    "\n" +
    "\t\t\t\t\t<!-- fa-search-icon fa-trash -->\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</li>\r" +
    "\n" +
    "\t</ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('common/ncLoading.html',
    "<div class=\"empty-section margin-top-20 margin-bottom-20\">\r" +
    "\n" +
    "  <span>\r" +
    "\n" +
    "    <img class=\"loading-img\" src=\"/assets/img/loader.gif\" />\r" +
    "\n" +
    "  </span>{{ message }}</span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncLoadingSmall.html',
    "<img src=\"/assets/img/loader.gif\" width=\"40\"><small>{{ message }}</small>"
  );


  $templateCache.put('common/ncPagination.html',
    "<div class=\"page-navigation\">\r" +
    "\n" +
    "  <span>\r" +
    "\n" +
    "    <!-- prev page button -->\r" +
    "\n" +
    "    <a ng-click=\"nextPage(-1)\">\r" +
    "\n" +
    "      <i class=\"fa fa-chevron-left\" ng-class=\"{'grey-chevron': page() <= 1, 'blue-chevron' : page() > 1}\">\r" +
    "\n" +
    "      </i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <!-- pagination text -->\r" +
    "\n" +
    "    <span> Page {{ page() }} of {{ totalPage() }}</span>\r" +
    "\n" +
    "    <!-- next page button -->\r" +
    "\n" +
    "    <a ng-click=\"nextPage(1)\">\r" +
    "\n" +
    "      <i class=\"fa fa-chevron-right padding-right-15\" ng-class=\"{'grey-chevron': page() >= totalPage(), 'blue-chevron' : page() < totalPage() }\">\r" +
    "\n" +
    "      </i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <span class=\"view-page-separator margin-right-10\">View per page</span>\r" +
    "\n" +
    "    <!-- Pagination dropdown -->\r" +
    "\n" +
    "    <div class=\"btn-group\" uib-dropdown>\r" +
    "\n" +
    "      <!-- Page size button -->\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-default\">\r" +
    "\n" +
    "        {{ pageSize() }}\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <!-- Caret -->\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\r" +
    "\n" +
    "        <span class=\"caret\"></span>\r" +
    "\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <!-- Dropdown -->\r" +
    "\n" +
    "      <ul uib-dropdown-menu role=\"menu\" class=\"dropdown-menu-right\">\r" +
    "\n" +
    "        <li ng-repeat=\"size in paginationOptions\" ><a ng-click=\"setPageSize(size)\">{{size}}</a></li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncSearch.html',
    "<div class=\"input-group search-section-item\">\r" +
    "\n" +
    "\t<form ng-submit=\"callback()\">\r" +
    "\n" +
    "\t\t<div class=\"input-group search-box\">\r" +
    "\n" +
    "\t    <input type=\"text\" class=\"form-control input-search-icon\" ng-model=\"searchText\" placeholder=\"{{placeholder}}\">\r" +
    "\n" +
    "\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "\t\t\t\t<button class=\"btn btn-default btn-action\">Search</button>\r" +
    "\n" +
    "\t\t\t</span>\r" +
    "\n" +
    "\t  </div>\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('common/ncTable.html',
    "<div class=\"table-section\">\r" +
    "\n" +
    "  <div ng-show=\"!loading && model.data.length != 0\" ng-transclude></div>\r" +
    "\n" +
    "  <div nc-loading=\"{{options.loadingMessage}}\" ng-show=\"loading\"></div>\r" +
    "\n" +
    "  <div nc-empty=\"{{options.searchEmptyMessage}}\" ng-show=\"!loading && model.data.length == 0 && searching\">\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div nc-empty=\"{{options.emptyMessage}}\" ng-show=\"!loading && model.data.length == 0 && !searching\"></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('common/ncTableSort.html',
    "<a class=\"header-link\" ng-click=\"click()\"><span ng-class=\"{ 'active-underline' : isCurrent() }\" ng-transclude></span></a>\r" +
    "\n" +
    "<i class=\"fa\" ng-class=\"{ \r" +
    "\n" +
    "'fa fa-caret-down' : isCurrent() && direction, \r" +
    "\n" +
    "'fa fa-caret-up' : isCurrent() && !direction, \r" +
    "\n" +
    "'fa fa-caret-down color-grey' : !isCurrent() }\" ng-click=\"click()\">"
  );


  $templateCache.put('common/ncTreeSelect.html',
    "<div class=\"category-section-border-box\">\r" +
    "\n" +
    "\t<div class=\"category-header\">{{title}}</div>\r" +
    "\n" +
    "\t<div class=\"category-content no-padding\">\r" +
    "\n" +
    "\t\t<ul ng-repeat=\"column in columns.list() track by $index\" ng-class=\"{'empty-column': column.list().length <= 0 }\" class=\"content-column\">\r" +
    "\n" +
    "\t\t\t<li ng-repeat=\"$item in column.list() track by $index\" ng-class=\"{'category-active' : $index == column.active() }\" ng-click=\"setModel($item)\">{{getContent($item)}}</li>\r" +
    "\n" +
    "\t\t</ul>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('components/date-range-inline.html',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "  <div class=\"width-label\"><label class=\"control-label\" ng-class=\"options.labelClass || {}\">{{ label }}</label></div>\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "      <div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "        <div class=\"dropdown\">\r" +
    "\n" +
    "            <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown1\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                 ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "                 placeholder=\"{{ startPlaceholder || 'Select start date' }}\"\r" +
    "\n" +
    "                 class=\"form-control width-field-large\"\r" +
    "\n" +
    "                 value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                <datetimepicker data-ng-model=\"startDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "      <div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "        <div class=\"dropdown\">\r" +
    "\n" +
    "            <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                 ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "                 placeholder=\"{{ endPlaceholder || 'Select end date' }}\"\r" +
    "\n" +
    "                 class=\"form-control width-field-large\"\r" +
    "\n" +
    "                 value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel2\">\r" +
    "\n" +
    "                <datetimepicker data-ng-model=\"endDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\" />\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"width-field-large\">\r" +
    "\n" +
    "            <span class=\"help-block color-red\" ng-if=\"endDate <= startDate\">\r" +
    "\n" +
    "                <span>{{ errorText || \"Start date/time must come before end date/time\" }}</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('components/date-range-vertical.html',
    "<div>\r" +
    "\n" +
    "  <div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "    <div class=\"width-label\">\r" +
    "\n" +
    "      <label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ startLabel }}</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "      <div class=\"dropdown\">\r" +
    "\n" +
    "          <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown1\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "              <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "               ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "               placeholder=\"{{ startPlaceholder || 'Select start date' }}\"\r" +
    "\n" +
    "               class=\"form-control width-field-large\"\r" +
    "\n" +
    "               value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "              <datetimepicker data-ng-model=\"startDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "    <div class=\"width-label\">\r" +
    "\n" +
    "      <label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ endLabel }}</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "      <div class=\"dropdown\">\r" +
    "\n" +
    "          <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "              <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "               ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "               placeholder=\"{{ endPlaceholder || 'Select end date' }}\"\r" +
    "\n" +
    "               class=\"form-control width-field-large\"\r" +
    "\n" +
    "               value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel2\">\r" +
    "\n" +
    "              <datetimepicker data-ng-model=\"endDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\" />\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"width-field-large\">\r" +
    "\n" +
    "          <span class=\"help-block color-red\" ng-if=\"endDate <= startDate\">\r" +
    "\n" +
    "              <span>{{ errorText || \"Start date/time must come before end date/time\" }}</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('components/single-upload.html',
    "<!-- Nc-Single-Upload -->\r" +
    "\n" +
    "<div class=\"image-drop-wrapper\" style=\"width:320px;\">\r" +
    "\n" +
    "  <input nv-file-select uploader=\"viewBag.uploader\" type=\"file\" ng-delegatee=\"viewBag.uploader\" onclick=\"this.value = null\"/>\r" +
    "\n" +
    "  <div nv-file-drop uploader=\"viewBag.uploader\" class=\"image-drop-zone\" style=\"width:320px; height:120px; overflow: hidden\">\r" +
    "\n" +
    "    <div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "      <p><img ng-src=\"{{ viewBag.images[0].url }}\" style=\"width:100%; height: auto\"/></p>\r" +
    "\n" +
    "      <span ng-if=\"!viewBag.images || viewBag.images.length == 0\">Drag &amp; drop your shop logo here</span>\r" +
    "\n" +
    "      <h3 ng-if=\"viewBag.uploader.progress > 0 && viewBag.uploader.progress < 100\" class=\"color-grey\">{{ uploader.progress }} %</h3>\r" +
    "\n" +
    "      <h3 ng-if=\"viewBag.uploader.progress == 100 && !viewBag.images[0].url\" class=\"color-grey\"><img style=\"width:100%; height: auto\" src=\"/assets/img/loader.gif\"/></h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-show=\"viewBag.uploader.isHTML5\" class=\"image-select-alternative-text\">\r" +
    "\n" +
    "    <span>Or</span>\r" +
    "\n" +
    "    <a href=\"javascript:;\" ng-delegate=\"viewBag.uploader\">\r" +
    "\n" +
    "      <span ng-if=\"viewBag.images.length === 0\">Select image from your computer</span>\r" +
    "\n" +
    "      <span ng-if=\"viewBag.images.length > 0\">Upload new image</span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('partials/breadcrumb-title.html',
    "<div class=\"page-header\" ng-class=\"{{css}}\">\r" +
    "\n" +
    "    <h1 class=\"float-left page-header-title ah-breadcrumb\">\r" +
    "\n" +
    "    \t<a ng-repeat-start=\"t in title track by $index\" ng-href=\"{{link[$index]}}\" class=\"ah-breadcrumb-path\" ng-class=\"['ah-breadcrumb-idx-' + $index]\">{{t}}</a>\r" +
    "\n" +
    "    \t<span ng-if=\"!($index == 0 && title.length == 1)\" class=\"ah-breadcrumb-splitter\"></span>\r" +
    "\n" +
    "    </h1>\r" +
    "\n" +
    "    <div class=\"page-actions float-right\">\r" +
    "\n" +
    "    \t<ng-transclude></ng-transclude>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('partials/page-title.html',
    "<div class=\"page-header with-border\">\r" +
    "\n" +
    "    <h1 class=\"float-left page-header-title\" ng-bind-html=\"title\"></h1>\r" +
    "\n" +
    "    <span class=\"float-right page-header-action\" ng-transclude>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "</div>"
  );
}]
},{}],53:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handle app route configuration
 * 
 * @version    1.0.0
 * @author     ahancer
 */
/**
 * Route v1 declaration
 */
var route = {
	$default: {
		title: 'Central Online - Seller Portal'
	},
	/* Not found page */
	404: {
		path: '/error',
		wrapperClass: 'wrapper-login'
	},
	/* Default page */
	main: {
		path: '/',
		wrapperClass: 'wrapper-login'
	},
	/* Admin page */
	seller: {
		$default: {
			menu: 'seller',
			headerView: 'seller/views/header.html',
			wrapperClass: 'wrapper'
		},
		product: {
			list: {
				path: '/products',
				controller: 'AdminProductListCtrl',
				view: 'seller/views/products.list.html'
			},
			detail: {
				path: '/products/:id',
				controller: 'AdminProductAddCtrl',
				view: 'seller/views/products.add.html'
			},
			select: {
				path: '/products/select',
				controller: 'AdminProductSelectCtrl',
				view: 'seller/views/products.select.html'
			},
			add: {
				path: '/products/add',
				controller: 'AdminProductAddCtrl',
				view: 'seller/views/products.add.html'
			},
			import: {
				path: '/products/import',
				controller: 'AdminProductImportCtrl',
				view: 'seller/views/products.import.html'
			},
			export: {
				path: '/products/export',
				controller: 'AdminProductExportCtrl',
				view: 'seller/views/products.export.html'
			},
			review: {
				path: '/products/reviews',
				controller: 'AdminProductReviewCtrl',
				view: 'seller/views/products.add.html'
			},
			image: {
				/* image management */
				path: '/products/images',
				controller: 'AdminProductImageCtrl',
				view: 'seller/views/products.image.html'
			}
		},
		inventory: {
			path: '/inventory',
			controller: 'AdminInventoryListCtrl',
			view: 'seller/views/inventories.list.html'
		},
		category: {
			/* local category */
			path: '/categories',
			controller: 'AdminCategoryCtrl',
			view: 'seller/views/categories.list.html'
		},
		promotion: {
			coupon: {}
		},
		shop: {
			profile: {
				path: '/shops/settings',
				controller: 'AdminShopProfileCtrl',
				view: '/seller/views/shops.profile.html'
			},
			appearance: {
				path: '/shops/appearance',
				controller: 'AdminShopAppearanceCtrl',
				view: '/seller/views/shops.appearance.html'
			}
		},
		user: {
			account: {
				list: {
					path: '/accounts',
					controller: 'AdminUserAccountCtrl',
					view: 'seller/views/users.account.list.html'
				},
				detail: {
					path: '/accounts/:id',
					controller: 'AdminUserAccountAddCtrl',
					view: 'seller/views/users.account.add.html'
				},
				add: {
					path: '/accounts/add',
					controller: 'AdminUserAccountAddCtrl',
					view: 'seller/views/users.account.add.html'
				}
			},
			role: {
				list: {
					path: '/roles',
					controller: 'AdminUserRoleCtrl',
					view: 'seller/views/users.role.list.html'
				},
				detail: {
					path: '/roles/:id',
					controller: 'AdminUserRoleAddCtrl',
					view: 'seller/views/users.role.add.html'
				},
				add: {
					path: '/roles/add',
					controller: 'AdminUserRoleAddCtrl',
					view: 'seller/views/users.role.add.html'
				}
			}
		}
	},
	/* Admin page */
	admin: {
		$default: {
			menu: 'admin',
			headerView: 'admin/views/header.html',
			wrapperClass: 'wrapper'
		},
		product: {
			list: {
				path: '/admin/products',
				controller: 'AdminProductListCtrl',
				view: 'admin/views/products.list.html'
			},
			detail: {
				path: '/admin/products/:id',
				controller: 'AdminProductAddCtrl',
				view: 'admin/views/products.add.html'
			},
			add: {
				path: '/admin/products/add',
				controller: 'AdminProductAddCtrl',
				view: 'admin/views/products.add.html'
			},
			approve: {
				path: '/admin/products/approve',
				controller: 'AdminProductApproveCtrl',
				view: 'admin/views/products.approve.html'
			},
			master: {
				path: '/admin/master',
				controller: 'AdminProductMasterCtrl',
				view: 'admin/views/products.master.html'
			}
		},
		brand: {
			list: {
				path: '/admin/brands',
				controller: 'AdminBrandListCtrl',
				view: 'admin/views/brands.list.html'
			},
			detail: {
				path: '/admin/brands/:id',
				controller: 'AdminBrandAddCtrl',
				view: 'admin/views/brands.add.html'
			},
			add: {
				path: '/admin/brands/add',
				controller: 'AdminBrandAddCtrl',
				view: 'admin/views/brands.add.html'
			}
		},
		attribute: {
			list: {
				path: '/admin/attributes',
				controller: 'AdminAttributeListCtrl',
				view: 'admin/views/attributes.list.html'
			},
			detail: {
				path: '/admin/attributes/:id',
				controller: 'AdminAttributeAddCtrl',
				view: 'admin/views/attributes.add.html'
			},
			add: {
				path: '/admin/attributes/add',
				controller: 'AdminAttributeAddCtrl',
				view: 'admin/views/attributes.add.html'
			}
		},
		attributeset: {
			list: {
				path: '/admin/attributesets',
				controller: 'AdminAttributeSetListCtrl',
				view: 'admin/views/attributesets.list.html'
			},
			detail: {
				path: '/admin/attributesets/:id',
				controller: 'AdminAttributeSetAddCtrl',
				view: 'admin/views/attributesets.add.html'
			},
			add: {
				path: '/admin/attributesets/add',
				controller: 'AdminAttributeSetAddCtrl',
				view: 'admin/views/attributesets.add.html'
			}
		},
		category: {
			path: '/admin/categories',
			controller: 'AdminCategoryCtrl',
			view: 'admin/views/categories.list.html'
		},
		shop: {
			account: {
				list: {
					path: '/admin/shops',
					controller: 'AdminShopAccountListCtrl',
					view: 'admin/views/shops.account.list.html'
				},
				detail: {
					path: '/admin/shops/:id',
					controller: 'AdminShopAccountAddCtrl',
					view: 'admin/views/shops.account.add.html'
				},
				add: {
					path: '/admin/shops/add',
					controller: 'AdminShopAccountAddCtrl',
					view: 'admin/views/shops.account.add.html'
				}
			},
			type: {
				list: {
					path: '/admin/shoptypes',
					controller: 'AdminShopTypeListCtrl',
					view: 'admin/views/shops.type.list.html'
				},
				detail: {
					path: '/admin/shoptypes/:id',
					controller: 'AdminShopTypeAddCtrl',
					view: 'admin/views/shops.type.add.html'
				},
				add: {
					path: '/admin/shoptypes/add',
					controller: 'AdminShopTypeAddCtrl',
					view: 'admin/views/shops.type.add.html'
				}
			}
		},
		account: {
			list: {
				path: '/admin/accounts',
				controller: 'AdminAccountListCtrl',
				view: 'admin/views/accounts.list.html'
			},
			detail: {
				path: '/admin/accounts/:id',
				controller: 'AdminAccountAddCtrl',
				view: 'admin/views/accounts.add.html'
			},
			add: {
				path: '/admin/accounts/add',
				controller: 'AdminAccountAddCtrl',
				view: 'admin/views/accounts.add.html'
			}
		},
		role: {
			list: {
				path: '/admin/roles',
				controller: 'AdminRoleListCtrl',
				view: 'admin/views/roles.list.html'
			},
			detail: {
				path: '/admin/roles/:id',
				controller: 'AdminRoleAddCtrl',
				view: 'admin/views/roles.add.html'
			},
			add: {
				path: '/admin/roles/add',
				controller: 'AdminRoleAddCtrl',
				view: 'admin/views/roles.add.html'
			}
		},
		promotion: {

		},
		report: {

		},
		other: {

		}
	},
	/* Login page */
	login: {
		path: '/login',
		controller: 'LoginCtrl',
		wrapperClass: 'wrapper-login',
		view: 'core/views/login.html'
	}
};
/**
 * Menu declaration
 */	
var menu = {
	seller: {
		'Home|fa-home': {

		},
		'Orders|fa-inbox': {

		},
		'Product|fa-tag': {
			'View': [route.seller.product.list, route.seller.product.detail],
			'Add': 	[route.seller.product.select, route.seller.product.add],
			'Import': route.seller.product.import,
			'Export': route.seller.product.export,
			'Local Categories|margin-top-30': route.seller.category,
			'Product Reviews': route.seller.product.review,
			'Image Management': route.seller.product.image
		},
		'Inventory|fa-archive': {
			'View': route.seller.inventory
		},

		'Promotion|fa-bookmark': {
			'Coupons': route.seller.promotion.coupon
		},

		'Shop Setting|fa-sliders': {
			'Shop Profile': route.seller.shop.profile,
			'Shop Appearance': route.seller.shop.appearance
		},

		'Report|fa-line-chart': {

		},
		'Account|fa-user': {
			'User Accounts': route.seller.user.account,
			'User Roles': route.seller.user.role
		}
	},
	admin: {
		'Products|fa-tag': {
			'View All Products': [route.admin.product.list, route.admin.product.detail],
			'Approve Products': [route.admin.product.approve],
			'Master Products': [route.admin.product.master],
			'Brands': [route.admin.brand.list, route.admin.brand.add, route.admin.brand.detail],
			'Attributes': [route.admin.attribute.list, route.admin.attribute.add, route.admin.attribute.detail],
			'Attribute Sets': [route.admin.attributeset.list, route.admin.attributeset.add, route.admin.attributeset.detail],
			'Global Category': route.admin.category
		},
		'Accounts|fa-user': {
			'Shop Accounts': [route.admin.shop.account.list, route.admin.shop.account.add, route.admin.shop.account.detail],
			'Shop Types': [route.admin.shop.type.list, route.admin.shop.type.add, route.admin.shop.type.detail],
			'Admin Accounts': [route.admin.account.list, route.admin.account.add, route.admin.account.detail],
			'Admin Roles': [route.admin.role.list, route.admin.role.add, route.admin.role.detail]
		},
		'Promotion|fa-bookmark': {
		},
		'Reports|fa-line-chart': {
		},
		'Others|fa-sliders': {
		}
	}
};
/* Export module */
module.exports = {
  route: route,
  menu: menu
};
},{}],54:[function(require,module,exports){
/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * This module handle all seller functionality
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
angular.module('colsp.seller', [
	require('../core')
]);
/* require all */
(function () {var f = require("./index.js");f["index"]=require("./index.js");return f;})();
/**
 * Export angular module
 */
module.exports = 'colsp.seller';
},{"../core":19,"./index.js":54}],55:[function(require,module,exports){
module.exports = ["$templateCache", function($templateCache) {  'use strict';

  $templateCache.put('admin/views/attributes.add.html',
    ""
  );


  $templateCache.put('admin/views/attributes.list.html',
    "<!-- Attribute listing -->\r" +
    "\n" +
    "<nc-alert nc-model=\"alert\"></nc-alert>\r" +
    "\n" +
    "<nc-page-title nc-title=\"Attributes\">\r" +
    "\n" +
    "  <a type=\"button\" class=\"btn-blue btn btn-width-xxl\" href=\"{{$route.get('admin.attribute.list')\">\r" +
    "\n" +
    "    <span class=\"\">Add Attributes</span>\r" +
    "\n" +
    "  </a>\r" +
    "\n" +
    "</nc-page-title>\r" +
    "\n" +
    "<div class=\"row search-section-wrapper\">\r" +
    "\n" +
    "  <nc-bulk nc-model=\"bulkContainer\" nc-bulk-fn=\"bulks\" nc-bulk-track-by=\"AttributeId\"></nc-bulk>\r" +
    "\n" +
    "  <nc-search nc-model=\"params.searchText\" nc-search-placeholder=\"'Search for Attribute Name'\"></nc-search>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<nc-filter nc-model=\"params._filter\" nc-filter-options=\"filterOptions\"></nc-filter>\r" +
    "\n" +
    "<nc-table nc-model=\"list\" nc-table-params=\"params\" nc-table-options=\"tableOptions\" nc-is-loading=\"loading\" nc-is-searching=\"isSearching()\" >\r" +
    "\n" +
    "  <table class=\"table table-curved\">\r" +
    "\n" +
    "    <thead>\r" +
    "\n" +
    "      <tr class=\"table-head\">\r" +
    "\n" +
    "        <th class=\"checkbox-column\"><nc-bulk-checkbox nc-model=\"list.data\"></nc-bulk-checkbox></th>\r" +
    "\n" +
    "        <th nc-sort=\"AttributeNameEn\">Attribute Name</th>\r" +
    "\n" +
    "        <th nc-sort=\"DisplayNameEn\">Display Name</th>\r" +
    "\n" +
    "        <th>Field Type</th>\r" +
    "\n" +
    "        <th>Variation</th>\r" +
    "\n" +
    "        <th>Mapped Set</th>\r" +
    "\n" +
    "        <th nc-sort=\"UpdatedDt\" class=\"modified-column\">Modified</th>\r" +
    "\n" +
    "        <th>Action</th>\r" +
    "\n" +
    "      </tr>\r" +
    "\n" +
    "    </thead>\r" +
    "\n" +
    "    <tbody>\r" +
    "\n" +
    "      <tr ng-repeat=\"row in list.data\">\r" +
    "\n" +
    "        <td class=\"checkbox-column\"><nc-bulk-checkbox nc-model=\"row\"></nc-bulk-checkbox></td>\r" +
    "\n" +
    "        <td class=\"column-text-ellipsis\" nc-link=\"/admin/attributes/{{row.AttributeId}}\">\r" +
    "\n" +
    "          {{row.AttributeNameEn}}\r" +
    "\n" +
    "        </td>\r" +
    "\n" +
    "        <td>{{row.DisplayNameEn}}</td>\r" +
    "\n" +
    "        <td>{{row.DataType | mapDropdown:dataTypeDropdown }}</td>\r" +
    "\n" +
    "        <td class=\"width_100\">{{row.VariantStatus | mapDropdown:yesNoDropdown }}</td>\r" +
    "\n" +
    "        <td class=\"width_100\">{{row.AttributeSetCount}}</td>\r" +
    "\n" +
    "        <td class=\"width_100\">{{row.UpdatedDt | dateTh}}</td>\r" +
    "\n" +
    "        <td class=\"width_100\"><nc-action nc-model=\"row\" nc-action-fn=\"actions\"></nc-action></td>\r" +
    "\n" +
    "      </tr>\r" +
    "\n" +
    "    </tbody>\r" +
    "\n" +
    "  </table>\r" +
    "\n" +
    "</nc-table>\r" +
    "\n" +
    "<nc-pagination nc-model=\"params\" nc-pagination-total=\"list.total\" ></nc-pagination>"
  );


  $templateCache.put('core/templates/form.html',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "\t<div class=\"width-label\"><label class=\"control-label\" ng-class=\"options.labelClass || {}\" ng-bind-html=\"options.label\"></label></div>\r" +
    "\n" +
    "\t<div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "\t\t<ng-transclude></ng-transclude>\r" +
    "\n" +
    "\t\t<span class=\"input-unit\" ng-if=\"options.unit\">{{ options.unit }}</span>\r" +
    "\n" +
    "\t\t<span class=\"help-block\" ng-if=\"options.hint\" ng-show=\"options.hint.show\">{{options.hint.message}}</span>\r" +
    "\n" +
    "\t\t<span class=\"help-block color-red\" ng-if=\"options.error\" ng-show=\"options.error.show\" \r" +
    "\n" +
    "        ng-repeat=\"(key, prop) in (options.error.conditions) track by key\">\r" +
    "\n" +
    "\t\t\t<span ng-bind-html=\"options.error.messages[key]\"></span>\r" +
    "\n" +
    "\t\t</span>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<div class=\"width-field-tooltip padding-left-30\"><i class=\"fa fa-2x fa-question-circle color-grey\" uib-tooltip-html=\"options.tooltip\" tooltip-trigger=\"mouseenter\" tooltip-placement=\"right\" ng-if=\"options.tooltip && options.tooltip.length > 0\"></i></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('core/views/login.html',
    "<div class=\"login-page\">\r" +
    "\n" +
    "\t<div class=\"logo-img-wrapper\">\r" +
    "\n" +
    "\t\t<img class=\"logo-img\" src=\"/assets/img/seller_logo.png\" />\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<form ng-submit=\"doLogin()\" name=\"loginForm\" novalidate>\r" +
    "\n" +
    "\t\t<div class=\"form-login\" ng-cloak>\r" +
    "\n" +
    "\t\t\t<nc-alert nc-model=\"alert\"></nc-alert>\r" +
    "\n" +
    "\t\t\t<div ng-template=\"core/templates/form.html\"\r" +
    "\n" +
    "\t\t\t\tng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t'label': 'Email'\r" +
    "\n" +
    "\t\t\t\t}\">\r" +
    "\n" +
    "\t\t\t\t<input\r" +
    "\n" +
    "\t\t\t\tclass=\"form-control width-field-large\"\r" +
    "\n" +
    "\t\t\t\tname=\"user\"\r" +
    "\n" +
    "\t\t\t\tng-model=\"uform.user\"\r" +
    "\n" +
    "\t\t\t\tng-class=\"{ 'has-error' : (events.user === false && loginForm.user.$invalid) || (error && loginForm.$pristine) }\"\r" +
    "\n" +
    "\t\t\t\tmaxlength=\"300\"\r" +
    "\n" +
    "\t\t\t\tng-focus=\"events.user=true\"\r" +
    "\n" +
    "\t\t\t\tng-blur=\"events.user=false\"\r" +
    "\n" +
    "\t\t\t\trequired />\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t<div ng-template=\"core/templates/form.html\"\r" +
    "\n" +
    "\t\t\t\tng-template-options=\"{\r" +
    "\n" +
    "\t\t\t\t\t'label': 'Password'\r" +
    "\n" +
    "\t\t\t\t}\">\r" +
    "\n" +
    "\t\t\t\t<input\r" +
    "\n" +
    "\t\t\t\ttype=\"password\"\r" +
    "\n" +
    "\t\t\t\tclass=\"form-control width-field-large\"\r" +
    "\n" +
    "\t\t\t\tname=\"pass\"\r" +
    "\n" +
    "\t\t\t\tng-model=\"uform.pass\"\r" +
    "\n" +
    "\t\t\t\tng-class=\"{ 'has-error' : (events.pass === false && loginForm.pass.$invalid) || (error && loginForm.$pristine)  }\"\r" +
    "\n" +
    "\t\t\t\tmaxlength=\"300\"\r" +
    "\n" +
    "\t\t\t\tng-focus=\"events.pass=true\"\r" +
    "\n" +
    "\t\t\t\tng-blur=\"events.pass=false\"\r" +
    "\n" +
    "\t\t\t\trequired />\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t<div class=\"form-group\" ng-if=\"error && loginForm.$pristine\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"width-label\"></div>\r" +
    "\n" +
    "\t\t\t\t<div class=\"width-field-normal\">\r" +
    "\n" +
    "\t\t\t\t\t<span class=\"help-block color-red text-center margin-bottom-0\">Invalid Email or Password</span>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t\t<fieldset class=\"form-group margin-top-30\">\r" +
    "\n" +
    "\t\t\t\t<button type=\"submit\" class=\"btn btn-blue btn-100\"><span class=\"login-loading\" ng-cloak ng-show=\"loading\"><i class=\"fa fa-spinner fa-spin\" ></i></span> Login</button>\r" +
    "\n" +
    "\t\t\t</fieldset>\r" +
    "\n" +
    "\t\t\t<fieldset class=\"form-group text-center\">\r" +
    "\n" +
    "\t\t\t\t<a href=\"\" data-toggle=\"modal\" data-target=\"#forget-password\">Forget password?</a>\r" +
    "\n" +
    "\t\t\t</fieldset>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncAction.html',
    "<a class=\"action-gear\" href=\"javascript:;\"  uib-popover-template=\"'common/ncActionPopover.html'\" popover-placement=\"bottom\" popover-append-to-body=\"true\" popover-trigger=\"outsideClick\" class=\"action-gear\">\r" +
    "\n" +
    "\t<i class=\"fa fa-gear color-dark-grey icon-size-20\"></i>\r" +
    "\n" +
    "\t<i class=\"fa fa-caret-down color-dark-grey\"></i>\r" +
    "\n" +
    "</a>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncActionModal.html',
    "<div class=\"modal-header no-border\">\r" +
    "\n" +
    "\t<button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"no()\"><span class=\"padding-left-15\" aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body confirmation-modal no-margin\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<div class=\"col-xs-12 margin-bottom-30\">\r" +
    "\n" +
    "\t\t\t<h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2>\r" +
    "\n" +
    "\t\t\t<div ng-bind-html=\"message\"></div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"confirmation-action no-margin\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-white\" ng-click=\"no()\">{{btnNo}}</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn {{btnClass}}\" ng-click=\"yes()\">{{btnYes}}</button>\r" +
    "\n" +
    "\t\t</div> <!-- end .col-xs-12 -->\r" +
    "\n" +
    "\t</div> <!-- end .row -->\r" +
    "\n" +
    "</div> <!-- end .modal-body -->\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncActionPopover.html',
    "<div ng-repeat=\"action in options\"><a ng-click=\"call(action)\" >{{action.name}}</a></div>"
  );


  $templateCache.put('nc/templates/common/ncAdvanceSearch.html',
    "<div class=\"row margin-top-30\" ng-show=\"open\">\r" +
    "\n" +
    "\t<div class=\"col-xs-12\">\r" +
    "\n" +
    "\t\t<div class=\"form-section\">\r" +
    "\n" +
    "\t\t\t<div class=\"form-section-header\"><h2>Advance Search</h2></div>\r" +
    "\n" +
    "\t\t\t<div class=\"form-section-content\">\r" +
    "\n" +
    "\t\t\t\t<form name=\"form\" class=\"ah-form\" novalidate>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.ProductName\" nc-label=\"Product Name\" nc-template-options-path=\"searchForm/ProductName\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"ProductName\" ng-model=\"formData.ProductName\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Pid\" nc-label=\"PID\" nc-template-options-path=\"searchForm/Pid\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"Pid\" ng-model=\"formData.Pid\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Sku\" nc-label=\"SKU\" nc-template-options-path=\"searchForm/Sku\">\r" +
    "\n" +
    "\t\t                    <input class=\"form-control width-field-normal\" name=\"Sku\" ng-model=\"formData.Sku\" required />\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Brand\" nc-label=\"Brand Name\" nc-template-options-path=\"searchForm/Brands\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t    <ui-select ng-model=\"formData.Brands\" name=\"Brands\" nc-tag-validator multiple tagging-tokens=\",|ENTER\" tagging-label=\"\" nc-tag-field>\r" +
    "\n" +
    "\t                                <ui-select-match>\r" +
    "\n" +
    "\t                                    {{$item.BrandNameEn}}\r" +
    "\n" +
    "\t                                </ui-select-match>\r" +
    "\n" +
    "\t                                <ui-select-choices repeat=\"item in options.Brands | filter:{BrandNameEn: $select.search} track by $index\">\r" +
    "\n" +
    "\t                                    {{item.BrandNameEn}}\r" +
    "\n" +
    "\t                                </ui-select-choices>\r" +
    "\n" +
    "\t                            </ui-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.GlobalCategories\" nc-label=\"Global Category Name\" nc-template-options-path=\"searchForm/GlobalCategories\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<nc-breadcrumb-select name=\"GlobalCategories\" nc-model=\"formData.GlobalCategories\" nc-breadcrumb-select-tree=\"options.GlobalCategories\"></nc-breadcrumb-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.LocalCategories\" nc-label=\"Local Category Name\" nc-template-options-path=\"searchForm/LocalCategories\" ng-show=\"!options.Admin\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<nc-breadcrumb-select name=\"LocalCategories\" nc-model=\"formData.LocalCategories\" nc-breadcrumb-select-tree=\"options.LocalCategories\"></nc-breadcrumb-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label\" nc-template-form=\"form.Tags\" nc-label=\"Search Tag\" nc-template-options-path=\"searchForm/Tags\" class=\"ui-select-dropdown-hide\" >\r" +
    "\n" +
    "\t\t\t\t\t\t\t    <ui-select ng-model=\"formData.Tags\" name=\"Tags\" nc-tag-validator tagging tagging-label=\"\" multiple nc-tag-field>\r" +
    "\n" +
    "\t                                <ui-select-match>\r" +
    "\n" +
    "\t                                    {{$item}}\r" +
    "\n" +
    "\t                                </ui-select-match>\r" +
    "\n" +
    "\t                                <ui-select-choices repeat=\"item in options.Tags\">\r" +
    "\n" +
    "\t                                \t{{item}}\r" +
    "\n" +
    "\t                                </ui-select-choices>\r" +
    "\n" +
    "\t                            </ui-select>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.Price\" nc-label=\"Sale Price\" nc-template-options-path=\"searchForm/Price\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<input type=\"text\" name=\"Price\" ng-maxnumber=\"{{formData.PriceTo}}\" ng-model=\"formData.PriceFrom\" class=\"form-control\" ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<input type=\"text\" ng-model=\"formData.PriceTo\" class=\"form-control\" ng-pattern-restrict=\"^[0-9]*(\\.[0-9]{0,2})?$\"/>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.CreatedDate\" nc-label=\"Created Date\" nc-template-options-path=\"searchForm/CreatedDate\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtFrom | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker name=\"CreatedDate\" ng-date-before=\"{{formData.CreatedDtTo}}\" data-ng-model=\"formData.CreatedDtFrom\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.CreatedDtTo | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.CreatedDtTo\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div nc-template=\"common/input/form-group-with-label-multiple\" nc-template-form=\"form.ModifiedDate\" nc-label=\"Modified Date\" nc-template-options-path=\"searchForm/ModifiedDate\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown3\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtFrom | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.ModifyDtFrom\" name=\"ModifiedDate\" ng-date-before=\"{{formData.ModifiedDtTo}}\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown3', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-field-small-input\">\r" +
    "\n" +
    "                                <div class=\"dropdown\">\r" +
    "\n" +
    "                                    <a class=\"dropdown-toggle\" id=\"dropdown4\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                                        <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                                         class=\"input-icon-calendar form-control\" value=\"{{ formData.ModifyDtTo | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "                                    </a>\r" +
    "\n" +
    "                                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                                        <datetimepicker data-ng-model=\"formData.ModifyDtTo\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown4', minView: 'hour' }\" />\r" +
    "\n" +
    "                                    </ul>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t<div class=\"form-group\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"width-label\"><label class=\"control-label\"></label></div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"button-size-normal\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<a class=\"button-size-normal btn btn-blue btn-width-xl\" ng-click=\"search()\">Search</a>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t\t<div class=\"button-size-normal\">\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t<a class=\"button-size-normal margin-left-10 btn btn-white btn-width-xl\" ng-click=\"clear()\">Clear</a>\r" +
    "\n" +
    "\t\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t</form>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncAdvanceSearchButton.html',
    "<div class=\"search-section-item\">\r" +
    "\n" +
    "\t<button class=\"btn btn-default btn-toggle {{model ? 'active' : ''}}\" type=\"button\" ng-click=\"toggle()\">Advanced Search</button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncAlert.html',
    "<div ng-show=\"alert.show\" uib-alert template-url=\"common/ncAlertTemplate.html\" type=\"{{ alert.type }}\" close=\"alert.close()\"><span ng-bind-html=\"alert.message\"></span></div>"
  );


  $templateCache.put('nc/templates/common/ncAlertTemplate.html',
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning')]\" class=\"alert alert-dismissable\" role=\"alert\" >\r" +
    "\n" +
    "\t<span class=\"close color opacity-1\" ng-class=\"'color-' + (type || 'warning')\" aria-hidden=\"true\"  ng-show=\"closeable\" ng-click=\"close({$event: $event})\">&times;</span>\r" +
    "\n" +
    "    <ng-transclude><ng-transclude/>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncBreadcrumbSelect.html',
    "<ui-select name=\"{{name}}\" ng-model=\"model.ptr\" nc-tag-validator nc-max-tag-count=\"{{options.tagCount}}\" multiple>\r" +
    "\n" +
    "\t<ui-select-match><span ng-bind-html=\"$item.item[options.nameKey]\"></span></ui-select-match>\r" +
    "\n" +
    "\t<ui-select-choices repeat=\"value in searchable | filter: { name: $select.search } | limitTo: options.limit track by $index\">\r" +
    "\n" +
    "\t\t<div ng-bind-html=\"value.displayName | highlight: $select.search | replace: encodedSeparator: options.seperator\"></div>\r" +
    "\n" +
    "\t</ui-select-choices>\r" +
    "\n" +
    "</ui-select>"
  );


  $templateCache.put('nc/templates/common/ncBulk.html',
    "<div class=\"btn-group search-section-item\" role=\"group\">\r" +
    "\n" +
    "  <div class=\"btn-group\" role=\"group\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-default dropdown-toggle bulk-action-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" uib-dropdown-toggle>\r" +
    "\n" +
    "      <span class=\"\">{{ select.name }}</span>\r" +
    "\n" +
    "      <span class=\"caret\"></span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <ul uib-dropdown-menu role=\"menu\" class=\"dropdown-menu\">\r" +
    "\n" +
    "      <li ng-repeat=\"option in options\" ><a ng-click=\"selectOption(option)\">{{ option.name }}</a></li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\t<button type=\"button\" class=\"btn btn-default btn-action\" ng-click=\"call()\">\r" +
    "\n" +
    "    Confirm <span ng-show=\"model.length > 0\">({{ model.length }})</span>\r" +
    "\n" +
    "  </button>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncBulkCheckbox.html',
    "<input type=\"checkbox\" ng-model=\"checkbox\" />"
  );


  $templateCache.put('nc/templates/common/ncBulkModal.html',
    "<div class=\"modal-header no-border\">\r" +
    "\n" +
    "\t<button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"no()\"><span class=\"padding-left-15\" aria-hidden=\"true\">&times;</span></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"modal-body confirmation-modal no-margin\">\r" +
    "\n" +
    "\t<div class=\"row\">\r" +
    "\n" +
    "\t\t<div class=\"col-xs-12 margin-bottom-30\">\r" +
    "\n" +
    "\t\t\t<h2 class=\"font-size-20 text-centerx text-normal margin-bottom-20\">{{title}}</h2>\r" +
    "\n" +
    "\t\t\t<div ng-bind-html=\"message\"></div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"confirmation-action no-margin\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-white\" ng-click=\"no()\">{{btnNo}}</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"btn {{btnClass}}\" ng-click=\"yes()\">{{btnYes}}</button>\r" +
    "\n" +
    "\t\t</div> <!-- end .col-xs-12 -->\r" +
    "\n" +
    "\t</div> <!-- end .row -->\r" +
    "\n" +
    "</div> <!-- end .modal-body -->\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncEmpty.html',
    "<div class=\"local-category-page margin-bottom-20\">\r" +
    "\n" +
    "  <div class=\"local-category-empty-section margin-top-20\">\r" +
    "\n" +
    "    <span class=\"\">\r" +
    "\n" +
    "      <span class=\"zero-category-image\">\r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "    <span class=\"local-category-empty-text\">\r" +
    "\n" +
    "      {{ message }}\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncEye.html',
    "<a ng-click=\"_toggle()\">\r" +
    "\n" +
    "\t<i ng-class=\"{'fa fa-eye-slash color-grey eye-icon' : !model,\r" +
    "\n" +
    "                            'fa fa-eye color-dark-grey eye-icon' : model}\">\r" +
    "\n" +
    "    </i>\r" +
    "\n" +
    "</a>"
  );


  $templateCache.put('nc/templates/common/ncFilter.html',
    "<div class=\"filter-section\">\r" +
    "\n" +
    "  <div class=\"filter-container\">\r" +
    "\n" +
    "    <span>Filters:</span>\r" +
    "\n" +
    "    <a class=\"filter-seperator\" ng-repeat=\"filter in filters\" ng-class=\"{'filter-active': model == filter.value }\" ng-click=\"select(filter.value)\">{{ filter.name }}</a>\r" +
    "\n" +
    "  \t<span ng-transclude></span>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImage.html',
    "<li class=\"list-item\">\r" +
    "\n" +
    "\t<div class=\"image-thumbs-actions\">\r" +
    "\n" +
    "\t\t<div class=\"image-thumbs-img-wrapper\">\r" +
    "\n" +
    "\t\t\t<img ng-src=\"{{ model.ImageUrlEn.length > 0 && model.ImageUrlEn  || '/assets/img/loader.gif' }}\" />\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div ng-if=\"actions.length > 0\" class=\"actions-wrapper\" ng-style=\"width: {{100 / actions.length}}%;\">\r" +
    "\n" +
    "\t\t\t<a ng-repeat=\"action in options.actions\" class=\"action\" \r" +
    "\n" +
    "\t\t\tng-click=\"action.fn(model, parent, $index)\"><i class=\"fa\" ng-class=\"{{action.icon}}\"></i></a>\r" +
    "\n" +
    "\t\t\t<!-- fa-search-icon fa-trash -->\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</li>"
  );


  $templateCache.put('nc/templates/common/ncImageDropzone.html',
    "<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t<input nv-file-select=\"\" uploader=\"uploader\" accept=\".png, .jpg, .jpeg\" type=\"file\" multiple/>\r" +
    "\n" +
    "\t<div nv-file-drop=\"\" uploader=\"uploader\" class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "\t\t\t<p><i class=\"fa fa-image fa-3x color-theme\"></i></p>\r" +
    "\n" +
    "\t\t\t<p>Drop images here</p>\r" +
    "\n" +
    "\t\t\t<p><a ng-click=\"upload()\">or select images</a></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImageDropzoneInline.html',
    "<div class=\"drop-zone-container\">\r" +
    "\n" +
    "\t<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t\t<input type=\"file\" />\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t\t<div class=\"image-drop-zone-text\" ng-bind-compile=\"content\">\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management1\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management1\">or select images</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Wait for Approval']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management3\", 'texts' =>['This product is already approved', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management3\">Click here to edit</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', [\"id\" => \"images-management4\", 'texts' =>['<i class=\"fa fa-image fa-3x color-theme\"></i>', 'Drop images here', '<a href=\"#\" data-trigger=\"file\" data-target=\"#images-management4\">or select images</a>']]) ?>\r" +
    "\n" +
    "\t\t\t\t\t\t<? $this->insert('components/image-dropzone-inline-text', ['texts' =>['<i class=\"fa fa-ban fa-3x color-dark-grey\"></i>', 'Cannot upload', 'Reach Max Photos']]) ?>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImageDropzoneTemplate.html',
    "<div class=\"image-drop-wrapper\">\r" +
    "\n" +
    "\t<input nv-file-select uploader=\"uploader\" type=\"file\" multiple/>\r" +
    "\n" +
    "\t<div nv-file-drop uploader=\"uploader\" class=\"image-drop-zone\">\r" +
    "\n" +
    "\t\t<div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "\t\t\t<p><i class=\"fa fa-image fa-3x color-theme\"></i></p>\r" +
    "\n" +
    "\t\t\t<p>Drop images here</p>\r" +
    "\n" +
    "\t\t\t<p><a ng-click=\"upload()\">or select images</a></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncImageGallery.html',
    "<div>\r" +
    "\n" +
    "\t<p class=\"featured-image-wrapper\">Featured Image</p>\r" +
    "\n" +
    "\t<ul class=\"image-management-list\">\r" +
    "\n" +
    "\t\t<li class=\"list-item\" ng-repeat=\"image in images track by $index\">\r" +
    "\n" +
    "\t\t\t<div class=\"image-thumbs-actions\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"image-thumbs-img-wrapper\">\r" +
    "\n" +
    "\t\t\t\t\t<img ng-src=\"{{ getSrc(image) }}\" />\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t\t<div class=\"actions-wrapper\" >\r" +
    "\n" +
    "\t\t\t\t\t<a class=\"action {{ isDisabled(image) ? 'disabled' : ''}}\" ng-repeat=\"action in options.actions\" style=\"width: {{100 / options.actions.length }}%;\" ng-click=\"call(action, image, model)\">\r" +
    "\n" +
    "\t\t\t\t\t\t<i class=\"fa {{action.icon}}\"></i>\r" +
    "\n" +
    "\t\t\t\t\t</a>\r" +
    "\n" +
    "\t\t\t\t\t<!-- fa-search-icon fa-trash -->\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</li>\r" +
    "\n" +
    "\t</ul>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncLoading.html',
    "<div class=\"empty-section margin-top-20 margin-bottom-20\">\r" +
    "\n" +
    "  <span>\r" +
    "\n" +
    "    <img class=\"loading-img\" src=\"/assets/img/loader.gif\" />\r" +
    "\n" +
    "  </span>{{ message }}</span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncLoadingSmall.html',
    "<img src=\"/assets/img/loader.gif\" width=\"40\"><small>{{ message }}</small>"
  );


  $templateCache.put('nc/templates/common/ncPagination.html',
    "<div class=\"page-navigation\">\r" +
    "\n" +
    "  <span>\r" +
    "\n" +
    "    <!-- prev page button -->\r" +
    "\n" +
    "    <a ng-click=\"nextPage(-1)\">\r" +
    "\n" +
    "      <i class=\"fa fa-chevron-left\" ng-class=\"{'grey-chevron': page() <= 1, 'blue-chevron' : page() > 1}\">\r" +
    "\n" +
    "      </i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <!-- pagination text -->\r" +
    "\n" +
    "    <span> Page {{ page() }} of {{ totalPage() }}</span>\r" +
    "\n" +
    "    <!-- next page button -->\r" +
    "\n" +
    "    <a ng-click=\"nextPage(1)\">\r" +
    "\n" +
    "      <i class=\"fa fa-chevron-right padding-right-15\" ng-class=\"{'grey-chevron': page() >= totalPage(), 'blue-chevron' : page() < totalPage() }\">\r" +
    "\n" +
    "      </i>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "    <span class=\"view-page-separator margin-right-10\">View per page</span>\r" +
    "\n" +
    "    <!-- Pagination dropdown -->\r" +
    "\n" +
    "    <div class=\"btn-group\" uib-dropdown>\r" +
    "\n" +
    "      <!-- Page size button -->\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-default\">\r" +
    "\n" +
    "        {{ pageSize() }}\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <!-- Caret -->\r" +
    "\n" +
    "      <button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\r" +
    "\n" +
    "        <span class=\"caret\"></span>\r" +
    "\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\r" +
    "\n" +
    "      </button>\r" +
    "\n" +
    "      <!-- Dropdown -->\r" +
    "\n" +
    "      <ul uib-dropdown-menu role=\"menu\" class=\"dropdown-menu-right\">\r" +
    "\n" +
    "        <li ng-repeat=\"size in paginationOptions\" ><a ng-click=\"setPageSize(size)\">{{size}}</a></li>\r" +
    "\n" +
    "      </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </span>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncSearch.html',
    "<div class=\"input-group search-section-item\">\r" +
    "\n" +
    "\t<form ng-submit=\"callback()\">\r" +
    "\n" +
    "\t\t<div class=\"input-group search-box\">\r" +
    "\n" +
    "\t    <input type=\"text\" class=\"form-control input-search-icon\" ng-model=\"searchText\" placeholder=\"{{placeholder}}\">\r" +
    "\n" +
    "\t\t\t<span class=\"input-group-btn\">\r" +
    "\n" +
    "\t\t\t\t<button class=\"btn btn-default btn-action\">Search</button>\r" +
    "\n" +
    "\t\t\t</span>\r" +
    "\n" +
    "\t  </div>\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/common/ncTable.html',
    "<div class=\"table-section\">\r" +
    "\n" +
    "  <div ng-show=\"!loading && model.data.length != 0\" ng-transclude></div>\r" +
    "\n" +
    "  <div nc-loading=\"{{options.loadingMessage}}\" ng-show=\"loading\"></div>\r" +
    "\n" +
    "  <div nc-empty=\"{{options.searchEmptyMessage}}\" ng-show=\"!loading && model.data.length == 0 && searching\">\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div nc-empty=\"{{options.emptyMessage}}\" ng-show=\"!loading && model.data.length == 0 && !searching\"></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/common/ncTableSort.html',
    "<a class=\"header-link\" ng-click=\"click()\"><span ng-class=\"{ 'active-underline' : isCurrent() }\" ng-transclude></span></a>\r" +
    "\n" +
    "<i class=\"fa\" ng-class=\"{ \r" +
    "\n" +
    "'fa fa-caret-down' : isCurrent() && direction, \r" +
    "\n" +
    "'fa fa-caret-up' : isCurrent() && !direction, \r" +
    "\n" +
    "'fa fa-caret-down color-grey' : !isCurrent() }\" ng-click=\"click()\">"
  );


  $templateCache.put('nc/templates/common/ncTreeSelect.html',
    "<div class=\"category-section-border-box\">\r" +
    "\n" +
    "\t<div class=\"category-header\">{{title}}</div>\r" +
    "\n" +
    "\t<div class=\"category-content no-padding\">\r" +
    "\n" +
    "\t\t<ul ng-repeat=\"column in columns.list() track by $index\" ng-class=\"{'empty-column': column.list().length <= 0 }\" class=\"content-column\">\r" +
    "\n" +
    "\t\t\t<li ng-repeat=\"$item in column.list() track by $index\" ng-class=\"{'category-active' : $index == column.active() }\" ng-click=\"setModel($item)\">{{getContent($item)}}</li>\r" +
    "\n" +
    "\t\t</ul>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/components/date-range-inline.html',
    "<div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "  <div class=\"width-label\"><label class=\"control-label\" ng-class=\"options.labelClass || {}\">{{ label }}</label></div>\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "      <div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "        <div class=\"dropdown\">\r" +
    "\n" +
    "            <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown1\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                 ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "                 placeholder=\"{{ startPlaceholder || 'Select start date' }}\"\r" +
    "\n" +
    "                 class=\"form-control width-field-large\"\r" +
    "\n" +
    "                 value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "                <datetimepicker data-ng-model=\"startDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"width-label-extend text-center\"><label class=\"control-label\">To</label></div>\r" +
    "\n" +
    "      <div ng-class=\"['width-field-' + (options.inputSize || 'small-input')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "        <div class=\"dropdown\">\r" +
    "\n" +
    "            <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "                <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "                 ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "                 placeholder=\"{{ endPlaceholder || 'Select end date' }}\"\r" +
    "\n" +
    "                 class=\"form-control width-field-large\"\r" +
    "\n" +
    "                 value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel2\">\r" +
    "\n" +
    "                <datetimepicker data-ng-model=\"endDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\" />\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"width-field-large\">\r" +
    "\n" +
    "            <span class=\"help-block color-red\" ng-if=\"endDate <= startDate\">\r" +
    "\n" +
    "                <span>{{ errorText || \"Start date/time must come before end date/time\" }}</span>\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('nc/templates/components/date-range-vertical.html',
    "<div>\r" +
    "\n" +
    "  <div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "    <div class=\"width-label\">\r" +
    "\n" +
    "      <label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ startLabel }}</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "      <div class=\"dropdown\">\r" +
    "\n" +
    "          <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown1\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "              <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "               ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "               placeholder=\"{{ startPlaceholder || 'Select start date' }}\"\r" +
    "\n" +
    "               class=\"form-control width-field-large\"\r" +
    "\n" +
    "               value=\"{{ startDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\r" +
    "\n" +
    "              <datetimepicker data-ng-model=\"startDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown1', minView: 'minute' }\" />\r" +
    "\n" +
    "\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-class=\"['form-group ' + (options.formGroupClass || '')]\">\r" +
    "\n" +
    "    <div class=\"width-label\">\r" +
    "\n" +
    "      <label class=\"control-label ng-binding\" ng-class=\"options.labelClass || {}\">{{ endLabel }}</label>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-class=\"['width-field-' + (options.inputSize || 'normal')]\" class=\"input-with-unit\">\r" +
    "\n" +
    "      <div class=\"dropdown\">\r" +
    "\n" +
    "          <a class=\"dropdown-toggle\" id=\"date_range_vertical_dropdown2\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">\r" +
    "\n" +
    "              <input readonly style=\"background-color:white\" type=\"text\"\r" +
    "\n" +
    "               ng-class=\"{'has-error': endDate <= startDate }\"\r" +
    "\n" +
    "               placeholder=\"{{ endPlaceholder || 'Select end date' }}\"\r" +
    "\n" +
    "               class=\"form-control width-field-large\"\r" +
    "\n" +
    "               value=\"{{ endDate | date: 'dd/MM/yy HH:mm' }}\" />\r" +
    "\n" +
    "          </a>\r" +
    "\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel2\">\r" +
    "\n" +
    "              <datetimepicker data-ng-model=\"endDate\" data-datetimepicker-config=\"{ dropdownSelector: '#date_range_vertical_dropdown2', minView: 'minute' }\" />\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"width-field-large\">\r" +
    "\n" +
    "          <span class=\"help-block color-red\" ng-if=\"endDate <= startDate\">\r" +
    "\n" +
    "              <span>{{ errorText || \"Start date/time must come before end date/time\" }}</span>\r" +
    "\n" +
    "          </span>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/components/single-upload.html',
    "<!-- Nc-Single-Upload -->\r" +
    "\n" +
    "<div class=\"image-drop-wrapper\" style=\"width:320px;\">\r" +
    "\n" +
    "  <input nv-file-select uploader=\"viewBag.uploader\" type=\"file\" ng-delegatee=\"viewBag.uploader\" onclick=\"this.value = null\"/>\r" +
    "\n" +
    "  <div nv-file-drop uploader=\"viewBag.uploader\" class=\"image-drop-zone\" style=\"width:320px; height:120px; overflow: hidden\">\r" +
    "\n" +
    "    <div class=\"image-drop-zone-text\">\r" +
    "\n" +
    "      <p><img ng-src=\"{{ viewBag.images[0].url }}\" style=\"width:100%; height: auto\"/></p>\r" +
    "\n" +
    "      <span ng-if=\"!viewBag.images || viewBag.images.length == 0\">Drag &amp; drop your shop logo here</span>\r" +
    "\n" +
    "      <h3 ng-if=\"viewBag.uploader.progress > 0 && viewBag.uploader.progress < 100\" class=\"color-grey\">{{ uploader.progress }} %</h3>\r" +
    "\n" +
    "      <h3 ng-if=\"viewBag.uploader.progress == 100 && !viewBag.images[0].url\" class=\"color-grey\"><img style=\"width:100%; height: auto\" src=\"/assets/img/loader.gif\"/></h3>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div ng-show=\"viewBag.uploader.isHTML5\" class=\"image-select-alternative-text\">\r" +
    "\n" +
    "    <span>Or</span>\r" +
    "\n" +
    "    <a href=\"javascript:;\" ng-delegate=\"viewBag.uploader\">\r" +
    "\n" +
    "      <span ng-if=\"viewBag.images.length === 0\">Select image from your computer</span>\r" +
    "\n" +
    "      <span ng-if=\"viewBag.images.length > 0\">Upload new image</span>\r" +
    "\n" +
    "    </a>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('nc/templates/partials/breadcrumb-title.html',
    "<div class=\"page-header\" ng-class=\"{{css}}\">\r" +
    "\n" +
    "    <h1 class=\"float-left page-header-title ah-breadcrumb\">\r" +
    "\n" +
    "    \t<a ng-repeat-start=\"t in title track by $index\" ng-href=\"{{link[$index]}}\" class=\"ah-breadcrumb-path\" ng-class=\"['ah-breadcrumb-idx-' + $index]\">{{t}}</a>\r" +
    "\n" +
    "    \t<span ng-if=\"!($index == 0 && title.length == 1)\" class=\"ah-breadcrumb-splitter\"></span>\r" +
    "\n" +
    "    </h1>\r" +
    "\n" +
    "    <div class=\"page-actions float-right\">\r" +
    "\n" +
    "    \t<ng-transclude></ng-transclude>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('nc/templates/partials/page-title.html',
    "<div class=\"page-header with-border\">\r" +
    "\n" +
    "    <h1 class=\"float-left page-header-title\" ng-bind-html=\"title\"></h1>\r" +
    "\n" +
    "    <span class=\"float-right page-header-action\" ng-transclude>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "</div>"
  );
}]
},{}]},{},[4]);
