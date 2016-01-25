angular.module('app.admin')
	.service('AttributeSetService', function(common) {
		var find = function(array, value) {
			return array.find(function(element) {
				if (element.value === value) {
					return true;
				}
				return false;
			});
		};
		this.visibleOptions = [
			{
				name: 'Visible',
				value: true
			},
			{
				name: 'Not Visible',
				value: false
			}
		];
		this.getByCategory = function(catId){
			var req = {
				method: 'GET',
				url: '/GlobalCategories/' + catId + '/AttributeSets'
			};

			return common.makeRequest(req);	
		};
		this.delete = function(id) {
			return common.makeRequest({
				method: 'DELETE',
				url: '/AttributeSets/' + id
			});
		};
		this.duplicate = function(id) {
			return common.makeRequest({
				method: 'POST',
				url: '/AttributeSets/' + id
			});
		};
		this.visible = function(obj) {
			return common.makeRequest({
				method: 'PUT',
				url: '/AttributeSets/Visibility',
				data: obj,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});
		};
		this.deleteBulk = function(arr) {
			return common.makeRequest({
				method: 'DELETE',
				url: '/AttributeSets',
				data: arr,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});
		};
		this.get = function(id) {
			return common.makeRequest({
				method: 'GET',
				url: '/AttributeSets/' + id
			});
		};
		this.create = function(obj) {
			return common.makeRequest({
				method: 'POST',
				url: '/AttributeSets',
				data: obj
			});
		};
		this.update = function(id, obj) {
			return common.makeRequest({
				method: 'PUT',
				url: '/AttributeSets/' + id,
				data: obj
			});
		};
		this.getAll = function(parameters) {
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
		this.generate = function() {
			return {
				AttributeSetNameEn: '',
				AttributeSetNameTh: '',
				AttributeSetDescriptionEn: '',
				AttributeSetDescriptionTh: '',
				Visibility: true,
				Tags: []
			};
		};
		this.deserialize = function(data) {
			var processed = angular.merge(this.generate(), data);
			processed.Tags = [];
			//processed.Status = angular.isDefined(data.Visibility) ? find(this.visibleOptions, data.Visibility) : this.visibleOptions[0];

			if(angular.isUndefined(processed.Attributes)) {
				processed.Attributes = [];
			}
			angular.forEach(data.Tags, function(tag) {
				processed.Tags.push(tag.TagName);
			});
			angular.forEach(processed.Attributes, function(attr) {
				attr.Required = attr.Required || false;
				attr.Filterable = attr.Filterable || false;
			});
			return processed;
		};
		this.serialize = function(data) {
			var processed = angular.copy(data);
			processed.Tags = [];
			//processed.Visibility = processed.Status.value;
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
	});