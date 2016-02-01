module.exports = function($scope, $window, AdminShoptypeService, NcAlert, util) {
	$scope.formData = {};
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false; //prevent multiple saving
	$scope.loading = false;
	$scope.selectAll = { //For checkall box
		ShopTypePermission: false,
		AppearanceSetting: false
	};

	//Recheck selectall checkbox after initial load
	//TODO: hardcode
	$scope.recheck = function() {
		var test = true;
		var test2 = true;
		var test3 = $scope.formData.Permission[3].check;

		for (var i = 0; i < 4; i++) {
			test = test && $scope.formData.Permission[i].check;
		}
		for (var i = 4; i < 8; i++) {
			test2 = test2 && && $scope.formData.Permission[i].check;
		}

		$scope.selectAll.ShopTypePermission = test;
		$scope.selectAll.AppearanceSetting = test2;
	};

	util.warningOnLeave($scope, 'form');

	$scope.init = function(params) {
		//Fetch GET Params
		if(!_.isUndefined(params)) {
			$scope.id = _.isInteger(_.parseInt(params.id)) ? _.parseInt(params.id) : 0;
		}
		//Edit mode
		if($scope.id > 0) {
			$scope.loading = true;
			AdminShoptypeService.get($scope.id)
				.then(function(data) {
					console.log(data);
					$scope.formData = AdminShoptypeService.deserialize(data);
					$scope.loading = false;
				}, function() {
					//Jump back
					$scope.cancel();
				});
		} else {
			//Create mode
			$scope.formData = AdminShoptypeService.generate();
		}
	}
	$scope.cancel = function() {
		//Back to listing
		$window.location.href='/admin/shoptypes';
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
			var data = AdminShoptypeService.serialize($scope.formData);
			if($scope.id > 0) {
				//Edit mode
				AdminShoptypeService.update($scope.id, data)
					.then(function(result) {
						$scope.alert.success(util.saveAlertSuccess('Admin Shop Type', '/admin/shoptypes'));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(util.saveAlertError());
					})
					.finally(function() {
						$scope.saving = false;
					});
			} else {
				//Save mode
				AdminShoptypeService.create(data)
					.then(function(result) {
						$scope.formData.GroupId = result.GroupId; 
						$scope.alert.success(util.saveAlertSuccess('Admin Shop Type', '/admin/shoptypes'));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(util.saveAlertError());
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

	$scope.$watch('formData.Permission', function(val, val2) {
		if($scope.formData.Permission && $scope.formData.Permission.length == 8) {
			$scope.recheck();
		}
	}, true);

	$scope.checkAll = function(val, id) {
		if(id == 'ShopTypePermission') {
			for (var i = 0; i < 4; i++) {
				$scope.formData.Permission[i].check = val;
			}
		}
		if(id == 'AppearanceSetting') {
			for (var i = 4; i < 8; i++) {
				$scope.formData.Permission[i].check = val;
			}
		}
	};
}