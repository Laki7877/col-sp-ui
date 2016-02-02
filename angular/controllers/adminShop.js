module.exports = function($scope, $window, AdminShopService, AdminShoptypeService, NcAlert, util, config) {
	//Reload table list
	$scope.reload = function() {
		$scope.loading = true;
		AdminShopService.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.loading = false;
			});
	}
	$scope.alert = new NcAlert();
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
	$scope.tableOptions = {
		emptyMessage: 'You do not have a Shop Account'
	};
	$scope.loading = true;
	
	//Table params
	$scope.params = {
		_order: 'ShopId',
		_limit: 10,
		_offset: 0,
		_direction: 'asc'
	};

	//Table list
	$scope.list = {
		total: 0,
		data: []
	};

	//Bulk uploading array
	$scope.bulkContainer = [];

	//Bulk actions
	$scope.bulks= [
		util.bulkDelete(AdminShopService, 'ShopId', 'Shop Accounts', $scope.alert, $scope.reload)
	];

	//Single action
	$scope.actions = [
		util.actionView('/admin/shops', 'ShopId'), 
		util.actionDelete(AdminShopService, 'ShopId', 'Shop Accounts', $scope.alert, $scope.reload, function(obj, id) {
			_.remove($scope.bulkContainer, function(e) {
				return e[id] === obj[id];
			});
		})
	];
	$scope.reload(); //init

	//Watch for table params change
	$scope.$watch('params', $scope.reload, true);
}