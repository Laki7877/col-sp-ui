var angular = require('angular');

module.exports = ['$scope', 'Product', 'GlobalCategoryService', 'Category', 'AttributeSet',
 function($scope, Product, GlobalCategoryService, Category, AttributeSet) {
  $scope.treeSelectTree = [];
  $scope.treeSelectModel = null;
  $scope.attributeSetLoading = [];
  GlobalCategoryService.list().then(function(data) {
      $scope.treeSelectTree = Category.transformNestedSetToUITree(data);
  });

  var fetchAttributeSet = function(cid){
    AttributeSet.getByCategory(cid)
        .then(function(alist){
          $scope.attributeSetLoading.pop();
          if(cid != $scope.ctrl.globalCat.CategoryId) return;
          $scope.dataSet.attributeSets = alist;
    });
  }
  $scope.$watch('ctrl.globalCat.CategoryId', function(){
    if(!$scope.ctrl.globalCat) return;
    if(!$scope.ctrl.globalCat.CategoryId) return;
    console.log($scope.ctrl.globalCat);
    $scope.attributeSetLoading.push(true);
    fetchAttributeSet(Number($scope.ctrl.globalCat.CategoryId));
  });

  $scope.ctrl = {};
  $scope.dataSet = {};
  $scope.dataSet.attributeSets = null;
  $scope.ctrl.globalCat = null;

  $scope.downloadTemplate = function(){
    Product.downloadTemplate($scope.ctrl.globalCat, $scope.ctrl.attributeSet).then(function(data){
      console.log(data)
    });
  };

}];
