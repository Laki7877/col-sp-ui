module.exports = function($scope, $controller, CouponService, config) {
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/admin/coupons/admin',
      service: CouponService,
      item: 'Coupon',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: [{
        name: 'View Detail',
        fn: function(item) {
        }
      }],
      bulks: [],
      filters: []
    }
  });
}
