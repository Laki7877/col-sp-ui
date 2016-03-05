module.exports = function($scope, $controller, Product, BrandService, ImageService, common, config) {
	'ngInject';
	$scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY;
	$scope.products = [];
	$scope.availableProducts = -1;
	$scope.logoUploader = ImageService.getUploaderFn('/BrandImages');
	$scope.bannerUploader = ImageService.getUploader('/BrandImages');
	$scope.uploadLogo = function(file) {
		$scope.formData.BrandImage = {
			url: '/assets/img/loader.gif'
		};
		$scope.logoUploader.upload(file)
			.then(function(response) {
				$scope.formData.BrandImage = response.data;
			}, function(err) {
				$scope.alert.error(common.getError(err.data));
			});
	};
	$scope.uploadBannerFail = function(e, response) {
		if(e == 'onmaxsize') {
			$scope.alert.error('Maximum number of banner reached. Please remove previous banner to upload a new one');
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
	$scope.$watchCollection('formData.BrandBannerEn+formData.BrandBannerTh+formData.Brand', function(a,b) {
		if(!_.isNil(b)) {
			$scope.form.$setDirty();
		}
	});
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'BrandId',
			url: '/admin/brands',
			item: 'Brand',
			service: BrandService,
			onSave: function(scope) {
				return false;
			},
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
