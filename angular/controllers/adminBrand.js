/**
 * Handle admin brand listing page
 */
module.exports = function($scope, $controller, BrandService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/brands',
			service: BrandService,
			item: 'Brand',
			order: 'UpdatedDt',
			id: 'BrandId'
		}
	});
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};