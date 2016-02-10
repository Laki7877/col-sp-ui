module.exports = function($scope, Attribute, util) {
		$scope.filterOptions = [
			{ name: "All", value: 'All'},
			{ name: "Free Text", value: 'FreeText'},
			{ name: "Dropdown", value: 'Dropdown'},
			{ name: "Has Variation", value: 'HasVariation'},
			{ name: "No Variation", value: 'NoVariation'}
		];
		$scope.tags = [];
		$scope.eval = function(test) {
			return {name: test};
		}
		$scope.dataTypeOptions = [
			{
				name: 'Free Text',
				value: 'ST'
			},
			{
				name: 'Dropdown',
				value: 'LT'
			},
		{
				name: 'HTML Box',
				value: 'HB'
			}
		];
        // stop your wrgo
		$scope.yesNoOptions = [
			{
				name: 'No',
				value: false
			},
			{
				name: 'Yes',
				value: true
			}
		];
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
		$scope.bulks = [];
		$scope.actions = [{
			name: 'View',
			fn: function(view) {

			}
		}];
		$scope.loading = false;
		$scope.reload = function() {
			$scope.loading = true;
			Attribute.getAll($scope.params)
				.then(function(data) {
					$scope.list = data;
				})
				.finally(function() {
					$scope.loading = false;
				});
		};
		$scope.reload();
		$scope.$watch('params', $scope.reload, true); 	
};