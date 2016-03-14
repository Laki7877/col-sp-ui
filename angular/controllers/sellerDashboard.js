
module.exports = function($scope, $rootScope, Onboarding, $log, $window){
	'ngInject';

	$scope.maxNewOrders = 10;
	$scope.newOrdersData = [
		{date:'13/12/2015', id:'ID: 1231499', amount:'226.00', status:'Payment Confirmed' },
		{date:'10/12/2015', id:'ID: 1231413', amount:'112,226.00', status:'Payment Confirmed' }
	];

	$scope.maxLowStockAlert = 10;
	$scope.lowStockAlertData = [
		{inventory:'Inventory: ' + '5', p_id:'ID: ' + '1234567', name:'Nanyang Original Footwear T-model x10 Limited Edition for Thailand sale only' },
		{inventory:'Inventory: ' + '10', p_id:'ID: ' + '5323312', name:'Jordan Nike Super Shoe' }
	];

	getProductRatingRank = function(data) {

		if (data >= 0 && data <= 2.4) {
			return 'red';
		}
		else if (data > 2.4 && data <= 4.0) {
			return 'yellow';
		}
		else if (data > 4.0 && data <= 5.0) {
			return 'green';
		}
		else {
			return 'n/a';
		}
	};

	// temp rating  score
	// input api for product rating score

	var pRating = 4.5;
	$scope.productRatingScore = pRating + ' / 5.0';
	$scope.productRatingRank = getProductRatingRank(pRating);

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
	};



	// $scope.getAccountHealthColorClass = function(type, data) {
	// 	switch (type) {
	//         case 'Product Rating':
	//         	switch(data) {

	//         		case (data >= 0 && data <= 2.4)
	//             		return 'color-red';
	//             		break;

	//             	default:
	//         	}
	//             break;
	//         case '2':
	//             alert("Selected Case Number is 2");
	//             break;
	//         default:

 //        }
	// }	
};
