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
	.controller('RootCtrl', function ($rootScope, $scope, $controller, $window, storage, router) {
		//Globally exposed var
		$rootScope._ = _;
		$rootScope.$route = router;
		//Initialize PHP params
		$rootScope.initialize = function(get, post) {
			if(!_.isEmpty(get)) {
				router.GET = _.extend(get, router.GET);
			}
			if(!_.isEmpty(post)) {
				router.POST = post;
			}
			$rootScope.$route = router;
		};
		/**
		 * Handle menu active rendering
		 */
		$rootScope.activeMenuItem = function (item) {
			if(item.hover) {
				return 'active';
			}
			for (var i = 0; i < item.submenu.length; i++) {
				if($rootScope.activeSubmenuItem(item.submenu[i]).length > 0) {
					return 'active';
				}
			}
			return '';
		};
		$rootScope.activeSubmenuItem = function (item) {
			if(item.urls.length == 0) {
				return router.isActive(item.url) ? 'active' : '';
			} else {
				for (var i = 0; i < item.urls.length; i++) {
					if(router.isActive(item.urls[i])) {
						return 'active';
					}
				}
			}
			return '';
		};
		/**
		 * Handle user login state
		 */
		$rootScope.Profile = storage.getCurrentUserProfile();
		$rootScope.Imposter = storage.getImposterProfile();
		//Redirect to login if isnt logged
		if(_.isNil($rootScope.Profile) && router.currentPath != router.route.login.path) {
    		storage.put('redirect', $window.location.pathname);
    		router.go('login');
		}
		/**
		 * Prevent default drag-n-drop behavior
		 */
		$window.addEventListener("dragover", function(e) {
		  e = e || event;
		  e.preventDefault();
		}, false);
		$window.addEventListener("drop", function(e) {
		  e = e || event;
		  e.preventDefault();
		}, false);
		
		//Derived controller
		if(!_.isNil($rootScope.$route.current.controller)) {
			$controller($rootScope.$route.current.controller, {
				$scope: $scope
			});
		}
	});