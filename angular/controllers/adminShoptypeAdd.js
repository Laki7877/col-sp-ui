module.exports = function($scope, $controller, AdminShoptypeService, ShopPermissionService, PermissionService) {
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

				}).finally(function() {
					scope.loading = false;
				});
			},
			onSave: function(scope) {
				scope.formData.Permission = PermissionService.serialize(scope.formData.Permissions);
			},
			onAfterSave: function(scope) {
				scope.formData.Permissions = PermissionService.deserialize(scope.formData.Permission, scope.permissions); 
			}
		}
	});
};