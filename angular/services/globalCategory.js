module.exports = ['common', '$q' , function(common, $q) {
	'use strict';
	var service = {};

	//Generate empty template
	service.generate = function(extend) {
		return angular.extend({
			NameEn: "",
			NameTh: "",
			UrlKeyEn: "",
			Commission: 0,
			Status: "AT",
			Visibility: true,
			ProductCount: 0,
			AttributeSets: [],
			nodes: []
		}, extend);
	}

	/**
	 * Get all global cat
	 **/
	service.getAll = function() {
		return common.makeRequest({
			method: 'GET',
			url: '/GlobalCategories'
		});
	};

	/**
	 * Upsert Global category
	 **/
	service.upsert = function(data) {
		return common.makeRequest({
			method: 'PUT',
			url: '/GlobalCategories',
			data: data
		});
	};

	service.getAllForSeller = function(data) {
		//TODO: change this to user-validated visibility for seller...
		var array = [];
		angular.forEach(data, function(item) {
			if (item.Visibility) {
				array.push(item);
			}
		});
		return array;
	};
	return service;
}];