/**
 * Handles controller functionality shared in every pages 
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.controller('RootCtrl', function ($rootScope) {
		/**
		 * Global angular lodash
		 */
		$rootScope._ = _;
		/**
		 * Prevent dragging image from triggering browser default behavior
		 */
		$window.addEventListener("dragover", function(e) {
		  e = e || event;
		  e.preventDefault();
		}, false);
		$window.addEventListener("drop", function(e) {
		  e = e || event;
		  e.preventDefault();
		}, false);
		/**
		 * 
		 */
	});