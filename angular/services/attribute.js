module.exports = ['common', function(common){
	'use strict';
	var service = {};

	service.getAll = function(parameters) {
		return common.makeRequest({
			method: 'GET',
			url: '/Attributes',
			params: {
				_order: parameters.orderBy || 'AttributeId',
				_limit: parameters.pageSize || 10,
				_offset: parameters.page * parameters.pageSize || 0,
				_direction: parameters.direction || 'asc',
				searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined			}
		});
	}
	return service;
}];
