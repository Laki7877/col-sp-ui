/**
 * ============================================================
 * Module - seller inventory
 * ============================================================
 */


'use strict';
'ngInject';


var angular = require('angular');

/**
 * Module structure
 * ------------------------------------------------------------
 */

angular.module('ttd.sellerInventory', [
    'ttd.ui',
    'ttd.checkallTableItem'
  ])
  .factory('sellerInventoryService', sellerInventoryService)
  .controller('SellerInventoryCtrl', SellerInventoryCtrl);


/**
 * Service
 * ------------------------------------------------------------
 */

function sellerInventoryService(common) {
  // var service = common.Rest('/Inventories');
  var service = {

    /**
     * Get all inventory data.
     * ------------------------------------------------------------
     * @return {Object} request promise
     */

    getAll: function() {
      return common.makeRequest({
        method: 'GET',
        url: '/Inventories'
      });
    }

  };

  return service;
}


/**
 * Controller
 * ------------------------------------------------------------
 */

function SellerInventoryCtrl($scope, sellerInventoryService, $rootScope, checkallTableItemConstant) {

  $scope.inventoryData = [];
  $scope.inventorySelectedItemCount = 0;

  var inventorySelectedData = [];


  /**
   * Init data
   * ------------------------------------------------------------
   */

  sellerInventoryService.getAll()
    .then(function(resp) {
      $scope.inventoryData = resp;
      console.log($scope.inventoryData);
    });


  /**
   * Track selected item trigger
   * ------------------------------------------------------------
   */

  $rootScope.$on(checkallTableItemConstant.onSelected, function(e, data) {
    // console.log('--->', data);
    inventorySelectedData = data;
    $scope.$apply(function() {
      $scope.inventorySelectedItemCount = data.length;
    });
  });


  /**
   * Action hanlder
   * ------------------------------------------------------------
   * @param {String} action name
   */

  // *** Need to pass action from select action UI
  $scope.inventoryActionHandler = function(action) {
    alert('See in console for all item is selected');
    console.log('Select item (do action: ' + action + ')', inventorySelectedData);
  };

}

