var angular = require('angular');
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
	service.boolOptions = [
		{
			name: 'No',
			value: false
		},
		{
			name: 'Yes',
			value: true
		}
	];
	service.dataTypeOptions = [
		{
			name: 'Free Text',
			value: 'ST'
		},
		{
			name: 'Dropdown',
			value: 'LT'
		},
		{
			name: 'HTML Box',
			value: 'HB'
		}
	];
	service.validationOptions = [
		{
			name: 'No Validation',
			value: 'NO'
		},
		{
			name: 'Number Only',
			value: 'NUM'
		},
		{
			name: 'Text Only',
			value: 'TXT'
		},
		{
			name: 'Email Address',
			value: 'EML'
		},
		{
			name: 'Phone Number',
			value: 'PHO'
		}
	];
	service.get = function(id) {
		return common.makeRequest({
			method: 'GET',
			url: '/Attributes/' + id
		});
	};
	service.create = function(obj) {
		return common.makeRequest({
			method: 'POST',
			url: '/Attributes',
			data: obj
		});
	};
	service.delete = function(id) {
		return common.makeRequest({
			method: 'DELETE',
			url: '/Attributes/' + id
		});
	};
	service.deleteBulk = function(arr) {
		return common.makeRequest({
			method: 'DELETE',
			url: '/Attributes',
			data: arr,
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});
	};
	service.duplicate = function(id) {
		return common.makeRequest({
			method: 'POST',
			url: '/Attributes/' + id
		});
	};
	service.update = function(id, obj) {
		return common.makeRequest({
			method: 'PUT',
			url: '/Attributes/' + id,
			data: obj
		});
	};
	service.duplicate = function(id) {
		return common.makeRequest({
			method: 'POST',
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
			AttributeNameTh: '',
			DisplayNameEn: '',
			DisplayNameTh: '',
			DataValidation: service.validationOptions[0],
			DataType: service.dataTypeOptions[0],
			VariantStatus: service.boolOptions[0],
			HB: {
				DefaultValue: ''
			},
			LT: {
				AttributeValues: [{}]
			},
			ST: {
				AttributeUnitEn: '',
				AttributeUnitTh: '',
				DataValidation: service.validationOptions[0],
				DefaultValue: ''
			},
			ShowGlobalSearchFlag: service.boolOptions[0],
			ShowLocalSearchFlag: service.boolOptions[0],
			VariantDataType: service.dataTypeOptions[0]
		};
	};
	service.deserialize = function(data) {
		var processed = angular.merge(service.generate(), data);
		processed.VariantStatus = find(service.boolOptions,data.VariantStatus);
		processed.VariantDataType = find(service.dataTypeOptions,data.VariantDataType);
		processed.DataType = find(service.dataTypeOptions,data.DataType);
		processed.DataValidation = find(service.validationOptions, data.DataValidation);
		processed.ShowLocalSearchFlag = find(service.boolOptions, data.ShowLocalSearchFlag);
		processed.ShowGlobalSearchFlag = find(service.boolOptions, data.ShowGlobalSearchFlag);

		switch(data.DataType) {
			case 'ST':
				processed['ST'] = {
					AttributeUnitEn: data.AttributeUnitEn,
					AttributeUnitTh: data.AttributeUnitTh,
					DataValidation: data.DataValidation,
					DefaultValue: data.DefaultValue
				};
			break;
			case 'LT':
				processed['LT'] = {
					AttributeValues: data.AttributeValues
				};
			break;
			case 'HB':
				processed['HB'] = {
					DefaultValue: data.DefaultValue
				}
			break;
		}
		return processed;
	};
	service.serialize = function(data) {
		var processed = angular.extend(service.generate(), data);

		processed.VariantStatus = processed.VariantStatus ? processed.VariantStatus.value : undefined;
		processed.VariantDataType = processed.VariantDataType ? processed.VariantDataType.value : undefined;
		processed.DataType = processed.DataType ? processed.DataType.value : undefined;
		processed.ShowLocalSearchFlag = processed.ShowLocalSearchFlag ? processed.ShowLocalSearchFlag.value : undefined;
		processed.ShowGlobalSearchFlag = processed.ShowGlobalSearchFlag ? processed.ShowGlobalSearchFlag.value : undefined;

		switch(processed.DataType) {
			case 'ST':
				processed.AttributeUnitEn = data.ST.AttributeUnitEn;
				processed.AttributeUnitTh = data.ST.AttributeUnitTh;
				processed.DataValidation = data.ST.DataValidation.value;
				processed.DefaultValue = data.ST.DefaultValue;
			break;
			case 'LT':
				processed.AttributeValues = data.LT.AttributeValues;
			break;
			case 'HB':
				processed.DefaultValue = data.HB.DefaultValue;
			break;
		}

		angular.forEach(service.dataTypeOptions, function(item) {
			delete processed[item.value];
		});

		console.log(processed);
		
		return processed
	};
	return service;
}];
