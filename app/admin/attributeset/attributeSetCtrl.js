angular.module('app.admin')
	.controller('AdminAttributeSetListCtrl', function($scope, $window, util, AttributeSetService, Alert) {
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
						AttributeSetService.deleteBulk(arr).then(function() {
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
					var arr = util.getCheckedArray($scope.attributeSetList).map(function(elem) {
						return {
							AttributeSetId: elem.AttributeSetId,
							Visibility: true
						};
					});

					if(arr.length > 0) {
						AttributeSetService.visible(arr).then(function() {
							$scope.alert.success('Successfully changed');
							$scope.reloadData();
						}, function(result) {
							$scope.alert.alert(result);
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
						AttributeSetService.visible(arr).then(function() {
							$scope.alert.success('Successfully changed');
							$scope.reloadData();
						}, function(result) {
							$scope.alert.alert(result);
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
			AttributeSetService.getAll($scope.tableParams).then(function(x){
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
				AttributeSetService.deleteBulk([{AttributeSetId: row.AttributeSetId}]).then(function() {
					$scope.alert.success('You have successfully deleted an entry.');
					$scope.reloadData();
				}, function(err) {
					$scope.alert.error(err);
				});
			},
			duplicate: function(row) {
				$scope.alert.close();
				AttributeSetService.duplicate(row.AttributeSetId).then(function() {
					$scope.alert.success();
					$scope.reloadData();
				}, function(err) {
					$scope.alert.error(err);
				});
			},
			toggle: function(row) {
				row.Visibility = !row.Visibility;
				AttributeSetService.visible([row]).then(function() {
				}, function(err) {
					$scope.alert.error(err);
					$scope.reloadData();
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
	})
	.controller('AdminAttributeSetDetailCtrl', function($scope, $window, Alert, AttributeSetService, AttributeService) {
		$scope.form = {};
		$scope.formData = {};
		$scope.tagOptions = [];
		$scope.alert = new Alert();
		$scope.attributeOptions = [];
		$scope.visibleOptions = AttributeSetService.visibleOptions;
		$scope.formDataSerialized = {};
		$scope.edit = 0;
		$scope.saving = false;
		$scope.test = function(i) {
			return angular.isUndefined(i.ProductCount) || (i.ProductCount == 0);
		};

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
		
		$scope.loadAttribute = function() {
			AttributeService.getAll().then(function(data) {
				$scope.attributeOptions = data;
			});
		};
		$scope.init = function(params) {
			if(angular.isDefined(params)) {
				//edit mode
				$scope.edit = params.id;
				AttributeSetService.get($scope.edit).then(function(data) {
					$scope.formData = AttributeSetService.deserialize(data);
					console.log($scope.formData);
				});
			} else {
				//create mode!
				$scope.edit = 0;
				$scope.formData = AttributeSetService.generate();
			}
			$scope.loadAttribute();
		};
		$scope.cancel= function() {
			$window.location.href = '/admin/attributesets';
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
			$scope.formDataSerialized = AttributeSetService.serialize($scope.formData);
			if ($scope.edit) {
				$scope.saving = true;
				AttributeSetService.update($scope.edit, $scope.formDataSerialized).then(function(data) {
					$scope.alert.success('Successful saved. <a href="/admin/attributesets">View Attribute Set List</a>');
					$scope.saving = false;
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.saving = false;
					$scope.alert.error(err);
				});
			}
			else {
				$scope.saving = true;
				AttributeSetService.create($scope.formDataSerialized).then(function(data) {
					$scope.alert.success('Successful saved. <a href="/admin/attributesets">View Attribute Set List</a>');
					$scope.edit = data.AttributeSetId;				
					$scope.saving = false;
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.saving = false;
					$scope.alert.error(err);
				});
			}
		};
	});