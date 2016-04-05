module.exports = function(common) {
	var service = common.Rest('/Newsletters');

	service.generate = function() {
		return {
			VisibleShopGroup: 'All'
		};
	};
	service.deserialize = function(data) {
		return _.extend(this.generate(), data);
	};

	return service;
};