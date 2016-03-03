
module.exports = function($scope, $rootScope, Onboarding){
	'ngInject';

	Onboarding.getListCompletedTask()
		.then(function(data) {
		  // data.SetUpShop = true;
	      return $scope.Completed = [data.ChangePassword, data.SetUpShop, data.AddProduct, data.DecorateStore];
	    });
};
