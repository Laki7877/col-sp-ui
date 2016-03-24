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
			id: 'ProductReviewId',
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Approved", value: 'Approved'},
				{ name: "Not approved", value: 'NotApproved'}
			],
			actions: [
				{
					name: 'View Detail',
					fn: function(row) {
						$scope.open(row);
					}
				}
			],
			bulks: [
				util.bulkTemplate('Approve', ProductReviewService.approve, 'ProductReviewId', 'Review', {
					btnConfirm: 'Approve',
					btnClass: 'btn-green'
				}),,
				util.bulkTemplate('Unapprove', ProductReviewService.unapprove, 'ProductReviewId', 'Review', {
					btnConfirm: 'Unapprove',
					btnClass: 'btn-red'
				})
			]
		}
	});
	$scope.open = function(item) {
		$uibModal.open({
			size: 'lg',
			templateUrl: 'product/modalReview',
			controller: function($scope, info) {
				'ngInject';
				$scope = _.extend($scope, info);
			},
			resolve: {
				info: function() {
					return {
						UpdatedDt: item.UpdatedDt,
						Customer: item.Customer,
						Comment: item.Comment,
						Pid: item.Pid,
						ProductNameEn: item.ProductNameEn,
						ProductNameTh: item.ProductNameTh,
						BrandNameEn: item.BrandNameEn
					};
				}
			}
		});
	};
	$scope.approve = function(item) {
		$scope.alert.close();
		item.Status = (item.Status == 'WA') ? 'AP' : 'WA';
		ProductReviewService.updateApprove([_.pick(item, ['Status', 'ProductReviewId'])])
			.then(function(data) {

			}, function(err) {
				item.Status = (item.Status == 'WA') ? 'AP' : 'WA';
				$scope.alert.error(common.getError(err));
			});
	};
	$scope.maxRating = config.PRODUCT_REVIEW_MAX_RATING;
	$scope.reviewStatus = config.PRODUCT_REVIEW_STATUS;
	$scope.reviewButton = config.PRODUCT_REVIEW_BUTTON;
};
