module.exports = function($scope, $controller, $uibModal, AdminShopService, AdminShoptypeService, GlobalCategoryService, ImageService, Category, config, common, Credential, $window) {
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
			},
			onLoad: function(scope, flag) {	
				//Load global cat
				scope.globalCategory = [];
				GlobalCategoryService.list()
					.then(function(data) {
						scope.globalCategory = Category.transformNestedSetToUITree(data);
						_.forEach(scope.formData.Commissions, function(item) {
							item.NameEn = Category.findByCatId(item.CategoryId, scope.globalCategory).NameEn;
						});
				});
			},
			onAfterSave: function(scope) {			
				_.forEach(scope.formData.Commissions, function(item) {
					item.NameEn = Category.findByCatId(item.CategoryId, scope.globalCategory).NameEn;
				});
			}
		}
	});

	$scope.logoUploader = ImageService.getUploaderFn('/ShopImages', {
		data: { IsLogo: true }
	});
	$scope.uploadLogo = function(file) {
		if(_.isNil(file)) {
			return;
		}
		$scope.formData.ShopImage = {
			url: '/assets/img/loader.gif'
		};
		$scope.logoUploader.upload(file)
			.then(function(response) {
				$scope.formData.ShopImage = response.data;
			}, function(err) {
				$scope.formData.ShopImage = null;
				$scope.alert.error(common.getError(err.data));
			});
	};	

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
	$scope.openCommissionSelector = function(item) {
		var category = null;
		if(!_.isNil(item))
			category = Category.findByCatId(item.CategoryId, $scope.globalCategory);
	    var modalInstance = $uibModal.open({
	      size: 'category-section modal-lg column-4',
	      keyboard: false,
	      templateUrl: 'shop_account/modalCommissionCat',
	      controller: function($scope, $uibModalInstance, tree, model) {
	        'ngInject';
	        $scope.model = model;
	        $scope.tree = tree;
	        $scope.$watch('model', function(newVal, oldVal) {
	        	if(!_.isEmpty(newVal))
	        		$scope.Commission = newVal.Commission;
	        });
	        $scope.select = function() {
	          $scope.model.Commission = _.toNumber($scope.Commission);
	          $uibModalInstance.close($scope.model);
	        };
	      },
	      resolve: {
	        model: function() {
	          return category;
	        },
	        tree: function() {
	          return $scope.globalCategory;
	        }
	      }
	    })
	    
	    modalInstance.result.then(function(result) {
    		if(_.isNil(item)) {
	    		//Add
	    		item = {};
	    		$scope.formData.Commissions.push(item);
	    	}
	    	//Update
	    	item = _.extend(item, _.pick(result, ['Commission', 'CategoryId', 'NameEn']));
	    	item.Commission = _.toNumber(item.Commission);
    		//Remove dupe
    		_.remove($scope.formData.Commissions, function(n) {
    			return n.CategoryId == item.CategoryId && n !== item;
    		});
	    });
	};
	$scope.shopGroupDropdown = config.SHOP_GROUP;
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;
};
