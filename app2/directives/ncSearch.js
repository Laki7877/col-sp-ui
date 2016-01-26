angular.module('app')
	.directive('ncSearch', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				placeholder: '=ncSearchPlaceholder'
			},
			template: $templateCache.get('common/ncSearch'),
			link: function(scope) {
				scope.searchText = '';
				scope.callback = function() {
					scope.model = scope.searchText;
				}
			}
		};
	});