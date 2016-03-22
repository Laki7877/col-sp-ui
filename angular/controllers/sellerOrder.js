module.exports = function($scope, $window, $controller, OrderService, config, storage) {
	'ngInject';
	$controller('AbstractListCtrl', {
		$scope: $scope,
		options: {
			url: '/orders',
			service: OrderService,
			item: 'Order',
			order: 'UpdatedDt',
			id: 'OrderId',
			actions: ['View Only'],
			bulks: [{
				name: 'Acknowledge',
				fn: function(arr, cb) {
					var result = _.compact(_.map(arr, function(e) {
						if(e.Status == 'PC') {
							return {
								OrderId: e.OrderId,
								Status: 'PE'
							}
						} else {
							return null;
						}
					}));
					OrderService.updateAll(result)
						.then(function() {
							$scope.alert.success('Successfully acknowledged');
							cb();
						}, function(err) {
							$scope.alert.error(common.getError(err));
						})
						.finally(function() {
							$scope.reload();
						});
				},
				confirmation: {
					title: 'Acknowledge',
					message: 'Are you sure you want to acknowledge selected orders?',
					btnConfirm: 'Acknowledge',
					btnClass: 'btn-blue'
				}
			}],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Payment Pending", value: 'PaymentPending'},
				{ name: "Payment Confirmed", value: 'PaymentConfirmed'},
				{ name: "Preparing", value: 'Preparing'},
				{ name: "Ready to Ship", value: 'ReadytoShip'},
				{ name: "Shipping", value: 'Shipping'},
				{ name: "Delivered", value: 'Delivered'},
				{ name: "Canceled", value: 'Canceled'}
			]
		}
	});	
	if(storage.has('payment_order')) {
		$scope.params._filter = 'PaymentConfirmed';
	}
	//For debug only
	$scope.debug = {
		id: '',
		status: 'PE',
		change: function() {
			OrderService.update(this.id, {
				Status: this.status
			})
			.finally(function() {
				$scope.reload();
			});
		}
	}
	//Acknowledge or ready-to-ship 
	$scope.getButtonState = function(item) {
		if(item.Status == 'PC') {
			return {
				text: 'Acknowledge',
				disabled: false
			}
		}
		if(item.Status == 'PE') {
			return {
				text: 'Ready to Ship',
				disabled: false
			};
		}
		if(item.Status == 'PP') {
			return {
				text: 'Acknowledge',
				disabled: true
			};
		}
		return {
			text: 'Ready to Ship',
			disabled: true
		};
	};
	$scope.onButtonClick = function(item) {
		$window.location.href = $scope.url + '/' + item.OrderId;
	}
	$scope.status = config.ORDER_STATUS;
}
