angular.module('app')
	.directive('ncPagination', function($templateCache, config) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				params: '=ncModel',
				total: '=ncPaginationTotal',
				paginationOptions: '=ncPaginationOptions'
			},
			template: $templateCache.get('common/ncPagination'),
			link: function(scope, element, attrs) {
				scope.paginationOptions = _.assign(config.DEFAULT_PAGINATION_SIZES, scope.paginationOptions);
				scope.params._limit = scope.paginationOptions[0];
				scope.page = function() {
					return Math.ceil(scope.params._offset / scope.params._limit) + 1;
				};
				scope.pageSize = function() {
					return scope.params._limit; 
				};	
				scope.totalPage = function() {
					return Math.ceil(scope.total / scope.params._limit);
				};
				scope.nextPage = function(offset) {
					var page = scope.page();
					var total = scope.totalPage();
					if(page + offset >= total ||
						page + offset < 0)
						return;
					scope.params._offset += offset * scope.params._limit;
				};
				scope.setPageSize = function(n) {
					scope.params._limit = n;
				};
			}
		}
	});