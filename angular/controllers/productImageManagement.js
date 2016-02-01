module.exports = ['$scope', 'Product', 'util', 'Alert', '$window', function ($scope, Product, util, Alert, $window) {
    $scope.productList = [];
    Product.getAllVariants({}).then(function(data){
        $scope.productList = data.data;
    });
}];
