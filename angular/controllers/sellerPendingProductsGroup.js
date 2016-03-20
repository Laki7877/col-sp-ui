module.exports = function($scope, $controller,
  config, $uibModal, GlobalCategory, Category, AttributeSet, Product,
  VariationFactorIndices, AttributeSetService, AttributeOptions, $productAdd) {
	'ngInject';

	$scope.formData = {
    MasterVariant: {},
    Variants: []
  };
  $scope.dataset = {
    CombinedAttributeSets: [],
    GlobalCategoryTree: null
  };
  $scope.refresher = {};
  $scope.dataset.attributeOptions = AttributeOptions.proto();
  $scope.variationFactorIndices = new VariationFactorIndices($scope.dataset);

  $scope.groupInfoSelected = false;

  $scope.createVariationOption = function(){
    $scope.groupInfoSelected = true;
  }

  $scope.$watch('dataset.attributeOptions', function() {
    console.log("Regenerating variations");
    $productAdd.generateVariants($scope.formData, $scope.dataset);
  }, true);

  $scope.refresher.Products = function(q){
    return Product.getAll({
        searchText: q,
        pageSize: 8
      }).then(function(ds) {
        $scope.dataset.Products = ds.data;
      })
  };

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
      $scope.dataset.GlobalCategoryTree = Category.transformNestedSetToUITree(data);
  });

	$scope.openCategorySelectorModal = function() {

      var modalInstance = $uibModal.open({
        size: 'category-section modal-lg column-4',
        keyboard: false,
        templateUrl: 'product/modalCategorySelector',
        controller: function($scope, $uibModalInstance, tree, model) {
          'ngInject';
          $scope.model = model;
          $scope.tree = tree;
          $scope.title = 'Select Category';
          $scope.categoryHeaderText = '';

          $scope.select = function() {
            $uibModalInstance.close($scope.model);
          };
        },
        resolve: {
          model: function() {
            return $scope.formData.Category;
          },
          tree: function() {
            return $scope.dataset.GlobalCategoryTree;
          }
        }
      });

      modalInstance.result.then(function(data) {
        $scope.formData.Category = data;
        AttributeSet.getByCategory(data.CategoryId)
        .then(function(data) {
          $scope.dataset.AttributeSets = data.map(function(aset) {
            aset._group = "Suggested Attribute Sets";
            return aset;
          });
          $scope.dataset.CombinedAttributeSets = angular.copy($scope.dataset.AttributeSets);
        });

      });

    };
}
