module.exports = function($scope, $controller, config, $uibModal, GlobalCategory, Category, AttributeSet, AttributeSetService) {
	'ngInject';

	$scope.formData = {};
  $scope.dataset = {
    CombinedAttributeSets: []
  };
	$scope.GlobalCategoryTree = null;
  $scope.refresher = {};
  $scope.refresher.AttributeSets = function(q) {
      if (!q) return;
      $scope.refresher.AttributeSetsLoading = true;
      return AttributeSetService.list({
        _order: 'AttributeSetId',
        _limit: 5,
        _offset: 0,
        _direction: 'asc',
        searchText: q
      }).then(function(ds) {
        $scope.refresher.AttributeSetsLoading = false;
        var searchRes = ds.data.map(function(d) {
          d._group = 'Search Results';
          return d;
        });
        $scope.dataset.CombinedAttributeSets = _.unionBy(searchRes, $scope.dataset.AttributeSets, 'AttributeSetId');
      })
    };

	GlobalCategory.list().then(function(data) {
          $scope.GlobalCategoryTree = Category.transformNestedSetToUITree(data);
          console.log($scope.GlobalCategoryTree);
    });

	$scope.openCategorySelectorModal = function() {

      var modalInstance = $uibModal.open({
        size: 'category-section modal-lg column-4',
        keyboard: false,
        templateUrl: 'product/modalCategorySelector',
        controller: function($scope, $uibModalInstance, tree, model, disable) {
          'ngInject';
          $scope.model = model;
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
          }
        }
      });

      modalInstance.result.then(function(data) {
        console.log("Got Result");
        $scope.formData.Category = data;
        AttributeSet.getByCategory(data.CategoryId)
        .then(function(data) {
          console.log(data);
          $scope.dataset.AttributeSets = data.map(function(aset) {
            aset._group = "Suggested Attribute Sets";
            return aset;
          });
          $scope.dataset.CombinedAttributeSets = angular.copy($scope.dataset.AttributeSets);
        });

      });

    };
}
