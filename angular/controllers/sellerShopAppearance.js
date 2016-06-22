/**
 * Shop appearance
 */
module.exports = function($scope, ShopAppearanceService, LocalCategoryService, Product, ImageService, NcAlert, config, util, common, $timeout, $q) {
	'ngInject';
	// form validation
	$scope.form = {};
	$scope.formData = { ThemeId: 0, Data: {} }; //default id = 0
	$scope.themeArray = {}; // cached themes
	$scope.alert = new NcAlert(); // alert bar
	$scope.saving = false;
	$scope.loading = true;
	$scope.products = []; //searched product
	$scope.themes = []; //loaded themes
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

	//upload image endpoint for all components
	$scope.uploader = ImageService.getUploaderFn('/ThemeImages');

	//on init
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
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	// product search
	$scope.getProducts = function(search) {
		Product.list({
			_limit: 16,
			searchText: search
		}).then(function(data) {
			$scope.products = data.data;
		});
	}

	$scope.getCategories = function(search) {
		LocalCategoryService.list().then(function(data) {
			console.log(data);
			$scope.categories = data;
		});
	}

	$scope.init();

	// switch cache when theme id changes
	$scope.$watch('formData.ThemeId', function(a,b) {
		if(b == 0) return;
		$scope.themeArray[b] = $scope.formData.Data;
		$scope.formData.Data = $scope.themeArray[a] || {};
	}, true);

	//onsave
	$scope.save = function() {
		if($scope.saving) return;

		$scope.alert.close();

		//Activate form submission state
		$scope.form.$setSubmitted();

		//validate form
		if($scope.form.$valid) {
			$scope.saving = true;

			//update shop appearance
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

	//image upload fail
	$scope.uploadFail = function(e, arg1, arg2, arg3) {
		$scope.alert.close();
		if(e == 'ondimension') {
			if(arg3) {
				$scope.alert.error('Image width must be ' + arg2 + ' pixels');
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
