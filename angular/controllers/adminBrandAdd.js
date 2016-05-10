module.exports = function($scope, $controller, Product, BrandService, ImageService, common, config) {
	'ngInject';
	$scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY;
	$scope.products = [];
	$scope.availableProducts = -1;
	$scope.logoUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { Type: 'Logo' }
	});
	$scope.bannerUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { Type: 'Banner' }
	});
	$scope.bannerSmUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { Type: 'SmallBanner' }
	});
	$scope.bannerOptions = {
		validateDimensionMin: [1920, 1920],
		validateDimensionMax: [1080, 1080]
	};
	$scope.bannerSmOptions = {
		validateDimensionMin: [1600, 1600],
		validateDimensionMax: [900, 900]
	};
	$scope.uploadLogo = function(file) {
		if(_.isNil(file)) {
			return;
		}
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
	$scope.getFeatureProduct = function(text) {
		Product.advanceList({
			Brands: [{BrandId: $scope.id}],
			_limit: 8,
			searchText: text
		}).then(function(response) {
			$scope.products = response.data;
		});	
	};
	$scope.status = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
	$scope.sortby = [];
	
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'BrandId',
			url: '/admin/brands',
			item: 'Brand',
			service: BrandService,
			onLoad: function(scope, flag) {
				common.getSortBy().then(function(data) {
					$scope.sortBy = data;
				});

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
