module.exports = function($scope, $controller, $uibModal, AdminShopService, AdminShoptypeService, config, common, Credential, $rootScope, $window) {
	'ngInject';
	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopId',
			url: '/admin/shops',
			item: 'Shop Account',
			service: AdminShopService,
			init: function(scope) {
				AdminShoptypeService.listAll()	
					.then(function(data) {
						scope.shoptypes = data;
					});
			}
		}
	});

	$scope.loginAs = function(user){
		$scope.alert.close();
		Credential.loginAs(user).then(function(){
			$window.location.href = "/products";
		}, function(err){
           $scope.alert.error(common.getError(err));
        });
	};

	$scope.resetPassword = function(user) {
	    var modal = $uibModal.open({
	      size: 'change-password',
	      windowClass: 'modal-custom',
	      templateUrl: 'common/modalChangePassword',
	      controller: function($scope, $uibModalInstance, NcAlert, Credential, common, email) {
	        'ngInject';
	        $scope.alert = new NcAlert();
	        $scope.form = {};
	        $scope.formData = { Email: user.Email };
	        $scope.saving = false;
	        $scope.oldPassword = false;

	        $scope.save = function() {
	          if($scope.form.$valid) {
	            $scope.saving = true;
	            $scope.alert.close();
	            Credential.changePassword(_.pick($scope.formData, ['Email', 'NewPassword']))
	              .then(function() {
	                $uibModalInstance.close();
	              }, function(err) {
	                $scope.alert.error(common.getError(err));
	                $scope.formData.error = true;
	                $scope.form.$setPristine();
	              }).finally(function() {
	                $scope.saving = false;
	              })
	          } else {
	            $scope.alert.error(config.DEFAULT_ERROR_MESSAGE);
	          }
	        };
	      },
	      resolve: {
	      	email: function() {
	      		return user.Email;
	      	}
	      }
	    });
		modal.result.then(function() {
			$scope.alert.success('Successfully reset password.');
		});
	};
	$scope.shopGroupDropdown = config.SHOP_GROUP;
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};
