var angular = require('angular');

module.exports = ['$scope', 'Category', 'GlobalCategory', function($scope, Category, GlobalCategory) {
	'use strict';
	$scope.selected = null;
	$scope.columns = Category.createColumns();

	//Function to select a category
	$scope.select = Category.createSelectFunc($scope.columns, $scope.selected);

	//Get global cat from api
	GlobalCategory.getAll().then(function(data) {
		$scope.columns[0].list = Category.convertDepthArrayToNestedArray(data);
	});
}];
