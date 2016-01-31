module.exports = function(common) {
	var service = {};

	service.list = function(params) {
		return common.makeRequest({
			method: 'GET',
			url: '/Users/Admin',
			params: params
		})
	};

	service.get = function(id) {
		return common.makeRequest({
			method: 'GET',
			url: '/Users/Admin/' + id
		})
	};
	
	service.delete = function(array) {
		return common.makeRequest({
			method: 'DELETE',
			url: '/Users/Admin'
		})
	};
	return service;
};