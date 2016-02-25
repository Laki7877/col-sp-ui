module.exports = function($scope, $controller, SellerRoleService) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/roles',
			item: 'User Role',
			service: SellerRoleService
		}
	});	
	$scope.selectAll = {
		AllFeatures: false,
		EditProduct: false,
		EditInformation: false
	};
	$scope.test = function(min, max) {
		if($scope.formData.Permission.length > 0) {
			var test = true;
			for(var i = min; i < max; i++) {
				test = test && $scope.formData.Permission[i].check;
			}
			return test;
		}
		return false;
	};
	$scope.recheck = function() {
		$scope.selectAll.AllFeatures = $scope.test(0, $scope.formData.Permission.length);
		$scope.selectAll.EditProduct = $scope.test(3, 10);
		$scope.selectAll.EditInformation = $scope.test(3, 6);
	};

	$scope.checkAll = function(val) {
		if(_.isNil($scope.formData.Permission)) return;
		for(var i = 0; i < $scope.formData.Permission.length; i++) {
			if($scope.formData.Permission[i]) {
				$scope.formData.Permission[i].check = val;
			}
		}
		$scope.selectAll.EditProduct = val;
		$scope.selectAll.EditInformation = val;
	};
	$scope.$watch('selectAll.EditProduct', function() {		
		if($scope.selectAll.EditProduct == false) {
			$scope.checkAll(false, 3, 10);
		}
	});
	$scope.$watch('selectAll.EditInformation', function() {		
		if($scope.selectAll.EditInformation == false) {
			$scope.checkAll(false, 3, 6);
		}
	});
	$scope.$watch('formData.Permission', function(val, val2) {
		if(!_.isNil(val)) {
			$scope.recheck();
		}
	}, true);
};