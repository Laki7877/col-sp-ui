//App Start here
var angular = require('angular');
//Services
var services = {};
services.Products = require('./services/products.js');

var app = angular.module('colspApp', [])
.factory('Products', services.Products);

app.controller('ProductListCtrl', ['$scope', '$http', 'Products',  function($scope, $http, Products){
	$scope.showOnOffStatus = true;
	$scope.checkAll = false;
	Products.getAll(0,1).then(function(x){
		$scope.pList = x.data.data;
		console.log($scope.pList);
	});

	$scope.$watch('checkAll', function(newVal, oldVal){
		if($scope.pList){
			$scope.pList.forEach(function(d){	
				d.checked = newVal;
			});
		}
	});
}]);
