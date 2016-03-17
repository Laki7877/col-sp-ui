module.exports = function($scope, $controller, BrandService, Product, AdminMasterProductService, config, util, common) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ProductId',
			url: '/admin/masters',
			item: 'Master Product',
			service: AdminMasterProductService
		}
	});
	$scope.childProducts = [];
	$scope.products = [];
	$scope.brands = [];
	$scope.getProducts = function(search) {
		var brands = !_.isEmpty($scope.formData.FilterBy) ? [$scope.formData.FilterBy] : [];
		Product.advanceList({
			searchText: search,
			Brands: brands
		})
		.then(function(data) {
			$scope.products = data.data;
		});
	};
	$scope.getBrands = function(search) {
		BrandService.list({
			searchText: search
		})
		.then(function(data) {
			$scope.brands = data.data;
		});
	};
	$scope.getChildProducts = function(search) {
		AdminMasterProductService.list({
			searchText: search,
			_filter: 'ChildProduct',
			_limit: 8
		})
		.then(function(data) {
			$scope.childProducts = data.data;
		});
	};
};