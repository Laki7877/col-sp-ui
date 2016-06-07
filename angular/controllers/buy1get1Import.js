var angular = require('angular');

module.exports = ['$scope', 'Product', 'util', 'Alert', '$window', function ($scope, $rootScope, Product, util, Alert, $window) {
    // seller
    $scope.manageBuy1Get1SE = !$rootScope.permit(54);  
    // shop
    $scope.manageBuy1Get1SH = !$rootScope.permit(70);   
}];