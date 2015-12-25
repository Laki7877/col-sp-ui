//Products Service
//TODO: beautify this using config and helper
module.exports = ['$q', '$http', 'config', function($q, $http, config){
	return {
		getAll: function(parameters){
			return $q(function(resolve, reject){
				var flagged = parameters.filter; 
				var path = config.baseUrl + 'ProductStages';
				$http({
					method: 'GET',
					url: path,
					params: {_order: 'ProductId',
						_limit: parameters.pageSize,
						_offset: parameters.page * parameters.pageSize,
						_direction: 'asc'},
					headers: {
						'Authorization' : 'Basic ZHVja3ZhZGVyOnZhZGVy'
					}
				}).then(resolve, reject);
			});	
		}
	}
}];
