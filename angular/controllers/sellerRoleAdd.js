module.exports = function($scope, $controller, SellerRoleService, SellerPermissionService, PermissionService, util) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/roles',
		item: 'User Role',
			service: SellerRoleService,
			onLoad: function(scope, load) {
				scope.loading = true;
				SellerPermissionService.listAll()
					.then(function(data) {
					scope.permissions = data;
					if(load) {		
						scope.formData.Permissions = PermissionService.deserialize(scope.formData.Permission, scope.permissions);
					} else {				
						scope.formData.Permissions = PermissionService.generate(scope.permissions);
					}

					$scope.selectAll = true;
					_.forOwn($scope.formData.Permissions, function(v,k) {
						util.traverse(v, 'Children', function(e) {
							$scope.selectAll = $scope.selectAll && e.check;
						});
					});

				}).finally(function() {
					scope.loading = false;
				});
			},
			onSave: function(scope) {
				scope.formData.Permission = PermissionService.serialize(scope.formData.Permissions);
			},
			onAfterSave: function(scope) {
				scope.formData.Permissions = PermissionService.deserialize(scope.formData.Permission, scope.permissions);
				$scope.selectAll = true;
				_.forOwn($scope.formData.Permissions, function(v,k) {
					util.traverse(v, 'Children', function(e) {
						$scope.selectAll = $scope.selectAll && e.check;
					});
				});
			}
		}
	});
	$scope.group = ['Dashboard', 'Orders', 'Products', 'Inventory', 'Promotions', 'Shop Setting', 'Account', 'Report', 'CMS'];
	$scope.checkAll = function(val) {
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				e.check = val;
			});
		});
	};
	$scope.$watch('formData.Permissions', function(e) {		
		$scope.selectAll = true;
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				$scope.selectAll = $scope.selectAll && e.check;
			});
		});
	}, true);
};