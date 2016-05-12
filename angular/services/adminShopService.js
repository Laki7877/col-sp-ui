module.exports = function(common, config, util) {
	'ngInject';
	var service = common.Rest('/Shops');

	service.serialize = function(data) {
		var processed = _.merge({}, data);

		//Remove password if no length or undefined
		processed = _.omit(processed, ['Users']);
		processed.ShopType = _.pick(processed.ShopType, ['ShopTypeId']);
		processed.ShopOwner = _.omit(processed.ShopOwner, ['ConfirmPassword']);
		processed.ShopOwner = _.omitBy(processed.ShopOwner, ['Password'], function(e) {
			return _.isUndefined(e) || (e.length <= 0);
		});
		return processed;
	};

	service.getLocalCategories = function(ShopId){
		return common.makeRequest({
				method: 'GET',
				url: '/Shops/' + ShopId + '/LocalCategories'
		});
	}

	service.deserialize = function(data) {
		var processed = _.merge({}, data);
		_.remove(processed.Users, function(e) {
			return _.isEmpty(e);
		});
		return processed;
	};
	service.generate = function() {
		var processed = {
			Status: config.DROPDOWN.DEFAULT_STATUS_DROPDOWN[0].value,
			ShopOwner: {},
			Users: [],
			Commissions: [],
			GiftWrap: 'N',
			TaxInvoice: 'Y',
			StockAlert: 0
		};
		return processed;
	};
	return service;	
}