module.exports = function($scope, $controller, BrandService, config) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/Brands',
			service: BrandService,
			item: 'Brand',
			order: 'UpdatedDt',
			id: 'BrandId'
		}
	});
}
