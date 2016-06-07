/**
 * Handle admin shop type listing
 */
module.exports = function($scope, $controller, AdminShoptypeService) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/shoptypes',
			service: AdminShoptypeService,
			item: 'Shop Type',
			order: 'UpdatedDt',
			id: 'ShopTypeId'
		}
	});
};