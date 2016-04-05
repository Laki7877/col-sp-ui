angular.module('nc')
	.filter('replace', function() {
		return function(input, from, to) {
			return input.replace(from, to);
		};
	});