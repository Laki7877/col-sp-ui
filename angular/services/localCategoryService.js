module.exports = function(common, $q, util) {
	'ngInject';
	var service = common.Rest('/LocalCategories');
	
	//Generate empty template
	service.generate = function(extend) {
		return angular.extend({
			NameEn: "",
			NameTh: "",
			UrlKeyEn: "",
			Commission: 0,
			Visibility: true,
			AttributeSets: []
		}, extend);
	};

	service.getAll = function() {
		return common.makeRequest({
			method: 'GET',
			url: '/LocalCategories'
		});
	};

	/**
	 * Upsert Global category
	 **/
	service.upsert = function(data) {
		return common.makeRequest({
			method: 'PUT',
			url: '/LocalCategories',
			data: data
		});
	};
	return service;
};
