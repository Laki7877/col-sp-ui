/**
 * Handle admin coupon listing
 */
module.exports = function($scope, $controller, GlobalCouponService, config) {
	'ngInject';
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;

	//inherit from list ctrl
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/coupons/global',
			service: GlobalCouponService,
			item: 'Coupon',
			order: 'ExpireDate',
			id: 'CouponId',
			actions: ['View']
		}
	});
}
