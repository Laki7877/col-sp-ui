module.exports = function($scope, $window, $controller, $uibModal, ReturnRequestService, config) {
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
		return row.Status == 'AP';
	};
	$scope.accept = function(row) {
		$window.location.href = '/returns/' + row.ReturnId;
		//Enter CN Number
		/*
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
			$scope.alert.close();
			ReturnRequestService.update(row.ReturnId, {
				Status: 'AP',
				CnNumber: data
			})
			.then(function(res) {
				$scope.alert.success('Successfully accepted.');
				row.Status = res.Status;
			}, function(err) {
				$scope.alert.error(common.getError(err));
			});
		});*/
	};
}
