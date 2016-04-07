module.exports = function($scope, ShopAppearanceService, ImageService, NcAlert, config, util, common) {
	$scope.form = {};
	$scope.formData = {};
	$scope.alert = new NcAlert();
	$scope.saving = false;
	$scope.loading = true;
	$scope.themes = [];

	//Load theme
	ShopAppearanceService.getThemes()
		.then(function(data) {
			$scope.themes = data;
		});

	//Load ShopAppearance
	ShopAppearanceService.list()
		.then(function(data) {
			$scope.formData = data;
			$scope.selectTheme($scope.formData.ThemeId);
		});

	$scope.logoUploader = ImageService.getUploaderFn('/ShopImages', {
		data: { IsLogo: true }
	});

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
	$scope.selectTheme = function(id) {
		ShopAppearanceService.getTheme(id)
			.then(function(data) {
				$scope.formData.ThemeId = id;
				$scope.loading = false;
				$scope.theme = data;
				$scope.bannerUploader = ImageService.getUploaderFn('/ShopImages/' + id);
				$scope.thumbUploader = ImageService.getUploaderFn('/ShopImages/' + id);

				// Readjust components if any
				if($scope.hasComponent('Banner')) {
					// Banner
					var diff = $scope.formData.Banner.Images.length - $scope.getComponent('Banner').Count;
					for (var i = 0; i < diff; i++) {
						$scope.formData.Banner.Images.pop();
					};
				}
				if($scope.hasComponent('Layout')) {
					var layouts = $scope.formData.Layouts;
					$scope.formData.Layouts = [];
					for (var i = 0; i < $scope.getComponent('Layout').Count; i++) {
						$scope.formData.Layouts.push(layouts[i] || {});
					};
				}
				if($scope.hasComponent('Video')) {
					var videos = $scope.formData.Videos;
					$scope.formData.Videos = [];
					for (var i = 0; i < $scope.getComponent('Video').Count; i++) {
						$scope.formData.Videos.push(videos[i] || {});
					};
				}
			});
	};
	$scope.hasComponent = function(name) {
		if(_.isNil($scope.theme)) {
			return false;
		} else {
			return _.findIndex($scope.theme.ThemeComponentMaps, function(e) {
				return e.ComponentName == name;
			}) >= 0;
		}
	};
	$scope.getComponent = function(name) {
		if(_.isNil($scope.theme)) {
			return;
		} else {
			return _.find($scope.theme.ThemeComponentMaps, function(e) {
				return e.ComponentName == name;
			});
		}
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
	$scope.uploadThumbnail = function(file, video) {
		if(_.isNil(file)) {
			return;
		}
		video.Thumbnail = '/assets/img/loader.gif';

		$scope.thumbUploader.upload(file)
			.then(function(response) {
				video.Thumbnail = response.data.Url;
			}, function(err) {
				video.Thumbnail = '';
				$scope.alert.error(common.getError(err.data));
			});
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
				$scope.formData.ShopImage = null;
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
};