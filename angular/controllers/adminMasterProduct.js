module.exports = function($scope, $controller, $window, AdminMasterProductService, config) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/admin/masters',
			service: AdminMasterProductService,
			item: 'Master Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			actions: [{
				name: 'Edit Master Product',
				fn: function(item) {

				}
			}, {
				name: 'Edit Grouping',
				fn: function(item) {
					
				}
			}]
		}
	});
	$scope.getChildProducts = function(list) {
		return _.join(_.map(list, function(e) { return e.Pid }), ', ');
	};
};