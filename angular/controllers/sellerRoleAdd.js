module.exports = function($scope, $controller, AdminRoleService) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/roles',
			item: 'Role',
			service: AdminRoleService,
			init: function(scope) {}
		}
	});
};