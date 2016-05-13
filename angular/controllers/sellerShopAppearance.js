module.exports = function($scope, ShopAppearanceService, Product, ImageService, NcAlert, config, util, common, $timeout, $q) {
	'ngInject';
	$scope.form = {};
	$scope.formData = { data: {} };
	$scope.alert = new NcAlert();
	$scope.saving = false;
	$scope.loading = true;
	$scope.products = [];
	$scope.themes = [];
	$scope.X = {  //P'M's requested X
		width: 1920,
		height: 1080
	};
	$scope.Y = {  //P'M's requested Y
		width: 1000,
		height: 1000
	};

	//Load theme
	ShopAppearanceService.getThemes()
		.then(function(data) {
			$scope.themes = data;
		});

	/*
	$scope.selectTheme = function(id) {
		ShopAppearanceService.getTheme(id)
			.then(function(data) {
				$scope.formData.ThemeId = id;
				$scope.loading = false;
				$scope.theme = data;
				$scope.bannerUploader = ImageService.getUploaderFn('/ShopImages/' + id);
				$scope.thumbUploader = ImageService.getUploaderFn('/ShopImages');

				// Readjust components if any
				if($scope.hasComponent('Banner')) {
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
	};*/
	/*
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
	};*/

	$scope.uploader = ImageService.getUploaderFn('/ShopImages/Theme');

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
	$scope.getProducts = function(search) {
		Product.list({
			_limit: 16,
			searchText: search
		}).then(function(data) {
			$scope.products = data.data;
		});
	}
	$scope.init();
	$scope.getProducts('');
	$scope.$watch('formData.themeId', function(a,b) {
		if(a != b) {
			$scope.formData.data = {};
		}
	})
	$scope.save = function() {
		if($scope.saving) return;

		//Activate form submission
		$scope.form.$setSubmitted();

		if($scope.form.$valid) {
			$scope.saving = true;
			ShopAppearanceService.updateAll(ShopAppearanceService.serialize($scope.formData))
				.then(function(data) {
					$scope.formData = ShopAppearanceService.deserialize(data);
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
	$scope.upload = function(file, video) {
		if(_.isNil(file)) {
			return;
		}
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
	$scope.uploadFail = function(e, arg1, arg2) {
		$scope.alert.close();
		if(e == 'ondimension') {
			$scope.alert.error('Image must be ' + arg2[0] + 'x' + arg2[1] + ' pixels');
		}
		else {
			$scope.alert.error('Fail to upload photo<br>' + common.getError(arg1.data));
		}
	};
};
