module.exports = function($scope, $controller, SellerCouponService, config) {
  'ngInject';
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/admin/coupons/seller',
      service: SellerCouponService,
      item: 'Coupon',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: ['View']
    }
  });
}
