module.exports = function($scope, $window, $filter, $controller, OrderService, util, config) {
  $scope.status = config.ORDER_STATUS;
  $scope.addressIter = [1,2,3,4]; //Amount of AddressX (ie, Address1, Address2)
  //Abstract Add Ctrl
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'OrderId',
      url: '/orders',
      item: 'Order',
      service: OrderService
    }
  });
  //Generic save fn
  var save = function(form) {
    $scope.form.$setSubmitted();
    if($scope.saving) return;
    if($scope.form.$valid) {
      $scope.alert.close();
      $scope.saving = true;
      OrderService.update($scope.formData.OrderId, form)
        .then(function(data) {
          $scope.formData = OrderService.deserialize(data);
          console.log($scope.formData);
          $scope.alert.success(util.saveAlertSuccess('Order', $scope.url));
          $scope.form.$setPristine(true);
        }, function(err) {
          $scope.alert(common.getError(err));
        })
        .finally(function() {
          $scope.saving = false;
        });
      } else {
          $scope.alert.error(util.saveAlertError());
      }
  };
  //Override save
  $scope.save = function() {
    save({ InvoiceNumber: $scope.formData.InvoiceNumber });
  };
  //Acknowledge
  $scope.acknowledge = function() {
    save({Status: 'PE'});
  };
  //Ready to ship
  $scope.readyShip = function() {
    save({
     InvoiceNumber: $scope.formData.InvoiceNumber,
     Status: 'RS'
    })
  };
  //Cancel order
  $scope.cancelOrder = function() {
    util.confirm('Cancel Order', 'Are you sure you want to cancel this order?', 'Confirm', 'Cancel', 'btn-red').result.then(function() {
        $scope.saving = true;
        OrderService.update($scope.formData.OrderId, {
          Status: 'CA'
        })
        .then(function(data) {
          $scope.formData = OrderService.deserialize(data);
        }, function(err) {
          $scope.alert(common.getError(err));
        })
        .finally(function() {
          $scope.saving = false;
        });
    });
  };
  //Validate quantity
  $scope.checkQuantity = function(product) {
    if(_.isUndefined(product.ShipQuantity)) {
      product.ShipQuantity = product.Quantity;
    }
  };
  //Getter
  $scope.getTrackingNumber = function() {
    return $scope.formData.TrackingNumber ? $scope.formData.TrackingNumber : 'n/a';
  };
  $scope.getState = function() {
    return $filter('mapDropdown')($scope.formData.Status, $scope.status, 'state');
  };
};