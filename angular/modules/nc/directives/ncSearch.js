// search bar/button
angular.module('nc')
	.directive('ncSearch', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				placeholder: '=ncSearchPlaceholder',
				event: '=?ncSearchEvent'
			},
			template: $templateCache.get('common/ncSearch'),
			link: function(scope) {
				scope.event = scope.event || function() { return false };
				scope.searchText = '';
				// run event on search clicked
				scope.callback = function() {
					if(scope.event(scope.searchText)) return;
					scope.model = scope.searchText;
				}
			}
		};
	});