angular.module('nc')
	.directive('ncAdvanceSearch', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				open: '=ncAdvanceSearchToggle',
				options: '=ncAdvanceSearchOptions'
			},
			template: function(elem, attrs) {
				if(attrs.ncAdvanceSearch) {
					return $templateCache.get(attrs.ncAdvanceSearch);
				} else {
					return $templateCache.get('common/ncAdvanceSearch');
				}
			},
			link: function(scope, elem, attrs) {
				scope.formData = {};
				scope.form = {};
				scope.options = _.defaults(scope.options, {
					Tags: [],
					Brands: []
				});
				scope.search = function() {
					scope.model.AdvanceSearch = _.extend({}, scope.formData);
				};
				scope.clear = function() {
					_.unset(scope.model, 'AdvanceSearch');
				};
			}
		};
	});