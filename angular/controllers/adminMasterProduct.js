/**
 * Handle admin master product listing page
 */
module.exports = function($scope, $controller, $window, AdminMasterProductService, config) {
	'ngInject';
	// inherit from list ctrl
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
					$window.location.href= '/admin/products/' + item.ProductId;
				}
			}, {
				name: 'Edit Grouping',
				fn: function(item) {
					$window.location.href= '/admin/masters/' + item.ProductId;
				}
			}]
		}
	});
	// get list of child products as string
	$scope.getChildProducts = function(list) {
		return _.join(_.map(list, function(e) { return e.Pid }), ', ');
	};
};