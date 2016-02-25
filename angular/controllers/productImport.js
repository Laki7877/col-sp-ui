var angular = require('angular');

module.exports = ['$scope', 'Product', 'GlobalCategoryService', 'Category', 'AttributeSet',
 function($scope, Product, GlobalCategoryService, Category, AttributeSet) {
  $scope.treeSelectTree = [];
  $scope.treeSelectModel = null;
  $scope.attributeSetLoading = [];
  $scope.DownloadBtnText = {text: "Download", disabled: false};
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
    $scope.DownloadBtnText = {
      text: "Generating..",
      disabled: true
    };
    Product.downloadTemplate($scope.ctrl.globalCat, $scope.ctrl.attributeSet).then(function(data){
      $scope.DownloadBtnText = {
        text: "Download",
        disabled: false
      };
      var file = new Blob([data], {type: 'application/csv'});
      var fileURL = URL.createObjectURL(file);
      var a = document.getElementById("download_template_btn");
      a.href = fileURL;
      a.click();
    });
  };

}];
