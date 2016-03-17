module.exports = function($scope, $controller, SellerReturnRequestService, config) {
	'ngInject';
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ReturnId',
			url: '/returns',
			item: 'Return Request',
			service: SellerReturnRequestService
		}
	});
};