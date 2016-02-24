module.exports = ['$scope', 'Product', 'AttributeSet', function ($scope, Product, AttributeSet) {
  $scope.productIds = [];
  $scope.init = function(viewBag){
    $scope.productIds = viewBag || [];
  }

  $scope.lockAS = function(){
    return false
  }

  $scope.dataSet = {};
  AttributeSet.getAll().then(function(data){
    $scope.dataSet.attributeSets = data;
    console.log(data);
  });
  $scope.fields = {};
}];
