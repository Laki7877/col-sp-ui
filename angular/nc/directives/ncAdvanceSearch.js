angular.module('nc')
	.directive('ncAdvanceSearch', function($templateCache) {
		return {
			restrict: 'AE',
			scope: {

			},
			template: function(elem, attrs) {
				if(attrs.ncAdvanceSearch) {
					return $templateCache.get(attrs.ncAdvanceSearch);
				} else {
					return $templateCache.get('common/ncAdvanceSearch');
				}
			}
		};
	});