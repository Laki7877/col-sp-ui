module.exports = function($scope, $controller, SellerCouponService, LocalCategoryService, Category, config, Category) {
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $scope.criteria = config.DROPDOWN.COUPON_CRITERIA;
  $scope.filters = config.DROPDOWN.COUPON_SELLER_FILTER;

  //Abstract Add Ctrl
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'CouponId',
      url: '/coupons',
      item: 'Coupon',
      service: SellerCouponService,
      dateFields: ['StartDate', 'ExpireDate'],
      onLoad: function() {
        LocalCategoryService.list()
          .then(function(data) {
            $scope.categories = Category.transformNestedSetToUITree(data);
          });
      },
      onSave: function(scope) {
      }
    }
  });

};