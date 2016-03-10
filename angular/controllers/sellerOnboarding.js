
module.exports = function($scope, $rootScope, Onboarding, $log){
	'ngInject';

	Onboarding.getListCompletedTask()
		.then(function(data) {
	    	$scope.Completed = [data.ChangePassword, data.SetUpShop, data.AddProduct, data.DecorateStore];
	    })
	    .then(function() {
	    	var checkBeforeLaunch = $scope.Completed[$scope.Completed.length-1];
	    	var checkIfHaveCompleted = $scope.Completed[$scope.Completed.length-1];
			for (var i = $scope.Completed.length - 1; i >= 0; i--) {
				checkBeforeLaunch = checkBeforeLaunch && $scope.Completed[i];
				checkIfHaveCompleted = checkIfHaveCompleted || $scope.Completed[i];
			};
			$scope.checkIfHaveCompleted = checkIfHaveCompleted;
			return $scope.checkBeforeLaunch = checkBeforeLaunch;
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
};
