module.exports = function($scope, $controller, AdminAccountService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/accounts',
			service: AdminAccountService,
			item: 'Admin Account',
			order: 'UpdatedDt',
			id: 'UserId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};