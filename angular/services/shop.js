module.exports = ['common', function(common) {
	'use strict';
	var service = {};

	service.getLocalCategory = function(id) {
		common.makeRequest({
			url: '/Shops/' + id + '/LocalCategories',
			method: 'GET'
		});
	}

	return service;
}];