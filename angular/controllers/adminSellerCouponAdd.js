module.exports = function($scope, $controller, SellerCouponService, config, Category) {
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $scope.criteria = config.DROPDOWN.COUPON_CRITERIA;
  $scope.filters = config.DROPDOWN.COUPON_SELLER_FILTER;
  $scope.discount = config.DROPDOWN.COUPON_DISCOUNT;

  //Abstract Add Ctrl
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'CouponId',
      url: '/admin/coupons/seller',
      item: 'Coupon',
      service: SellerCouponService,
      dateFields: ['StartDate', 'ExpireDate'],
      onSave: function(scope) {
        return true;
      }
    }
  });

};