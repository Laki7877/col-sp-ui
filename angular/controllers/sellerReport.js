module.exports = function($scope, $controller, SellerCouponService, config) {
  'ngInject';
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $controller('AbstractListCtrl', {
    $scope: $scope,
    options: {
      url: '/reports',
      service: SellerCouponService,
      item: 'Report',
      order: 'ExpireDate',
      id: 'CouponId',
      actions: ['View']
    }
  });
}
