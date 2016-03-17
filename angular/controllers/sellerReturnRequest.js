module.exports = function($scope, $controller, $uibModal, SellerReturnRequestService, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/returns',
			service: SellerReturnRequestService,
			item: 'Return Request',
			order: 'UpdatedDt',
			id: 'ReturnId',
			actions: ['View'],
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
	$scope.accept = function(row) {
		var modal = $uibModal.open({
			templateUrl: 'order/modalAcceptReturn',
			controller: function($scope, $uibModalInstance) {
				$scope.model = '';
				$scope.close = function() {
					$uibModalInstance.close($scope.model);
				};
			},
		});

		modal.result.then(function(data) {

		});
	};
}
