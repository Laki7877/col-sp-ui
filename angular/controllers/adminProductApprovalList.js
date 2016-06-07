/**
 * Handle admin product approval listing page
 */
module.exports = function($scope, $controller, Product, config, util) {
	'ngInject';
    //getter for product status
    $scope.asStatus = Product.getStatus;

    //inherit list ctrl
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
				//force approve action
				util.bulkTemplate('Force Approve', Product.approve, 'ProductId', 'Product', {
					btnConfirm: 'Approve',
					btnClass: 'btn-green'
				}),
				//reject action
				util.bulkTemplate('Reject', Product.reject, 'ProductId', 'Product', {
					btnConfirm: 'Reject',
					btnClass: 'btn-red'
				}),
			],
			filters: [
				{ name: "Approved", value: 'Approved'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait for Approval", value: 'WaitForApproval'}
			]
		}
	});
	//dropdown filter
	$scope.filter2Options = [
		{
			name: 'None',
			value: 'None'
		},
		{
			name: 'Ready for Action',
			value: 'ReadyForAction'
		},
		{
			name: 'Wait for Information',
			value: 'Information'
		},
		{
			name: 'Wait for Image',
			value: 'Image'
		},
		{
			name: 'Wait for Category',
			value: 'Category'
		},
		{
			name: 'Wait for Variation',
			value: 'Variation'
		},
		{
			name: 'Wait for More',
			value: 'More'
		}
	];
	$scope.params._filter = $scope.filterOptions[2].value;
	$scope.params._filter2 = 'None';
};
