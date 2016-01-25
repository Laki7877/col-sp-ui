angular.module('app.admin')
	.controller('AdminBrandListCtrl', function($scope, util, config, BrandService, Alert, $window){
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
						BrandService.deleteBulk(arr).then(function() {
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
				BrandService.deleteBulk([{BrandId: row.BrandId}]).then(function() {
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
			BrandService.getAll($scope.tableParams).then(function(x){
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
				BrandService.deleteBulk([{BrandId: row.BrandId}]).then(function() {
					$scope.alert.success('You have successfully remove an entry.');
					$scope.reloadData();
				}, function(err) {
					$scope.alert.error(err);
				});
			},
			duplicate: function(row) {
				$scope.alert.close();
				BrandService.duplicate(row.BrandId).then(function() {
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
	})
	.controller('AdminBrandDetailCtrl', function($scope, $window, ImageService, BrandService, Alert) {
		$scope.edit = 0;
		$scope.uploader = ImageService.getUploader('/BrandImages', {
			queueLimit: 1
		});
		$scope.alert = new Alert();
		$scope.form = {};
		$scope.formData = {
			BrandImages: []
		};

		var customImageQueueHandler = function(images, item, obj) {
			item.remove();
			item.cancel();
			$scope.alert.error('Your brand cannot have more than 1 image');
			return false;
		};
		
		$scope.cancel= function() {
			$window.location.href = '/admin/brands';
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

		$scope.$on('delete', function(e, item, arr, indx, uploader){
			angular.forEach(uploader.queue, function(i) {
				if(i.indx == indx) {
					i.remove();
					i.cancel();
				}
			});
			arr.splice(indx, 1);
		});
	   	$scope.$on('zoom', function(evt, item, array, index) {
	   		//Should use angular way, but ok whatever
	        $('#product-image-zoom img').attr('src', item.url);
	        $('#product-image-zoom').modal('show');
	   	});

		$scope.init = function(params) {
			if(angular.isDefined(params) && angular.isDefined(params.id)) {
				$scope.edit = params.id;
				BrandService.getOne(params.id).then(function(data) {
					$scope.formData = BrandService.deserialize(data);
					ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages, customImageQueueHandler);
				}, function(err) {
					$window.location.href = '/admin/brands';
				});
			} else {
				//Assign uploader images
				ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages, customImageQueueHandler);
			}
		};

		$scope.cancel = function() {
			$window.location.href = '/admin/brands';
		}
		
		$scope.save = function() {
			if($scope.saving) {
				return;
			}

			if($scope.formData.BrandImages.length == 0) {
				$scope.alert.error('Your brand must have 1 image');
				return;
			}

			if($scope.uploader.isUploading) {
				$scope.alert.error('Please wait until the uploading is finished.');
				return;
			}

			$scope.form.$setSubmitted();
			if($scope.form.$invalid) {
				$scope.alert.error('Please fill out the required fields.');
				return;
			}

			$scope.alert.close();
			$scope.saving = true;
			$scope.formDataSerialized = BrandService.serialize($scope.formData);
			if($scope.edit > 0) {
				BrandService.update($scope.edit, $scope.formDataSerialized).then(function(res){
					$scope.alert.success('Successful saved. <a href="/admin/brands">View Brand List</a>');
					$scope.saving = false;
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.saving = false;
					$scope.alert.error(err);
				});
			} else {
				BrandService.publish($scope.formDataSerialized).then(function(res){
					$scope.alert.success('Successful saved. <a href="/admin/brands">View Brand List</a>');
					$scope.edit = res.BrandId;				
					$scope.saving = false;
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.saving = false;
					$scope.alert.error(err);
				});
			}
		};
	});