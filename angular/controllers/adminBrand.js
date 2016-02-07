var angular = require('angular');

module.exports = ['$scope','util', 'config', 'Brand', 'Alert', '$window', function($scope, util, config, Brand, Alert, $window){
	$scope.brands =  [];
	$scope.checkAll = false;
	$scope.alert = new Alert();
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
				var arr = util.getCheckedArray($scope.brands).map(function(elem) {
					return {
						BrandId: elem.BrandId
					};
				});
				if(arr.length > 0) {
					Brand.deleteBulk(arr).then(function() {
						$scope.alert.success('You have successfully remove entries.');
						$scope.reloadData();
					}, function(result) {
						$scope.alert.error(result);
					});
				}
			}
		}
	];
	$scope.actions = {
		edit: function(row) {
			$window.location.href="/admin/brands/" + row.BrandId;
		},
		delete: function(row) {
			$scope.alert.close();
			Brand.deleteBulk([{BrandId: row.BrandId}]).then(function() {
				$scope.alert.success('You have successfully remove an entry.');
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		}
	};
	$scope.sort = util.tableSortClass($scope);
	//Populate Data Source
	$scope.reloadData = function(){
		$scope.brands = [];
		$scope.notReady = true;
		Brand.getAll($scope.tableParams).then(function(x){
			$scope.brandTotal = x.total;
			$scope.brands = x.data;
			$scope.notReady = false;
		});
	};
	$scope.actions = {
		edit: function(row) {
			$window.location.href="/admin/brands/" + row.BrandId;
		},
		delete: function(row) {
			$scope.alert.close();
			Brand.deleteBulk([{BrandId: row.BrandId}]).then(function() {
				$scope.alert.success('You have successfully remove an entry.');
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		duplicate: function(row) {
			$scope.alert.close();
			Brand.duplicate(row.BrandId).then(function() {
				$scope.alert.success();
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		}
	};
	$scope.dataType = {
		'ST' : 'Free Text',
		'LT' : 'Dropdown',
		'HB' : 'HTML Box'
	};

	//Brand List
	$scope.brands = [];
 	$scope.brandTotal = 0;

	//Default parameters
	$scope.tableParams = {
		searchText: null,
		orderBy: 'BrandId',
		direction: 'desc',
		page: 0,
		pageSize: 10
	};
	$scope.notReady = true;
	$scope.init = function(params) {
		if(angular.isDefined(params)) {
			if(angular.isDefined(params.success) && params.success != null) {
				$scope.alert.success();
			}
		}
	};
	$scope.applySearch = function(){
		$scope.tableParams.searchText = $scope.searchText;
	};
	
	$scope.totalPage = function(x){
		return Math.ceil($scope.brandTotal / $scope.tableParams.pageSize);
	};

	$scope.nextPage = function(m){
		if($scope.tableParams.page + m >= $scope.totalPage() ||
			$scope.tableParams.page + m < 0)
			return;

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

	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		$scope.reloadData();
		$scope.checkAll = false;
	}, true);

	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.brands) return;
		$scope.brands.forEach(function(d){
			d.checked = newVal;
		});
	});;
	$scope.reloadData();
}];