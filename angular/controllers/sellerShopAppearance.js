module.exports = function($scope, ShopAppearanceService, Product, ImageService, NcAlert, config, util, common, $timeout, $q) {
	'ngInject';
	$scope.form = {};
	$scope.formData = { ThemeId: 0, Data: {} };
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

	$scope.uploader = ImageService.getUploaderFn('/ThemeImages');

	$scope.init = function() {
		$scope.loading = true;
		//Load theme
		ShopAppearanceService.getThemes()
			.then(function(data) {
				$scope.themes = data;
			});
		ShopAppearanceService.list()
			.then(function(data) {
				$scope.formData = ShopAppearanceService.deserialize(data);
				console.log($scope.formData);
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	var _search = undefined;
	$scope.getProducts = function(search) {
		if(search == _search) return;
		search = _search;
		Product.list({
			_limit: 16,
			searchText: search
		}).then(function(data) {
			$scope.products = data.data;
		});
	}
	$scope.init();
	$scope.$watch('formData.themeId', function(a,b) {
		if(a != b) {
			$scope.formData.Data = {};
		}
	})
	$scope.save = function() {
		if($scope.saving) return;

		$scope.alert.close();

		//Activate form submission
		$scope.form.$setSubmitted();

		if($scope.form.$valid) {
			$scope.saving = true;
			ShopAppearanceService.updateAll(ShopAppearanceService.serialize($scope.formData))
				.then(function(data) {
					$scope.formData = ShopAppearanceService.deserialize(data);
					$scope.form.$setPristine(true);
					$scope.alert.success('Successfully saved.');
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
	$scope.uploadFail = function(e, arg1, arg2, arg3) {
		$scope.alert.close();
		if(e == 'ondimension') {
			if(arg3) {
				$scope.alert.error('Image width must be greater than ' + arg2 + ' pixels');
			}
			else {
				$scope.alert.error('Image must be ' + arg2[0] + 'x' + arg2[1] + ' pixels');
			}
		}
		else {
			$scope.alert.error('<strong>Fail to upload photo</strong><br>' + common.getError(arg1.data));
		}
	};
};
