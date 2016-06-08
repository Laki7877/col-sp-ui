/**
 * Handle admin group adding page
 */
module.exports = function($scope, $controller, Product) {
	'ngInject';
    // inherit from product group ctrl
	$controller('AbstractProductGroupAddCtrl', {
		$scope: $scope,
		options: {
			adminMode : true
		}
	});
	
}
