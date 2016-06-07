/**
 * Handle admin shop account add
 */
module.exports = function($scope, $controller, $uibModal, AdminShopService, AdminShoptypeService, GlobalCategoryService, ShopService, ImageService, Category, config, common, Credential, $window) {
	'ngInject';

	var v = [];
	//watch
	var watch = function() {
		// update  city on province change
		v.push($scope.$watch('formData.Province', function(data, old) {
			if(_.isNil(data)) {
				return;
			}
			else if(data != old) {
				_.unset($scope.formData, ['City']);
				_.unset($scope.formData, ['District']);
				_.unset($scope.formData, ['PostalCode']);
			}
			$scope.getCities(data.ProvinceId);
		}));
		// update district on city change
		v.push($scope.$watch('formData.City', function(data, old) {
			if(_.isNil(data)) {
				return;
			}
			else if(data != old) {
				_.unset($scope.formData, ['District']);
				_.unset($scope.formData, ['PostalCode']);
			}
			$scope.getDistricts(data.CityId);
		}));
		// update postal on city district
		v.push($scope.$watch('formData.District', function(data, old) {
			if(_.isNil(data)) {
				return;
			}
			else if(data != old) {
				_.unset($scope.formData, ['PostalCode']);
			}
			$scope.getPostals(data.DistrictId);
		}));
	};
	//unwatch
	var unwatch = function() {
		while(v.length > 0) {
			v.pop()();
		}
	};

	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'ShopId',
			url: '/admin/shops',
			item: 'Shop Account',
			service: AdminShopService,
			init: function(scope) {
				// get all shoptype
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
				watch(); //watch for change
			},
			onBeforeSave: function(scope) {
				unwatch(); //do not watch during save
			},
			onAfterSave: function(scope) {
				// commissions category
				_.forEach(scope.formData.Commissions, function(item) {
					item.NameEn = Category.findByCatId(item.CategoryId, scope.globalCategory).NameEn;
				});
				watch(); //rewatch after save
			}
		}
	});
	
	//logo uploader
	$scope.logoUploader = ImageService.getUploaderFn('/ShopImages', {
		data: { Type: 'Logo' }
	});

	//upload logo
	$scope.uploadLogo = function(file) {
		if(_.isNil(file)) {
			return;
		}
		//loading placeholder
		$scope.formData.ShopImage = {
			url: '/assets/img/loader.gif'
		};
		//upload action
		$scope.logoUploader.upload(file)
			.then(function(response) {
				$scope.formData.ShopImage = response.data;
			}, function(err) {
				$scope.formData.ShopImage = null;
				$scope.alert.error(common.getError(err.data));
			});
	};

	//getter for cities name list
	$scope.getCities = function(id) {
		ShopService.get('Cities', id)
			.then(function(data) {
				$scope.cities = data;
			});
	};

	//getter for districts name list
	$scope.getDistricts = function(id) {
		ShopService.get('Districts', id)
			.then(function(data) {
				$scope.districts = data;
			});
	};

	//getter for postal name list
	$scope.getPostals = function(id) {
		ShopService.get('PostCodes', id)
			.then(function(data) {
				$scope.postals = data;
			});
	}

	//get all other lists
	$scope.fetchAllList = function() {
		ShopService.get('TermPayments')
			.then(function(data) {
				$scope.termOfPayments = data;
			});
		ShopService.get('VendorTaxRates')
			.then(function(data) {
				$scope.vendorTaxRates = data;
			});
		ShopService.get('WithholdingTaxes')
			.then(function(data) {
				$scope.withholdingTaxes = data;
			});
		ShopService.get('BankNames')
			.then(function(data) {
				$scope.bankNames = data;
			});
		ShopService.get('Provinces')
			.then(function(data) {
				$scope.provinces = data;
			});
		ShopService.get('Overseas')
			.then(function(data) {
				$scope.overseas = data;
			});
		ShopService.get('Countries')
			.then(function(data) {
				$scope.countries = data;
			});
	};
	$scope.fetchAllList();

	//login as action
	$scope.loginAs = function(user){
		$scope.alert.close();
		Credential.loginAs(user).then(function(r){
				$window.location.href = "/dashboard";
				console.log("got", r, user);
		}, function(err){
    		$scope.alert.error(common.getError(err));
    });
	};

	//reset user password action
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

	        //save change
	        $scope.save = function() {
	          if($scope.form.$valid) {
	            $scope.saving = true;
	            $scope.alert.close();

	            //change password to new password
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
	//open modal for select commission for cat
	$scope.openCommissionSelector = function(item) {
		var category = null;
		if(!_.isNil(item))
			category = Category.findByCatId(item.CategoryId, $scope.globalCategory); //get category list
	    var modalInstance = $uibModal.open({
	      size: 'category-section modal-lg column-4',
	      keyboard: false,
	      templateUrl: 'shop_account/modalCommissionCat',
	      controller: function($scope, $uibModalInstance, tree, model) {
	        'ngInject';
	        $scope.model = model;
	        $scope.tree = tree;
	        //watch for model
	        $scope.$watch('model', function(newVal, oldVal) {
	        	if(!_.isEmpty(newVal))
	        		$scope.Commission = newVal.Commission;
	        });

	        //return selected cat and commission
	        $scope.select = function() {
	          $scope.model.Commission = _.toNumber($scope.Commission);
	          $uibModalInstance.close($scope.model);
	        };
	      },
	      resolve: {
	        model: function() {
	          return category; //selected cat
	        },
	        tree: function() {
	          return $scope.globalCategory; //cat tree
	        }
	      }
	    })

	    //on modal finished
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
	//dropdowns
	$scope.shopGroupDropdown = config.SHOP_GROUP;
	$scope.yesNoDropdown = config.DROPDOWN.YES_NO_DROPDOWN;
	$scope.statusDropdown = config.DROPDOWN.DEFAULT_STATUS_DROPDOWN;

	//clone cat should be equal to max local cat
	$scope.$watch('formData.CloneGlobalCategory', function(val) {
		if(val) {
			$scope.formData.MaximumLocalCategory = 99;
		}
	});
};
