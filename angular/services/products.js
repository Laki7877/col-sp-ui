//Products Service
module.exports = ['$q', '$http', 'common', function($q, $http, common){
	'use strict';
	var service = {};

	/**
	 * Get all product entry
	 */
	service.getAll = function(parameters){
			var req = {
				method: 'GET',
				url: '/ProductStages',
				params: {	
					_order: parameters.orderBy,
					_limit: parameters.pageSize,
					_offset: parameters.page * parameters.pageSize,
					_direction: parameters.direction,
					searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined
				}
			};
			
			return common.makeRequest(req);
	};

	return service;
}];
