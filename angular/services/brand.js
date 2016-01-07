module.exports = ['$q', 'common', function($q, common){
	var service = {};
	service.getAll = function(q){
		return common.makeRequest({
			method: 'GET',
			url: '/Brands/' + (q ? '?searchText=' + q : '')
		});

	}
	return service;
}];
