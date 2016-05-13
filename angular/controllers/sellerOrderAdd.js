module.exports = function($scope, $window, $filter, $controller, OrderService, util, config, $uibModal) {
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
    if($scope.merchantFleet()) {

    }
    save({ 
      InvoiceNumber: $scope.formData.InvoiceNumber,
      Carrier: $scope.formData.Carrier,
      TrackingNumber: $scope.formData.TrackingNumber
    });
  };
  //Acknowledge
  $scope.acknowledge = function() {
    save({Status: 'PE'});
  };
  $scope.merchantFleet = function() {
    return $scope.formData.ShippingType == 'Merchant Fleet';
  }
  //Ready to ship
  $scope.readyShip = function() {
    $scope.form.$setSubmitted();
    if($scope.saving) return;
    if($scope.form.$valid) {
      if($scope.formData.ShippingType == 'Merchant Fleet') {
        $uibModal.open({
            size: 'size-warning',
            templateUrl: 'order/modalReadyToShipMerchant',
            controller: function($scope, $uibModalInstance, NcAlert) {
              'ngInject';
              $scope.alert = new NcAlert();
              $scope.form = {};
              $scope.formData = {
                IsOwnCarrier: false
              };
              $scope.no = function() {
                $uibModalInstance.dismiss();
              };
              $scope.yes = function() {
                $uibModalInstance.close($scope.formData);
              }
            }
        }).result.then(function(data) {
          var o = {
           InvoiceNumber: $scope.formData.InvoiceNumber,
           Status: 'RS',
           Products: $scope.formData.Products,
           TrackingNumber: data.TrackingNumber
          };
          if(data.IsOwnCarrier) {
            o.Carrier = data.OtherCarrier;
          }
          save(o);
        })
      } else {
        util.confirm(
          'Are you ready to ship?',
          'Shipping quantity cannot be changed after this.',
          'Confirm',
          'Cancel',
          'btn-blue'
        ).result.then(function() {    
          save({
           InvoiceNumber: $scope.formData.InvoiceNumber,
           Status: 'RS',
           Products: $scope.formData.Products
          });
        });
      }
    } else {
      $scope.alert.error(util.saveAlertError());
    }
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
  $scope.getRedText = function(product) {
    return { 'color-red' : product.Quantity != product.ShipQuantity && $scope.getState() > 2 };
  };
  $scope.getPrice = function(product) {
    if($scope.getState() >= 2) {
      //Use ShipQty
      return product.UnitPrice * product.ShipQuantity;
    } else {
      //Use Qty
      return product.UnitPrice * product.Quantity;
    }
  };
  $scope.getSubtotal = function() {
    var result = 0;
    _.forEach($scope.formData.Products, function(i) {
      result += $scope.getPrice(i);
    })
    return result;
  };
  $scope.getTotal = function() {
    return $scope.getSubtotal() - $scope.getDiscount();
  };
  $scope.getDiscount = function() {
    return $scope.formData.OrdDiscAmt;
  };
  $scope.getTrackingNumber = function() {
    return $scope.formData.TrackingNumber ? $scope.formData.TrackingNumber : 'n/a';
  };
  $scope.getState = function() {
    return $filter('mapDropdown')($scope.formData.Status, $scope.status, 'state');
  };
  $scope.getInvoiceState = function() {
    return !( $scope.formData.ShippingType == 'BU Dropship' || $scope.formData.ShippingType == 'COL Fulfillment' );
  };
};