module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Newsletters');

	service.generate = function() {
		return {
			VisibleShopGroup: 'AL',
			PublishedDt: moment(new Date()).toDate(),
			ExpiredDt: moment(new Date()).add(20, 'years').toDate()
		};
	};
	service.serialize = function(data) {
		if(!data.PublishedDt) {
			data.PublishedDt = moment(new Date()).toDate();
		}
		return data;
	};
	service.deserialize = function(data) {
		return _.extend(this.generate(), data);
	};

	return service;
}