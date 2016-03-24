var angular = require('angular');

module.exports = function ($scope, $controller) {
    'ngInject';
    
    $controller('AbstractProductAddCtrl', {
        $scope: $scope,
        options: {
            maxImageUploadQueueLimit: 25,
            adminMode : true,
            approveMode: true
        }
    });

    $scope.canApprove = function(){
    	return $scope.formData.AdminApprove.Information == 'AP' && $scope.formData.AdminApprove.Image == 'AP' &&
    	$scope.formData.AdminApprove.Category == 'AP' && $scope.formData.AdminApprove.Variation == 'AP' &&
    	$scope.formData.AdminApprove.MoreOption == 'AP';
    }

};