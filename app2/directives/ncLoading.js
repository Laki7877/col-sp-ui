angular.module('app')
	.directive('ncLoading', function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncLoading'
			},
			template: $templateCache.get('common/ncLoading'),
			link: function(scope) {
				scope.message = _.extend('Loading...', scope.message);
			}
		};
	});