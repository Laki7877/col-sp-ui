module.exports = function(common, config, util) {
	var service = common.Rest('/Shops');

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		processed.Status = processed.Status.value;
		processed = _.omit(processed, ['Users'])
		return processed;
	};

	service.deserialize = function(data) {
		var processed = _.merge({}, data);
		processed.Status = util.getDropdownItem(config.DROPDOWN.DEFAULT_STATUS_DROPDOWN, processed.Status);
		return processed;
	};
	service.generate = function() {
		var processed = {
			Status: config.DROPDOWN.DEFAULT_STATUS_DROPDOWN[0],
			Shopowner: {},
			Users: []
		};
		return processed;
	};
	return service;	
}