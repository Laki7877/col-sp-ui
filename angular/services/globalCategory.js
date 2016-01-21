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
	service.getAllForSeller = function(treeArray) {
		return treeArray;
		angular.forEach(treeArray, function(item) {
			if (item.Visibility) {
				treeArray.splice(treeArray.indexOf(item),1);
			} else {
				if(item.nodes.length == 0) {

				} else {
					item.nodes = service.getAllForSeller(item.nodes);
					if(item.nodes.length == 0) {
						treeArray.splice(treeArray.indexOf(item),1);
					}
				}
			}
		});
		return treeArray;
	};
	return service;
}];