module.exports = function(common, config) {
	'ngInject';
	var service = common.Rest('/Attributes');
	var find = function(array, value) {
		return array.find(function(element) {
			if (element.value === value) {
				return true;
			}
			return false;
		});
	};
	var visibleToOptions = config.DROPDOWN.DEFAULT_ATTRIBUTE_VISIBLE_DROPDOWN;
	var boolOptions = config.DROPDOWN.YES_NO_DROPDOWN;
	var variantOptions = config.DROPDOWN.VARIANT_DROPDOWN;
	var dataTypeOptions = config.DROPDOWN.DATA_TYPE_DROPDOWN;
	var validationOptions = config.DROPDOWN.VALIDATION_DROPDOWN;
	service.generate = function() {
		return {
			AttributeNameEn: '',
			AttributeNameTh: '',
			DisplayNameEn: '',
			DisplayNameTh: '',
			Required: false,
			Filterable: false,
			DataValidation: validationOptions[0].value,
			DataType: dataTypeOptions[0].value,
			VariantStatus: false,
			HB: {
				DefaultValue: ''
			},
			LT: {
				DefaultValue: '',
				AttributeValues: [{}]
			},
			ST: {
				DataValidation: validationOptions[0].value,
				DefaultValue: ''
			},
			CB: {
				DefaultValue: '',
				AttributeValues: [{}]
			},
			DefaultAttribute: false,
			VisibleTo: visibleToOptions[0].value,
			ShowGlobalSearchFlag: false,
			ShowLocalSearchFlag: false,
			VariantDataType: variantOptions[0].value
		};
	};
	service.deserialize = function(data) {
		var processed = angular.merge(service.generate(), data);
		switch(data.DataType) {
			case 'ST':
				processed['ST'] = {
					DefaultValue: processed.DefaultValue
				};
			break;
			case 'LT':
				processed['LT'] = {
					AttributeValues: processed.AttributeValues,
					DefaultValue: processed.DefaultValue
				};
			break;
			case 'HB':
				processed['HB'] = {
					DefaultValue: processed.DefaultValue
				}
			break;
			case 'CB':
				processed['CB'] = {
					AttributeValues: processed.AttributeValues,
					DefaultValue: processed.DefaultValue
				};
			break;
		}
		return processed;
	};

	service.getDefaultAttributes = function(){
		return common.makeRequest({
			method: 'GET',
			url: '/Attributes/DefaultAttribute'
		});
	}
	
	service.serialize = function(data) {
		var processed = angular.extend(service.generate(), data);
		switch(processed.DataType) {
			case 'ST':
				processed.DefaultValue = data.ST.DefaultValue;
				delete processed['AttributeValues'];
			break;
			case 'LT':
				processed.AttributeValues = data.LT.AttributeValues;
				processed.DefaultValue = data.LT.DefaultValue;
			break;
			case 'HB':
				processed.DefaultValue = data.HB.DefaultValue;
				delete processed['AttributeValues'];
			break;
			case 'CB':
				processed.AttributeValues = data.CB.AttributeValues;
				processed.DefaultValue = data.CB.DefaultValue;
			break;
		}

		angular.forEach(dataTypeOptions, function(item) {
			delete processed[item.value];
		});
		return processed
	};
	return service;
};