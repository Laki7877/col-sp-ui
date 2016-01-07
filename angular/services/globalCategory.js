module.exports = ['common', '$q' , function(common, $q) {
	'use strict';
	var service = {};

	/**
	 * Get all global cat
	 **/
	service.getAll = function() {
		return common.makeRequest({
			method: 'GET',
			url: '/GlobalCategories'
		});
	};

	return service;
}];