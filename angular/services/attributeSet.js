module.exports = ['common', function(common){
	'use strict';
	var service = {};
	var find = function(array, value) {
		return array.find(function(element) {
			if (element.value === value) {
				return true;
			}
			return false;
		});
	};
	service.visibleOptions = [
		{
			name: 'No',
			value: 'NV'
		},
		{
			name: 'Yes',
			value: 'VI'
		}
	];
	service.getByCategory = function(catId){
		var req = {
			method: 'GET',
			url: '/GlobalCategories/' + catId + '/AttributeSets'
		};

		return common.makeRequest(req);	
	};
	service.get = function(id) {
		return common.makeRequest({
			method: 'GET',
			url: '/AttributeSets/' + id
		});
	};
	service.create = function(obj) {
		return common.makeRequest({
			method: 'POST',
			url: '/AttributeSets',
			data: obj
		});
	};
	service.update = function(id, obj) {
		return common.makeRequest({
			method: 'PUT',
			url: '/AttributeSets/' + id,
			data: obj
		});
	};
	service.getAll = function(parameters) {
		if(parameters) {
			return common.makeRequest({
				method: 'GET',
				url: '/AttributeSets',
				params: {
					_order: parameters.orderBy || 'AttributeSetId',
					_limit: parameters.pageSize || 0,
					_offset: parameters.page * parameters.pageSize || 0,
					_direction: parameters.direction || 'asc',
					_filter: parameters.filter || 'All',
					searchText: (parameters.searchText && parameters.searchText.length > 0 ) ? parameters.searchText : undefined			
				}
			});
		} else {
			return common.makeRequest({
				method: 'GET',
				url: '/AttributeSets'
			});
		}
	};
	service.generate = function() {
		return {
			AttributeSetNameEn: '',
			AttributeSetNameTh: '',
			AttributeSetDescriptionEn: '',
			AttributeSetDescriptionTh: '',
			Status: 'AT',
			Tags: []
		};
	};
	service.deserialize = function(data) {
		var processed = angular.copy(data);

		processed.Tags = [];
		processed.Status = processed.Status ? find(service.visibleOptions, processed.Status) : service.visibleOptions[0];
		angular.forEach(data.Tags, function(tag) {
			processed.Tags.push(tag.TagName);
		});
		angular.forEach(processed.Attributes, function(attr) {
			attr.Required = attr.Required || false;
			attr.Filterable = attr.Filterable || false;
		});
		return processed;
	};
	service.serialize = function(data) {
		var processed = angular.copy(data);

		processed.Tags = [];
		processed.Status = processed.Status.value;
		angular.forEach(data.Tags, function(tag) {
			processed.Tags.push({
				TagName: tag
			});
		});
		angular.forEach(processed.Attributes, function(attr) {
			attr.Required = attr.Required || false;
			attr.Filterable = attr.Filterable || false;
		});
		return processed;
	};
	return service;
}];
