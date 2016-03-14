
module.exports = function($scope, $rootScope, Onboarding, $log, $window){
	'ngInject';

	$scope.maxNewOrders = 10;
	$scope.newOrders = [
		{date:'13/12/2015', id:'ID: 1231499', amount:'226.00', status:'Payment Confirmed' },
		{date:'10/12/2015', id:'ID: 1231413', amount:'112,226.00', status:'Payment Confirmed' }
	];

	$scope.getColorClass = function(status) {
		switch (status) {
	        case 'Payment Confirmed':
	            return 'color-grey';
	            break;
	        case '2':
	            alert("Selected Case Number is 2");
	            break;
	        default:
        }
	};
	$scope.getFaClass = function(status) {
		switch (status) {
	        case 'Payment Confirmed':
	            return 'fa-check-circle-o';
	            break;
	        case '2':
	            alert("Selected Case Number is 2");
	            break;
	        default:
        }
	}	
};
