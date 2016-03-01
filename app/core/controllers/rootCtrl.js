/**
 * Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
/**
 * Handles functionalities exposed to every pages 
 *
 * @version 1.0.0
 * @author ahancer
 */
angular.module('colsp.core')
	.controller('RootCtrl', function ($rootScope, route) {
		//Global lodash
		$rootScope._ = _;
		/**
		 * Handle route rendering
		 */
		$rootScope.view = route();
		$rootScope.w
		/**
		 * 
		 */

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
	});