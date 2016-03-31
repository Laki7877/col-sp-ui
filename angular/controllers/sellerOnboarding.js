
module.exports = function($scope, $rootScope, Onboarding, $log, storage, $window){
	'ngInject';

	$scope.$on('change-password', function() {
		$scope.load();
	})

	$scope.load = function() {
		$scope.ShopInActiveStatus = ($rootScope.Profile.Shop.Status == 'NA');
		$scope.onLoadingFlag = true;

		Onboarding.getListCompletedTask()
			.then(function(data) {
				$scope.onLoadingFlag = false;
				// Comment below is for Decorative section 
		    	// $scope.Completed = [data.ChangePassword, data.SetUpShop, data.AddProduct && data.ProductApprove, data.DecorateStore];
		    	$scope.Completed = [data.ChangePassword, data.SetUpShop, data.AddProduct && data.ProductApprove];


		    	// Begin section Product Field: return text for Product Field
		    	if (data.AddProduct == true && data.ProductApprove == false) {
		    		// Atleast, a product is added and admin is processing approving process.
		    		$scope.productFieldContent = {
		    			title:"Wait for your product to be approved",
		    			subTitle:"Admin is reviewing your product",
		    			button:"Add More Product"
		    		};
		    	}
		    	else if (data.AddProduct == true && data.ProductApprove == true) {
		    		// Atleast, a product is added and approved
		    		$scope.productFieldContent = {
		    			title:"Congratuation! Your product is approved",
		    			subTitle:"You can add more products to your store",
		    			button:"Add More Product"
		    		};
		    	}
		    	else {
		    		// In case no products are added and no products are approved
		    		$scope.productFieldContent = {
		    			title:"Add product",
		    			subTitle:"Add at least one item to your store",
		    			button:"Add Product"
		    		};
		    	}
		    	// End section Product Field
		    })
		    .then(function(data) {
		    	var checkBeforeLaunch = $scope.Completed[$scope.Completed.length-1];
		    	var checkIfHaveCompleted = $scope.Completed[$scope.Completed.length-1];
				for (var i = $scope.Completed.length - 1; i >= 0; i--) {
					checkBeforeLaunch = checkBeforeLaunch && $scope.Completed[i];
					checkIfHaveCompleted = checkIfHaveCompleted || $scope.Completed[i];
				};
				//$scope.checkIfHaveCompleted is used for hide or show completed line.
				//$scope.checkBeforeLaunch is used for check if all task are completed.
				$scope.checkIfHaveCompleted = checkIfHaveCompleted;
				return $scope.checkBeforeLaunch = checkBeforeLaunch;
		    }).then(function(data) {
		    	// Change text of Launch subtitle to 'Time to go live' if all tasks are completed
		    	$scope.launchTextSubtitle = "Complete the tasks above to launch your store";
				return $scope.launchTextSubtitle =	(data == true ? 'Time to go live!': 'Complete the tasks above to launch your store');
		    });
	};

	$scope.launchShop = function() {

		if($scope.checkBeforeLaunch) {
			Onboarding.launchShop()
				.then(function(){
					$rootScope.Profile.Shop.Status = 'AT';
					$scope.ShopInActiveStatus = ($rootScope.Profile.Shop.Status == 'NA');
					storage.storeCurrentUserProfile($rootScope.Profile);
				});
		}
		else {
			window.alert("Can't launch shop: please complete tasks before launch.");
		}
	};

	$scope.redirectToProducts = function () {
		$window.location.href = '/products';
    };

    $scope.redirectToShopSetting = function () {
    	$window.location.href = 'shops/settings';
    };

    $scope.redirectToShopAppearance = function () {
    	$window.location.href = 'shops/appearance';
    };

	$scope.redirectToUserAccounts = function () {
		$window.location.href = '/accounts';
	};

	$scope.redirectToDashboard = function () {
		$window.location.href = '/dashboard';
	};

	$scope.redirectToStore = function () {
		$window.location.href = 'http://central.co.th/';
	};

    //Init
    $scope.load();
};
