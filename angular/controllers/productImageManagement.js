/**
 * Handle product images
 */
module.exports = function ($scope, $controller, Product, util, NcAlert, $window, FileUploader, ImageService, config, common) {
    'ngInject';
    //inherit from list ctrl
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/products/images',
			service: Product,
			item: 'Product',
			order: 'ProductId',
			id: 'ProductId',
			actions: [],
			bulks: [],
			filters: [
					{ name: "All", value: 'All'},
					{ name: "Image Missing", value: 'ImageMissing'},
					{ name: "Approved", value: 'Approved'},
					{ name: "Not Approved", value: 'NotApproved'},
					{ name: "Draft", value: 'Draft'},
					{ name: "Wait For Approval", value: 'WaitForApproval'}
			],
			reload: function(newObj, oldObj){
				$scope.loading = true;
				//check for changes
				if(!_.isUndefined(newObj) && !_.isUndefined(oldObj)) {
					if(newObj.searchText !== oldObj.searchText) {
						$scope.params._offset = 0;
						$scope.bulkContainer.length = 0;
					}
					if(newObj._filter !== oldObj._filter) {
						$scope.params._offset = 0;
						$scope.bulkContainer.length = 0;
					}
				}
				//get product variants
				Product.getAllVariants($scope.params).then(function(data){
					$scope.loading = false;
			        $scope.ignored = true;
			        $scope.list = data;
			        //add alert bar for each entry
			        _.forEach($scope.list.data, function(e) {
			        	_.extend(e, {alert: new NcAlert() })
			        });
			        $scope.watcher = _.map(data.data, function(e) {
			        	if(e.IsVariant) {
			        		return e.VariantImg;
			        	} else {
			        		return e.MasterImg;
			        	}
			        });
			    });
			}
		}
	});

	//prompt leaving on change
    util.warningOnLeave(function() {
    	return $scope.dirty;
    });
	$scope.paginationSize = [5,10,15];
	$scope.imageDropzoneOptions = {
		urlKey: 'Url'
	};
	$scope.imageGalleryOptions = {
		urlKey: 'Url',
		actions: [
			{
				//Left
				fn: function(item, array, index) {
					//console.log(item, array, index);
				    var to = index - 1;
				    if (to < 0) return;

				    var tmp = array[to];
				    array[to] = item;
				    array[index] = tmp;
				},
				icon: 'fa-arrow-left'
			},
			{
				//Right
				fn: function(item, array, index) {
					//console.log(item, array, index);
				    var to = index + 1;
				    if (to >= array.length) return;

				    var tmp = array[to];
				    array[to] = item;
				    array[index] = tmp;
				},
				icon: 'fa-arrow-right'
			},
			{
				//Trash
				fn: function(item, array, index) {
					array.splice(array.indexOf(item), 1);
				},
				icon: 'fa-trash',
				confirmation: {
					title: 'Confirm to delete',
					message: 'Are you sure you want to delete the image?',
					btnConfirm: 'Delete',
					btnCancel: 'Cancel',
					btnClass: 'btn-red'
				}
			}
		]
	};
	$scope.dirty = false;
	//image uploader
    $scope.uploader = ImageService.getUploader('/ProductImages', {
    	formData: { Type: 'Image' }
    });
    $scope.productStatus = config.PRODUCT_STATUS;

    //callback for dropzone event
    $scope.onEvent = function(product, eventName) {
    	if(eventName == 'edit') {
    		product.Status = $scope.productStatus[0].value;
    	}
    }
    //image uploader error events
    $scope.onError = function(item, response) {
    	item.alert.close();
    	if(response.name == 'queueFilter' || response.name == 'queueLimit') {
    		item.alert.error('<span class="font-weight-bold">Fail to upload photos</span><br/>Cannot exceed 10 images for each product', null, false);
    	}
    	else if(response.name == 'sizeFilter') {
    		item.alert.error('<span class="font-weight-bold">Fail to upload photos</span><br/>Each image file size must not exceed 5MB', null, false);
    	}
    	else if(response.name == 'dimensionFilter') {
    		item.alert.error('<span class="font-weight-bold">Fail to upload photos</span><br/>Image dimension must be between 1500x1500 to 2000x2000 pixels', null, false);
    	} 
    	else if(response.name == 'ratioFilter') {
    		item.alert.error('<span class="font-weight-bold">Fail to upload photos</span><br/>Image must be a square (1:1 ratio)', null, false);
    	} 
    	else if(response.name == 'imageFilter') {
    		item.alert.error('<span class="font-weight-bold">Fail to upload photos</span><br/>Image must be a JPEGs file', null, false);
    	} else {
    		item.alert.error('<span class="font-weight-bold">Fail to upload photos</span><br/>Unknown error', null, false);
		}
	};
	//dropzone disable
    $scope.isDisabled = function(product) {
    	return product.Status == $scope.productStatus[1].value || product.Status == $scope.productStatus[2].value;
    };
    //Prevent unsaved event
    $scope.onUnsave = function() {
    	if($scope.dirty) {
    		return !confirm('Are you sure you want to leave this page?');
    	}
    	return false;
    };
    //get dropzone template
    $scope.getTemplate = function(product) {
    	var images = null;
    	if(product.IsVariant) {
    		images = product.VariantImg;
    	} else {
    		images = product.MasterImg;
    	}

    	//check product status in config for more info
    	if($scope.productStatus[1].value == product.Status) {
    		//Wait for approval
    		return 'product/dropzone/waitForApproval';
    	}

    	if($scope.productStatus[2].value == product.Status) {
    		return 'product/dropzone/approved';
    	}

    	//image size limit
		if(images.length >= 10) {
			return 'product/dropzone/reachMax';
		} else {
			return 'product/dropzone/normal';
		}
    };
    $scope.getContainer = function(product) {
    	var images = null;
    	if(product.IsVariant) {
    		images = product.VariantImg;
    	} else {
    		images = product.MasterImg;
    	}

    	if(images.length < 10 && (product.Status == $scope.productStatus[0].value || product.Status == $scope.productStatus[3].value)) {
    		return '';
    	}
    	return 'disabled';
    };
    $scope.validate = function() {
    	//Make sure everything is uploaded before saving
    	var result = false;
    	_.forEach($scope.list.data, function(item) {
    		result = result || item.isUploading;
    	});

    	if(result) {
    		$scope.alert.error('Please wait for every images to be uploaded before saving');
    	}

    	return !result;
    }
    //saving all contents
    $scope.save = function() {
    	$scope.alert.close();
    	if(!$scope.validate()) {
    		return;
    	}
    	$scope.saving = true;
		Product.updateAllVariants($scope.list.data)
			.then(function(data) {
				$scope.dirty = false;
				$scope.alert.success("Successfully save changes.");
			}, function(err) {
				$scope.alert.error(common.getError(err));
			}).finally(function() {
				$scope.saving = false;
				$scope.reload();
			});
		$scope.dirty = false;
	};
	// image missing should list by created dt
	$scope.$watch('params._filter', function(n) {
		if(n == 'ImageMissing') {
			$scope.params._order = 'CreatedDt';
			$scope.params._direction= 'asc';
		} else {
			$scope.params._order = 'ProductId';
			$scope.params._direction= 'desc';
		}
	});
	// set dirty when there's change to image
    $scope.$watch('watcher', function(val, val2) {
    	if(!_.isUndefined(val2) && !$scope.ignored) {
    		$scope.dirty = true;
    	}
    	$scope.ignored = false;
    }, true);
};