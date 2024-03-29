/**
 * Handle admin coupon adding page
 */
module.exports = function($scope, $controller, GlobalCouponService, GlobalCategoryService, config, Category) {
  'ngInject';
  //dropdowns
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $scope.criteria = config.DROPDOWN.COUPON_CRITERIA;
  $scope.filters = config.DROPDOWN.COUPON_GLOBAL_FILTER;
  $scope.discount = config.DROPDOWN.COUPON_DISCOUNT;

  //Abstract Add Ctrl
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'CouponId',
      url: '/admin/coupons/global',
      item: 'Global Coupon',
      service: GlobalCouponService,
      dateFields: ['StartDate', 'ExpireDate'],
      onLoad: function() {
        //onload, get global cat list
        GlobalCategoryService.list()
          .then(function(data) {
            $scope.categories = Category.transformNestedSetToUITree(data);
          });
      },
      onSave: function(scope) {
        //check validation
        if(scope.formData.ExpireDate < scope.formData.StartDate) {
          return true;
        }
      }
    }
  });

};