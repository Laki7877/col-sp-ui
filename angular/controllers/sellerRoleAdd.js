module.exports = function($scope, $controller, SellerRoleService) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/roles',
			item: 'User Role',
			service: SellerRoleService,
			onLoad: function() {
				$scope.loading = true;
			}
		}
	});	
	$scope.selectAll = {
		AllFeatures: false,
		EditProduct: false,
		EditInformation: false
	};

	$scope.recheck = function() {
		var test = true;
		var test2 = true;
		var test3 = true;

		for (var i = 4; i < 10; i++) {
			test = test && $scope.formData.Permissions[i].check;
		}
		for (var i = 4; i < 7; i++) {
			test2 = test2 && $scope.formData.Permissions[i].check;
		}
		for (var i = 0; i < $scope.formData.Permissions.length; i++) {
			test3 = test3 && $scope.formData.Permissions[i].check;
		}

		$scope.selectAll.EditProduct = test;
		$scope.selectAll.EditInformation = test2;
		$scope.selectAll.AllFeatures = test3;
	};
	$scope.testCheck = function(min, max) {
		if($scope.formData.Permissions.length > 0) {
			var test = true;
			for(var i = min; i < max; i++) {
				test = test && $scope.formData.Permissions[i].check;
			}
			return test;
		}
		return false;
	};
	$scope.same = function(newObj, oldObj, min, max) {
		var test = true;
		for(var i = min; i <= max; i++) {
			test = test && (newObj[i].check == oldObj[i].check);
		}
		return test;
	};
	$scope.some = function(min, max) {
		var result = false;
		for(var i = min; i <= max; i++) {
			result = result || $scope.formData.Permissions[i].check;
		}
		return result;
	}
	$scope.check = function(val, min, max) {
		if(_.isNil($scope.formData.Permissions)) return;
		if($scope.formData.Permissions.length > 0) {
			for(var i = min; i <= max; i++) {
				$scope.formData.Permissions[i].check = val;
			}
		}
	};
	$scope.checkAll = function(val) {
		if(_.isNil($scope.formData.Permissions)) return;
		for(var i = 0; i < $scope.formData.Permissions.length; i++) {
			if($scope.formData.Permissions[i]) {
				$scope.formData.Permissions[i].check = val;
			}
		}
		$scope.selectAll.EditProduct = val;
		$scope.selectAll.EditInformation = val;
	};
	$scope.$watch('formData.Permissions', function(val, val2) {
		if(_.isNil(val2) && !_.isNil(val)) {
			$scope.loading = false;
			$scope.recheck();
		}
		if(!_.isNil(val2) && !_.isNil(val)) {
			$scope.selectAll.AllFeatures = $scope.testCheck(0, $scope.formData.Permissions.length);
			if(!$scope.same(val, val2, 4, 6)) {
				$scope.selectAll.EditInformation = $scope.testCheck(4, 6);
			}
			if(!$scope.same(val, val2, 4, 9)) {
				$scope.selectAll.EditProduct = $scope.testCheck(4, 9);
				$scope.selectAll.EditInformation = $scope.testCheck(4, 6);
			}
		}
	}, true);
};