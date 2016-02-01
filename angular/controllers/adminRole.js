module.exports = function($scope, $window, AdminRoleService, NcAlert, util) {
	$scope.reload = function() {
		$scope.loading = true;
		AdminRoleService.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	$scope.alert = new NcAlert();
	$scope.tableOptions = {
		emptyMessage: 'You do not have an Admin Role'
	};
	$scope.params = {
		_order: 'GroupId',
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
	{
		name: 'Delete',
		fn: util.bulkDelete(AdminRoleService, 'GroupId', 'Admin Roles', $scope.alert, $scope.reload)
	}];
	$scope.actions = [
	{
		name: 'View / Edit',
		fn: util.actionView('/admin/roles', 'GroupId')
	}, 
	{
		name: 'Delete',
		fn: util.actionDelete(AdminRoleService, 'GroupId', 'Admin Roles', $scope.alert, $scope.reload, function(obj, id) {
			_.remove($scope.bulkContainer, function(e) {
				return e[id] === obj[id];
			});
		})
	}];
	$scope.loading = false;
	$scope.reload();
	$scope.$watch('params', $scope.reload, true);
}