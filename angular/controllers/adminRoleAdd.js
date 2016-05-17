module.exports = function($scope, $controller, AdminRoleService) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/admin/roles',
			item: 'Admin Role',
			service: AdminRoleService,
			init: function(scope) {}
		}
	});
};