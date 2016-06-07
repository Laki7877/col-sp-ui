/**
 * Handle admin account adding page
 */
module.exports = function($scope, $controller, AdminAccountService, AdminRoleService, Credential) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'UserId',
			url: '/admin/accounts',
			item: 'Admin Account',
			service: AdminAccountService,
			init: function(scope) {		
				//Get all available roles
				AdminRoleService.listAll()
					.then(function(data) {
						scope.roles = _.map(data, function(e) {
							//Pick only necessary property
							return _.pick(e, ['GroupId', 'GroupNameEn']);
						});
					});
			}
		}
	});
   
};