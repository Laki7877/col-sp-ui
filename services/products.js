//Products Service
//TODO: move Authorization to commons
module.exports = ['$q', '$http', 'config', function($q, $http, config){
	return {
		getAll: function(parameters){
			//Default parameters
			var params = {
				_order: parameters.orderBy,
				_limit: parameters.pageSize,
				_offset: parameters.page * parameters.pageSize,
				_direction: parameters.direction
			};
			//Optional parameters
			if(parameters.searchText && parameters.searchText != ""){
				//TODO: Sku should be variable search text, since its a multifield search
				params.Sku = parameters.searchText;
			}
			//Promise
			return $q(function(resolve, reject){
				var flagged = parameters.filter;
				var path = config.baseUrl + 'ProductStages';
				$http({
					method: 'GET',
					url: path,
					params: params,
					headers: {
						'Authorization' : 'Basic ZHVja3ZhZGVyOnZhZGVy'
					}
				}).then(resolve, reject);
			});
		}
	}
}];
