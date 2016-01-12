module.exports = ['$scope', 'AttributeSet', function($scope, AttributeSet) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Visible", value: 'Visible'},
		{ name: "Not Visible", value: 'Not Visible'}
	];

	//attributeSet List
	$scope.attributeSetList = [];
	
	//Default parameters
	$scope.tableParams = {
		filter: $scope.filterOptions,
		searchText: null,
		orderBy: 'AttributeSetNameEn',
		direction: 'desc',
		page: 0,
		pageSize: 10
	};

	$scope.notReady = true;
	$scope.applySearch = function(){
		$scope.tableParams.searchText = $scope.searchText;
	};

	$scope.totalPage = function(x){
		return Math.ceil($scope.attributeSetTotal / $scope.tableParams.pageSize);
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

 	$scope.attributeSetTotal = 0;
	//Populate Data Source
	var reloadData = function(){
		$scope.attributeSetList = [];
		$scope.notReady = true;
		AttributeSet.getAll($scope.tableParams).then(function(x){
			$scope.attributeSetTotal = x.total;
			$scope.attributeSetList = x.data;
			$scope.notReady = false;
		});
	};

	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		reloadData();
	}, true);

	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.attributeSetList) return;
		$scope.attributeSetList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];