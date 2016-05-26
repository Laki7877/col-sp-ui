module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Newsletters');

	service.generate = function() {
		return {
			VisibleShopGroup: 'AL',
			PublishedDt: moment(new Date()).add(1, 'minutes')
		};
	};
	service.serialize = function(data) {
		if(!data.PublishedDt) {
			data.PublishedDt = moment(new Date()).add(30, 'minutes');
		}
		if(!data.ExpiredDt) {
			data.ExpiredDt = moment(new Date()).add(20, 'years')
		}
		return data;
	};
	service.deserialize = function(data) {
		return _.extend(this.generate(), data);
	};

	return service;
};