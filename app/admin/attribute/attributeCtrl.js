angular.module('app.admin')
	.controller('AdminAttributeListCtrl', function($scope, $window, util, AttributeService, Alert) {
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
						AttributeService.deleteBulk(arr).then(function() {
							$scope.alert.success('You have successfully remove entries');
							$scope.reloadData();
						}, function(result) {
							$scope.alert.error(result);
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
			AttributeService.getAll($scope.tableParams).then(function(x){
				console.log(x);
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
				AttributeService.deleteBulk([{AttributeId: row.AttributeId}]).then(function() {
					$scope.alert.success('You have successfully remove an entry.');
					$scope.reloadData();
				}, function(err) {
					$scope.alert.error(err);
				});
			},
			duplicate: function(row) {
				$scope.alert.close();
				AttributeService.duplicate(row.AttributeId).then(function() {
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
	})
	.controller('AdminAttributeDetailCtrl', function($scope, $window, AttributeService, Alert) {
		$scope.form = {};
		$scope.formData = {};
		$scope.alert = new Alert();
		$scope.dataTypeOptions = AttributeService.dataTypeOptions;
		$scope.variantOptions = AttributeService.variantOptions;
		$scope.boolOptions = AttributeService.boolOptions;
		$scope.validationOptions = AttributeService.validationOptions;
		$scope.formDataSerialized = {};
		$scope.edit = 0;

		//Block normal href flow
		$window.onbeforeunload = function (e) {

			if(!$scope.form.$dirty){
				//not dirty
				return null;
			}

			var message = "Your changes will not be saved.",
			e = e || window.event;
			// For IE and Firefox
			if (e) {
			  e.returnValue = message;
			}

			// For Safari
			return message;
		};	

		$scope.init = function(params) {
			if(angular.isDefined(params)) {
				//edit mode
				$scope.edit = params.id;
				AttributeService.get($scope.edit).then(function(data) {
					$scope.formData = AttributeService.deserialize(data);
				});
			} else {
				//create mode!
				$scope.edit = 0;
				$scope.formData = AttributeService.generate();
			}
		};
		$scope.cancel= function(location) {
			if(angular.isDefined(location)) {
				$window.location.href = location.href;
			} else {
				$window.location.href = '/admin/attributes';
			}
		};
		$scope.save = function() {
			if($scope.saving) {
				return;
			}
			$scope.form.$setSubmitted();
			if($scope.form.$invalid) {
				$scope.alert.error('Please fill out the required fields.');
				return;
			}

			$scope.alert.close();
			$scope.formDataSerialized = AttributeService.serialize($scope.formData);
			if ($scope.edit) {
				$scope.saving = true;
				AttributeService.update($scope.edit, $scope.formDataSerialized).then(function(data) {
					$scope.alert.success('Successful saved. <a href="/admin/attributes">View Attribute List</a>');
					$scope.saving = false;
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.saving = false;
					$scope.alert.error(err);
				});
			}
			else {
				$scope.saving = true;
				AttributeService.create($scope.formDataSerialized).then(function(data) {
					$scope.alert.success('Successful saved. <a href="/admin/attributes">View Attribute List</a>');
					$scope.edit = data.AttributeId;				
					$scope.saving = false;
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.saving = false;
					$scope.alert.error(err);
					console.log(err);
				});
			}
		};		
	});