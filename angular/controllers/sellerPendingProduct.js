/**
 * Handle pending product page
 */
module.exports = function($scope, $controller, ProductTempService, config, NcAlert) {
	'ngInject';
    $scope.alert = new NcAlert();
    // inherit adv list ctrl
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/products/groups',
			service: ProductTempService,
			item: 'Pending Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			bulks: [{
				// create single product
				name: 'Create Single Product',
				fn: function(arr, cb, cat) {
					$scope.alert.close();
					if(arr.length == 0) {
						$scope.alert.error('Action failed. Please select Product for this action.')
						return;
					}
				},
				//select global cat
				modal: {
					size: 'category-section modal-lg column-4',
					keyboard: false,
					templateUrl: 'product/modalCategorySelector',
					controller: function($scope, $uibModalInstance, tree) {
						'ngInject';
						$scope.title = 'Global Category';
						$scope.model = null;
						$scope.tree = tree;

						// only leaf
						$scope.disabledOn = function(model) {
							return model.nodes.length > 0;
						};
						$scope.select = function() {
							$uibModalInstance.close($scope.model);
						};
					},
					resolve: {
						tree: function() {
							return $scope.advanceSearchOptions.GlobalCategories;
						}
					}
				}
			}]
		}
	});
}