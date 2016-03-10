module.exports = function($scope, $controller, $uibModal, BrandService, config) {
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
	$scope.open = function(item) {
		
	};
}
