var angular = require('angular');

module.exports = function($scope, $controller, storage) {
  'ngInject';

  $controller('AbstractProductAddCtrl', {
    $scope: $scope,
    options: {
      maxImageUploadQueueLimit: 25,
      listingUrl: '/products'
    }
  });

  /*
  *  Debugging Features
  */
  
  var checkpoint = "T100";
  $scope.disableDebugLoad = false;
  var debugfd = storage.get('save-fd-' + checkpoint);
  if(!debugfd){
      $scope.disableDebugLoad = true;
  }
  
  $scope._debugLoad = function() {
    var M = storage.get('save-fd-' + checkpoint);
    if(!M){
       return alert("Unable to restore saved data from local storage. Perhaps, you haven't saved.")
    };
    $scope.formData = JSON.parse(M);
    $scope.dataset = JSON.parse(storage.get('save-ds-' + checkpoint));
    $scope.variationFactorIndices.iterator = JSON.parse(storage.get('save-it-' + checkpoint));
    $scope.controlFlags = JSON.parse(storage.get('save-cf-' + checkpoint));

    console.log($scope.formData, "loaded");
    $scope.variantPtr = $scope.formData.MasterVariant;
    $scope.variantPtr.Images = $scope.formData.MasterVariant.Images;
    $scope.alert.success('<strong>Testing Kit</strong> Product data restored.');
  }

  $scope._debugSave = function() {

    $scope.formData.GlobalCategories.forEach(function(gc) {
      if (gc == null) return;
      delete gc.nodes;
      delete gc.parent;
    });

    delete $scope.dataset.GlobalCategories;
    delete $scope.dataset.LocalCategories;
    console.log($scope.dataset, $scope.variationFactorIndices);

    storage.put('save-cf-' + checkpoint, JSON.stringify($scope.controlFlags), true);
    storage.put('save-fd-' + checkpoint, JSON.stringify($scope.formData), true);
    storage.put('save-ds-' + checkpoint, JSON.stringify($scope.dataset), true);
    storage.put('save-it-' + checkpoint, JSON.stringify($scope.variationFactorIndices.iterator), true);
    $scope.disableDebugLoad = false;
    $scope.alert.success('<strong>Testing Kit</strong> Product data saved to your local storage.');
  };
};
