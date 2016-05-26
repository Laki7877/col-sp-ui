module.exports = function($scope, $rootScope, $controller, SellerCouponService, config) {
  'ngInject';
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $scope.manageable = $rootScope.permit(53);
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
