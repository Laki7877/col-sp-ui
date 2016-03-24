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
			searchText: search
		})
		.then(function(data) {
			$scope.products = data.data;
		});
	};
	$scope.getChildProducts = function(search) {
		Product.list({
			searchText: search,
			_limit: 8,
		})
		.then(function(data) {
			$scope.childProducts = data.data;
		});
	};

	$scope.$watch('formData.MasterProduct', function(newVal) {
		if(!_.isNil(newVal)) {
			_.pullAllBy($scope.formData.ChildProducts, [$scope.formData.MasterProduct], 'ProductId');
		}
	});
};