module.exports = ['common', function(common){
	'use strict';
	var service = {};
	service.getByCategory = function(catId){
		var req = {
			method: 'GET',
			url: '/AttributeSets/GetFromAttributeSetCat/' + catId
		};

		return common.makeRequest(req);	
	};


	return service;
}];
