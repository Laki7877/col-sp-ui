module.exports = function($scope, $controller, Product, config, util) {
	'ngInject';
    $scope.asStatus = Product.getStatus;
	$controller('AbstractListCtrl', {
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
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait for Approval", value: 'WaitForApproval'},
				{ name: "Not Approved", value: 'NotApproved'}
			]
		}
	});

    $scope.toggleEye = function(row){
        Product.visible([{
            ProductId: row.ProductId,
            Visibility: row.Visibility
        }], function(d){
        });
    }
}