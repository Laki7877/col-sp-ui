/**
 * Handle seller coupon listing page
 */
module.exports = function($scope, $rootScope, $controller, SellerCouponService, config) {
  'ngInject';
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  // inherit from list ctrl
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/coupons',
      service: SellerCouponService,
      item: 'Coupon',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: ['View']
    }
  });
}
