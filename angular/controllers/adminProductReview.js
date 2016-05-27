module.exports = function($scope, $controller, ProductReviewService, config, $uibModal, util, common) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/products/reviews',
			service: ProductReviewService,
			item: 'Product Review',
			order: 'UpdatedDt',
			id: 'ProductReviewId'
		}
	});
	$scope.open = function(item) {
		$uibModal.open({
			size: 'lg',
			templateUrl: 'product/modalAdminReview',
			controller: function($scope, $uibModalInstance, NcAlert, info) {
				'ngInject';
				$scope.alert = new NcAlert();
				$scope.formData = _.extend({}, info);
				$scope.ratings = [];

				$scope.save = function() {
					$scope.alert.close();
					//Save this data..
					ProductReviewService.update($scope.formData.ProductReviewId, $scope.formData)
						.then(function() {
							$scope.alert.success('Successfully Saved.');
						}, function(err) {
							$scope.alert.error(common.getError(err));
						});
				};

				for (var i = 0; i <= 10; i++) {
					$scope.ratings.push(i*0.5);
				};
			},
			resolve: {
				info: function() {
					return item;
				}
			}
		}).result.then(function(data) {
			$scope.reload();
		});
	};
};
