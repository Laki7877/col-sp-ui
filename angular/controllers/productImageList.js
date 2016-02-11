//Not Used
module.exports = ['$scope', 'Product', 'util', 'Alert', '$window', 'FileUploader', function ($scope, Product, util, Alert, $window, FileUploader) {
    $scope.productList = [];
    $scope.template = 'product/dropzone/normal';
    Product.getAll({}).then(function(data){
        $scope.productList = data.data;
    });
}];
