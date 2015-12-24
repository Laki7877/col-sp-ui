var angular = require('angular');
var services = require('./controllers/test.js');

/*services.products.getPage(1).then(function(response){
	console.log(response);	
}).fail(function(){
	console.log("Died with error");
});*/

var colspApp = angular.module('colspApp', []);

colspApp.controller('ProductListCtrl', ['$scope', function($scope){
	$scope.ab = "hello World!";
}]);
