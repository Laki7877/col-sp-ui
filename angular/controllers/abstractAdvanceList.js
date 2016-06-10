/**
 * Provide template ctrl for advance-search listing pages
 */
module.exports = function($scope, $controller, options, Product, LocalCategoryService, GlobalCategoryService, BrandService, Category, ShopService) {
	'ngInject';

	//override abstractAdd reloader
	var overrideReload = function(newObj, oldObj) {
		if (!_.isUndefined(newObj) && !_.isUndefined(oldObj)) {
			//reset checkbox container (switch to advance search mode)
			if (newObj.searchText !== oldObj.searchText) {
				$scope.params._offset = 0;
				$scope.bulkContainer.length = 0;
			}
			if (newObj._filter !== oldObj._filter) {
				$scope.params._offset = 0;
				$scope.bulkContainer.length = 0;
			}
		}

		$scope.loading = true;

		//Advance search mode on/off
		if (!$scope.advanceSearchMode) {
			//normal listing
			options.service.list($scope.params)
				.then(function(data) {
					$scope.list = data;
				})
				.finally(function() {
					$scope.loading = false;
				});
		} else {
			//advance listing
			options.service.advanceList(_.extend({
					searchText: ''
				}, $scope.params, $scope.serializeAdvanceSearch($scope.advanceSearchParams)))
				.then(function(data) {
					$scope.list = data;
				})
				.finally(function() {
					$scope.loading = false;
				});
		}
	};

	//inherit from list ctrl
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: _.extend({}, options, {
			reload: overrideReload
		})
	});
	$scope.advanceSearchOptions = {}; //advance search params
	$scope.advanceSearch = false; //toggling advance search form state
	$scope.advanceSearchMode = false; //search type

	var isSearchingList = $scope.isSearching;
	//If searchText is filled
	$scope.isSearching = function() {
		return $scope.advanceSearchMode ? (isSearchingList()) : (!_.isEmpty($scope.params
			.searchText));
	};
	// convert advance data to query endpoint
	$scope.serializeAdvanceSearch = function(formData) {
		var processed = _.extend({}, formData);
		processed.ProductNames = _.compact([processed.ProductName]);
		processed.Brands = _.map(processed.Brands, function(e) {
			return _.pick(e, ['BrandId']);
		});
		//Get lft rgt of cat
		processed.GlobalCategories = _.map(processed.GlobalCategories, function(e) {
			return _.pick(e, ['Lft', 'Rgt']);
		});
		processed.LocalCategories = _.map(processed.LocalCategories, function(e) {
			return _.pick(e, ['Lft', 'Rgt']);
		});

		//toInt price
		if (!_.isEmpty(processed.PriceTo)) processed.PriceTo = _.toInteger(
			processed.PriceTo);
		if (!_.isEmpty(processed.PriceFrom)) processed.PriceFrom = _.toInteger(
			processed.PriceFrom);

		processed = _.omitBy(_.omit(processed, ['ProductName', 'GlobalCategory']),
			function(e) {
				if (_.isArrayLike(e)) return _.isEmpty(e);
				if (_.isObjectLike(e)) return false; //don't omit
				if (_.isNumber(e)) return _.isNaN(e);
				return false;
			});

		return processed;
	};
	//switch to normal when click search
	$scope.onSearch = function() {
		$scope.advanceSearchMode = false;
		return false;
	};
	//switch to advance when click advance search
	$scope.onAdvanceSearch = function(item, flag) {
		if (flag) {
			$scope.advanceSearchMode = true;
			$scope.advanceSearch = false;
			$scope.params.searchText = '';
			$scope.params._offset = 0;
			$scope.bulkContainer.length = 0;
		}
		return false;
	};

	//fetch brand
	$scope.advanceSearchOptions.refreshBrands = function(t) {
		BrandService.list({
				_limit: 16,
				searchText: t
			})
			.then(function(data) {
				$scope.advanceSearchOptions.Brands = data.data;
			});
	};
	//fetch shops
	$scope.advanceSearchOptions.refreshShops = function(t) {
		//Load all Shops
		ShopService.list({
				_limit: 16,
				searchText: t
			})
			.then(function(data) {
				$scope.advanceSearchOptions.Shops = data.data
			});
	};

	//Load Global category
	GlobalCategoryService.list()
		.then(function(data) {
			$scope.advanceSearchOptions.GlobalCategories = Category.transformNestedSetToUITree(
				data);
		});

	//Load Global category
	LocalCategoryService.list()
		.then(function(data) {
			$scope.advanceSearchOptions.LocalCategories = Category.transformNestedSetToUITree(
				data);
		});

	//Watch for advanceSearchParams
	$scope.$watch('advanceSearchParams', function(newObj, oldObj) {
		$scope.reload(newObj, oldObj);
	});
}
