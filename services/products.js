//Products Service
module.exports = ['$q', '$http', function($q, $http){
	return {
		getAll: function(parameters){
			return $q(function(resolve, reject){
				var flagged = parameters.filter; 
				var path = '/flat/Products' + flagged + '.json'; 
				$http({
					method: 'GET',
					url: path
				}).then(resolve, reject);
			});	
		}
	}
}];
