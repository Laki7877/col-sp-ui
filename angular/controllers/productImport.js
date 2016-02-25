module.exports = function($scope, Product, GlobalCategoryService, Category, AttributeSet) {
  'ngInject';
  $scope.treeSelectTree = [];
  $scope.treeSelectModel = null;
  $scope.attributeSetLoading = false;
  $scope.DownloadBtnText = {text: "Download", disabled: false};
  GlobalCategoryService.list().then(function(data) {
      $scope.treeSelectTree = Category.transformNestedSetToUITree(data);
  });

  var fetchAttributeSet = function(cid){
    $scope.attributeSetLoading = true;
    AttributeSet.getByCategory(cid)
        .then(function(alist){
          if(cid != $scope.ctrl.globalCat.CategoryId) return;
          $scope.dataSet.attributeSets = alist;
    }).finally(function() {
      $scope.attributeSetLoading = false;
    });
  }
  $scope.$watch('ctrl.globalCat.CategoryId', function(){
    if(!$scope.ctrl.globalCat) return;
    if(!$scope.ctrl.globalCat.CategoryId) return;
    fetchAttributeSet(Number($scope.ctrl.globalCat.CategoryId));
  });

  $scope.columns = [];
  $scope.ctrl = {};
  $scope.dataSet = {};
  $scope.dataSet.attributeSets = [];

  $scope.ctrl.searchColumn = '';
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
};
