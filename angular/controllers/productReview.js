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
			templateUrl: 'product/modalReview',
			controller: function($scope, info) {
				'ngInject';
				$scope.formData = _.extend({}, info);
				$scope.maxRating = config.PRODUCT_REVIEW_MAX_RATING;
			},
			resolve: {
				info: function() {
					return item;
				}
			}
		});
	};
};
