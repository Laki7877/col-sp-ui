module.exports = function($scope, $controller, ProductReviewService, $uibModal) {
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
};