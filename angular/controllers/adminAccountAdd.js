module.exports = function($scope, $window, AdminAccountService, AdminRoleService, NcAlert, util, common) {
	$scope.formData = {};
	$scope.form = {};
	$scope.roles = [];
	$scope.alert = new NcAlert();
	$scope.saving = false; //prevent multiple saving
	$scope.loading = false;

	util.warningOnLeave($scope, 'form');

	$scope.init = function(params) {
		//Fetch GET Params
		if(!_.isUndefined(params)) {
			$scope.id = _.isInteger(_.parseInt(params.id)) ? _.parseInt(params.id) : 0;
		}
		//Get all available roles
		AdminRoleService.listAll()
			.then(function(data) {
				$scope.roles = _.map(data, function(e) {
					//Pick only necessary property
					return _.pick(e, ['GroupId', 'GroupNameEn']);
				});
			});

		//Edit mode
		if($scope.id > 0) {
			$scope.loading = true;
			$scope.title = config.TITLE.ADMIN_ACCOUNT_EDIT;
			
			//Get by id
			AdminAccountService.get($scope.id)
				.then(function(data) {
					$scope.formData = AdminAccountService.deserialize(data);
					$scope.loading = false;
				}, function() {
					//Jump back
					util.page404();
				});
		} else {
			//Create mode
			$scope.formData = AdminAccountService.generate();
		}
	}
	$scope.cancel = function() {
		//Back to listing
		$window.location.href='/admin/accounts';
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
			var data = AdminAccountService.serialize($scope.formData);

			if($scope.id > 0) {
				//Edit mode
				AdminAccountService.update($scope.id, data)
					.then(function(result) {
						$scope.alert.success(util.saveAlertSuccess('Admin Account', '/admin/accounts'));
						$scope.form.$setPristine(true);
					}, function(err) {
						$scope.alert.error(common.getError(err));
					})
					.finally(function() {
						$scope.saving = false;
					});
			} else {
				//Save mode
				AdminAccountService.create(data)
					.then(function(result) {
						$scope.id = result.UserId;
						$scope.formData.UserId = result.UserId; 
						$scope.alert.success(util.saveAlertSuccess('Admin Account', '/admin/accounts'));
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
		$scope.title = util.getTitle(val,'Admin Account');
	});
};