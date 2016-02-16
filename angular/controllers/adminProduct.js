module.exports = function($scope, $controller, Product, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/products',
			service: Product,
			item: 'Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: ['View', 'Delete'],
			bulks: ['Delete'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait For Approved", value: 'WaitForApproved'},
				{ name: "Draft", value: 'Draft'}
			]
		}
	});

	$scope.advanceSearch = true;

	$scope.onSearch = function() {
		_.unset($scope.params, ['AdvanceSearch']);
	};
	$scope.onAdvanceSearch = function() {
		_.unset($scope.params, ['searchText']);
	};
}