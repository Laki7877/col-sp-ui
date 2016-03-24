module.exports = function($scope, $controller, Product, config, util) {
	'ngInject';
    $scope.asStatus = Product.getStatus;
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/approve',
			service: Product,
			item: 'Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: ['View Only'],
			bulks: [
				util.bulkTemplate('Force Approve', Product.approve, 'ProductId', 'Product', {
					btnConfirm: 'Approve',
					btnClass: 'btn-green'
				}),
				util.bulkTemplate('Reject', Product.reject, 'ProductId', 'Product', {
					btnConfirm: 'Reject',
					btnClass: 'btn-red'
				}),
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
	$scope.filter2Options = [
		{
			name: 'None',
			value: 'None'
		},
		{
			name: 'Information',
			value: 'Information'
		},
		{
			name: 'Image',
			value: 'Image'
		},
		{
			name: 'Variation',
			value: 'Variation'
		},
		{
			name: 'More',
			value: 'More'
		},
		{
			name: 'Ready for Action',
			value: 'ReadyForAction'
		}
	];
	$scope.params._filter = $scope.filterOptions[4].value;
	$scope.params._filter2 = 'None';
};
