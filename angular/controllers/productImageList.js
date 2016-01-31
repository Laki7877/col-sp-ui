module.exports = ['$scope', 'Product', 'util', 'Alert', '$window', function ($scope, Product, util, Alert, $window) {
    $scope.productList = [];
    Product.getAll({}).then(function(data){
        $scope.productList = data.data;
    });
}];
