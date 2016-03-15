module.exports = function($rootScope, $scope, $controller, Shop, ImageService, NcAlert, config, storage) {
  $scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'ShopId',
      success: 'Successfully Saved.'
    }
  })
};
