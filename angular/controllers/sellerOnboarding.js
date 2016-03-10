
module.exports = function($scope, $rootScope, Onboarding, $log, $window){
	'ngInject';

	Onboarding.getListCompletedTask()
		.then(function(data) {
			$scope.Completed = [true,true,true,true];
			// $scope.Completed = [false,false,false,false];
	    	// $scope.Completed = [data.ChangePassword, data.SetUpShop, data.AddProduct, data.DecorateStore];
	    })
	    .then(function(data) {
	    	var checkBeforeLaunch = $scope.Completed[$scope.Completed.length-1];
	    	var checkIfHaveCompleted = $scope.Completed[$scope.Completed.length-1];
			for (var i = $scope.Completed.length - 1; i >= 0; i--) {
				checkBeforeLaunch = checkBeforeLaunch && $scope.Completed[i];
				checkIfHaveCompleted = checkIfHaveCompleted || $scope.Completed[i];
			};
			$scope.checkIfHaveCompleted = checkIfHaveCompleted;
			return $scope.checkBeforeLaunch = checkBeforeLaunch;
	    }).then(function(data) {
	    	// Change text of Launch subtitle to 'Time to go live' if all tasks are completed
	    	$scope.launchTextSubtitle = "Complete the tasks above to launch your store";
			return $scope.launchTextSubtitle =	(data == true ? 'Time to go live!': 'Complete the tasks above to launch your store');
	    });

	

	$scope.launchShop = function() {

		if($scope.checkBeforeLaunch) {
			console.log("Shop launched");
			Onboarding.launchShop();
		}
		else {
			console.log("can't launch");
		}
	};

	$scope.redirectToProducts = function() {
		$window.location.href = '/products';
    };

    $scope.redirectToShopSetting = function() {
    	$window.location.href = 'shops/settings';
    }

    $scope.redirectToShopAppearance = function() {
    	$window.location.href = 'shops/appearance';
    }

};
