module.exports = function($scope, $controller, GlobalCouponService, GlobalCategoryService, config, Category) {
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $scope.criteria = config.DROPDOWN.COUPON_CRITERIA;
  $scope.filters = config.DROPDOWN.COUPON_GLOBAL_FILTER;

  //Abstract Add Ctrl
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'CouponId',
      url: '/admin/coupons/global',
      item: 'Coupon',
      service: GlobalCouponService,
      dateFields: ['StartDate', 'ExpireDate'],
      onLoad: function(){
        GlobalCategoryService.list()
          .then(function(data) {
            $scope.categories = Category.transformNestedSetToUITree(data);
          });
      },
      onSave: function(scope) {
        if(scope.formData.ExpireDate < scope.formData.StartDate) {
          return true;
        }
      }
    }
  });

};