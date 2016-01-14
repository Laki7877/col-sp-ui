var angular = require('angular');

module.exports = ['$scope', '$window', function($scope, $window) {
	$scope.formData = {};
	
	$scope.init = function(params) {
		
	};
	
	$scope.cancel= function() {
		$window.location.href = '/admin/brands';
	};

	$scope.save = function() {
		
	};

}];