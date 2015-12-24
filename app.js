//App Start here
var angular = require('angular');
//Services
var services = {};
services.Products = require('./services/products.js');

var app = angular.module('colspApp', [])
.factory('Products', services.Products);

app.controller('ProductListCtrl', ['$scope', '$http', 'Products',  function($scope, $http, Products){
	//UI binding variables
	$scope.showOnOffStatus = true; 
	$scope.checkAll = false;
	$scope.filterOptions = [
		{ name: "All", value: 0}, 
		{ name: "Approved", value: 1},
		{ name: "Not Approved", value: 2},
		{ name: "Wait for Approval", value: 3},
	];
	
	//Default parameters
	$scope.tableParams = {
		filter: 0,
		searchText: null,
		orderBy: 'ProductName',
		direction: 'asc',
		page: 1,
		pageSize: 20
	};
	$scope.pList = [];
	
	//Populate Data Source
	var reloadData = function(){
		Products.getAll($scope.tableParams).then(function(x){
			$scope.pList = x.data.data;
			console.log("pList", $scope.pList);
		});
	};

	$scope.$watch('tableParams', function(){
		reloadData();
	}, true);


	//Select All checkbox
	$scope.$watch('checkAll', function(newVal, oldVal){
		$scope.pList.forEach(function(d){	
			d.checked = newVal;
		});
	});
}]);
