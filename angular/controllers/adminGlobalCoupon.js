module.exports = function($scope, $controller, GlobalCouponService, config) {
  'ngInject';
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
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