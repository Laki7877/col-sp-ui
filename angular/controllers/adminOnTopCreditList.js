module.exports = function($scope, $controller, OnTopCredit, config) {
	'ngInject';
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/ontopcredit',
			service: OnTopCredit,
			item: 'OnTopCredit',
			order: 'UpdateDate',
			id: 'OnTopCreditCardId',
			actions: ['View', 'Delete'],
			bulks: ['Delete', 'Show', 'Hide'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Not Approved", value: 'NotApproved'},
				{ name: "Wait For Approval", value: 'WaitForApproval'},
				{ name: "Draft", value: 'Draft'}
			]
		}
	});
	$scope.statusDropdown = config.PRODUCT_STATUS;
};