
module.exports = function($scope, $rootScope, Dashboard, $log, $window, $uibModal, NewsletterService){
	'ngInject';

	Dashboard.getNewsLetter()
		.then(function(query) {
			return $scope.newsLettersData = query.data;
		});

	Dashboard.getLowStockAlert()
		.then(function(query) {
			$scope.maxLowStockAlert = 10;
			$scope.lowStockAlertData = query.data;

			for (var i = $scope.lowStockAlertData.length - 1; i >= 0; i--) {
				$scope.lowStockAlertData[i].Pid = 'ID: ' + $scope.lowStockAlertData[i].Pid;
				$scope.lowStockAlertData[i].Quantity = 'QTY: ' + $scope.lowStockAlertData[i].Quantity;
			};
			return $scope.lowStockAlertData;
		});

	$scope.maxNewOrders = 10;
	$scope.newOrdersData = [
		{date:'13/12/2015', id:'ID: 1231499', amount:'226.00', status:'Payment Confirmed' },
		{date:'10/12/2015', id:'ID: 1231413', amount:'112,226.00', status:'Payment Confirmed' }
	];

	$scope.maxTopSellingItems = 10;
	$scope.topSellingItemsData = [
		{img_path:'http://colsp-dev.azurewebsites.net/Images/Product/111116X_1.jpg', name:'Chanel, the cheetah' },
		{img_path:'/assets/img/img40.png', name:'1 French Connection, Sunday - high quality product' },		
		{img_path:'/assets/img/img40.png', name:'2 French Connection, Sunday - high quality product' },		
		{img_path:'http://colsp-dev.azurewebsites.net/Images/Product/111116X_1.jpg', name:'3 French Connection, Sunday - high quality product' },		
		{img_path:'/assets/img/img40.png', name:'4 French Connection, Sunday - high quality product' },
		{img_path:'http://colsp-dev.azurewebsites.net/Images/Product/111116X_1.jpg', name:'Chanel, the cheetah' },
		{img_path:'/assets/img/img40.png', name:'1 French Connection, Sunday - high quality product' },		
		{img_path:'/assets/img/img40.png', name:'2 French Connection, Sunday - high quality product' },		
		{img_path:'http://colsp-dev.azurewebsites.net/Images/Product/111116X_1.jpg', name:'3 French Connection, Sunday - high quality product' },		
		{img_path:'/assets/img/img40.png', name:'4 French Connection, Sunday - high quality product' },
		{img_path:'http://colsp-dev.azurewebsites.net/Images/Product/111116X_1.jpg', name:'Chanel, the cheetah' },
		{img_path:'/assets/img/img40.png', name:'1 French Connection, Sunday - high quality product' },		
		{img_path:'/assets/img/img40.png', name:'2 French Connection, Sunday - high quality product' },		
		{img_path:'http://colsp-dev.azurewebsites.net/Images/Product/111116X_1.jpg', name:'3 French Connection, Sunday - high quality product' },		
		{img_path:'/assets/img/img40.png', name:'4 French Connection, Sunday - high quality product' }

	];

	getColoredRank = function(type, data) {
		switch(type){
			case 'Product Rating':
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
				break;

			case 'On Time Delivery':
				if (data >= 0 && data <= 69) {
				return 'red';
				}
				else if (data >= 70 && data <= 89) {
					return 'yellow';
				}
				else if (data >= 90 && data <= 100) {
					return 'green';
				}
				else {
					return 'n/a';
				}
				break;

			case 'Return Rate':
				if (data >= 11 && data <= 100) {
				return 'red';
				}
				else if (data > 1 && data < 11) {
					return 'yellow';
				}
				else if (data >= 0 && data <= 1) {
					return 'green';
				}
				else {
					return 'n/a';
				}
				break;

			default:
				return 'n/a'
		}

		
	};

	// temp rating  score
	// input api for product rating score

	var pRating = 2.4;
	$scope.productRatingScore = pRating + ' / 5.0';
	$scope.productRatingRank = getColoredRank('Product Rating',pRating);

	var otdRating = 92;
	$scope.onTimeDeliveryScore = otdRating + '%';
	$scope.onTimeDeliveryRank = getColoredRank('On Time Delivery',otdRating);

	var rRating = 10.88;
	$scope.returnScore = rRating + '%';
	$scope.returnRank = getColoredRank('Return Rate',rRating);

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

	$scope.open = function(item) {
		NewsletterService.get(item.NewsletterId)
			.then(function(data) {
				$uibModal.open({
					size: 'lg',
					templateUrl: 'newsletter/modalSeller',
					controller: function($scope, item) {
						'ngInject';
						$scope.item = item;
					},
					resolve: {
						item: function() {
							return data;
						}
					}
				});
			});
	};

	$scope.linkToAllNewsletters = function(){
		$window.location.href = '/newsletters';
	};

};
