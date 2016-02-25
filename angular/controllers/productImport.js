var angular = require('angular');

module.exports = ['$scope', 'Product', 'GlobalCategoryService', 'Category', 'AttributeSet',
 function($scope, Product, GlobalCategoryService, Category, AttributeSet) {
  $scope.treeSelectTree = [];
  $scope.treeSelectModel = null;
  GlobalCategoryService.list().then(function(data) {
      $scope.treeSelectTree = Category.transformNestedSetToUITree(data);
  });
  $scope.$watch('ctrl.globalCat.CategoryId', function(){
    if(!$scope.ctrl.globalCat) return;
    if(!$scope.ctrl.globalCat.CategoryId) return;

    console.log($scope.ctrl.globalCat);
    AttributeSet.getByCategory($scope.ctrl.globalCat.CategoryId)
        .then(function(alist){
          $scope.dataSet.attributeSets = alist;
        })
  });

  $scope.ctrl = {};
  $scope.dataSet = {};
  $scope.dataSet.attributeSets = null;
  $scope.ctrl.globalCat = null;

  $scope.downloadTemplate = function(){
    console.log($scope.ctrl.globalCat);
  };

}];
