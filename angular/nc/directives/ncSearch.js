angular.module('nc')
	.directive('ncSearch', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				placeholder: '=ncSearchPlaceholder',
				callback: '=ncSearchEvent'
			},
			template: $templateCache.get('common/ncSearch'),
			link: function(scope) {
				scope.callback = scope.callback || function() { return true };
				scope.searchText = '';
				scope.callback = function() {
					if(!scope.callback()) return;
					scope.model = scope.searchText;
				}
			}
		};
	});