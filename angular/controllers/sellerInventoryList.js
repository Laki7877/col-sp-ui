module.exports = function($scope, $controller, $window, InventoryService, config, common) {
	'ngInject';
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/inventory',
			service: InventoryService,
			item: 'Inventory Unit',
			order: 'Pid',
			id: 'Pid',
			actions: [{
				name: 'View / Edit',
				fn: function(item) {
                	$window.location.href =  '/products/' + item.ProductId;
				}
			}],
			filters: [
				{ name: "All", value: 'All'},
				{ name: "Normal Stock", value: 'NormalStock'},
				{ name: "Low Stock", value: 'LowStock'},
				{ name: "Out of Stock", value: 'OutOfStock'}
			],
			onReload: function() {
				$scope.lastEdit = null;
			}
		}
	});
	$scope.getAvailableStock = function(item) {
		return _.toInteger(item.Quantity) - (
				_.toInteger(item.Defect) +
				_.toInteger(item.OnHold) +
				_.toInteger(item.Reserve)
			);
	};
	$scope.getStatus = function(item) {
		var measure = $scope.getAvailableStock(item);

		//Out of stock
		if(measure <= 0) return $scope.statusDropdown[2];

		measure = measure - item.SaftyStockSeller;
		
		//Low stock
		if(measure <= 0) return $scope.statusDropdown[1];

		//Normal
		return $scope.statusDropdown[0];
	};
	$scope.popoverStock = function(item) {
		if(!item.open) {
			//Is popover open, load popovers
			$scope.popoverItem = item;
			item.Quantity = _.toInteger(item.Quantity);
			item.LastQuantity = item.Quantity;
		}
	};
	$scope.updateStock = function(item) {
		$scope.alert.close();
		InventoryService.update(item.Pid, _.pick(item, ['Quantity']))
			.then(function(data) {
				$scope.lastEdit = item.Pid;
			}, function(err) {
				$scope.lastEdit = null;
				item.Quantity = item.LastQuantity;
				$scope.alert.error(common.getError(err));
			})
		.finally(function() {
			item.open = false;
		});
	};
	$scope.popoverItem = {};
	$scope.advanceSearchOptions.Admin = false;
	$scope.statusDropdown = config.INVENTORY_STATUS;
};