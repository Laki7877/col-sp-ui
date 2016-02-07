module.exports = function(common) {
	'ngInject';
	service = common.Rest('/Brands');
	service.generate = function(data) {
		return {
			BrandImages: []
		};
	}
	service.deserialize = function(data) {
		var processed = angular.copy(data);
		if(angular.isDefined(processed.BrandImage) && processed.BrandImage != null) {
			processed.BrandImages = [processed.BrandImage];
		} else {
			processed.BrandImages = [];
		}
		return processed;
	};

	service.serialize = function(data) {
		var processed = angular.copy(data);
		if(processed.BrandImages.length > 0) {
			processed.BrandImage = processed.BrandImages[0];
		} else {
			processed.BrandImage = null;
		}
		processed = _.omit(processed, ['BrandImages']);
		return processed;
	};
	return service;
}