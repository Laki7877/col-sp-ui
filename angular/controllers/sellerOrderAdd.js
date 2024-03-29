/**
 * Handle seller account adding page
 */
module.exports = function($scope, $window, $filter, $controller, OrderService, util, config, $uibModal) {
  'ngInject';
  $scope.status = config.ORDER_STATUS;
  $scope.addressIter = [1,2,3,4]; //Amount of AddressX (ie, Address1, Address2)
  //Abstract Add Ctrl
  $controller('AbstractAddCtrl', {
    $scope: $scope,
    options: {
      id: 'OrderId',
      url: '/orders',
      item: 'Order',
      service: OrderService,
      onLoad: function() {
        OrderService.getOrderCarrier().then(function(data) {
          $scope.carriers = data;
        });
      }
    }
  });
  //Generic save fn
  var save = function(form) {
    $scope.form.$setSubmitted();
    if($scope.saving) return;
    if($scope.form.$valid) {
      $scope.alert.close();
      $scope.saving = true;

      //saving
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
    save({ 
      InvoiceNumber: $scope.formData.InvoiceNumber,
      Carrier: $scope.formData.Carrier,
      TrackingNumber: $scope.formData.TrackingNumber
    });
  };
  //Deliver button
  $scope.delivered = function() {
    save({Status: 'Delivered'});
  };
  //Acknowledge btn
  $scope.acknowledge = function() {
    save({Status: 'Processing'});
  };
  //Is merchantfleet
  $scope.merchantFleet = function() {
    return $scope.formData.ShippingType == 'FullfillAndDelvieryByMerchant';
  };
  //Is BUFullfillAndDeliveryBySup
  $scope.BUFullfillAndDeliveryBySup = function() {
    return $scope.formData.ShippingType == 'BUFullfillAndDeliveryBySup';
  };
  //Ready to ship
  $scope.readyShip = function() {
    $scope.form.$setSubmitted();
    if($scope.saving) return;
    //validate form data
    if($scope.form.$valid) {
      if($scope.formData.ShippingType == 'FullfillAndDelvieryByMerchant') {
        //prompt warning on ready-to-ship
        $uibModal.open({
            size: 'size-warning',
            templateUrl: 'order/modalReadyToShipMerchant',
            controller: function($scope, $uibModalInstance, NcAlert, carriers) {
              'ngInject';
              $scope.carriers = carriers;
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
            },
            resolve: {
              carriers: function() {
                return $scope.carriers;
              }
            }
        }).result.then(function(data) {
          // get data from modal
          var o = {
           InvoiceNumber: $scope.formData.InvoiceNumber,
           Status: 'ReadyToShip',
           Products: $scope.formData.Products,
           TrackingNumber: data.TrackingNumber,
		   OtherCarrier: data.OtherCarrier
          };

		  debugger;
          // use own or merchant fleet carrier
          if(!data.IsOwnCarrier) {
            o.Carrier = data.Carrier;
          } else {
            o.Carrier = 'Merchant Own Fleet';
          }
		  console.log(o);
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
          // save to ready to ship
          save({
           InvoiceNumber: $scope.formData.InvoiceNumber,
           Status: 'ReadyToShip',
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
          Status: 'Canceled'
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
    if($scope.getState() >= 2 && $scope.formData.ShippingType != 'BUFullfillAndDeliveryBySup') {
      //Use ShipQty
      return product.UnitPrice * product.ShipQuantity;
    } else {
      //Use Qty
      return product.TotalAmt;
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

  // New Print
  // var app = angular.module('myApp', []);

  // app.controller('myCtrl', function($scope) {
     /* JsBarcode("#code128", "DLN1605000001",{
        format: "code128",
        lineColor: "#000",
        width:2,
        height:50,
        displayValue: true,
        textAlign:"left"
      });*/
      $scope.printToCart = function(printSectionId) {
          var innerContents = document.getElementById(printSectionId).innerHTML;
          var popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="/assets/libs/shippingLabelPrint/shippingLabelPrint.css" /></head><body onload="window.print()">' + innerContents + '</body></html>');
          popupWinindow.document.close();
      }
  // });
};