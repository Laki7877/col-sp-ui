module.exports = function($scope, $window, NcAlert, $uibModal, BrandService, GlobalCategoryService, LocalCategoryService, FileService, Product, GlobalCategoryService, Category, AttributeSet, storage, config) {
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
  $scope.alert = new NcAlert();
  $scope.isUpdate = !_.isNil(storage.get('import.update'));
  $scope.yesNoOptions = config.DROPDOWN.YES_NO_DROPDOWN;
  $scope.dataTypeOptions = config.DROPDOWN.DATA_TYPE_DROPDOWN;

  storage.remove('import.update');

  GlobalCategoryService.list().then(function(data) {
      $scope.treeSelectTree = Category.transformNestedSetToUITree(data);
  });

  //Get file uploader
  $scope.uploader = FileService.getUploader('/ProductStages/Import');
  $scope.uploader.onSuccessItem = function(item, response) {
    storage.put('import.success', response);
    $window.location.href='/products';
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
  $scope.ctrl.AttributeSet = [];
  $scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY;

  //Get column head by search
  $scope.getGuideline = function(val) {
    return Product.guideline({searchText: val, _limit: config.TYPEAHEAD_IMPORT_GUIDELINE_LIMIT})
      .then(function(response) {
        return response;
      });
  };

  //Search for brand

  $scope.importCSV = function() {
    var last = $scope.uploader.queue[$scope.uploader.queue.length-1];
    last.upload();
    _.forEach($scope.uploader.queue, function(i) {
      i.removeFromQueue();
    });
  };

  $scope.onSearchSelect = function() {
    //Clear stuff
    $scope.ctrl.BrandSearch = '';
    $scope.ctrl.GlobalCategory = null;
    $scope.ctrl.LocalCategory = null;
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


  //Open cat selector modal
  $scope.openCategoryModal = function(global) {
    var tree = [];
    var model = [];
    var title = '';

    if(global) {
      tree = $scope.ctrl.GlobalCategoryTree;
      model = $scope.ctrl.GlobalCategory;
      title = 'Global Category';
    } else {
      tree = $scope.ctrl.LocalCategoryTree;
      model = $scope.ctrl.LocalCategory;
      title = 'Local Category';
    }

    //Open modal
    var modalInstance = $uibModal.open({
      size: 'category-section modal-lg column-4',
      keyboard: false,
      templateUrl: 'product/modalCategorySelector',
      controller: function($scope, $uibModalInstance, tree, model, title) {
        'ngInject';
        $scope.model = model;
        $scope.tree = tree;
        $scope.title = title;

        $scope.select = function() {
          $uibModalInstance.close($scope.model);
        };
      },
      resolve: {
        model: function() {
          return model;
        },
        tree: function() {
          return tree;
        },
        title: function() {
          return title;
        }
      }
    });

    modalInstance.result.then(function(data) {
      if(global) {
        $scope.ctrl.GlobalCategory = data;
        GlobalCategoryService.get(data.CategoryId)
          .then(function(cat) {
            console.log(cat);
            $scope.ctrl.AttributeSets = cat.AttributeSets;
          });
      } else {
        $scope.ctrl.LocalCategory = data;
      }
    });
  };

  //Load Categories
  GlobalCategoryService.list()
    .then(function(data) {
      $scope.ctrl.GlobalCategoryTree = Category.transformNestedSetToUITree(data);
    });

  LocalCategoryService.list()
    .then(function(data) {
      $scope.ctrl.LocalCategoryTree = Category.transformNestedSetToUITree(data);
    });

  BrandService.list()
      .then(function(data) {
        $scope.ctrl.Brands = _.map(data, function(e) {
          return e.BrandNameEn;
        });
      });
};
