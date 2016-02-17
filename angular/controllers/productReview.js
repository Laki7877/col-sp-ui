module.exports = function($scope, $controller, ProductReviewService, config, $uibModal, common) {
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
				{
					name: 'Approve',
					fn: function(arr, cb) {
						arr = _.compact(_.map(arr, function(e) {
							var item = _.pick(e, ['Status', 'ProductReviewId']);
							if(item.Status == 'WA') item.Status = 'AP';
							else item = null;
							return item;
						}));
						if(arr.length <= 0) return;
						ProductReviewService.approve(arr)
							.then(function() {
								cb();
							}, function(err) {
								$scope.alert.error(common.getError(err));
							})
							.finally($scope.reload);
					},
					confirmation: {
						title: 'Approve',
						message: 'Are you sure you want to approve selected Reviews?'
					}
				},
				{
					name: 'Unapprove',
					fn: function(arr, cb) {
						arr = _.compact(_.map(arr, function(e) {
							var item = _.pick(e, ['Status', 'ProductReviewId']);
							if(item.Status == 'AP') item.Status = 'WA';
							else item = null;
							return item;
						}));
						if(arr.length <= 0) return;
						ProductReviewService.approve(arr)
							.then(function() {
								cb();
							}, function(err) {
								$scope.reload();
								$scope.alert.error(common.getError(err));
							})
							.finally($scope.reload);
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
			size: 'lg',
			templateUrl: 'product/productReviewModal',
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
		ProductReviewService.approve([_.pick(item, ['Status', 'ProductReviewId'])])
			.then(function() {

			}, function(err) {
				item.Status = (item.Status == 'WA') ? 'AP' : 'WA';
				$scope.alert.error(common.getError(err));
			});
	};
	$scope.maxRating = config.PRODUCT_REVIEW_MAX_RATING;
	$scope.reviewStatus = config.PRODUCT_REVIEW_STATUS;
	$scope.reviewButton = config.PRODUCT_REVIEW_BUTTON;
};