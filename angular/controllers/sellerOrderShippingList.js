module.exports = function($scope, $window, storage) {
	'ngInject';
	$scope.orders = [];
	$scope.cancel = function() {
		$window.location.href = '/orders';
	};
	// get shipping list from order page
	if(storage.has('order_shipping_list')) {
		$scope.orders = storage.getObject('order_shipping_list');
		$scope.dateNow = new Date();
		storage.remove('order_shipping_list');
	} else {
		//otherwise, redir back
		$window.location.href = '/orders';
	}
};