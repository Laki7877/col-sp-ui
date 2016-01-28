module.exports = function($scope, $window, AdminAccountService, NcAlert) {
	$scope.alert = new NcAlert();
	$scope.tableOptions = {
		emptyMessage: 'You do not have an Account'
	};
	$scope.params = {
		_order: 'UserId',
		_limit: 10,
		_offset: 0,
		_direction: 'desc'
	};
	$scope.list = {
		total: 0,
		data: []
	};
	$scope.bulks= [{
		name: 'Delete',
		fn: function(array) {
			$scope.alert.close();
			AdminAccountService.delete(array)
				.then(function() {
					$scope.alert.success();
				}, function() {
					$scope.alert.error();
				})
				.finally($scope.reload);
		}
	}];
	$scope.actions = [{
		name: 'View / Edit',
		fn: function(item) {
			$window.location.href="/admin/accounts/" + item.UserId;
		}
	}, {
		name: 'Delete',
		fn: function(item) {
			AdminAccountService.delete([item])
				.then(function() {
					$scope.alert.success();
				}, function() {
					$scope.alert.error();
				})
				.finally($scope.reload);
		}
	}];
	$scope.loading = false;
	$scope.reload = function() {
		$scope.loading = true;
		AdminAccountService.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.loading = false;
			});
	}
	$scope.reload();
	$scope.$watch('params', $scope.reload, true);
};