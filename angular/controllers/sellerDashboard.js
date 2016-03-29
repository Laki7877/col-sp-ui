
module.exports = function($scope, $rootScope, Dashboard, $log, storage, $window, $uibModal, NewsletterService){
	'ngInject';

	// Begin Week section
	getWeekGraphData = function() {
		$scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		var tempData = [];

		for (var i = 0; i < $scope.labels.length ; i++) {
		 	tempData[i] = 0;
		 }; 
		Dashboard.getRevenue('week')
			.then(function(data){
				for (var i = 0; i < data.length ; i++) {
				 	tempData[data[i].Key-1] = data[i].Value;
				 };
			});
		$scope.data = [tempData];
	  // $scope.onClick = function (points, evt) {
	  //   console.log(points, evt);
	  // };
	};
	// End Week Section

	//Begin Day section

	// return max date of month
	getMaxDate = function(month, year) {
		var d = new Date(year, month, 0);
		var date = d.getDate();
		return date;
	};

	getTodayGraphData = function() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		var maxDate = getMaxDate(mm, yyyy);

		var tempLabels = [];
		var tempData = [];

		for (var i = 0; i < maxDate ; i++) {
		 	tempLabels[i] = i + 1;
		 	tempData[i] = 0;
		 }; 

		Dashboard.getRevenue('today')
			.then(function(data){
				for (var i = 0; i < data.length ; i++) {
				 	tempData[data[i].Key-1] = data[i].Value;
				 };
			});


		$scope.labels = tempLabels;
		$scope.data = [tempData];
	};
	// End day graph section

	$scope.setGraphData = function(flag){
		switch (flag) {
	        case 'today':
        		$scope.todayFlag  = true;
	    		$scope.thisWeekFlag  = false;
				$scope.thisMonthFlag = false;
				$scope.thisYearFlag = false;
				return getTodayGraphData();
	            break;
	        case 'week':
        		$scope.todayFlag  = false;
	    		$scope.thisWeekFlag  = true;
				$scope.thisMonthFlag = false;
				$scope.thisYearFlag = false;
				return getWeekGraphData();
	            break;
	        case 'month':
        		$scope.todayFlag  = false;
	    		$scope.thisWeekFlag  = false;
				$scope.thisMonthFlag = true;
				$scope.thisYearFlag = false;
	            break;
	        case 'year':
        		$scope.todayFlag  = false;
	    		$scope.thisWeekFlag  = false;
				$scope.thisMonthFlag = false;
				$scope.thisYearFlag = true;
	            break;
	        default:
        }
	};

	//Initiate graph data as Today Graph Data
	$scope.setGraphData('today');

	Dashboard.getNewsLetter()
		.then(function(query) {
			return $scope.newsLettersData = query.data;
		});

	Dashboard.getLowStockAlert()
		.then(function(query) {
			$scope.maxLowStockAlert = 10;
			$scope.lowStockAlertData = query.data;

			for (var i = $scope.lowStockAlertData.length - 1; i >= 0; i--) {
				$scope.lowStockAlertData[i].PidText = 'ID: ' + $scope.lowStockAlertData[i].Pid;
				$scope.lowStockAlertData[i].QuantityText = 'QTY: ' + $scope.lowStockAlertData[i].Quantity;
			};
			return $scope.lowStockAlertData;
		});

	Dashboard.getOutOfStock()
		.then(function(query) {
			$scope.outOfStockData = query.data;

			for (var i = $scope.outOfStockData.length - 1; i >= 0; i--) {
				$scope.outOfStockData[i].PidText = 'ID: ' + $scope.outOfStockData[i].Pid;
				$scope.outOfStockData[i].QuantityText = 'QTY: ' + $scope.outOfStockData[i].Quantity;
			};
			return $scope.outOfStockData;
		});

	$scope.maxNewOrders = 10;
	Dashboard.getOrders()
		.then(function(query) {
			$scope.newOrdersData = query.data;

			for (var i = $scope.newOrdersData.length - 1; i >= 0; i--) {
				$scope.newOrdersData[i].OrderIdText = 'ID: ' + $scope.newOrdersData[i].OrderId;
			};

			return $scope.newOrdersData;
		});

	$scope.maxTopSellingItems = 10;
	Dashboard.getTopSellingItems()
		.then(function(data){
			return $scope.topSellingItemsData = data;
		}); 

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
					return 'N/A';
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
					return 'N/A';
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
					return 'N/A';
				}
				break;

			default:
				return 'N/A'
		}

		
	};

	Dashboard.getProductRating()
		.then(function(data){
			if (data != 'N/A') {
				$scope.productRatingScore = data + ' / 5.0';
				$scope.productRatingRank = getColoredRank('Product Rating', data);
			}
			else {
				$scope.productRatingScore = 'N/A';
			}
		});

	var otdRating = 92;
	$scope.onTimeDeliveryScore = otdRating + '%';
	$scope.onTimeDeliveryRank = getColoredRank('On Time Delivery',otdRating);

	Dashboard.getReturnRating()
		.then(function(data){
			if (data != 'N/A') {
				data = Math.floor(data);
				$scope.returnScore = data + '%';
				$scope.returnRank = getColoredRank('Return Rate', data);
			}
			else {
				$scope.returnScore = 'N/A';
			}
		});

	$scope.getColorClass = function(status) {
		switch (status) {
	        case 'PC':
	            return 'color-grey';
	            break;
	        case 'Other':
	            break;
	        default:
        }
	};

	$scope.getFaClass = function(status) {
		switch (status) {
	        case 'PC':
	            return 'fa-check-circle-o';
	            break;
	        case 'Other':
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

	$scope.linkToLowStock = function(){
		storage.put('lowstock', true);
		$window.location.href = '/inventory';
	};

	$scope.linkToOrdersPage = function(){
		storage.put('payment_order', true);
		$window.location.href = '/orders';
	};

	$scope.linkToProduct = function(id) {
		$window.location.href = '/products/' + id;
	};

	$scope.linkToOrder = function(id) {
		$window.location.href = '/orders/' +id;
	};

};
