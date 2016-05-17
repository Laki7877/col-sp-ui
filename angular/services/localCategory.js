module.exports = ['common', function(common) {
	'use strict';
	var service = {};

	//Generate empty template
	service.generate = function(extend) {
		return angular.extend({
			NameEn: "",
			NameTh: "",
			UrlKeyEn: "",
			Visibility: true,
			nodes: []
		}, extend);
	}
	
	service.getProducts = function(catId, parameters) {
		return common.makeRequest({
			method: 'GET',
			url: '/LocalCategories/' + catId + '/ProductStages',
			params: {	
				_order: parameters.orderBy || 'ProductId',
				_limit: parameters.pageSize || 10,
				_offset: parameters.page * parameters.pageSize || 0,
				_direction: parameters.direction || 'asc',
				searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined
			}
		});
	}

	service.getOne = function(catId){
		return common.makeRequest({
			method: 'GET',
			url: '/LocalCategories/' + catId
		});
	}

	return service;
}];