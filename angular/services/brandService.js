module.exports = function(common) {
	'ngInject';
	service = common.Rest('/Brands');
	service.generate = function(data) {
		return {
			BrandBannerEn: [],
			BrandBannerTh: [],
			IsBannerEn: false,
			IsBannerTh: false,
			IsSmallBannerEn: false,
			IsSmallBannerTh: false,
			IsDescription: false,
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