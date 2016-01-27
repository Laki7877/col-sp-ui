angular.module('app')
	.directive('ncAction', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				options: '=ncActionFn'
			},
			template: $templateCache.get('common/ncAction'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, []);
				scope.call = function(action) {
					action.fn(scope.model);
				};
			}
		}
	});