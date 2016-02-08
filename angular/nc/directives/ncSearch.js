angular.module('nc')
	.directive('ncSearch', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				placeholder: '=ncSearchPlaceholder',
				event: '=ncSearchEvent'
			},
			template: $templateCache.get('common/ncSearch'),
			link: function(scope) {
				scope.event = scope.event || function() { return true };
				scope.searchText = '';
				scope.callback = function() {
					if(!scope.event()) return;
					scope.model = scope.searchText;
				}
			}
		};
	});