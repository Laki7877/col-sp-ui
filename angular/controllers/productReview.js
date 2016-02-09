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
			controller: function($scope, Comment) {
				'ngInject';
				$scope.comment = Comment;
			},
			resolve: {
				comment: function() {
					return item.Comment;
				}
			}
		});
	};
	$scope.productStatus = config.PRODUCT_STATUS;
};