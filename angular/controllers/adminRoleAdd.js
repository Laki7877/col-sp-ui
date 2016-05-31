module.exports = function($scope, $controller, AdminRoleService, AdminPermissionService, PermissionService, util) {
	'ngInject';
	//Inherit from abstract ctrl
	$scope.obj = {};
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/admin/roles',
			item: 'Admin Role',
			service: AdminRoleService,
			onLoad: function(scope, load) {
				scope.loading = true;
				AdminPermissionService.listAll()
					.then(function(data) {
					scope.permissions = data;
					if(load) {		
						scope.formData.Permissions = PermissionService.deserialize(scope.formData.Permission, scope.permissions);
					} else {				
						scope.formData.Permissions = PermissionService.generate(scope.permissions);
					}

					$scope.obj.selectAll = true;
					_.forOwn($scope.formData.Permissions, function(v,k) {
						util.traverse(v, 'Children', function(e) {
							$scope.obj.selectAll = $scope.obj.selectAll && e.check;
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
				$scope.obj.selectAll = true;
				_.forOwn($scope.formData.Permissions, function(v,k) {
					util.traverse(v, 'Children', function(e) {
						$scope.obj.selectAll = $scope.obj.selectAll && e.check;
					});
				});
			}
		}
	});
	var cj = require('circular-json');

	$scope.$watch(function() {
		return cj.stringify($scope.formData);
	}, function() {
		$scope.obj.selectAll = true;
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				$scope.obj.selectAll = $scope.obj.selectAll && e.check;
			});
		});		
	});
	$scope.group = ['Products', 'Accounts', 'Promotions', 'Others', 'CMS', 'Report'];
	$scope.checkAll = function(val) {
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				e.check = val;
			});
		});
	};
};