/**
 * ============================================================
 * Controller - seller inventory
 * ============================================================
 */


'use strict';
'ngInject';


var angular = require('angular');

/**
 * Module structure
 * ------------------------------------------------------------
 */

angular.module('SellerInventory', [])
  .factory('sellerInventoryService', sellerInventoryService)
  .directive('toggleAdvanceSearchUi', toggleAdvanceSearchUI)
  .controller('SellerInventoryCtrl', SellerInventoryCtrl)


/**
 * Directive
 * ------------------------------------------------------------
 */

function toggleAdvanceSearchUI($rootScope, $timeout) {

  return {
    restrice: 'A',
    scope: {},
    link: function(scope, element, attrs) {

      if ($rootScope.__showAdvanceSearchUI == null) {
        $rootScope.__showAdvanceSearchUI = false;
      }

      element.bind('click', function() {
        $rootScope.$apply(function() {
          $rootScope.__showAdvanceSearchUI = !$rootScope.__showAdvanceSearchUI;
        });
      });

    }
  };

}


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

function SellerInventoryCtrl($scope, sellerInventoryService) {

  $scope.inventoryData = [];


  /**
   * Init data
   * ------------------------------------------------------------
   */

  sellerInventoryService.getAll()
    .then(function(resp) {
      $scope.inventoryData = resp;
    });

}

