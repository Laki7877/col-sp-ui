angular.module('app.admin')
	.service('AttributeService', function(common) {
		var find = function(array, value) {
			return array.find(function(element) {
				if (element.value === value) {
					return true;
				}
				return false;
			});
		};
		this.boolOptions = [
			{
				name: 'No',
				value: false
			},
			{
				name: 'Yes',
				value: true
			}
		];
		this.variantOptions = [
			{
				name: 'Image',
				value: 'IO'
			},
			{
				name: 'Textbox',
				value: 'TO'
			},
			{
				name: 'Dropdown',
				value: 'DD'
			}
		];
		this.dataTypeOptions = [
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
		this.validationOptions = [
			{
				name: 'No Validation',
				value: 'NO'
			},
			{
				name: 'Number Only',
				value: 'NU'
			},
			{
				name: 'Text Only',
				value: 'TX'
			},
			{
				name: 'Email Address',
				value: 'EM'
			},
			{
				name: 'Phone Number',
				value: 'PH'
			}
		];
		this.get = function(id) {
			return common.makeRequest({
				method: 'GET',
				url: '/Attributes/' + id
			});
		};
		this.create = function(obj) {
			return common.makeRequest({
				method: 'POST',
				url: '/Attributes',
				data: obj
			});
		};
		this.delete = function(id) {
			return common.makeRequest({
				method: 'DELETE',
				url: '/Attributes/' + id
			});
		};
		this.deleteBulk = function(arr) {
			return common.makeRequest({
				method: 'DELETE',
				url: '/Attributes',
				data: arr,
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				}
			});
		};
		this.duplicate = function(id) {
			return common.makeRequest({
				method: 'POST',
				url: '/Attributes/' + id
			});
		};
		this.update = function(id, obj) {
			return common.makeRequest({
				method: 'PUT',
				url: '/Attributes/' + id,
				data: obj
			});
		};
		this.duplicate = function(id) {
			return common.makeRequest({
				method: 'POST',
				url: '/Attributes/' + id
			});
		};
		this.getAll = function(parameters) {
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
		this.generate = function() {
			return {
				AttributeNameEn: '',
				AttributeNameTh: '',
				DisplayNameEn: '',
				DisplayNameTh: '',
				DataValidation: this.validationOptions[0],
				DataType: this.dataTypeOptions[0],
				VariantStatus: this.boolOptions[0],
				HB: {
					DefaultValue: ''
				},
				LT: {
					AttributeValues: [{}]
				},
				ST: {
					AttributeUnitEn: '',
					AttributeUnitTh: '',
					DataValidation: this.validationOptions[0],
					DefaultValue: ''
				},
				ShowGlobalSearchFlag: this.boolOptions[0],
				ShowLocalSearchFlag: this.boolOptions[0],
				VariantDataType: this.variantOptions[0]
			};
		};
		this.deserialize = function(data) {
			var processed = angular.merge(this.generate(), data);
			processed.VariantStatus = find(this.boolOptions,data.VariantStatus);
			processed.VariantDataType = find(this.variantOptions,data.VariantDataType);
			processed.DataType = find(this.dataTypeOptions,data.DataType);
			processed.DataValidation = find(this.validationOptions, data.DataValidation);
			processed.ShowLocalSearchFlag = find(this.boolOptions, data.ShowLocalSearchFlag);
			processed.ShowGlobalSearchFlag = find(this.boolOptions, data.ShowGlobalSearchFlag);

			switch(data.DataType) {
				case 'ST':
					processed['ST'] = {
						AttributeUnitEn: processed.AttributeUnitEn,
						AttributeUnitTh: processed.AttributeUnitTh,
						DataValidation: processed.DataValidation,
						DefaultValue: processed.DefaultValue
					};
				break;
				case 'LT':
					processed['LT'] = {
						AttributeValues: processed.AttributeValues
					};
				break;
				case 'HB':
					processed['HB'] = {
						DefaultValue: processed.DefaultValue
					}
				break;
			}
			return processed;
		};
		this.serialize = function(data) {
			var processed = angular.extend(this.generate(), data);

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
					delete processed['AttributeValues'];
				break;
				case 'LT':
					processed.AttributeValues = data.LT.AttributeValues;
				break;
				case 'HB':
					processed.DefaultValue = data.HB.DefaultValue;
					delete processed['AttributeValues'];
				break;
			}

			angular.forEach(this.dataTypeOptions, function(item) {
				delete processed[item.value];
			});
			
			return processed
		};	
	});