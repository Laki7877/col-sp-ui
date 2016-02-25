module.exports = function($scope, $controller, AdminShopService, AdminShoptypeService, config, Credential, $rootScope, $window) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopId',
			url: '/admin/shops',
			item: 'Shop Account',
			successItem: 'Admin Shop Account',
			service: AdminShopService,
			init: function(scope) {
				AdminShoptypeService.listAll()	
					.then(function(data) {
						scope.shoptypes = data;
					});
			}
		}
	});

	$scope.loginAs = function(user){
		Credential.loginAs(user).then(function(){
			$window.location.href = "/products";
		}, function(err){
            
        });
	};
	$scope.shopGroupDropdown = config.SHOP_GROUP;
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};
