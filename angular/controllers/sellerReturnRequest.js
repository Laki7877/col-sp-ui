module.exports = function($scope, $controller, sellerReturnRequestService, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/returns',
			service: sellerReturnRequestService,
			item: 'Return Request',
			order: 'UpdatedDt',
			id: 'ReturnId',
			actions: ['View', 'Delete'],
			bulks: ['Delete'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Accepted", value: 'Accepted'},
				{ name: "Waiting", value: 'Waiting'}
			]
		}
	});
	$scope.statusOptions = config.RETURN_STATUS;
	$scope.getDisabled = function(row) {
		return row.Status == 'WA';
	};
}
