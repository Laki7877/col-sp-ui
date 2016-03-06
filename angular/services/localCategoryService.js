module.exports = function(common, $q, util) {
	'ngInject';
	var service = common.Rest('/LocalCategories');
	
	//Generate empty template
	service.generate = function(extend) {
		return angular.extend({
			NameEn: "",
			NameTh: "",
			UrlKeyEn: "",
			Visibility: true,
			CategoryBannerTh: [],
			CategoryBannerEn: []
		}, extend);
	};
	service.deserialize = function(data) {
		return _.extend(service.generate(), data);
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
