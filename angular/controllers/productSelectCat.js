var angular = require('angular');

module.exports = ['$scope', 'Category', 'GlobalCategory', function($scope, Category, GlobalCategory) {
	'use strict';
	$scope.selected = {};
	$scope.columns = Category.createColumns();

	//Function to select a category
	$scope.select = Category.createSelectFunc($scope.columns, function(item) {
		$scope.selected = item;
	});

	//Get global cat from api
	GlobalCategory.getAll().then(function(data) {
		$scope.columns[0].list = Category.convertDepthArrayToNestedArray(data);
	});
}];
