angular.module('nc')
	.factory('NCConfirm', function($templateCache, $uibModal) {
		var ConfirmationDialog = function (line1, line2, yesAction, noAction) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'common/abstractConfirmationModal',
                controller: function ($scope, $uibModalInstance, $timeout) {
                'ngInject'
                $scope.no = function () {
                    $uibModalInstance.close('no')
                };
                $scope.yes = function () {
                    $uibModalInstance.close('yes')
                };
                $scope.line1 = line1; 
                $scope.line2 = line2;
                },
                size: 'size-warning',
                resolve: { }
            })
        
            modalInstance.result.then(function (selectedItem) {
                if (selectedItem == 'yes') {
                    yesAction();
                }else if(selectedItem == 'no'){
                    noAction();
                }
            });
            
            return modalInstance;
        }
        
        return ConfirmationDialog;
	});