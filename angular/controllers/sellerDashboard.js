module.exports = function($scope, $rootScope, Dashboard, $log, $filter, storage, $window, $uibModal, NewsletterService){
	'ngInject';

	//---------------- Begin Graph section ----------------
	// in this section we've 4 fucntions each of which calculates graph data for
	// Today, Week, Month and Year graph.
	// 
	// This function will be called when User click section name/
	// Example: if User click Today then getTodayGraphData will be called.

	// the method that call the 4 fucntions is setGraphData(More at setGraphData() description).
	getTodayGraphData = function() {
		// set $scope.labels for Graph.js
		$scope.labels = ["0AM", "2AM", "4AM", "6AM", "8AM", "10AM",
						 "12AM", "2PM", "4PM", "6PM", "8PM", "10PM", "12PM"];
		var tempData = [];

		for (var i = 0; i < $scope.labels.length ; i++) {
		 	tempData[i] = 0;
		 };
		Dashboard.getRevenue('today')
			.then(function(data){
				for (var i = 0; i < data.length ; i++) {
				 	tempData[data[i].Key + 1] = data[i].Value;
				 };
			});

		// set $scope.data for Graph.js
		$scope.data = [tempData];
	};

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
	};

	getMaxDate = function(month, year) {
		var d = new Date(year, month, 0);
		var date = d.getDate();
		return date;
	};

	getMonthGraphData = function() {
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

		Dashboard.getRevenue('month')
			.then(function(data){
				for (var i = 0; i < data.length ; i++) {
				 	tempData[data[i].Key-1] = data[i].Value;
				 };
			});


		$scope.labels = tempLabels;
		$scope.data = [tempData];
	};

	getYearGraphData = function() {
		$scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
						 "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var tempData = [];

		for (var i = 0; i < $scope.labels.length ; i++) {
		 	tempData[i] = 0;
		 };
		Dashboard.getRevenue('year')
			.then(function(data){
				for (var i = 0; i < data.length ; i++) {
				 	tempData[data[i].Key-1] = data[i].Value;
				 };
			});
		$scope.data = [tempData];
	};


	// This function will call 4 fucntions above when User selects the graph.
	// If User clicks Today it will use switch to case 'today' which call getTodayGraphData.

	// This fucntion also set Flag for front-end.
	// Flag is used for some CSS class.

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
				return getMonthGraphData();
	            break;
	        case 'year':
        		$scope.todayFlag  = false;
	    		$scope.thisWeekFlag  = false;
				$scope.thisMonthFlag = false;
				$scope.thisYearFlag = true;
				return getYearGraphData();
	            break;
	        default:
        }
	};
	//---------------- End Graph section ----------------

	//Initiate graph data as Today Graph Data
	// call setGraphData(today) it will set Graph to today data as default
	$scope.setGraphData('today');

	//---------Get Revenue Summary data---------------
	// call end-point once for getting Revenue Summary data
	getSumValue = function(data) {
		var sum = 0;
		for (var i = 0; i < data.length; i++) {
			sum += data[i].Value;
		};
		return sum;
	}
	Dashboard.getRevenue('today')
		.then(function(data){
			$scope.sumTodayRevenue = getSumValue(data);
		});
	Dashboard.getRevenue('week')
		.then(function(data){
			$scope.sumWeekRevenue = getSumValue(data);
		});
	Dashboard.getRevenue('month')
		.then(function(data){
			$scope.sumMonthRevenue = getSumValue(data);
		});
	Dashboard.getRevenue('year')
		.then(function(data){
			$scope.sumYearRevenue = getSumValue(data);
		});
	//--------------End Get Revenue calling end-point section---------


	// get Newslterr data and set it to $scope
	Dashboard.getNewsLetter()
		.then(function(query) {
			$scope.totalNews = query.total;
			return $scope.newsLettersData = query.data;
		});

	//-------------- Begin Low Stock Alert section -------------
	// get Low Stock Alert data and set it to scope

	var getAvailableStock = function(item) {
		return _.toInteger(item.Quantity) - (
				_.toInteger(item.Defect) +
				_.toInteger(item.OnHold) +
				_.toInteger(item.Reserve)
				);
	};
	Dashboard.getLowStockAlert()
		.then(function(query) {
			// set max data for table to 10
			$scope.maxLowStockAlert = 10;
			$scope.lowStockAlertData = query.data;
			$scope.totalLowStockAlert = query.total;

			for (var i = $scope.lowStockAlertData.length - 1; i >= 0; i--) {
				$scope.lowStockAlertData[i].PidText = 'PID: ' + $scope.lowStockAlertData[i].Pid;
				$scope.lowStockAlertData[i].QuantityText = 'QTY: ' + getAvailableStock($scope.lowStockAlertData[i]);
			};
			return $scope.lowStockAlertData;
		});

	// get Out of Stock data and merge with low stock
	Dashboard.getOutOfStock()
		.then(function(query) {
			$scope.outOfStockData = query.data;
			$scope.totalOutStockAlert = query.total;

			for (var i = $scope.outOfStockData.length - 1; i >= 0; i--) {
				$scope.outOfStockData[i].PidText = 'PID: ' + $scope.outOfStockData[i].Pid;
				$scope.outOfStockData[i].QuantityText = 'QTY: ' + $scope.outOfStockData[i].Quantity;
			};
			return $scope.outOfStockData;
		});
	//--------------End Low Stock Alert section-------------

	// ------- get New order section --------
	// set max order to 10
	$scope.maxNewOrders = 10;
	Dashboard.getOrders()
		.then(function(query) {
			$scope.newOrdersData = query.data;
			$scope.totalOrders = query.total;

			for (var i = $scope.newOrdersData.length - 1; i >= 0; i--) {
				$scope.newOrdersData[i].OrderIdText = 'ID: ' + $scope.newOrdersData[i].OrderId;
			};

			return $scope.newOrdersData;
		});

	// ------- get Top Selling Items section --------
	// set max top seliing to 10
	$scope.maxTopSellingItems = 10;
	Dashboard.getTopSellingItems()
		.then(function(data){
			return $scope.topSellingItemsData = data;
		});


	// ---------------- Begin Account Health section ----------------
	// method for identify colored rank to Account Health section
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

	// call end-point Product Rating
	Dashboard.getProductRating()
		.then(function(data){	
			$scope.rating = {
				DeliverySpeed: '<div class="font-size-16 color-grey">n/a</div>',
				ProductContent: '<div class="font-size-16 color-grey">n/a</div>',
				ProductValidity: '<div class="font-size-16 color-grey">n/a</div>',
				Packaging: '<div class="font-size-16 color-grey">n/a</div>'
			};	
			if(_.isPlainObject(data)) {
				_.forOwn(data, function(v, k) {
					$scope.rating[k] = '<div class="font-size-16 color-' + getColoredRank('Product Rating', v) + '">' + $filter('currency')(v, ' ', 1) + ' / 5.0' + '</div>';
				});
			}
		});

	// Ontime Delivery mockup
	// NOTED: front-end have hide this section this mock does not affect front-end
	var otdRating = 92;
	$scope.onTimeDeliveryScore = otdRating + '%';
	$scope.onTimeDeliveryRank = getColoredRank('On Time Delivery',otdRating);

	// call end-point Return Rating
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

	// method for identify color-class for front-end
	// for Mar 2016: it's only need one color code
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

	// method for identify fa-class
	// need only 1 fa-class
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

	// ---------------- End Account Health section ----------------

	// method for call modal for Newsletter
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

	// ---------------- Begin link between page section  ----------------
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
	// ---------------- End link between page section ----------------

};
