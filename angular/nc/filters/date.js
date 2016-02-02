angular.module('nc')
	.filter('dateTh', function($filter) {
		return function(input) {
			return $filter('date')(input, 'dd/MM/yy', '+700');
		}
	});