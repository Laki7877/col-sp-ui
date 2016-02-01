module.exports = function($scope, $window, AdminShoptypeService, NcAlert, util) {
	$scope.reload = function() {
		$scope.loading = true;
		AdminShoptypeService.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	$scope.alert = new NcAlert();
	$scope.tableOptions = {
		emptyMessage: 'You do not have a Shop Account'
	};
	$scope.params = {
		_order: 'ShopTypeId',
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
		fn: util.bulkDelete(AdminShoptypeService, 'ShopTypeId', 'Shop Types', $scope.alert, $scope.reload)
	}];
	$scope.actions = [
	{
		name: 'View / Edit',
		fn: util.actionView('/admin/shoptypes', 'ShopTypeId')
	}, 
	{
		name: 'Delete',
		fn: util.actionDelete(AdminShoptypeService, 'ShopTypeId', 'Shop Types', $scope.alert, $scope.reload, function(obj, id) {
			_.remove($scope.bulkContainer, function(e) {
				return e[id] === obj[id];
			});
		})
	}];
	$scope.loading = false;
	$scope.reload();
	$scope.$watch('params', $scope.reload, true);
}