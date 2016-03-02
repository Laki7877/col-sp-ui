/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Ng-include with no isolate scope
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.directive('ngIncludeEx', function ($compile, $templateCache) {
		return {
		    restrict: 'AE',
		    link: function(scope, element, attrs) {
              scope.$watch(attrs.ngIncludeEx, function (value) {
                if (value) {
                  loadTemplate(value);
                }
              });
              function loadTemplate(ngIncludeEx) {
                  element.html($templateCache.get(ngIncludeEx));
                  $compile(element.contents())(scope);                    
              };
            } 
		};
	});