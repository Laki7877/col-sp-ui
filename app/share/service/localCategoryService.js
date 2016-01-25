angular.module('app.share')
	.service('LocalCategoryService', function(common) {
		//Generate empty template
		this.generate = function(extend) {
			return angular.extend({
				NameEn: "",
				NameTh: "",
				UrlKeyEn: "",
				Status: "AT",
				Visibility: true,
				ProductCount: 0,
				nodes: []
			}, extend);
		}
		
		this.getProducts = function(catId, parameters) {
			return common.makeRequest({
				method: 'GET',
				url: '/LocalCategories/' + catId + '/ProductStages',
				params: {	
					_order: parameters.orderBy || 'ProductId',
					_limit: parameters.pageSize || 10,
					_offset: parameters.page * parameters.pageSize || 0,
					_direction: parameters.direction || 'asc',
					searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined
				}
			});
		}

		this.getOne = function(catId){
			return common.makeRequest({
				method: 'GET',
				url: '/LocalCategories/' + catId
			});
		}
	});