module.exports = function($scope, $controller, config, $uibModal, GlobalCategory, Category) {
	'ngInject';

	$scope.formData = {};
	$scope.GlobalCategoryTree = null;

	GlobalCategory.list().then(function(data) {
          $scope.GlobalCategoryTree = Category.transformNestedSetToUITree(data);
          console.log($scope.GlobalCategoryTree);
    });

	$scope.deleteGlobalCat = function(index){

	}
	$scope.openCategorySelectorModal = function() {

      var modalInstance = $uibModal.open({
        size: 'category-section modal-lg column-4',
        keyboard: false,
        templateUrl: 'product/modalCategorySelector',
        controller: function($scope, $uibModalInstance, tree, model, disable, exclude) {
          'ngInject';
          $scope.model = model;
          $scope.exclude = exclude;
          $scope.tree = tree;
          $scope.title = 'Select Category';
          $scope.categoryHeaderText = '';
          $scope.disabledOn = disable;

          $scope.select = function() {
            $uibModalInstance.close($scope.model);
          };
        },
        resolve: {
          model: function() {
            return $scope.formData.Category;
          },
          tree: function() {
            return $scope.GlobalCategoryTree;
          },
          disable: function() {
            return function(m) {
              if (m.nodes.length == 0) return false;
              return true;
            }
          },
          exclude: function() {
            return [];
          }
        }
      });

      modalInstance.result.then(function(data) {
        $scope.formData.Category = data;
      });

    };
}
