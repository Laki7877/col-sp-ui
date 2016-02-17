angular.module('nc')
	.directive('ncAdvanceSearch', function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				open: '=ncAdvanceSearchToggle',
				options: '=?ncAdvanceSearchOptions',
				callback: '=?ncAdvanceSearchEvent'
			},
			template: function(elem, attrs) {
				if(attrs.ncAdvanceSearch) {
					return $templateCache.get(attrs.ncAdvanceSearch);
				} else {
					return $templateCache.get('common/ncAdvanceSearch');
				}
			},
			link: function(scope, elem, attrs) {
				scope.formData = {
					LocalCategory: []
				};
				scope.form = {};
				scope.callback = scope.callback || function() { return false };
				scope.options = _.defaults(scope.options, {
					Tags: [],
					Brands: ['test'],
					LocalCategory: [],
					GlobalCategory: []
				});
				scope.search = function() {
					if(scope.callback(scope.formData, true)) return;
					scope.model = _.extend({}, scope.formData);
				};
				scope.clear = function() {
					if(scope.callback(scope.formData, false)) return;
					scope.model = {};
				};
				scope.openTreeSelector = function() {
					var modal = $uibModal.open({
						
					});
				};
			}
		};
	})
	.directive('ncAdvanceSearchButton', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel'
			},
			template: function(elem, attrs) {
				if(attrs.ncAdvanceSearch) {
					return $templateCache.get(attrs.ncAdvanceSearch);
				} else {
					return $templateCache.get('common/ncAdvanceSearchButton');
				}
			},
			link: function(scope, elem, attrs) {
				scope.toggle = function() {
					scope.model = !scope.model;
				};
			}
		};
	});