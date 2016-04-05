module.exports = function($scope, $controller, options, Product, LocalCategoryService, GlobalCategoryService, BrandService, Category) {
	'ngInject';
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
		processed.Brands = _.map(processed.Brands, function(e) { return _.pick(e, ['BrandId']); });
		processed.GlobalCategories = _.map(processed.GlobalCategories, function(e) { return _.pick(e, ['Lft', 'Rgt']); });
		processed.LocalCategories = _.map(processed.LocalCategories, function(e) { return _.pick(e, ['Lft', 'Rgt']); });

		if(!_.isEmpty(processed.PriceTo)) processed.PriceTo = _.toInteger(processed.PriceTo);
		if(!_.isEmpty(processed.PriceFrom)) processed.PriceFrom = _.toInteger(processed.PriceFrom);

		processed = _.omitBy(_.omit(processed, ['ProductName', 'GlobalCategory']), function(e) {
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
			$scope.params._offset = 0;
			$scope.bulkContainer.length = 0;
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
		$scope.reload();
	});
}
