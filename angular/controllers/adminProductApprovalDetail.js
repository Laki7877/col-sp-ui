var angular = require('angular');

module.exports = function ($scope, $controller, $uibModal, NCConfirm) {
    'ngInject';
    
    $controller('AbstractProductAddCtrl', {
        $scope: $scope,
        options: {
            maxImageUploadQueueLimit: 25,
            adminMode : true,
            approveMode: true,
            listingUrl: '/admin/approve'
        }
    });
    
    
    $scope.confirmAP = function(){
        NCConfirm('Approve', 'Are you sure you want to approve this product', function(){
            $scope.publish('AP');
        });
    }
    
    $scope.confirmFA = function(){
        NCConfirm('Force Approval', 'Are you sure you want to force approve this product', function(){
            $scope.publish('AP');
        });
    }
    
    $scope.confirmRJ = function(){
        NCConfirm('Reject', 'Are you sure you want to reject this product', function(){
            $scope.publish('RJ');
        });
    }


    $scope.canApprove = function(){
    	return $scope.formData.AdminApprove.Information == 'AP' && $scope.formData.AdminApprove.Image == 'AP' &&
    	$scope.formData.AdminApprove.Category == 'AP' && $scope.formData.AdminApprove.Variation == 'AP' &&
    	$scope.formData.AdminApprove.MoreOption == 'AP';
    }

};