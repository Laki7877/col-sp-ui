angular.module('nc')
	.directive('ncTreeSelect', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				columns: '=ncTreeSelect'
				options: 'ncTreeSelectOptions'
			}
		};
	});