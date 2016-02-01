angular.module('nc')
	.provider('$ncTable', function() {
		this.tableOptions = {
			loadingMessage: 'Loading...',
			searchEmptyMessage: 'No search result',
			emptyMessage: 'You do not have an Entry'
		};
		this.tableParams = {
			_order: '',
			_limit: 10,
			_offset: 0,
			_direction: 'asc'
		};
		this.$get = function() {
			return this;
		};
	})
	.directive('ncTable', function($log, $templateCache, $ncTable) {
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
				var defaultTableModel = {
					data: [],
					total: 0
				};

				//Aggregriate default value
				scope.options = _.defaults(scope.options, $ncTable.tableOptions);
				scope.params = _.defaults(scope.params, $ncTable.tableParams);
				scope.model = _.merge(scope.model, defaultTableModel);
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
	.directive('ncLink', function() {
		return {
			restrict: 'A',
			require: '^ncTable',
			transclude: true,
			scope: {
				link: '@ncLink'
			},
			template: '<a ng-href="{{link}}" ng-transclude></a>',
		}
	});