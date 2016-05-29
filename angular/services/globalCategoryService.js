module.exports = function(common, $q, util) {
	'ngInject';
	service = common.Rest('/GlobalCategories');

	//Generate empty template
	service.generate = function(extend) {
		return angular.extend({
			NameEn: "",
			NameTh: "",
			UrlKeyEn: null,
			Commission: 0,
			Visibility: true,
			AttributeSets: [],
			CategoryBannerTh: [],
			CategoryBannerEn: [],
			TitleShowcase: false,
			BannerStatusEn: true,
			BannerStatusTh: true,
			BannerSmallStatusEn: true,
			BannerSmallStatusTh: true,
			FeatureProductStatus: true
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
			url: '/GlobalCategories',
			data: data
		});
	};

	service.shift = function(data) {
		return common.makeRequest({
			method: 'PUT',
			url: '/GlobalCategories/Shift',
			data: data
		});
	}

	service.getAllForSeller2 = function(treeArray) {
		var array = [];
		angular.forEach(treeArray, function(item) {
			if(item.Visibility)
				array.push(item);
		});
		return array;
	};
	service.getAllForSeller = function(treeArray) {
		var array = [];
		angular.forEach(treeArray, function(item) {
			array.push(item);
		});

		angular.forEach(treeArray, function(item) {
			if (item.Visibility == null || !item.Visibility) {
				array.splice(array.indexOf(item),1);
			} else {
				if(item.nodes.length == 0) {

				} else {
					item.nodes = service.getAllForSeller(item.nodes);
					if(item.nodes.length == 0) {
						array.splice(array.indexOf(item),1);
					}
				}
			}
		});
		return array;
	};
	return service;
};
