module.exports = function($scope, $controller, SellerRoleService) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'GroupId',
			url: '/roles',
			item: 'Role',
			service: SellerRoleService,
			init: function(scope) {
				console.log('hi');
			}
		}
	});
};