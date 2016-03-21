module.exports = function($scope, $controller, ProductTempService, config) {
	'ngInject';
	$controller('AbstractAdvanceListCtrl', {
		$scope: $scope,
		options: {
			url: '/products/groups',
			service: ProductTempService,
			item: 'Pending Product',
			order: 'UpdatedDt',
			id: 'ProductId',
			bulks: [{
				name: 'Create Single Product',
				fn: function(arr, cb, cat) {
					console.log(arr, cb, cat);
				},
				modal: {
					size: 'category-section modal-lg column-4',
					keyboard: false,
					templateUrl: 'product/modalCategorySelector',
					controller: function($scope, $uibModalInstance, tree) {
						'ngInject';
						$scope.title = 'Global Category';
						$scope.model = null;
						$scope.tree = tree;

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