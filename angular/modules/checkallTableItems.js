/**
 * ============================================================
 * Module - seller inventory
 * ============================================================
 */


'use strict';
'ngInject';


var angular = require('angular'),
    _ = require('lodash');


/**
 * Module structure
 * ------------------------------------------------------------
 */

angular.module('ttd.checkallTableItem', [])
  .directive('catiRootboxControl', catiRootboxControlDirective)
  .directive('catiChildboxControl', catiChildboxControlDirective)
  .value('checkallTableItemConstant', {
    onSelected: 'checkallTableItem:onSelected'
  });


/**
 * Directive - root checkbox control
 * ------------------------------------------------------------
 */

function catiRootboxControlDirective($rootScope, checkallTableItemConstant) {

  return {
    restrice: 'A',
    scope: {},
    link: link,
    controller: Controller,
    controllerAs: '$ctrl'
  };


  function link(scope, element, attrs, ctrl) {
    // get root box element
    var $rootBox = ctrl.getRootBoxEl();

    // auto bind event click for handler action
    $rootBox.on('click', function() {
      // reset selected box
      ctrl.resetSelectedBox();

      angular.forEach(ctrl.getChildBox(), function(item) {
        item.el.prop('checked', $rootBox.prop('checked'));

        if ($rootBox.prop('checked')) {
          ctrl.addSelectedItem(item);
        }
      });

      // trigger event selected
      $rootScope.$emit(
        checkallTableItemConstant.onSelected,
        ctrl.getOrderSelectedData()
      );
    });

  }


  function Controller($scope, $element) {
    var ctrl = this;

    // root box element
    var $rootBox = $element.find('input[type="checkbox"]:first');
    // set default prop
    $rootBox.prop('checked', false);


    /**
     * Private variable
     * ------------------------------------------------------------
     */

    var childBox = [],
        selectedChildBox = [];


    /**
     * Get Root box element
     * ------------------------------------------------------------
     */

    ctrl.getRootBoxEl = function() {
      return $rootBox;
    };


    /**
     * Set Root box state handler
     * ------------------------------------------------------------
     */

    ctrl.setRootBoxState = function() {
      var state = false;
      if (childBox.length === selectedChildBox.length) {
        state = true;
      }
      $rootBox.prop('checked', state);
    };


    /**
     * Get all child box
     * ------------------------------------------------------------
     */

    ctrl.getChildBox = function() {
      return childBox;
    };


    /**
     * Reset child box item
     * ------------------------------------------------------------
     */

    ctrl.resetChildBox = function() {
      childBox = [];
      return childBox;
    };


    /**
     * Add child box item
     * ------------------------------------------------------------
     * @param {Object} item data
     */

    ctrl.addChildBox = function(item) {
      childBox.push(item);
      return childBox;
    };


    /**
     * Get all selected box
     * ------------------------------------------------------------
     */

    ctrl.getSelectedBox = function() {
      return selectedChildBox;
    };


    /**
     * Reset selected child box item
     * ------------------------------------------------------------
     */

    ctrl.resetSelectedBox = function() {
      selectedChildBox = [];
      return selectedChildBox;
    };


    /**
     * Add selected child box item
     * ------------------------------------------------------------
     * @param {Object} item data
     */

    ctrl.addSelectedItem = function(item) {
      selectedChildBox.push(item);
      return selectedChildBox;
    };


    /**
     * Remove selected child box item
     * ------------------------------------------------------------
     * @param {Number} item `id` for remove
     */

    ctrl.removeSelectedItem = function(removeId) {
      var removeIndex = _.findIndex(selectedChildBox, function(item) {
        return item.id === removeId;
      });

      selectedChildBox.splice(removeIndex, 1);
      return selectedChildBox;
    };


    /**
     * Get order selected data by id
     * ------------------------------------------------------------
     * @params {String} direction for sort (asc|desc)
     * @return {Array} ordered array
     */

    ctrl.getOrderSelectedData = function(direction) {
      if (direction == null) { direction = 'asc'; }
      return _.orderBy(selectedChildBox, 'id', direction);
    };
  }

}


/**
 * Directive - child checkbox control
 * ------------------------------------------------------------
 */

function catiChildboxControlDirective($rootScope, checkallTableItemConstant) {

  return {
    restrice: 'A',
    link: link,
    require: '^catiRootboxControl',
    scope: {
      id: '=catiChildboxControl'
    }
  };


  function link(scope, element, attrs, ctrl) {

    // item data
    var itemData = {
      id: scope.id,
      el: element
    };


    // add item for access later
    ctrl.addChildBox(itemData);


    // set default prop
    element.prop('checked', false);


    /**
     * Event for hanlder checkbox item
     * ------------------------------------------------------------
     */

    element.on('click', function() {
      if (element.prop('checked') === true) {
        ctrl.addSelectedItem(itemData);
      }
      else {
        ctrl.removeSelectedItem(itemData.id);
      }

      ctrl.setRootBoxState();

      // trigger event selected
      $rootScope.$emit(
        checkallTableItemConstant.onSelected,
        ctrl.getOrderSelectedData()
      );
    });
  }

}