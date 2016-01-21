var angular = require('angular');
module.exports = ['$scope', '$window', 'util', 'AttributeSet', 'Alert', function($scope, $window, util, AttributeSet, Alert) {
	//UI binding variables
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 'All'},
		{ name: "Visible", value: 'Visible'},
		{ name: "Not Visible", value: 'NotVisible'}
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
				var arr = util.getCheckedArray($scope.attributeSetList).map(function(elem) {
					return {
						AttributeSetId: elem.AttributeSetId
					};
				});
				if(arr.length > 0) {
					AttributeSet.deleteBulk(arr).then(function() {
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
				var arr = util.getCheckedArray($scope.attributeSetList).map(function(elem) {
					return {
						AttributeSetId: elem.AttributeSetId,
						Visibility: true
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
			name: 'Hide',
			value: 'hide',
			fn: function() {
				var arr = util.getCheckedArray($scope.attributeSetList).map(function(elem) {
					return {
						AttributeSetId: elem.AttributeSetId,
						Visibility: false
					};
				});

				if(arr.length > 0) {
					AttributeSet.visible(arr).then(function() {
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
			AttributeSet.deleteBulk([{AttributeSetId: row.AttributeSetId}]).then(function() {
				$scope.alert.success('You have successfully deleted an entry.');
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		duplicate: function(row) {
			$scope.alert.close();
			AttributeSet.duplicate(row.AttributeSetId).then(function() {
				$scope.alert.success();
				$scope.reloadData();
			}, function(err) {
				$scope.alert.error(err);
			});
		},
		toggle: function(row) {
			row.Visibility = !row.Visibility;
			AttributeSet.visible([row]).then(function() {
			}, function(err) {
				$scope.alert.error(err);
			});
		}
	};
	//AttributeSet List
	$scope.attributeSetList = [];
 	$scope.attributeSetTotal = 0;

	//Default parameters
	$scope.tableParams = {
		filter: $scope.filterOptions[0].value,
		searchText: null,
		orderBy: 'UpdatedDt',
		direction: 'desc',
		page: 0,
		pageSize: 20
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
		return Math.ceil($scope.attributeSetTotal / $scope.tableParams.pageSize);
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

	}
	//Watch any change in table parameter, trigger reload
	$scope.$watch('tableParams', function(){
		$scope.reloadData();
		$scope.checkAll = false;
	}, true);

	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		if(!$scope.attributeSetList) return;
		$scope.attributeSetList.forEach(function(d){
			d.checked = newVal;
		});
	});
}];