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
		orderBy: 'ProductName',
		direction: 'asc',
		page: 0,
		pageSize: 2
	};

	$scope.nextPage = function(m){
		$scope.tableParams.page += m;
	};

	$scope.setPageSize = function(n){
		$scope.tableParams = n;
	};

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
		if(!$scope.pList) return;
		$scope.pList.forEach(function(d){	
			d.checked = newVal;
		});
	});
}];
