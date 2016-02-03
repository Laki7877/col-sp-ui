module.exports = function($scope, $window, AdminShopService, AdminShoptypeService, NcAlert, util, config) {
	$scope.formData = {};
	$scope.form = {};
	$scope.shoptypes = [];
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
	$scope.alert = new NcAlert();
	$scope.saving = false; //prevent multiple saving
	$scope.loading = false;

	util.warningOnLeave($scope, 'form');

	$scope.init = function(params) {
		//Fetch GET Params
		if(!_.isUndefined(params)) {
			$scope.id = _.isInteger(_.parseInt(params.id)) ? _.parseInt(params.id) : 0;
		}

		//Load all shop types
		AdminShoptypeService.listAll()	
			.then(function(data) {
				$scope.shoptypes = data;
			});

		//Edit mode
		if($scope.id > 0) {
			$scope.loading = true;
			AdminShopService.get($scope.id)
				.then(function(data) {
					$scope.formData = AdminShopService.deserialize(data);
				$scope.loading = false;
				}, function() {
					//Jump back
					util.page404();
				});
		} else {
			//Create mode
			$scope.formData = AdminShopService.generate();
		}
	}
	$scope.cancel = function() {
		//Back to listing
		$window.location.href='/admin/shops';
	};
	$scope.save = function() {
		//Already saving
		if($scope.saving) return;

		//Activate form submission
		$scope.form.$setSubmitted();

		//Form validation
		if($scope.form.$valid) {
			$scope.saving = true;
			$scope.alert.close();
			var data = AdminShopService.serialize($scope.formData);
			if($scope.id > 0) {
				//Edit mode
				AdminShopService.update($scope.id, data)
					.then(function(result) {
						$scope.alert.success(util.saveAlertSuccess('Admin Shop', '/admin/shops'));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
					});
			} else {
				//Save mode
				AdminShopService.create(data)
					.then(function(result) {
						$scope.id = result.ShopId;
						$scope.formData.ShopId = result.ShopId; 
						$scope.alert.success(util.saveAlertSuccess('Admin Shop Account', '/admin/shops'));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
					});	
			}
		} else {
			//Invalid save
			$scope.alert.error(util.saveAlertError());
		}
	};
	$scope.$watch('id', function(val) {
		$scope.title = util.getTitle(val,'Shop Account');
	});
}