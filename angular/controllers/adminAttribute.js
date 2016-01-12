module.export = ['$scope', 'Attribute', function($scope, Attribute) {

	$scope.tableParams = {
		filter: 0,
		searchText: null,
		orderBy: 'AttributeName',
		direction: 'desc',
		page: 0,
		pageSize: 8
	};
}];