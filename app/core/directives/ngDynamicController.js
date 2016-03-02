/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Dynamic ng-controller
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
  .directive('ngDynamicController', function($compile, $parse) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function(scope, elem) {
        var name = $parse(elem.attr('ng-dynamic-controller'))(scope);
        elem.removeAttr('ng-dynamic-controller');
        if(!_.isEmpty(name)) {
          elem.attr('ng-controller', name);
          $compile(elem)(scope);
        }
      }
    };
  });