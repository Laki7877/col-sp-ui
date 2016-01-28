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

	$scope.checkBoxCache = {};

	$scope.setPageSize = function(p){
		$scope.tableParams.pageSize = p;
	}

	$scope.bulk = { 
		fn: function() {
			var bulk = $scope.bulkOptions.find(function(item) {
				return item.name == $('#bulk').html();
			});
			if(bulk) {
				bulk.fn();
			}
			$scope.checkAll = false;
		} 
	};
	$scope.bulkOptions = [
		{ 	
			name: 'Delete', 
			value: 'delete', 
			fn: function() {
				$scope.alert.close();

				var arr = Object.keys($scope.checkBoxCache).map(function(m){
					if(!$scope.checkBoxCache[m]) return { ProductId: -1 };
					return {
						ProductId: Number(m)
					};
				});

				if(arr.length > 0) {
					Product.deleteBulk(arr).then(function() {
						$scope.alert.success('Successfully deleted');
						$scope.reloadData();
					}, function(result) {
						$scope.alert.error(result);
						$scope.reloadData();
					});
				}
			}
		},
		{
			name: 'Show',
			value: 'show',
			fn: function() {
				var arr = Object.keys($scope.checkBoxCache).map(function(m){
					if(!$scope.checkBoxCache[m]) return { ProductId: -1 };
					return {
						ProductId: Number(m)
					};
				});

				if(arr.length > 0) {
					Product.visible(arr).then(function() {
						$scope.alert.success('Successfully changed');
						$scope.reloadData();
					}, function() {
						$scope.alert.error(result);
						$scope.reloadData();
					});
				}
			}
		},
		{
			name: 'Hide',
			value: 'hide',
			fn: function() {
				var arr = Object.keys($scope.checkBoxCache).map(function(m){
					if(!$scope.checkBoxCache[m]) return { ProductId: -1 };
					return {
						ProductId: Number(m)
					};
				});

				if(arr.length > 0) {
					Product.visible(arr).then(function() {
						$scope.alert.success('Successfully changed');
						$scope.reloadData();
					}, function() {
						$scope.alert.error(result);
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
				$scope.reloadData();
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
		$scope.productList.forEach(function(d){
			$scope.checkBoxCache[d.ProductId] = $scope.checkAll; 
		});
	}, true);

	$scope.checkBoxCount = function(){
		var m = [];
		Object.keys($scope.checkBoxCache).forEach(function(key){
			if($scope.checkBoxCache[key]) m.push($scope.checkBoxCache[key]);
		});
		return m.length;
	}
}];
