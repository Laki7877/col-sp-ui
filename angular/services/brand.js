module.exports = ['$q', 'common', function($q, common){
	var service = {};
	//TODO: change searchText -> q
	//TODO: not clean
	service.getAll = function(params){

		var _params = {
			_limit: 5,
			_order: params.orderBy || 'BrandId',
			_limit: params.pageSize || 10,
			_offset: params.page * params.pageSize || 0,
			_direction: params.direction || 'asc'
		};

		if(params.searchText){
			_params.searchText = params.searchText;
		}

		return common.makeRequest({
			method: 'GET',
			url: '/Brands/',
			params: _params
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