//Products Service
module.exports = ['$q', '$http', function($q, $http){
	return {
		getAll: function(page = 0, pageSize = 10, tag = 'all', search = null){
			return $q(function(resolve, reject){
				$http({
					method: 'GET',
					url: '/flat/Products.json'
				}).then(resolve, reject);
			});	
		}
	}
}];
