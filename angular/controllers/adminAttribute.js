module.exports = ['$scope', '$window', 'Attribute', function($scope,$window, Attribute) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Free Text", value: 'Free Text'},
		{ name: "Dropdown", value: 'Dropdown'},
		{ name: "Has Variation", value: 'Has Variation'},
		{ name: "No Variation", value: 'No Variation'}
	];
	$scope.dataType = {
		'ST' : 'Free Text',
		'LT' : 'Dropdown',
		'HB' : 'HTML Box'
	};

	//Attribute List
	$scope.attributeList = [];
 	$scope.attributeTotal = 0;
	
	//Default parameters
	$scope.tableParams = {
		filter: $scope.filterOptions[0].value,
		searchText: null,
		orderBy: 'AttributeNameEn',
		direction: 'desc',
		page: 0,
		pageSize: 10
	};
	$scope.notReady = true;
	
	$scope.applySearch = function(){
		$scope.tableParams.searchText = $scope.searchText;
	};

	$scope.totalPage = function(x){
		return Math.ceil($scope.attributeTotal / $scope.tableParams.pageSize);
	};

	$scope.nextPage = function(m){
		$scope.tableParams.page += m;
	};

	$scope.setPageSize = function(n){
		$scope.tableParams.pageSize = n;
	};

	$scope.setOrderBy = function(nextOrderBy){
		if($scope.tableParams.orderBy == nextOrderBy){
			$scope.tableParams.direction = ($scope.tableParams.direction == 'asc' ? 'desc': 'asc');
		}
		$scope.tableParams.orderBy = nextOrderBy;
	}
	
	//Populate Data Source
	var reloadData = function(){
		$scope.attributeList = [];
		$scope.notReady = true;
		Attribute.getAll($scope.tableParams).then(function(x){
			$scope.attributeTotal = x.total;
			$scope.attributeList = x.data;
			$scope.notReady = false;
		});
	};

	$scope.$on('edit', function(evt, row) {
		$window.location.href='/admin/attributes/' + row.AttributeId;
	});

	$scope.$on('remove', function(evt, row) {
		Attribute.delete(row.AttributeId);
	});

	$scope.$on('duplicate', function(evt, row) {
		Attribute.duplicate(row.AttributeId);
	});

	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		reloadData();
	}, true);

	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.attributeList) return;
		$scope.attributeList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];