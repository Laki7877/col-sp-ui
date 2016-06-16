/**
 * Handle seller account adding pages
 */
module.exports = function($scope, $controller, BrandService, SellerAccountService, SellerRoleService) {
	'ngInject';
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

	// selectable brands
	$scope.brands = [];

	// shop owner from groups
	$scope.getShopOwner = function(e) {
		if(!_.isNil(e)) {
			return e.GroupNameEn == 'Shop Owner';
		} else {
			return false;
		}
	};
	// reload brands from search text
	$scope.getBrands = function(search) {
		BrandService.list({
			_limit: 16,
			searchText: search
		})
		.then(function(data) {
			$scope.brands = data.data;
		});
	};
}
