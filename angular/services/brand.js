var angular = require('angular');
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
			url: '/Brands',
			params: _params
		});

	};
	service.deleteBulk = function(arr) {
		return common.makeRequest({
			method: 'DELETE',
			url: '/Brands',
			data: arr,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});
	};

	service.getOne = function(id){
		return common.makeRequest({
			method: 'GET',
			url: '/Brands/' + id
		});
	}

	service.update = function(id, obj){
		var mode = 'PUT';
		var path  = '/Brands/' + id;
		return common.makeRequest({
			method: mode,
		    url: path,
		    data: obj
		});
	};

	service.publish = function(tobj, Status){
		tobj.Status = Status;
		var mode = 'POST';
		var path  = '/Brands';
		return common.makeRequest({	
			method: mode,
		    url: path,
		    data: tobj
		});
	};

	service.deserialize = function(data) {
		var processed = angular.copy(data);
		if(angular.isDefined(processed.BrandImage) && processed.BrandImage != null) {
			processed.BrandImages = [processed.BrandImage];
		} else {
			processed.BrandImages = [];
		}
		console.log(processed);
		return processed;
	};

	service.serialize = function(data) {
		var processed = angular.copy(data);
		if(processed.BrandImages.length > 0) {
			processed.BrandImage = processed.BrandImages[0];
		} else {
			processed.BrandImage = null;
		}
		return processed;
	};
	return service;
}];