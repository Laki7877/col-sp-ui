module.exports = function($scope, $window, NcAlert, util, options) {
	'ngInject';
	var a = _.includes(['a','e','i','o','u'], _.lowerCase(options.item.charAt(0))) ? 'an' : 'a';
	$scope.reload = function() {
		$scope.loading = true;
		options.service.list($scope.params)
			.then(function(data) {
				$scope.list = data;
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
	$scope.alert = new NcAlert();
	$scope.tableOptions = {
		emptyMessage: 'You do not have ' + a + ' ' + options.item
	};
	$scope.params = {
		_order: options.order,
		_limit: 10,
		_offset: 0,
		_direction: 'desc'
	};
	$scope.list = {
		total: 0,
		data: []
	};
	$scope.bulkContainer = [];
	$scope.bulks= [
		util.bulkDelete(options.service, options.id, options.item, $scope.alert, $scope.reload)
	];
	$scope.actions = [
		util.actionView(options.url, options.id),
		util.actionDelete(options.service, options.id, options.item, $scope.alert, $scope.reload, function(obj, id) {
			_.remove($scope.bulkContainer, function(e) {
				return e[id] === obj[id];
			});
		})
	];
	$scope.loading = false;
	$scope.reload();
	$scope.$watch('params', $scope.reload, true);
};