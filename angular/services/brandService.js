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
		return processed;
	};

	service.serialize = function(data) {
		var processed = angular.copy(data);
		return processed;
	};
	return service;
}