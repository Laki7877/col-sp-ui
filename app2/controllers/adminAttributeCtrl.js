angular.module('app')
	.controller('AdminAttributeListCtrl', function($scope, $log, AttributeService, config) {
		$scope.filterOptions = config.FILTER.ATTRIBUTE;
		$scope.dataTypeOptions = config.DROPDOWN.ATTRIBUTE_DATA_TYPE;
		$scope.yesNoOptions = config.DROPDOWN.YES_NO_OPTIONS;
		$scope.tableOptions = {
			emptyMessage: 'You do not have an Attribute'
		};
		$scope.params = {
			_order: 'AttributeId',
			_limit: 10,
			_offset: 0,
			_direction: 'asc',
			_filter: 'All'
		};
		$scope.list = {
			total: 0,
			data: []
		};
		$scope.loading = false;
		$scope.reload = function() {
			$scope.loading = true;
			$log.debug($scope.params);
			AttributeService.list($scope.params)
				.then(function(data) {
					$scope.list = data;
				})
				.finally(function() {
					$scope.loading = false;
				});
		};
		$scope.reload();
		$scope.$watch('params', $scope.reload, true); 
	});