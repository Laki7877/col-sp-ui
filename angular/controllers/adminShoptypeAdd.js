module.exports = function($scope, $controller, AdminShoptypeService) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopTypeId',
			url: '/admin/shoptypes',
			item: 'Shop Type',
			successItem: 'Admin Shop Type',
			service: AdminShoptypeService,
			init: function(scope) {}
		}
	});
	$scope.selectAll = { //For checkall box
		ShopTypePermission: false,
		AppearanceSetting: false
	};

	$scope.recheck = function() {
		var test = true;
		var test2 = true;

		for (var i = 0; i < 3; i++) {
			test = test && $scope.formData.Permission[i].check;
		}
		for (var i = 4; i < 8; i++) {
			test2 = test2 && $scope.formData.Permission[i].check;
		}

		$scope.selectAll.ShopTypePermission = test;
		$scope.selectAll.AppearanceSetting = test2;
	};

	$scope.checkAll = function(val, id) {
		if(id == 'ShopTypePermission') {
			for (var i = 0; i < 3; i++) {
				$scope.formData.Permission[i].check = val;
			}
		}
		if(id == 'AppearanceSetting') {
			for (var i = 4; i < 8; i++) {
				$scope.formData.Permission[i].check = val;
			}
		}
	};

	$scope.$watch('formData.Permission', function(val, val2) {
		if($scope.formData.Permission && $scope.formData.Permission.length == 8) {
			$scope.recheck();

			if($scope.formData.Permission[3].check == false) {
				$scope.checkAll(false, 'AppearanceSetting');
			}
		}
	}, true);
};