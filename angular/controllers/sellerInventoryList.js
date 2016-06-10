/**
 * Handle inventory listing
 */
module.exports = function($scope, $rootScope, $controller, $window, InventoryService, config, common, storage) {
	'ngInject';
	//inherit abstract list
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/inventory',
			service: InventoryService,
			item: 'Product',
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
	// redirect from dashboard
	if(storage.has('lowstock')) {
		$scope.params._filter = 'LowStock';
		storage.remove('lowstock');
	}
	//calculate avail stock
	$scope.getAvailableStock = function(item) {
		return _.toInteger(item.Quantity) - (
				_.toInteger(item.Defect) +
				_.toInteger(item.OnHold) +
				_.toInteger(item.Reserve)
				);
	};
	// get inventory status
	$scope.getStatus = function(item) {
		var measure = $scope.getAvailableStock(item);

		//Out of stock
		if(measure <= 0) return $scope.statusDropdown[2];

		measure = measure - item.SafetyStockSeller;

		//Low stock
		if(measure <= 0) return $scope.statusDropdown[1];

		//Normal
		return $scope.statusDropdown[0];
	};
	// popup for editing inventory
	$scope.popoverStock = function(item) {
		if(!$rootScope.permit(51)) {
			return;
		}
		if(!item.open) {
			//Is popover open, load popovers
			$scope.popoverItemOriginal = item;
			$scope.popoverItem = _.extend({}, item);
			$scope.popoverItem.Quantity = _.toInteger(item.Quantity);
			$scope.popoverItem.LastQuantity = item.Quantity;
			$scope.popoverItem.UpdateQuantity = 0
		}
	};
	// updateable by permission 51
	$scope.isUpdate = function(item) {
		return $rootScope.permit(51);
	}
	// update stock endpoint
	$scope.updateStock = function(item) {
		$scope.alert.close();
		// cast to int
		var i = _.pick(item, ['UpdateQuantity']);
		if(_.isNil(i.UpdateQuantity)) {
			i.UpdateQuantity = 0
		}
		i.UpdateQuantity = _.toInteger(i.UpdateQuantity);

		// save
		InventoryService.update(item.Pid, i)
			.then(function(data) {
				$scope.lastEdit = item.Pid;
				$scope.popoverItemOriginal.Quantity += i.UpdateQuantity;
			}, function(err) {
				$scope.lastEdit = null;
				$scope.alert.error(common.getError(err));
			})
		.finally(function() {
			$scope.popoverItemOriginal.open = false;
		});
	};
	$scope.popoverItem = {};
	$scope.advanceSearchOptions.Admin = false;
	$scope.statusDropdown = config.INVENTORY_STATUS;
};
