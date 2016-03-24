module.exports = function($scope, $controller, ReturnRequestService, util, config) {
	'ngInject';
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ReturnId',
			url: '/returns',
			item: 'Return Request',
			service: ReturnRequestService
		}
	});

	$scope.save = function() {
		if($scope.saving) return;
		$scope.form.$setSubmitted();
		if($scope.form.$valid) {
			$scope.saving = true;
			$scope.alert.close();
			ReturnRequestService.update($scope.formData.ReturnId, {
				Status: 'AP',
				CnNumber: $scope.formData.CnNumber
			})
			.then(function(data) {
				$scope.formData = ReturnRequestService.deserialize(data);
				$scope.alert.success(util.saveAlertSuccess('Return Request', $scope.url));
				$scope.form.$setPristine(true);
			}, function(err) {
				$scope.alert.error(common.getError(err));
			})
			.finally(function() {
				$scope.saving = false;
			});
		} else {
          $scope.alert.error(util.saveAlertError());
		}
	}
};