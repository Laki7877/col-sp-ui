module.exports = function($scope, $controller, NewsletterService) {
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
};