module.exports = function($scope, $controller, BrandService, ImageService, common) {
	'ngInject';
	$scope.logoUploader = ImageService.getUploaderFn('/BrandImages');
	$scope.bannerUploader = ImageService.getUploaderFn('/Banner');
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
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'BrandId',
			url: '/admin/brands',
			item: 'Brand',
			service: BrandService,
			onSave: function(scope) {
				return false;
			}
		}
	});
};
