angular.module('nc')
	.filter('dateTh', function($filter) {
		return function(input) {
			return $filter('date')(input, 'dd/MM/yy');
		}
	})
	.filter('datetimeTh', function($filter) {
		return function(input) {
			return $filter('date')(input, 'dd/MM/yy H:mm');
		}
	})

	.filter('timeTh', function($filter) {
		return function(input) {
			return $filter('date')(input, 'H:mm');
		}
	});