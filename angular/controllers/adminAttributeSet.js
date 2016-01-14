var angular = require('angular');
module.exports = ['$scope', '$window', 'util', 'AttributeSet', 'Alert', function($scope, $window, util, AttributeSet, Alert) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Visible", value: 'Visible'},
		{ name: "Not Visible", value: 'Not Visible'}
	];
	$scope.alert = new Alert();
	$scope.bulk = { fn: angular.noop };
	$scope.bulkOptions = [
		{ 	
			name: 'Delete', 
			value: 'delete', 
			fn: function() {
				$scope.alert.close();
				var arr = util.getCheckedArray($scope.tableParams).map(function(elem) {
					return {
						AttributeSetId: elem.AttributeSetId
					};
				});
				
				if(arr.length > 0) {
					AttributeSet.visible(arr).then(function() {
						$scope.reloadData();
					});
				}
			}
		},
		{
			name: 'Show',
			value: 'show',
			fn: function() {
				var arr = util.getCheckedArray($scope.tableParams).map(function(elem) {
					return {
						AttributeSetId: elem.AttributeSetId,
						Status: 'VI'
					};
				});

				if(arr.length > 0) {
					AttributeSet.setVisible(arr).then(function() {
						$scope.reloadData();
					});
				}
			}
		},
		{
			name: 'Hide',
			value: 'hide',
			fn: function() {
				var arr = util.getCheckedArray($scope.tableParams).map(function(elem) {
					return {
						AttributeSetId: elem.AttributeSetId,
						Status: 'NV'
					};
				});

				if(arr.length > 0) {
					AttributeSet.setVisible(arr).then(function() {
						$scope.reloadData();
					});
				}
			}
		}
	];
	$scope.sort = util.tableSortClass($scope);
	//Populate Data Source
	$scope.reloadData = function(){
		$scope.attributeSetList = [];
		$scope.notReady = true;
		AttributeSet.getAll($scope.tableParams).then(function(x){
			$scope.attributeSetTotal = x.total;
			$scope.attributeSetList = x.data;
			$scope.notReady = false;
		});
	};
	$scope.actions = {
		edit: function(row) {
			$window.location.href="/admin/attributesets/" + row.AttributeSetId;
		},
		delete: function(row) {
			$scope.alert.close();
			AttributeSet.delete(row.AttributeSetId).then(function() {
				$scope.alert.success('You have successfully deleted an entry.');
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		duplicate: function(row) {
			$scope.alert.close();
			AttributeSet.duplicate(row.AttributeSetId).then(function() {
				$scope.alert.success();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		toggle: function(row) {
			AttributeSet.visible()
		}
	};
	//AttributeSet List
	$scope.attributeSetList = [];
 	$scope.attributeSetTotal = 0;

	//Default parameters
	$scope.tableParams = {
		filter: $scope.filterOptions[0].value,
		searchText: null,
		orderBy: 'AttributeSetNameEn',
		direction: 'desc',
		page: 0,
		pageSize: 10
	};
	$scope.notReady = true;
	
	$scope.init = function(params) {
		if(params) {
			if(angular.isDefined(params.success)) {
				$scope.alert.success();
			}
		}
	};
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
	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		$scope.reloadData();
	}, true);

	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.attributeSetList) return;
		$scope.attributeSetList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];