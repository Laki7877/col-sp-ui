/**
 * Handle admin seller account
 */
module.exports = function($scope, $controller, SellerAccountService, config) {
	'ngInject';
	$scope.yesNoDropdown = config.DROPDOWN.YES_NO_DROPDOWN;
	// get shop owner from list
	$scope.getShopOwner = function(list) {
		var i = _.findIndex(list, function(e) { return e == 'Shop Owner' });
		if(i >= 0) {
			return $scope.yesNoDropdown[1].name;
		} else {
			return $scope.yesNoDropdown[0].name;
		}
	};

	// get shop list string
	$scope.getShop = function(shops) {
		if(shops.length > 0) {
			return _.join(shops, [', ']);
		}
		return 'n/a';
	};

	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/sellers',
			service: SellerAccountService,
			item: 'Seller Account',
			order: 'UpdatedDt',
			id: 'UserId',
			actions: ['Delete'],
			bulks: ['Delete'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Is Shop Owner", value: 'ShopOwner'},
				{ name: "Is Not Shop Owner", value: 'NotShopOwner'},
				{ name: "Has No Shop", value: 'NoShop'}
			]
		}
	});
}