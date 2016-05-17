module.exports = function($scope, $controller, Product, BrandService, ImageService, common, config) {
	'ngInject';
	$scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY;
	$scope.products = [];
	$scope.availableProducts = -1;
	$scope.logoUploader = ImageService.getUploaderFn('/BrandImages', {
		data: { IsLogo: true }
	});
	$scope.bannerUploader = ImageService.getUploaderFn('/BrandImages');
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
	$scope.uploadBannerFail = function(e, response) {
		if(e == 'onmaxsize') {
			$scope.alert.error('Maximum number of banner reached. Please remove previous banner before adding a new one');
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
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'BrandId',
			url: '/admin/brands',
			item: 'Brand',
			service: BrandService,
			onLoad: function(scope, flag) {
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
