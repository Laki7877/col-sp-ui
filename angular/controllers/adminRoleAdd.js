module.exports = function($scope, $controller, AdminRoleService, util) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/admin/roles',
			item: 'Admin Role',
			service: AdminRoleService,
			onLoad: function(scope, load) {
				$scope.loading = true;
				if(load) {		
					AdminPermissionService.listAll()
						.then(function(data) {
							scope.formData.Permission = _.map(data, function(e) {
								if(_.isUndefined(_.find(scope.formData.Permission, { PermissionId: e.PermissionId }))) {
									e.check = false;
								} else {
									e.check = true;
								}
								return e;
							});
					});
				} else {				
					AdminPermissionService.listAll()
						.then(function(data) {
							scope.formData.Permission = _.map(data, function(e) {
								e.check = false;
								return e;
							});
						});
				}
			}
		}
	});
};