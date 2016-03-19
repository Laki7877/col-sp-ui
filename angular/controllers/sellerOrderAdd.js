module.exports = function($scope, $filter, $controller, OrderService, util, config) {
  $scope.status = config.ORDER_STATUS;
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
  var validate = function() {
    $scope.form.$setSubmitted();
    if($scope.saving) return false;
    if($scope.form.$invalid) return false;
    return true;
  };
  //Acknowledge
  $scope.acknowledge = function() {
    if(!validate()) return;
    $scope.saving = true;
    OrderService.update($scope.formData.OrderId, {
     Status: 'PE'
    })
      .then(function(data) {
        $scope.formData = OrderService.deserialize(data);
      }, function(err) {
        $scope.alert(common.getError(err));
      })
      .finally(function() {
        $scope.saving = false;
      });
  };
  $scope.readyShip = function() {
    if(!validate()) return;
    $scope.saving = true;
    OrderService.update($scope.formData.OrderId, {
     InvoiceNumber: $scope.formData.InvoiceNumber,
     Status: 'RS'
    })
      .then(function(data) {
        $scope.formData = OrderService.deserialize(data);
      }, function(err) {
        $scope.alert(common.getError(err));
      })
      .finally(function() {
        $scope.saving = false;
      });
  };
  $scope.printLabel = function() {
    console.log('what!?');
  };
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
  $scope.getTrackingNumber = function() {
    return $scope.formData.TrackingNumber ? $scope.formData.TrackingNumber : 'n/a';
  };
  //Getter
  $scope.getSubtotal = function() {
    return $scope.formData.TotalAmt;
  };
  $scope.getTotal = function() {
    return $scope.formData.TotalAmt - $scope.formData.OrdDiscAmt;
  }
  $scope.getState = function() {
    return $filter('mapDropdown')($scope.formData.Status, $scope.status, 'state');
  };
};