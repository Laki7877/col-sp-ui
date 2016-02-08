angular.module('nc')
	.directive('ncFilter', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				filters: '=ncFilterOptions'
			},
			template: $templateCache.get('common/ncFilter'),
			link: function(scope) {
				scope.select = function(value) {
					scope.model = value;
				}
			}
		}
	})