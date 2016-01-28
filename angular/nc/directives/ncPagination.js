angular.module('nc')
	.provider('ncPaginationProvider', function() {
		this.paginationSizes = [10,20,30];
		this.$get = function() {
			return this;
		}
	})
	.directive('ncPagination', function($templateCache, ncPaginationProvider) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				params: '=ncModel',
				total: '=ncPaginationTotal',
				paginationOptions: '=ncPaginationSizes'
			},
			template: $templateCache.get('common/ncPagination'),
			link: function(scope, element, attrs) {
				scope.paginationOptions = _.assign(ncPaginationProvider.paginationSizes, scope.paginationOptions);
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
				scope.setPage = function(i) {
					scope.params._offset = (i-1) * scope.params._limit;
				};
				scope.setPageSize = function(n) {
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