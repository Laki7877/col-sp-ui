module.exports = ['$scope', 'Product', 'util', 'Alert', '$window', 'FileUploader', 'config', function ($scope, Product, util, Alert, $window, FileUploader, config) {
    $scope.response = [];
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
	$scope.imageGalleryOptions = {
		urlKey: 'ImageUrlEn',
		actions: [
		{
			//Left
			fn: function(image, array, index) {
				console.log(image, array, index);
			},
			icon: 'fa-arrow-left'
		},
		{
			//Right
			fn: function(image, array, index) {
				console.log(image, array, index);
			},
			icon: 'fa-arrow-right'
		},
		{
			//Left
			fn: function(image, array, index) {
				console.log(image, array, index);
			},
			icon: 'fa-trash'
		}]
	};
    $scope.uploader = new FileUploader();
    $scope.productStatus = config.PRODUCT_STATUS;
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
			console.log(data);
			$scope.loading = false;
	        $scope.response = data;
	    });
	}
   
    $scope.$watch('params', $scope.reload, true);
}];
