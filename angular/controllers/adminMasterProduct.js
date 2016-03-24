module.exports = function($scope, $controller, AdminMasterProductService, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/masters',
			service: AdminMasterProductService,
			item: 'Master Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: ['View']
		}
	});
	$scope.getChildProducts = function(list) {
		return _.join(_.map(list, function(e) { return e.Pid }), ', ');
	};
};