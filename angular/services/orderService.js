module.exports = function(common) {
	'ngInject';
	service = common.Rest('/Orders');
	service.deserialize = function(data) {
		_.forEach(data.Products, function(e) {
			if(_.isUndefined(e.ShipQuantity)) {
				e.ShipQuantity = e.Quantity;
			}
		});
		return data;
	};
	service.getOrderCarrier = function() {
		return common.makeRequest({
			method: 'GET',
			url: '/Orders/Carriers'
		});
	}
	return service;
}