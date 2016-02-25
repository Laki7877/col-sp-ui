module.exports = function($scope, $window, $timeout, NcAlert, util, options) {
	'ngInject';
	var a = _.includes(['a','e','i','o','u'], _.lowerCase(options.item.charAt(0))) ? 'an' : 'a';
	$scope.alert = new NcAlert();
	$scope.tableOptions = {
		emptyMessage: 'You do not have ' + a + ' ' + options.item
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
				console.log(item($scope));
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
		return !_.isEmpty($scope.params.searchText) || ( _.isUndefined($scope.params._filter) ? false :  $scope.params._filter == options.filters[0].value);
	};

	$scope.$watch('params', function(a,b) {
		$scope.reload(a,b);
	}, true);

	$timeout(function() {
		$scope.reload();
		(options.onInit || _.noop)($scope);
	}, 0);
};
