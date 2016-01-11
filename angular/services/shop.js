module.exports = ['common', function(common) {
	'use strict';
	var service = {};

	service.getLocalCategories = function(id) {
		return common.makeRequest({
			url: '/Shops/' + id + '/LocalCategories',
			method: 'GET'
		});
	};
	service.upsertLocalCategories = function(id, data) {
		return common.makeRequest({
			url: '/Shops/' + id + '/LocalCategories',
			method: 'PUT',
			data: data
		});
	};

	return service;
}];