var angular = require('angular');

module.exports = ['$scope','util', 'config', 'Brand', function($scope, util, config, Brand){
	$scope.brands =  [];
	$scope.params = {
		
	};
	
	Brand.getAll($scope.params).then(function(brands){
		$scope.brands = brands.data;
	});
}];