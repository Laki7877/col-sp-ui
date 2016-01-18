var angular = require('angular');
module.exports = ['$scope', '$window', 'util', 'Attribute', 'Alert', function($scope, $window, util, Attribute, Alert) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Free Text", value: 'FreeText'},
		{ name: "Dropdown", value: 'Dropdown'},
		{ name: "Has Variation", value: 'HasVariation'},
		{ name: "No Variation", value: 'NoVariation'}
	];
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
				var arr = util.getCheckedArray($scope.attributeList).map(function(elem) {
					return {
						AttributeId: elem.AttributeId
					};
				});
				if(arr.length > 0) {
					Attribute.deleteBulk(arr).then(function() {
						$scope.alert.success('You have successfully remove entries');
						$scope.reloadData();
					});
				}
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
			console.log($scope.attributeList);
		});
	};
	$scope.actions = {
		edit: function(row) {
			$window.location.href="/admin/attributes/" + row.AttributeId;
		},
		delete: function(row) {
			$scope.alert.close();
			Attribute.deleteBulk([{AttributeId: row.AttributeId}]).then(function() {
				$scope.alert.success('You have successfully remove an entry.');
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		duplicate: function(row) {
			$scope.alert.close();
			Attribute.duplicate(row.AttributeId).then(function() {
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

	//Attribute List
	$scope.attributeList = [];
 	$scope.attributeTotal = 0;

	//Default parameters
	$scope.tableParams = {
		filter: $scope.filterOptions[0].value,
		searchText: null,
		orderBy: 'UpdateDt',
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
		return Math.ceil($scope.attributeTotal / $scope.tableParams.pageSize);
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
		if(!$scope.attributeList) return;
		$scope.attributeList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];