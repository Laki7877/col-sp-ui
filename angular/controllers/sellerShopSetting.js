module.exports = function($rootScope, $scope, $controller, ShopService, ShopProfileService, ImageService, Onboarding, NcAlert, common, config, util, storage) {
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
	$scope.shopGroupDropdown = config.DROPDOWN.SHOP_GROUP_DROPDOWN;
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false;
	$scope.loading = false;
	$scope.statusChangeable = false;

	$scope.logoUploader = ImageService.getUploaderFn('/ShopImages', {
		data: { IsLogo: true }
	});
	$scope.init = function() {
		$scope.loading = true;
		ShopProfileService.list()
			.then(function(data) {
				$scope.formData = ShopProfileService.deserialize(data);			
				Onboarding.getListCompletedTask()
					.then(function(data) {
						$scope.statusChangeable = true;
						_.forOwn(data, function(value) {
							$scope.statusChangeable = $scope.statusChangeable && value;
						});		
					}).finally(function() {
						$scope.loading = false;
					});


				$scope.$watch('formData.Province', function(newData, oldData) {
					if(_.isNil(newData) || newData == oldData) {
						return;
					}
					_.unset($scope.formData, ['City']);
					$scope.getCities(newData.ProvinceId);
				});

				$scope.$watch('formData.City', function(newData, oldData) {
					if(_.isNil(newData) || newData == oldData) {
						return;
					}
					_.unset($scope.formData, ['District']);
					$scope.getDistricts(newData.CityId);
				});

			});
	};
	$scope.fetchAllList = function() {
		ShopService.get('TermPayments')
			.then(function(data) {
				$scope.termOfPayments = data;
			});
		ShopService.get('VendorTaxRates')
			.then(function(data) {
				$scope.vendorTaxRates = data;
			});
		ShopService.get('WithholdingTaxes')
			.then(function(data) {
				$scope.withholdingTaxes = data;
			});
		ShopService.get('BankNames')
			.then(function(data) {
				$scope.bankNames = data;
			});
		ShopService.get('Provinces')
			.then(function(data) {
				$scope.provinces = data;
			});
		ShopService.get('Overseas')
			.then(function(data) {
				$scope.overseas = data;
			});
		ShopService.get('Countries')
			.then(function(data) {
				$scope.countries = data;
			});
	};
	$scope.fetchAllList();
	$scope.save = function() {
		if($scope.saving) return;
		$scope.alert.close();
		
		//Activate form submission
		$scope.form.$setSubmitted();

		if($scope.form.$valid) {
			$scope.saving = true;
			ShopProfileService.updateAll(ShopProfileService.serialize($scope.formData))
				.then(function(data) {
					$scope.formData = ShopProfileService.deserialize(data);
					$rootScope.Profile.Shop = $scope.formData;
					storage.storeCurrentUserProfile($rootScope.Profile);
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
	};
	$scope.uploadLogo = function(file) {
		if(_.isNil(file)) {
			return;
		}
		$scope.formData.ShopImage = {
			Url: '/assets/img/loader.gif'
		};
		$scope.logoUploader.upload(file)
			.then(function(response) {
				$scope.formData.ShopImage = response.data;
			}, function(err) {
				console.log(err);
				$scope.formData.ShopImage = null;
				$scope.alert.error(common.getError(err.data));
			});
	};
};
