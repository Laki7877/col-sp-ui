module.exports = function(common) {
	'ngInject';
	service = common.Rest('/Brands');
	service.generate = function(data) {
		return {
			BrandImages: [],
			BrandBannerEn: [],
			BrandBannerTh: []
		};
	}
	service.deserialize = function(data) {
		var processed = _.extend(service.generate(), data);
		return processed;
	};

	service.serialize = function(data) {
		var processed = _.extend({}, data);
		return processed;
	};
	return service;
}