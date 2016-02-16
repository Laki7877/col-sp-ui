module.exports = function($scope, $controller, Product, config) {
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
                    console.log(item, 'view detail')
                }
            }],
			bulks: [],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait for Approval", value: 'WaitForApproval'},
				{ name: "Not Approved", value: 'NotApproved'}
			]
		}
	});
	$scope.yesNoDropdown = config.DROPDOWN.YES_NO_DROPDOWN;
	$scope.dataTypeDropdown = config.DROPDOWN.DATA_TYPE_DROPDOWN;
    $scope.toggleEye = function(row){
        Product.visible([{
            ProductId: row.ProductId,
            Visibility: row.Visibility
        }], function(d){
           console.log(d); 
        });
    }
}