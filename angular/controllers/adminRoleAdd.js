module.exports = function($scope, $window, AdminRoleService, AdminPermissionService, NcAlert, util) {
	$scope.formData = {};
	$scope.form = {};
	$scope.alert = new NcAlert();
	$scope.saving = false; //prevent multiple saving
	$scope.loading = false;

	util.warningOnLeave($scope, 'form');

	$scope.init = function(params) {
		//Fetch GET Params
		if(!_.isUndefined(params)) {
			$scope.id = _.isInteger(_.parseInt(params.id)) ? _.parseInt(params.id) : 0;
		}
		//Edit mode
		if($scope.id > 0) {
			$scope.loading = true;
			AdminRoleService.get($scope.id)
				.then(function(data) {
					$scope.formData = AdminRoleService.deserialize(data);
					$scope.loading = false;
				}, function() {
					//Jump back
					util.page404();
				});
		} else {
			//Create mode
			$scope.formData = AdminRoleService.generate();
		}
	}
	$scope.cancel = function() {
		//Back to listing
		$window.location.href='/admin/roles';
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
			var data = AdminRoleService.serialize($scope.formData);
			if($scope.id > 0) {
				//Edit mode
				AdminRoleService.update($scope.id, data)
					.then(function(result) {
						$scope.alert.success(util.saveAlertSuccess('Admin Role', '/admin/roles'));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(util.saveAlertError());
					})
					.finally(function() {
						$scope.saving = false;
					});
			} else {
				//Save mode
				AdminRoleService.create(data)
					.then(function(result) {
						$scope.id = result.GroupId;
						$scope.formData.GroupId = result.GroupId; 
						$scope.alert.success(util.saveAlertSuccess('Admin Role', '/admin/roles'));
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
		$scope.title = util.getTitle(val,'Admin Role');
	});
}