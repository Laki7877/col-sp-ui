module.exports = function(common) {
	var service = common.Rest('/Newsletters');

	service.generate = function() {
		return {
			VisibleShopGroup: 'AL'
		};
	};
	service.deserialize = function(data) {
		return _.extend(this.generate(), data);
	};

	return service;
};