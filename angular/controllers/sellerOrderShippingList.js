module.exports = function($scope, $window, storage) {
	$scope.orders = [];
	$scope.cancel = function() {
		$window.location.href = '/orders';
	};
	if(storage.has('order_shipping_list')) {
		$scope.orders = storage.getObject('order_shipping_list');
		$scope.dateNow = new Date();
		storage.remove('order_shipping_list');
	} else {
		$window.location.href = '/orders';
	}
};