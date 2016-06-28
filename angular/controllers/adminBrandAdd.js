/**
 * Handle admin brand adding page
 */
module.exports = function($scope, $controller, Product, BrandService, ImageService, common, config) {
	'ngInject';
	$scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY; //typeahead delay
	$scope.products = []; //products
	$scope.availableProducts = -1;

	//Image uploader
	$scope.logoUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { Type: 'Logo' }
	});
	$scope.bannerUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { Type: 'Banner' }
	});
	$scope.bannerSmUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { Type: 'SmallBanner' }
	});
	//Validate img size
	$scope.bannerOptions = {
		validateDimensionMin: [1920, 1080],
		validateDimensionMax: [1920, 1080]
	};
	$scope.bannerSmOptions = {
		validateDimensionMin: [1600, 900],
		validateDimensionMax: [1600, 900]
	};

	//on upload logo
	$scope.uploadLogo = function(file) {
		if(_.isNil(file)) {
			return;
		}
		//placeholder
		$scope.formData.BrandImage = {
			url: '/assets/img/loader.gif'
		};
		$scope.logoUploader.upload(file)
			.then(function(response) {
				$scope.formData.BrandImage = response.data;
			}, function(err) {
				$scope.formData.BrandImage = null;
				$scope.alert.error(common.getError(err.data));
			});
	};
	//on validation fail
	$scope.uploadBannerFail = function(e, response, min, max) {
		if(e == 'onmaxsize') {
			$scope.alert.error('Cannot exceed 8 images');
		}
		else if(e == 'ondimension') {
			$scope.alert.error('Image must be 1920x1080 pixels');
		}
		else if(e == 'onfilesize') {
			$scope.alert.error('Each image file size must not exceed 5MB')
		}
		else {
			$scope.alert.error(common.getError(response.data));
		}
	};
	$scope.uploadBannerSmFail = function(e, response, min, max) {
		if(e == 'onmaxsize') {
			$scope.alert.error('Cannot exceed 8 images');
		}
		else if(e == 'ondimension') {
			$scope.alert.error('Image must be 1600x900 pixels');
		}
		else if(e == 'onfilesize') {
			$scope.alert.error('Each image file size must not exceed 5MB')
		}
		else {
			$scope.alert.error(common.getError(response.data));
		}
	};

	//search feature products
	$scope.getFeatureProduct = function(text) {
		Product.advanceList({
			Brands: [{BrandId: $scope.id}],
			_limit: 8,
			searchText: text
		}).then(function(response) {
			$scope.products = response.data;
		});	
	};

	//status dropdown
	$scope.status = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
	$scope.sortby = [];

	//flag for image is uploading
	var isUploading = function(images) {
		var i = true;
		_.forEach(images, function(e) {
			if(e.progress) {
				i = i && (e.progress >= 100.0);
			}
		});
		return !i;
	}

	//inherit from add ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'BrandId',
			url: '/admin/brands',
			item: 'Brand',
			service: BrandService,
			onSave: function(scope) {
				//only allow save when uploading finished
				if(isUploading($scope.formData.BrandBannerEn) ||
					isUploading($scope.formData.BrandBannerTh) ||
					isUploading($scope.formData.BrandSmallBannerEn) ||
					isUploading($scope.formData.BrandSmallBannerTh) ) {
		    		$scope.alert.error('Please wait for every images to be uploaded before saving');
					return true;
				}
			},
			onLoad: function(scope, flag) {
				//get sortBy list
				common.getSortBy().then(function(data) {
					$scope.sortBy = data;
				});

				//is update
				if(flag) {
					//Check if product exist for this brand
					Product.advanceList({
							Brands: [{BrandId: $scope.id}],
							_limit: 1,
						}).then(function(response) {
							$scope.availableProducts = response.total;
						});
				}
			}
		}
	});
};