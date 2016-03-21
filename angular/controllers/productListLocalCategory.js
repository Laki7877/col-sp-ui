module.exports = ['$scope', 'LocalCategory', function($scope, LocalCategory) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.notReady = true;
	$scope.filterOptions = [
	{ name: "All", value: 0},
	{ name: "Approved", value: 1},
	{ name: "Not Approved", value: 2},
	{ name: "Wait for Approval", value: 3},
	];
	$scope.productTotal = 0;
	$scope.productList = [];
	$scope.tableParams = {
		filter: 0,
		searchText: null,
		orderBy: 'ProductId',
		direction: 'asc',
		page: 0,
		pageSize: 4
	};
	$scope.init = function(catId) {
		$scope.categoryId = catId || 1;
		reloadData();
	}
	$scope.applySearch = function(){
		$scope.tableParams.searchText = $scope.searchText;
	};

	$scope.totalPage = function(x){
		return Math.ceil($scope.productTotal / $scope.tableParams.pageSize);
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
		$scope.productList = [];
		$scope.notReady = true;
		LocalCategory.getProducts($scope.categoryId, $scope.tableParams).then(function(x){
			$scope.productTotal = x.total;
			$scope.productList = x.data;
			$scope.notReady = false;
		});
	};

	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		reloadData();
	}, true);


	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.productList) return;
		$scope.productList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];
