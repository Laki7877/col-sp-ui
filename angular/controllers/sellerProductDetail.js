var angular = require('angular');

module.exports = function ($scope, $controller) {
    'ngInject';
    
    $controller('AbstractProductAddCtrl', {
        $scope: $scope,
        options: {
            maxImageUploadQueueLimit: 25
        }
    });

};