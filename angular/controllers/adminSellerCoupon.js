/**
 * Handle admin seller coupon
 */
module.exports = function($scope, $controller, SellerCouponService, config) {
  'ngInject';
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/admin/coupons/seller',
      service: SellerCouponService,
      item: 'Coupon',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: ['View Only']
    }
  });
}
