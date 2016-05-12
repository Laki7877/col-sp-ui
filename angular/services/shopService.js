module.exports = function(common) {
	'ngInject';
	var service = {};

	service.get = function(url, id) {
		return common.makeRequest({
			method: 'GET',
			url: '/' + url + (id ? '/' + id : '')
		});
	};

	return service;
}