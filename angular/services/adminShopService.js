module.exports = function(common, config, util) {
	'ngInject';
	var service = common.Rest('/Shops');

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		processed.Status = processed.Status.value;
		processed.ShopGroup = processed.ShopGroup.value;

		//Remove password if no length or undefined
		processed = _.omit(processed, ['Users']);
		processed.ShopType = _.pick(processed.ShopType, ['ShopTypeId']);
		processed.ShopOwner = _.omit(processed.ShopOwner, ['ConfirmPassword']);
		processed.ShopOwner = _.omitBy(processed.ShopOwner, ['Password'], function(e) {
			return _.isUndefined(e) || (e.length <= 0);
		});
		return processed;
	};

	service.deserialize = function(data) {
		var processed = _.merge({}, data);
		processed.Status = util.getDropdownItem(config.DROPDOWN.DEFAULT_STATUS_DROPDOWN, processed.Status);
		processed.ShopGroup = util.getDropdownItem(config.SHOP_GROUP, processed.ShopGroup);
		_.remove(processed.Users, function(e) {
			return _.isEmpty(e);
		});
		return processed;
	};
	service.generate = function() {
		var processed = {
			Status: config.DROPDOWN.DEFAULT_STATUS_DROPDOWN[0],
			ShopOwner: {},
			Users: [],
			Commissions: []
		};
		return processed;
	};
	return service;	
}