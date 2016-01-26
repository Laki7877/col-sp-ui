angular.module('app')
	.filter('dateTh', function($filter) {
		return function(input) {
			return $filter('date')(input, 'shortDate', '+700');
		}
	});