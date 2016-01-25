require('./vendor.js');
require('./share');
require('./admin');
require('./seller');

angular.module('app', ['app.admin', 'app.seller', 'app.share', 'ui.bootstrap.datetimepicker', 'duScroll','ngSanitize','ui.select', 'ngAnimate', 'angularFileUpload', 'ui.tree', 'ui.select', 'ui.bootstrap', 'base64'])

.controller('RootCtrl', function() {

});
//App config
.config(['$uibTooltipProvider', 'uiSelectConfig', function($tooltipProvider, uiSelectConfig) {
	//Default close tooltip when click again
	$tooltipProvider.setTriggers({
		'clickanystart' : 'clickanyend'
	});
	$tooltipProvider.options({
		trigger: 'clickanystart'
	});
	//uiSelectConfig.taggingTokens = ',';
}])
.run(['$rootScope', '$base64', 'storage', '$window', function($rootScope, $base64, storage, $window) {
	//TODO: login page
	storage.storeSessionToken($base64.encode('duckvader:vader'));
	//Create generic form validator functions
	$rootScope.isInvalid = function(form) {
		if(angular.isDefined(form) && 
			angular.isDefined(form.$invalid) && 
			angular.isDefined(form.$dirty)) {
			return form.$invalid && (form.$dirty || form.$$parentForm.$submitted);
		}
		return false;
	}; 
	
	//Prevent image dragdrop on other elements
	$window.addEventListener("dragover",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);
	$window.addEventListener("drop",function(e){
	  e = e || event;
	  e.preventDefault();
	},false);

	//Match route with
	$rootScope.isUrl = function(url) {
		if(url.length > 0) {
			var path = $window.location.pathname;
			if(path == url) {
				return true;
			} else if (path.startsWith(url) && path.charAt(url.length) != '/') {
				return false;
			} else  {
				return path.startsWith(url);
			}
		} else {
			return false;
		}
	};

	$rootScope.activeParentUrl = function(url,sub) {
		return {
			'active': $rootScope.isUrl(url)
		};
	};

	//For active class url
	$rootScope.activeUrl = function(url) {
		return {
			'active': $window.location.pathname == url
		};
	};
	$rootScope.test = function(form) {
		console.log(form);
		return false;
	}
}])

require('./template');
require('./config.js');