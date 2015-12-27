module.exports = ['$scope', '$http', 'Products',  function($scope, $http, Products){
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 0},
		{ name: "Approved", value: 1},
		{ name: "Not Approved", value: 2},
		{ name: "Wait for Approval", value: 3},
	];

	//Product List
	$scope.productList = [];
	//Default parameters
	$scope.tableParams = {
		filter: 0,
		searchText: null,
		orderBy: 'ProductId',
		direction: 'asc',
		page: 0,
		pageSize: 4
	};

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

 	$scope.productTotal = 0;
	//Populate Data Source
	var reloadData = function(){
		Products.getAll($scope.tableParams).then(function(x){
			$scope.productTotal = x.data.total;
			$scope.productList = x.data.data;
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
