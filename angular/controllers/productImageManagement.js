<<<<<<< HEAD
module.exports = ['$scope', 'Product', 'util', 'NcAlert', '$window', 'FileUploader', 'ImageService', 'config', 'common', 
function ($scope, Product, util, NcAlert, $window, FileUploader, ImageService, config, common) {
    $scope.response = {};
    $scope.alert = new NcAlert();
    $scope.filterOptions = [
			{ name: "All", value: 'All'},
			{ name: "Image Missing", value: 'ImageMissing'},
			{ name: "Approved", value: 'Approved'},
			{ name: "Not Approved", value: 'NotApproved'},
			{ name: "Wait Approval", value: 'WaitApproval'}
	];
	$scope.params = {
			_order: 'ProductId',
			_limit: 10,
			_offset: 0,
			_direction: 'asc',
			_filter: 'All'
	};
	$scope.imageDropzoneOptions = {
		urlKey: 'url'
	};
	$scope.imageGalleryOptions = {
		urlKey: 'url',
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
				array.splice(index, 1);
			},
			icon: 'fa-trash',
			confirmation: {
				title: 'Confirm to delete',
				message: 'Are you sure you want to delete the image?'
			}
		}]
	};
	$scope.dirty = false;
    $scope.uploader = ImageService.getUploader('/ProductImages');
    $scope.productStatus = config.PRODUCT_STATUS;
    
    //Prevent unsaved event
    $scope.onUnsave = function() {
    	if($scope.dirty) {
    		return confirm('Your change will not be saved.');
    	}
    	return true;
    };
    util.warningOnLeave(function() {
    	return !$scope.dirty;
    });

    $scope.getTemplate = function(product) {
    	var images = null;
    	if(product.IsVariant) {
    		images = product.VariantImg;
    	} else {
    		images = product.MasterImg;
    	}

    	switch(product.Status) {
    		case 'DF':
    			if(images.length >= 10) {
    				return 'product/dropzone/reachMax';
    			} else {
    				return 'product/dropzone/normal';
    			}
    		break;
    		case 'WA':
    			return 'product/dropzone/waitForApproval';
    		break;
    	}
    	return '';
    };
    $scope.getContainer = function(product) {
    	var images = null;
    	if(product.IsVariant) {
    		images = product.VariantImg;
    	} else {
    		images = product.MasterImg;
    	}

    	if(images.length < 10 && product.Status == 'DF') {
    		return '';
    	}
    	return 'disabled';
    }
	$scope.reload = function(){
		$scope.loading = true;
		Product.getAllVariants($scope.params).then(function(data){
			$scope.loading = false;
	        $scope.ignored = true;
	        $scope.response = data;
	        $scope.watcher = _.map(data.data, function(e) {
	        	if(e.IsVariant) {
	        		return e.VariantImg;
	        	} else {
	        		return e.MasterImg;
	        	}
	        });
	    });
	}
	$scope.save = function() {
		//Set dirty to false after you save
		if($scope.dirty) {
			Product.updateAllVariants($scope.response.data)
				.then(function(data) {
					$scope.dirty = false;
					$scope.alert.success("Successfully save changes.");
					$scope.reload();
				}, function(err) {
					console.log(err);
					$scope.alert.error(common.getError(err));
				});
		}
	}
    $scope.$watch('watcher', function(val, val2) {
    	if(!_.isUndefined(val2) && !$scope.ignored) {
    		$scope.dirty = true;
    	}
    	$scope.ignored = false;
    }, true);
    $scope.$watch('params', $scope.reload, true);
}];
=======
module.exports = ['$scope', 'Product', 'util', 'NcAlert', '$window', 'FileUploader', 'ImageService', 'config', 'common', 
function ($scope, Product, util, NcAlert, $window, FileUploader, ImageService, config, common) {
    $scope.response = {};
    $scope.alert = new NcAlert();
    $scope.filterOptions = [
			{ name: "All", value: 'All'},
			{ name: "Image Missing", value: 'ImageMissing'},
			{ name: "Approved", value: 'Approved'},
			{ name: "Not Approved", value: 'NotApproved'},
			{ name: "Wait Approval", value: 'WaitApproval'}
	];
	$scope.params = {
			_order: 'ProductId',
			_limit: 10,
			_offset: 0,
			_direction: 'asc',
			_filter: 'All'
	};
	$scope.imageDropzoneOptions = {
		urlKey: 'url'
	};
	$scope.imageGalleryOptions = {
		urlKey: 'url',
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
				array.splice(index, 1);
			},
			icon: 'fa-trash',
			confirmation: {
				title: 'Confirm to delete',
				message: 'Are you sure you want to delete the image?'
			}
		}]
	};
	$scope.dirty = false;
    $scope.uploader = ImageService.getUploader('/ProductImages');
    $scope.productStatus = config.PRODUCT_STATUS;
    
    //Prevent unsaved event
    $scope.onUnsave = function() {
    	if($scope.dirty) {
    		return confirm('Your change will not be saved.');
    	}
    	return false;
    };
    util.warningOnLeave(function() {
    	return !$scope.dirty;
    });

    $scope.getTemplate = function(product) {
    	var images = null;
    	if(product.IsVariant) {
    		images = product.VariantImg;
    	} else {
    		images = product.MasterImg;
    	}

    	switch(product.Status) {
    		case 'DF':
    			if(images.length >= 10) {
    				return 'product/dropzone/reachMax';
    			} else {
    				return 'product/dropzone/normal';
    			}
    		break;
    		case 'WA':
    			return 'product/dropzone/waitForApproval';
    		break;
    	}
    	return '';
    };
    $scope.getContainer = function(product) {
    	var images = null;
    	if(product.IsVariant) {
    		images = product.VariantImg;
    	} else {
    		images = product.MasterImg;
    	}

    	if(images.length < 10 && product.Status == 'DF') {
    		return '';
    	}
    	return 'disabled';
    }
	$scope.reload = function(){
		$scope.loading = true;
		Product.getAllVariants($scope.params).then(function(data){
			$scope.loading = false;
	        $scope.ignored = true;
	        $scope.response = data;
	        $scope.watcher = _.map(data.data, function(e) {
	        	if(e.IsVariant) {
	        		return e.VariantImg;
	        	} else {
	        		return e.MasterImg;
	        	}
	        });
	    });
	}
	$scope.save = function() {
		//Set dirty to false after you save
		if($scope.dirty) {
			Product.updateAllVariants($scope.response.data)
				.then(function(data) {
					$scope.dirty = false;
					$scope.alert.success("Successfully save changes.");
					$scope.reload();
				}, function(err) {
					console.log(err);
					$scope.alert.error(common.getError(err));
				});
		}
	}
    $scope.$watch('watcher', function(val, val2) {
    	if(!_.isUndefined(val2) && !$scope.ignored) {
    		$scope.dirty = true;
    	}
    	$scope.ignored = false;
    }, true);
    $scope.$watch('params', $scope.reload, true);
}];
>>>>>>> 436acae478f3dce0e2ec297d3997f6eeb89957dc
