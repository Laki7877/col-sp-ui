/**
 * Handle admin master product adding page
 */
module.exports = function($scope, $controller, BrandService, $window, Product, AdminMasterProductService, config, util, common) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ProductId',
			url: '/admin/masters',
			item: 'Master Product',
			service: AdminMasterProductService,
			freeToLeave: true,
			onAfterSave: function(){
				$window.location.href = '/admin/masters?success=true';
			}
		}
	});
	
	//containers
	$scope.childProducts = [];
	$scope.products = [];
	$scope.brands = [];
	
	//get list of products from search var
	$scope.getProducts = function(search) {
		//Filter by brand list
		var brands = !_.isEmpty($scope.formData.FilterBy) ? [$scope.formData.FilterBy] : [];
		return AdminMasterProductService.customList({
			searchText: search,
			_limit: 8,
			_order: 'Pid',
			_offset: 0,
			_direction: 'asc'
		})
		.then(function(data) {
			return $scope.products = data.data.map(function(X){
				X.CustomName = X.ProductNameEn + " (" + X.Pid + ")";
				return X;
			});
		});
	};
	
	// get child products from search
	$scope.getChildProducts = function(search) {
		return AdminMasterProductService.customList({
			searchText: search,
			_limit: 8,
			_order: 'Pid',
			_offset: 0,
			_direction: 'asc'
		})
		.then(function(data) {
			return $scope.childProducts = data.data.map(function(X){
				X.CustomName = X.ProductNameEn + " (" + X.Pid + ")";
				return X;
			});
		});
	};
	// remove master products from child list
	$scope.$watch('formData.MasterProduct', function(newVal) {
		if(!_.isNil(newVal)) {
			_.pullAllBy($scope.formData.ChildProducts, [$scope.formData.MasterProduct], 'ProductId');
		}
	});
};