module.exports = function($scope, $controller, AdminShopService, AdminShoptypeService, config, Credential) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopId',
			url: '/admin/shops',
			item: 'Shop Account',
			service: AdminShopService,
			init: function(scope) {
				AdminShoptypeService.listAll()	
					.then(function(data) {
						scope.shoptypes = data;
					});
			}
		}
	});

	$scope.loginAs = function(uid){
		Credential.loginAs(uid).then(function(){
			alert("You have been logged in as" + uid);
		});
	};

	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};
