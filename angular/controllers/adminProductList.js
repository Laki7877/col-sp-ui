module.exports = function($scope, $controller, Product, config) {
	'ngInject';
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/products',
			service: Product,
			item: 'Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: ['View', 'Delete'],
			bulks: ['Delete', 'Show', 'Hide'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait For Approved", value: 'WaitForApproved'},
				{ name: "Draft", value: 'Draft'}
			]
		}
	});
	$scope.statusDropdown = config.PRODUCT_STATUS;
};