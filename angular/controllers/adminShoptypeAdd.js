module.exports = function($scope, $controller, AdminShoptypeService, ShopPermissionService, PermissionService, util) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopTypeId',
			url: '/admin/shoptypes',
			item: 'Shop Type',
			service: AdminShoptypeService,
			onLoad: function(scope, load) {
				scope.loading = true;
				ShopPermissionService.listAll()
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
	$scope.group = ['Dashboard', 'Products', 'Promotion', 'Report', 'Local Category', 'Local Brand', 'Home Template', 'CMS'];
	$scope.checkAll = function(val) {
		_.forOwn($scope.formData.Permissions, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				e.check = val;
			});
		});
	};
};