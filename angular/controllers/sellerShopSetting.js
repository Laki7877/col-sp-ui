module.exports = function($rootScope, $scope, $controller, ShopProfileService, ImageService, NcAlert, common, config, util, storage) {
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
	$scope.shopGroupDropdown = config.DROPDOWN.SHOP_GROUP_DROPDOWN;
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false;
	$scope.loading = false;

	$scope.logoUploader = ImageService.getUploaderFn('/ShopImages', {
		data: { IsLogo: true }
	});
	$scope.init = function() {
		$scope.loading = true;
		ShopProfileService.list()
			.then(function(data) {
				$scope.formData = ShopProfileService.deserialize(data);
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
			ShopProfileService.updateAll(ShopProfileService.serialize($scope.formData))
				.then(function(data) {
					$scope.formData = ShopProfileService.deserialize(data);
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
				$scope.alert.error(common.getError(err.data));
			});
	};
};
