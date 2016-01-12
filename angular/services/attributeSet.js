module.exports = ['common', function(common){
	'use strict';
	var service = {};
	service.getByCategory = function(catId){
		var req = {
			method: 'GET',
			url: '/GlobalCategories/' + catId + '/AttributeSets'
		};

		return common.makeRequest(req);	
	};

	service.getAll = function(parameters) {
		return common.makeRequest({
			method: 'GET',
			url: '/AttributeSets',
			params: {
				_order: parameters.orderBy || 'AttributeSetId',
				_limit: parameters.pageSize || 0,
				_offset: parameters.page * parameters.pageSize || 0,
				_direction: parameters.direction || 'asc',
				searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined			}
		});
	}
	return service;
}];
