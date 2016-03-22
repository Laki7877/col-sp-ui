module.exports = function($scope, $controller, Product) {
	'ngInject';
	$controller('AbstractPendingProductGroupCtrl', {
		$scope: $scope,
		options: {}
	});

	$scope.create = function(){
		Product.savePendingProduct($scope.formData);
	};
}
