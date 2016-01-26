angular.module('app')
	.provider('ncTableProvider', function() {
		this.ncTableOptions = {};
		this.$get = function() {
			return this;
		};
	})
	.directive('ncTable', function($log, $templateCache, ncTableProvider) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			template: $templateCache.get('common/ncTable'),
			scope: {
				model: '=ncModel',
				options: '=ncTableOptions',
				params: '=ncTableParams',
				loading: '=ncIsLoading',
				searching: '=ncIsSearching'
			},
			controller: function($scope) {
				this.sort = function(id, direction) {
					$scope.params._order = id;
					$scope.params._direction = direction ? 'desc' : 'asc';
				};
				this.isOrderBy = function(id) {
					return $scope.params._order === id;
				};
			},
			link: function(scope, element, attrs, controller) {
				//Default values
				var defaultTableOptions = {
					loadingMessage: 'Loading...',
					searchEmptyMessage: 'No search result',
					emptyMessage: 'You do not have an Entry'
				};
				var defaultTableParams = {
					_order: '',
					_limit: 10,
					_offset: 0,
					_direction: 'asc'
				};
				var defaultTableModel = {
					data: [],
					total: 0
				};

				//Aggregriate default value
				scope.options = _.defaults(scope.options, defaultTableOptions, ncTableProvider.ncTableOptions);
				scope.params = _.defaults(scope.params, defaultTableParams);
				scope.model = _.defaults(scope.model, defaultTableModel);
			}
		};
	})
	.directive('ncSort', function($templateCache, $log) {
		return {
			restrict: 'A',
			require: '^ncTable',
			transclude: true,
			scope: {
				sort: '@ncSort'
			},
			template: $templateCache.get('common/ncTableSort'),
			link: function(scope, element, attrs, parent
				) {
				//false = asc
				scope.direction = false;
				scope.isCurrent = function() {
					return parent.isOrderBy(scope.sort);
				};

				scope.click = function() {
					scope.direction = !scope.direction;
					parent.sort(scope.sort, scope.direction);
				};
			}
		}
	})