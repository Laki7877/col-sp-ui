module.exports = function(common, ShopPermissionService) {
	'ngInject';
	var service = common.Rest('/Shoptypes');

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		_.unset(processed, ['Permissions']);
		return processed;
	};

	service.deserialize = function(data) {
		var processed = _.merge({}, data);
		return processed;
	};
	service.generate = function() {
		var processed = {
			Permission: []
		};
		return processed;
	};
	return service;	
}