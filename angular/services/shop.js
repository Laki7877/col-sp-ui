module.exports = ['common', function(common) {
	'use strict';
	var service = {};

	service.getLocalCategories = function(id) {
		return common.makeRequest({
			url: '/Shops/' + id + '/LocalCategories',
			method: 'GET'
		});
	}

	return service;
}];