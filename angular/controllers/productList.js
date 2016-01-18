module.exports = ['$scope', 'Product', 'util', 'Alert', '$window',  function($scope, Product, util, Alert, $window) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.alert = new Alert();
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Approved", value: 'Approved'},
		{ name: 'Draft', value: 'Draft'},
		{ name: "Not Approved", value: 'NotApproved'},
		{ name: "Wait for Approval", value: 'WaitforApproval'},
	];

	$scope.bulk = { 
		fn: function() {
			var bulk = $scope.bulkOptions.find(function(item) {
				return item.name == $('#bulk').html();
			});
			if(bulk) {
				bulk.fn();
			}
		} 
	};
	$scope.bulkOptions = [
		{
			name: '- Choose Action -', 
			value: 'default', 
			fn: angular.noop
		},
		{ 	
			name: 'Delete', 
			value: 'delete', 
			fn: function() {
				$scope.alert.close();
				var arr = util.getCheckedArray($scope.productList).map(function(elem) {
					return {
						ProductId: elem.ProductId
					};
				});
				if(arr.length > 0) {
					Product.deleteBulk(arr).then(function() {
						$scope.alert.success('Successfully deleted');
						$scope.reloadData();
					});
				}
			}
		},
		{
			name: 'Show',
			value: 'show',
			fn: function() {
				var arr = util.getCheckedArray($scope.productList).map(function(elem) {
					return {
						ProductId: elem.ProductId,
						Visibility: true
					};
				});

				if(arr.length > 0) {
					Product.visible(arr).then(function() {
						$scope.reloadData();
					});
				}
			}
		},
		{
			name: 'Hide',
			value: 'hide',
			fn: function() {
				var arr = util.getCheckedArray($scope.productList).map(function(elem) {
					return {
						ProductId: elem.ProductId,
						Visibility: false
					};
				});

				if(arr.length > 0) {
					Product.visible(arr).then(function() {
						$scope.reloadData();
					});
				}
			}
		}
	];
	$scope.actions = {
		edit: function(row) {
			$window.location.href="/products/" + row.ProductId;
		},
		delete: function(row) {
			$scope.alert.close();
			Product.deleteBulk([{ProductId: row.ProductId}]).then(function() {
				$scope.alert.success('You have successfully remove an entry.');
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		duplicate: function(row) {
			$scope.alert.close();
			Product.duplicate(row.ProductId).then(function() {
				$scope.alert.success();
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		toggle: function(row) {
			$scope.alert.close();
			row.Visibility = !row.Visibility;
			Product.visible([row]).then(function() {
			}, function(err) {
				$scope.alert.error(err);
			});
		}
	};
	$scope.sort = util.tableSortClass($scope);
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
	$scope.init = function(params) {
		if(angular.isDefined(params)) {
			if(angular.isDefined(params.success) && params.success != null) {
				$scope.alert.success();
			}
		}
	};
	$scope.asStatus = function(ab){
		return StatusLookup[ab];
	};

	//Product List
	$scope.productList = [];
	//Default parameters
	$scope.tableParams = {
		filter: 'All',
		searchText: null,
		orderBy: 'UpdatedDt',
		direction: 'desc',
		page: 0,
		pageSize: 10
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


	$scope.nextPage = function(m){
		if($scope.tableParams.page + m >= $scope.totalPage() ||
			$scope.tableParams.page + m < 0)
			return;

		$scope.tableParams.page += m;
	};


	$scope.setOrderBy = function(nextOrderBy){
		if($scope.tableParams.orderBy == nextOrderBy){
			$scope.tableParams.direction = ($scope.tableParams.direction == 'asc' ? 'desc': 'asc');
		}
		$scope.tableParams.orderBy = nextOrderBy;
	};

 	$scope.productTotal = 0;
	//Populate Data Source
	$scope.reloadData = function(){
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
		$scope.reloadData();
		$scope.checkAll = false;
	}, true);


	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		console.log($scope.productList, "WWWWW");
		$scope.productList.forEach(function(d){
			d.checked = $scope.checkAll;
		});
	}, true);
}];
