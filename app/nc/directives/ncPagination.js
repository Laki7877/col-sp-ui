angular.module('nc')
	.provider('$ncPagination', function() {
		this.paginationSizes = [10,20,30];
		this.$get = function() {
			return this;
		}
	})
	.directive('ncPagination', function($templateCache, $ncPagination) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				params: '=ncModel',
				total: '=ncPaginationTotal',
				paginationOptions: '=?ncPaginationSizes',
				callback: '=?ncPaginationEvent'
			},
			template: $templateCache.get('common/ncPagination.html'),
			link: function(scope, element, attrs) {
				scope.paginationOptions = scope.paginationOptions || $ncPagination.paginationSizes;
				scope.params._limit = scope.paginationOptions[0];
				scope.callback = scope.callback || function() { return false };
				scope.page = function() {
					if(scope.total == 0) {
						return 0;
					}
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
					if(page + offset > total ||
						page + offset <= 0)
						return;
					if(scope.callback(scope.params._offset + (offset) * scope.params._limit, 'offset')) {
						return;
					}
					scope.params._offset += offset * scope.params._limit;
				};
				scope.setPage = function(i) {
					scope.params._offset = (i-1) * scope.params._limit;
				};
				scope.setPageSize = function(n) {
					if(scope.params._limit == n) {
						return;
					}
					if(scope.callback(n, 'size')) {
						return;
					}
					scope.params._limit = n;
					
				};
				scope.$watch('params._limit', function() {
					if(scope.params._limit > scope.total) {
						scope.setPage(1);
					}
				});
			}
		}
	});