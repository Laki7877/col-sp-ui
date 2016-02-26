module.exports = ['$scope', 'Product', 'AttributeSet', function ($scope, Product, AttributeSet) {
  $scope.ProductList = [];
  $scope.SELECT_ALL = false;
  $scope.sumProductAttributeSet = 0;
  $scope.selectAllAttributeSets = false;

  $scope.init = function(viewBag){
    var productIds = viewBag || [];
    if(productIds.length == 0){
      $scope.SELECT_ALL = true;
    }

    $scope.ProductList = productIds.map(function(p){
      return { ProductId: p }
    });

    if($scope.SELECT_ALL){
      AttributeSet.getAll().then(function(data){
        $scope.dataSet.attributeSets = data.map(function(m){
            m.Display = m.AttributeSetNameEn + " (" + m.ProductCount + ")";
            $scope.sumProductAttributeSet += Number(m.ProductCount);
            return m;
        });
        console.log(data);
      });
    }else{
      Product.getAllAttributeSetsForProducts($scope.ProductList).then(function(data){
        $scope.dataSet.attributeSets = data.map(function(m){
            m.Display = m.AttributeSetNameEn + " (" + m.ProductCount.length + ")";
            $scope.sumProductAttributeSet += Number(m.ProductCount.length);
            return m;
        });
        console.log(data);
      });
    }
  }

  $scope.startExportProducts = function () {
      $scope.exporter = {
          progress: 10,
          title: 'Exporting...'
      };

      $("#export-product").modal('show');
  };

  $scope.confirmExportProducts = function(){

      $("#export-product").modal('hide');

      var fileName = "ProductExport.csv";
      var a = document.getElementById("export_download_btn");

      var error = function (r) {
          $(".modal").modal('hide');
          $scope.exporter.title = 'Error'
          $scope.alert.error('Unable to Export Product');
          $scope.reloadData();
      };

      $scope.exporter.progress = 15;
      var blobs = [];

      var body = angular.copy($scope.fields);
      body.ProductList = $scope.ProductList;
      body.AttributeSets = $scope.ctrl.tradedAS;

      if($scope.selectAllAttributeSets){
        body.AttributeSets = [];
      }

      Product.export(body).then(function (result) {

          blobs.push(result);
          var file = new Blob(blobs, {type: 'application/csv'});
          var fileURL = URL.createObjectURL(file);
          $scope.exporter.href = fileURL;
          $scope.exporter.download = fileName;
          $scope.exporter.progress = 100;
          $scope.exporter.title = 'Export Complete'
          a.href = fileURL;
          a.click();
      }, error);
  }

  $scope.lockAS = function(){
    return false
  }

  $scope.dataSet = {};


  $scope.ctrl = {
    selectAll: false,
    tradedAS: []
  };
  $scope.toggleSelectAll = function(){
    Object.keys($scope.fields).forEach(function(key){
        $scope.fields[key] = $scope.ctrl.selectAll;
    });
  };


  $scope.$watch('fields', function(){
    var m = Object.keys($scope.fields).map(function(k){
      return $scope.fields[k];
    }).reduce(function(prev,cur){
      return prev && cur;
    }, true);
    $scope.ctrl.selectAll = m;
  }, true);

  $scope.fields = {
    ProductStatus: false,
    PID: true,
    GroupID: false,
    SKU: false,
    ProductNameEn: false,
    ProductNameTh: false,
    BrandName: false,
    GlobalCategory: false,
    LocalCategory: false,
    OriginalPrice: false,
    SalePrice: false,
    DescriptionEn: false,
    DescriptionTh: false,
    ShortDescriptionEn: false,
    ShortDescriptionTh: false,
    PreparationTime: false,
    PackageLength: false,
    PackageHeight: false,
    PackageWidth: false,
    InventoryAmount: false,
    SafetyStockAmount: false
  };
}];
