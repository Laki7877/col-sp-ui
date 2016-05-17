module.exports = function($scope, $controller, SellerRoleService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/roles',
			service: SellerRoleService,
			item: 'User Role',
			order: 'UpdatedDt',
			id: 'GroupId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};