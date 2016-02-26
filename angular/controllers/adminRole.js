module.exports = function($scope, $controller, AdminRoleService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/roles',
			service: AdminRoleService,
			item: 'Role',
			order: 'UpdatedDt',
			id: 'GroupId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
}