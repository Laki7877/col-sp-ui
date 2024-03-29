module.exports = function(common, $q, util) {
	'ngInject';
	var service = common.Rest('/LocalCategories');
	
    service.getAllByShopId = function(shopId){
        return common.makeRequest({
			method: 'GET',
			url: '/LocalCategories',
            params: {
                ShopId: shopId
            }
		});
    }
    
	//Generate empty template
	service.generate = function(extend) {
		return angular.extend({
			NameEn: "",
			NameTh: "",
			UrlKeyEn: "",
			Visibility: true,
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
			url: '/LocalCategories',
			data: data
		});
	};
	return service;
};