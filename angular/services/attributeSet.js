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


	return service;
}];
