//Products Service
module.exports = ['$q', '$http', 'common', function($q, $http, common){
	'use strict';
	var service = {};

	service.getAll = function(parameters){
			var req = {
				method: 'GET',
				url: '/ProductStages',
				params: {	
					_order: parameters.orderBy || 'ProductId',
					_limit: parameters.pageSize || 10,
					_offset: parameters.page * parameters.pageSize || 0,
					_direction: parameters.direction || 'asc',
					searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined
				}
			};
			
			return common.makeRequest(req);
	};

	return service;
}];
