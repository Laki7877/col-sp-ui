/**
 * Handle admin shop account
 */
module.exports = function($scope, $controller, AdminShopService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/shops',
			service: AdminShopService,
			item: 'Shop Account',
			order: 'UpdatedDt',
			id: 'ShopId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};