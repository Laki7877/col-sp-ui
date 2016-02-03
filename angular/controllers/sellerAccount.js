module.exports = function($scope, $controller, SellerAccountService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/accounts',
			service: SellerAccountService,
			item: 'Account',
			order: 'UpdatedDt',
			id: 'UserId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};