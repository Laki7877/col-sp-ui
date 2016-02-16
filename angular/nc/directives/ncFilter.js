angular.module('nc')
	.directive('ncFilter', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				filters: '=ncFilterOptions',
				callback: '=?ncFilterEvent'
			},
			template: $templateCache.get('common/ncFilter'),
			link: function(scope) {
				scope.callback = scope.callback || function() { return true };
				scope.select = function(value) {
					if(!scope.callback()) return;
					scope.model = value;
				}
			}
		}
	})