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

angular.module('ttd.ui', [])
  .directive('loadingMessage', loadingMessageDirective)
  .directive('toggleAdvanceSearchUi', toggleAdvanceSearchUIDirective);


/**
 * Directive - load message
 * ------------------------------------------------------------
 */

function loadingMessageDirective() {

  return {
    restrice: 'E',
    replace: true,
    scope: {
      condition: '=?'
    },
    template: (
      '<div class="loading-message" ng-if="condition">' +
        '<div class="empty-section margin-top-20 margin-bottom-20">' +
          '<img class="loading-img" height="30" src="/assets/img/loader.gif?v=1455431349">' +
          'Loading...' +
        '</div>' +
      '</div>'
    ),
    link: function(scope) {
      // set default condition
      if (scope.condition == null) {
        scope.condition = false;
      }
    }
  }

};



/**
 * Directive - advance search ui control
 * ------------------------------------------------------------
 */

function toggleAdvanceSearchUIDirective($rootScope, $timeout) {

  return {
    restrice: 'A',
    link: link
  };


  function link(scope, element, attrs) {
    if ($rootScope.__showAdvanceSearchUI == null) {
      $rootScope.__showAdvanceSearchUI = false;
    }

    element.bind('click', function() {
      $rootScope.$apply(function() {
        $rootScope.__showAdvanceSearchUI = !$rootScope.__showAdvanceSearchUI;
      });
    });
  }

}