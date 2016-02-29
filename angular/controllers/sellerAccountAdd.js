module.exports = function($scope, $controller, SellerAccountService, SellerRoleService) {
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'UserId',
			url: '/accounts',
			item: 'User Account',
			service: SellerAccountService,
			init: function(scope) {
				//Get all available roles
				scope.roles = [];
				SellerRoleService.listAll()
					.then(function(data) {
						scope.roles = _.map(data, function(e) {
							//Pick only necessary property
							return _.pick(e, ['GroupId', 'GroupNameEn']);
						});
					});
			}
		}
	});
}
