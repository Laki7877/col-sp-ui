var angular = require('angular');

module.exports = ['$scope', 'config', 'GlobalCategory', function($scope, config, GlobalCategory) {
	'use strict';
	$scope.selected = null;
	$scope.columns = [];
	$scope.data = [];

	//Procedurally generated all columns
	for (var i = 0; i < config.MAX_GLOBAL_CAT_COLUMN; i++) {
		$scope.columns.push({
			active: -1,
			list: []
		})
	};

	//Get global cat from api
	GlobalCategory.getAll().then(function(result) {
		$scope.data = create(result);
		$scope.columns[0].list = $scope.data;
	});

	//Select a category (for ng-click)
	$scope.select = function(item, indx, parentIndx) {
		$scope.columns[parentIndx].active = indx;

		for (var i = parentIndx+1; i < $scope.columns.length; i++) {
			$scope.columns[i].active = -1;
			$scope.columns[i].list = [];
		};
		
		if (parentIndx+1 < $scope.columns.length) {
			$scope.columns[parentIndx+1].list = item.children || [];
			$scope.columns[parentIndx+1].active = -1;
		}

		if (angular.isUndefined(item.children)) {
			$scope.selected = item.CategoryAbbreviation;
		} else {
			$scope.selected = null;
		}
	};

	//Create nested object from raw data
	var create = function(data) {
		var array = [];
		angular.forEach(data, function(item) {
			insert(item.Depth, item, array);
		});
		return array;
	};
	//Internal insert to create object
	var insert = function(depth, obj, array) {
		var parent = depth - 1;
		var ptr = array;
		for (var i = 0; i < parent; i++) {
			ptr = angular.isUndefined(ptr[ptr.length - 1].children) ? (ptr[ptr.length-1].children = []) : ptr[ptr.length-1].children;
		}

		ptr.push(obj);
	};

}];