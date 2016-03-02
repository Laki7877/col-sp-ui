angular.module('nc')
	.directive('ncLoading', function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncLoading'
			},
			template: $templateCache.get('common/ncLoading.html'),
			link: function(scope) {
				scope.message = _.extend('Loading...', scope.message);
			}
		};
	})
	.directive('ncLoadingSmall', function($templateCache) {
		return {
			restrict: 'A',
			scope: {
				message: '@ncLoadingSmall'
			},
			template: $templateCache.get('common/ncLoadingSmall.html'),
			link: function(scope) {
				scope.message = _.extend('Loading...', scope.message);
			}
		};
	});