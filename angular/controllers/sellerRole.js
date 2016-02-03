module.exports = function($scope, $controller, SellerRoleService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/roles',
			service: SellerRoleService,
			item: 'Role',
			order: 'UpdatedDt',
			id: 'RoleId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};