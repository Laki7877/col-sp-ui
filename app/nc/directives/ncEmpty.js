angular.module('nc')
	.directive('ncEmpty', function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncEmpty'
			},
			template: $templateCache.get('common/ncEmpty.html'),
			link: function(scope) {
				scope.message = _.extend('Empty content', scope.message);
			}
		};
	});