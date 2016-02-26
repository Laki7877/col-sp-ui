module.exports = function($scope, NcAlert, FileService, Product, GlobalCategoryService, Category, AttributeSet, config) {
  'ngInject';
  //Select Global Category
  $scope.ctrl = {};
  $scope.dataSet = {};
  $scope.dataSet.attributeSets = [];
  $scope.treeSelectTree = [];
  $scope.treeSelectModel = null;
  $scope.attributeSetLoading = false;
  $scope.ctrl.globalCat = null;
  $scope.DownloadBtnText = {text: "Download", disabled: false};
  GlobalCategoryService.list().then(function(data) {
      $scope.treeSelectTree = Category.transformNestedSetToUITree(data);
  });
  $scope.alert = new NcAlert();

  //Get file uploader
  $scope.uploader = FileService.getUploader('/ProductStages/Import');
  $scope.uploader.onSuccessItem = function() {
    $scope.alert.success('Successfully saved.');
  };

  $scope.uploader.onErrorItem = function(item, response, status, headers) {
    response = _.map(response, function(e) {
      return '<li>-&nbsp;&nbsp;&nbsp;' + e + '</li>';
    });
    $scope.alert.error('<span class="font-weight-bold">Fail to upload CSV</span>' + '<ul>' + response.join('') + '</ul>');
  };
  //Fetch Attribute set
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

  //Category change, refetch
  $scope.$watch('ctrl.globalCat.CategoryId', function(){
    if(!$scope.ctrl.globalCat) return;
    if(!$scope.ctrl.globalCat.CategoryId) return;
    fetchAttributeSet(Number($scope.ctrl.globalCat.CategoryId));
  });

  //Search column head
  $scope.ctrl.searchColumn = '';
  $scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY;

  //Get column head by search
  $scope.getGuideline = function(val) {
    return Product.guideline({searchText: val, _limit: config.TYPEAHEAD_IMPORT_GUIDELINE_LIMIT})
      .then(function(response) {
        return response;
      });
  };

  $scope.importCSV = function() {
    var last = $scope.uploader.queue[$scope.uploader.queue.length-1];
    last.upload();
    _.forEach($scope.uploader.queue, function(i) {
      i.removeFromQueue();
    });
  };

  //Download a template
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
