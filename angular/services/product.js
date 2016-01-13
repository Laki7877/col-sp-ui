//Products Service
module.exports = ['$q', '$http', 'common', function($q, $http, common){
	'use strict';
	var service = {};

	service.getOne = function(productId){
		var req = {
			method: 'GET',
			url: '/ProductStages/' + productId
		};
		return common.makeRequest(req);
	};

	service.getAll = function(parameters){
		var req = {
			method: 'GET',
			url: '/ProductStages',
			params: {	
				_order: parameters.orderBy || 'ProductId',
				_limit: parameters.pageSize || 10,
				_offset: parameters.page * parameters.pageSize || 0,
				_direction: parameters.direction || 'asc',
				_filter: parameters.filter,
				searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined
			}
		};
		
		return common.makeRequest(req);
	};

	service.publish = function(tobj, Status){
		tobj.Status = Status;
		return common.makeRequest({
			method: 'POST',
		        url: '/ProductStages',
		        data: tobj
		});
	};
	
	return service;
}];
