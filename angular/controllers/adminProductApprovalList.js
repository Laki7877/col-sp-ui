module.exports = function($scope, $controller, Product, config, util) {
	'ngInject';
    $scope.asStatus = Product.getStatus;
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/ProductStages',
			service: Product,
			item: 'Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: [{
                name: 'View Detail',
                fn: function(item){

                }
            }],
			bulks: [
				util.bulkTemplate('Approve', Product.approve, 'ProductId', 'Product'),
				util.bulkTemplate('Reject', Product.reject, 'ProductId', 'Product')
			],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Draft", value: 'Draft'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait for Approval", value: 'WaitForApproval'}
			]
		}
	});

	$scope.params._filter = $scope.filterOptions[4].value;

	$scope.$watch('params._filter', function(val) {
		console.log(val);
	})
};