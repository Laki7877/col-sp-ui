module.exports = function($scope, $window, AdminAccountService, NcAlert, util) {
	$scope.reload = function() {
		$scope.loading = true;
		AdminAccountService.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	$scope.alert = new NcAlert();
	$scope.tableOptions = {
		emptyMessage: 'You do not have an Admin Account'
	};
	$scope.params = {
		_order: 'UserId',
		_limit: 10,
		_offset: 0,
		_direction: 'asc'
	};
	$scope.list = {
		total: 0,
		data: []
	};
	$scope.bulkContainer = [];
	$scope.bulks= [
		util.bulkDelete(AdminAccountService, 'UserId', 'Admin Accounts', $scope.alert, $scope.reload)
	];
	$scope.actions = [
		util.actionView('/admin/accounts', 'UserId'),
		util.actionDelete(AdminAccountService, 'UserId', 'Admin Accounts', $scope.alert, $scope.reload, function(obj, id) {
			_.remove($scope.bulkContainer, function(e) {
				return e[id] === obj[id];
			});
		})
	];
	$scope.loading = false;
	$scope.reload();
	$scope.$watch('params', $scope.reload, true);
};