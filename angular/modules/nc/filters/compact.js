angular.module('nc')
	.filter('compact', function() {
		return function(input) {
			return _.compact(input);
		};
	});