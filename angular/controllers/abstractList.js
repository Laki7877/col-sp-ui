/**
 * Provide template ctrl for listing
 */
module.exports = function($scope, $window, $timeout, NcAlert, util, options) {
	'ngInject';
	var a = _.includes(['a','e','i','o','u'], _.lowerCase(options.item.charAt(0))) ? 'an' : 'a';
	//Alert bar
	$scope.alert = new NcAlert();
	//table message
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
	//Listing data
	$scope.list = {
		total: 0,
		data: []
	};
	$scope.item = options.item; //item object name (ie, "10 Product")
	$scope.url = options.url; //url to redirect back to
	$scope.id = options.id; //this item's id

	//called when params change, should reload endpoint
	$scope.reload = options.reload || function(newObj, oldObj) {
		$scope.loading = true;
		//optional reloader
		(options.onReload || _.noop)(newObj, oldObj);

		//clear checkbox container when param change
		if(!_.isUndefined(newObj) && !_.isUndefined(oldObj)) {
			if(newObj.searchText !== oldObj.searchText) {
				$scope.params._offset = 0;
				$scope.bulkContainer.length = 0;
			}
			if(newObj._filter !== oldObj._filter) {
				$scope.params._offset = 0;
				$scope.bulkContainer.length = 0;
			}
			if(newObj._filter2 !== oldObj._filter2) {
				$scope.params._offset = 0;
				$scope.bulkContainer.length = 0;
			}
		}
		//call list endpoint
		options.service.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
		.finally(function() {
			$scope.loading = false;
		});
	};
	// set loading flag
	$scope.onLoad = function() {
		$scope.loading = true;
	};

	// custom filters
	if(!_.isEmpty(options.filters)) {
		$scope.filterOptions = options.filters;
		$scope.params._filter = options.filters[0].value;
	}
	$scope.bulkContainer = []; //contain checked items
	$scope.toggleEye = util.eyeToggle($scope, options); //fn for toggling visibility

	//custom bulk action
	if(_.isUndefined(options.bulks)) {
		$scope.bulks= [
			util.bulkDelete($scope, options)
		];
	} else {
		$scope.bulks = _.compact(_.map(options.bulks, function(item) {

			if(_.isFunction(item)) {
				return item($scope);
			}
			if(_.isString(item)) {
				switch(item) {
					case 'Delete':
						return util.bulkDelete($scope, options);
					case 'Show':
						return util.bulkShow($scope, options);
					case 'Hide':
						return util.bulkHide($scope, options);
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
			util.actionView($scope, options),
			util.actionDelete($scope, options, function(obj, id) {
				_.remove($scope.bulkContainer, function(e) {
					return e[id] === obj[id];
				});
			})
		];
	} else {
		$scope.actions = _.compact(_.map(options.actions, function(item) {
			if(_.isFunction(item)) {
				return item($scope);
			}

			if(_.isString(item)) {
				switch(item) {
					case 'View':
						return util.actionView($scope, options);
					case 'View Only':
						return util.actionView($scope, options, 'View Detail');
					case 'Delete':
						return util.actionDelete($scope, options, function(obj, id) {
							_.remove($scope.bulkContainer, function(e) {
								return e[id] === obj[id];
							})
						});
					case 'Duplicate':
						return util.actionDuplicate($scope, options);
				}
			}

			if(_.isObject(item)) {
				return item;
			}
			return null;
		}));

	}

	//Searching flag for this listing
	$scope.isSearching = function() {
		return !_.isEmpty($scope.params.searchText) || ( _.isUndefined($scope.params._filter) ? false :  $scope.params._filter != options.filters[0].value);
	};

	var init = false;

	//watch for param change, reload if needed
	$scope.$watch('params', function(a,b) {
		if($scope.advanceSearchMode && (a.searchText != b.searchText)) {
		} else {
			$scope.reload(a,b);
		}
	}, true);
};
