module.exports = ['$q', 'common', function($q, common){
	var service = {};
	service.getAll = function(q){
		return common.makeRequest({
			method: 'GET',
			url: '/Brands/?_limit=5' + (q ? '&searchText=' + q : '')
		});

	}

	service.getOne = function(id){
		return common.makeRequest({
			method: 'GET',
			url: '/Brands/' + id
		});

	}
	return service;
}];
