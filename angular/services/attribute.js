module.exports = ['common', function(common){
	'use strict';
	var service = {};
	service.get = function(id) {
		return common.makeRequest({
			method: 'GET',
			url: '/Attributes/' + id
		});
	};
	service.create = function(obj) {
		return common.makeRequest({
			method: 'POST',
			url: '/Attributes'
		});
	};
	service.update = function(id, obj) {
		return common.makeRequest({
			method: 'PUT',
			url: '/Attributes/' + id
		});
	};
	service.getAll = function(parameters) {
		if(parameters) {
			return common.makeRequest({
				method: 'GET',
				url: '/Attributes',
				params: {
					_order: parameters.orderBy || 'AttributeId',
					_limit: parameters.pageSize || 10,
					_offset: parameters.page * parameters.pageSize || 0,
					_direction: parameters.direction || 'asc',
					_filter: parameters.filter || 'All',
					searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined			
				}
			});
		} else {
			return common.makeRequest({
				method: 'GET',
				url: '/Attributes'
			});
		}
	};
	service.generate = function() {
		return {
			AttributeNameEn: '',
			DisplayNameEn: '',
			DisplayNameTh: '',
			DataType: {
				name: 'Free Text',
				value: 'ST'
			},
			HB: {
				DefaultValue: ''
			},
			LS: {
				Options: [{}]
			},
			ST: {
				AttributeUnitEn: '',
				AttributeUnitTh: '',
				DataValidation: '',
				DefaultValue: ''
			},
			ShowGlobalSearchFlag: {
				name: 'No',
				value: false
			},
			ShowLocalSearchFlag: {
				name: 'No',
				value: false
			},
			VariantDataType: {
				name: 'Free Text',
				value: 'ST'
			},
			VariantDataType: {
				name: 'Free Text',
				value: 'ST'
			}
		};
	};
	service.deserialize = function(data) {
		var template = {
			HB: {},
			LS: {},
			ST: {}
		};
		
	};
	service.serialize = function(data) {
		
	};
	return service;
}];
