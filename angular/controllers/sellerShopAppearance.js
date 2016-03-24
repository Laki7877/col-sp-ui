module.exports = function($scope, ShopAppearanceService, ImageService, NcAlert, config, util) {
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false;
	$scope.loading = false;

	$scope.logoUploader = ImageService.getUploaderFn('/ShopImages', {
		data: { IsLogo: true }
	});
	$scope.bannerUploader = ImageService.getUploaderFn('/ShopImages');
	$scope.init = function() {
		$scope.loading = true;
		ShopAppearanceService.list()
			.then(function(data) {
				$scope.formData = ShopAppearanceService.deserialize(data);
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	$scope.save = function() {
		if($scope.saving) return;
		
		//Activate form submission
		$scope.form.$setSubmitted();

		if($scope.form.$valid) {
			ShopAppearanceService.updateAll(ShopAppearanceService.serialize($scope.formData))
				.then(function(data) {
					$scope.formData = ShopAppearanceService.deserialize(data);
					$scope.alert.success('Successfully Saved.');
					$scope.form.$setPristine(true);
				}, function(err) {
					$scope.alert.error(common.getError(err));
				})
				.finally(function() {
					$scope.saving = false;
				});
		} else {
			//Form id
			$scope.alert.error(util.saveAlertError());
		}
	}
	$scope.uploadLogo = function(file) {
		if(_.isNil(file)) {
			return;
		}
		$scope.formData.ShopImage = {
			url: '/assets/img/loader.gif'
		};
		$scope.logoUploader.upload(file)
			.then(function(response) {
				$scope.formData.ShopImage = response.data;
			}, function(err) {
				$scope.formData.ShopImage = null;
				$scope.alert.error(common.getError(err));
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
};