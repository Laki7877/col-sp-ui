module.exports = ['$scope', 'Product',  function($scope, Product) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Approved", value: 'Approved'},
		{ name: 'Draft', value: 'Draft'},
		{ name: "Not Approved", value: 'Not Approved'},
		{ name: "Wait for Approval", value: 'Wait for Approval'},
	];

	$scope.bulk = {
		delete: function(){},
		show: function() {},
		hide: function(){}
	};

	var StatusLookup = {
			'DF' : {
				Class: 'fa-circle-o',
				Text: 'Draft',
				Color: 'color-grey'
			},
			'WA' : {
				Class: 'fa-clock-o',
				Text: 'Wait for Approval',
				Color: 'color-yellow'
			}

	}

	$scope.asStatus = function(ab){

		return StatusLookup[ab];
	};

	//Product List
	$scope.productList = [];
	//Default parameters
	$scope.tableParams = {
		filter: 0,
		searchText: null,
		orderBy: 'ProductId',
		direction: 'desc',
		page: 0,
		pageSize: 8
	};

	$scope.notReady = true;
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
		$scope.productList = [];
		$scope.notReady = true;
		Product.getAll($scope.tableParams).then(function(x){
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
