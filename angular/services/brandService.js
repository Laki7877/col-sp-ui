module.exports = function(common) {
	'ngInject';
	service = common.Rest('/Brands');
	service.generate = function(data) {
		return {
			BrandBannerEn: [],
			BrandBannerTh: [],
			IsDescription: false,
			BannerStatusEn: true,
			BannerStatusTh: true,
			BannerSmallStatusEn: true,
			BannerSmallStatusTh: true,
			FeatureProductStatus: true,
			Status: 'NA'
		};
	}
	service.deserialize = function(data) {
		var processed = _.extend(service.generate(), data);
		if(!_.isNil(data.BrandImage)) {
			processed.brandImage = data.BrandImage;
		}
		return processed;
	};

	service.serialize = function(data) {
		var processed = _.extend({}, data);
		_.unset(processed, ['brandImage']);
		return processed;
	};
	return service;
}