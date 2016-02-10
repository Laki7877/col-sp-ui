module.exports = function($scope, $controller, ProductReviewService, config, $uibModal) {
	'ngInject';
	//Inherit from parent
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/products/reviews',
			service: ProductReviewService,
			item: 'Product Review',
			order: 'UpdatedDt',
			id: 'ReviewId',
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Unapproved", value: 'Unapproved'}
			],
			actions: [
				'View Only'
			],
			bulks: [
				{
					name: 'Approve',
					fn: function(obj) {

					},
					confirmation: {
						title: 'Approve',
						message: 'Are you sure you want to approve selected Reviews?'
					}
				},
				{
					name: 'Unapprove',
					fn: function(obj) {
						
					},
					confirmation: {
						title: 'Unapprove',
						message: 'Are you sure you want to unapprove selected Reviews?'
					}
				}
			]
		}
	});
	$scope.open = function(item) {
		$uibModal.open({
			templateUrl: 'product/productReviewModal',
			controller: function($scope, info) {
				'ngInject';
				$scope.comment = Comment;
			},
			resolve: {
				info: function() {
					return {
						UpdatedDt: item.UpdatedDt,
						Customer: item.Customer,
						Comment: item.Comment
					};
				}
			}
		});
	};
	$scope.maxRating = config.PRODUCT_REVIEW_MAX_RATING;
	$scope.reviewStatus = config.PRODUCT_REVIEW_STATUS;
};