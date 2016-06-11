// template for empty search result
angular.module('nc')
	.directive('ncEmpty', function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncEmpty'
			},
			template: $templateCache.get('common/ncEmpty'),
			link: function(scope) {
				scope.message = _.extend('Empty content', scope.message);
			}
		};
	});