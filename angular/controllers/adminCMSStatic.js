module.exports = function($scope, $controller, CouponService, config) {
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/admin/cms/static',
      service: CouponService,
      item: 'Coupon',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: [{
        name: 'View Detail',
        fn: function(item) {
          console.log(item, 'view detail')
        }
      }],
      bulks: [],
      filters: []
    }
  });
}
