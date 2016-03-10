module.exports = function($scope, $controller, $uibModal, NewsletterService, AdminShopService) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/newsletters',
			service: NewsletterService,
			item: 'Newsletter',
			order: 'UpdatedDt',
			id: 'NewsletterId'
		}
	});
	$scope.shops = [];
	$scope.getShops = function(search) {
		AdminShopService.list({
				searchText: search,
				limit: 8
			})
			.then(function() {

			})
	};
	$scope.open = function(item) {
		NewsletterService.get(item.NewsletterId)
			.then(function(data) {
				$uibModal.open({
					size: 'lg',
					templateUrl: 'newsletter/modalSeller',
					controller: function($scope, item) {
						'ngInject';
						$scope.item = item;
					},
					resolve: {
						item: function() {
							return data;
						}
					}
				});
			});
	};
};