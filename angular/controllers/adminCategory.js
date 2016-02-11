
module.exports = function($scope, $rootScope, $uibModal, common, Category, GlobalCategory, AttributeSetService, NcAlert, util, config){
	'ngInject';
	$scope.categories = [];
	$scope.attributeSetOptions = [];
	$scope.statusOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
	$scope.popover = false;
	$scope.loading = false;
	$scope.dirty = false;
	$scope.alert = new NcAlert();
	$scope.treeOptions = {};

	$scope.lockAttributeset = function(i) {		
		return angular.isUndefined(i.ProductCount) || (i.ProductCount == 0);		
	};
	$scope.open = function(item) {
		//Open add-edit modal
		var modal = $uibModal.open({
			animation: true,
			templateUrl: 'global_category/modal',
			controller: function($scope, $uibModalInstance, GlobalCategory, NcAlert, config, id, statusOptions, attributeSetOptions) {
				'ngInject';
				$scope.alert = new NcAlert();
				$scope.statusOptions = statusOptions;
				$scope.attributeSetOptions = attributeSetOptions;
				$scope.form = {};
				$scope.formData = {};

				if(id == 0) {
					$scope.formData = GlobalCategory.generate();
				} else {
					GlobalCategory.get(id)
						.then(function(data) {
							$scope.formData = data;
						}, function(err) {
							$scope.alert.error(common.getError(err));
						});
				}

				$scope.cancel = function() {
					$uibModalInstance.dismiss();
				};
				$scope.save = function() {
					$scope.alert.close();

					if(id == 0) {

					} else {

					}
				};
			},
			resolve: {
				id: function() {
					return Item.CategoryId || 0;
				},
				statusOptions: function() {
					return $scope.statusOptions;
				},
				attributeSetOptions: function() {
					return $scope.attributeSetOptions;
				}
			}
		});
	};

	$scope.init = function() {
		$scope.reload();
		$scope.loadAttributeSets();
	};
	$scope.loadAttributeSets = function() {
		AttributeSetService.getAll().then(function(data) { 
			$scope.attributeSetOptions = data;
		});
	}
	$scope.reload = function() {
		$scope.loading = true;
		GlobalCategory.listAll().then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
			$scope.loading = false;
		}, function(err) {
			$scope.loading = false;
			$scope.alert.open(false, common.getError(err));
		});
	};

};