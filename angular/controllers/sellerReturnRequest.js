module.exports = function($scope, $controller, $uibModal, ReturnRequestService, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/returns',
			service: ReturnRequestService,
			item: 'Return Request',
			order: 'UpdatedDt',
			id: 'ReturnId',
			actions: ['View Only'],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Accepted", value: 'Accepted'},
				{ name: "Waiting", value: 'Waiting'}
			]
		}
	});
	$scope.status = config.RETURN_STATUS;
	$scope.getDisabled = function(row) {
		return row.Status == 'WA';
	};
	$scope.accept = function(row) {
		//Enter CN Number
		var modal = $uibModal.open({
			size: 'size-warning',
			templateUrl: 'order/modalAcceptReturn',
			controller: function($scope, $uibModalInstance) {
				$scope.model = '';
				$scope.close = function() {
					if(_.isEmpty($scope.model)) return;
					$uibModalInstance.close($scope.model);
				};
			},
		});

		modal.result.then(function(data) {
			//Data == CN number
			ReturnRequestService.update(row.ReturnId, {
				Status: 'AP',
				CnNumber: data
			})
			.then(function(res) {
				row.Status = res.Status;
			}, function(err) {
				$scope.alert.error(common.getError(err));
			});
		});
	};
}
