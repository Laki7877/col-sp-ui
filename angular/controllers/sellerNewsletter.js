module.exports = function($scope, $controller, $uibModal, NewsletterService) {
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