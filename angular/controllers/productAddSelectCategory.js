/**
 * Handle selecting global for product
 */
module.exports = ['$scope', 'Category', 'GlobalCategory', function($scope, Category, GlobalCategory) {
	'use strict';
	$scope.selected = null;
	$scope.columns = [];
	$scope.loading = true;
	//validate if scope is selected
	$scope.validate = function(e){
		if(null === $scope.selected){
			e.preventDefault();
		}
	};

	//Get global cat from api
	GlobalCategory.getAll().then(function(data) {
		$scope.loading = false;
		$scope.columns = Category.createColumns(null, GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data)));
		$scope.select = Category.createSelectFunc($scope.columns, function(item) {
			$scope.selected = item;
		});
	});
}];
