var angular = require('angular');
module.exports = ['$scope', '$window', 'util', 'Attribute', 'Alert', function($scope, $window, util, Attribute, Alert) {
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
	$scope.alert = new Alert();
	$scope.bulk = null;
	$scope.bulkActions = [
		{ 	name: 'Delete', 
			value: 'delete', 
			fn: function(row) {
				var arr = util.getCheckedArray(row);
				angular.forEach(arr, function(item) {
					Attribute.delete(item.AttributeId);
				});
				$scope.reloadData();
			}
		}
	];
	$scope.sort = util.tableSortClass($scope);
	//Populate Data Source
	$scope.reloadData = function(){
		$scope.attributeList = [];
		$scope.notReady = true;
		Attribute.getAll($scope.tableParams).then(function(x){
			$scope.attributeTotal = x.total;
			$scope.attributeList = x.data;
			$scope.notReady = false;
		});
	};
	$scope.actions = {
		edit: function(row) {
			$window.location.href="/admin/attributes/" + row.AttributeId;
		},
		delete: function(row) {
			$scope.alert.close();
			Attribute.delete(row.AttributeId).then(function() {
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		duplicate: function(row) {
			$scope.alert.close();
			Attribute.duplicate(row.AttributeId).then(function() {
				$scope.alert.success();
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
	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		$scope.reloadData();
	}, true);

	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.attributeList) return;
		$scope.attributeList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];