var angular = require('angular');

module.exports = ['$scope', '$window', function($scope, $window) {
	

	$scope.init = function(params) {
		$scope.formData = {};
	};
	
	$scope.cancel= function() {
		$window.location.href = '/admin/brands';
	};

	$scope.save = function() {
		console.log("FormData", $scope.formData);
	};

}];