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
			IsRequired: boolOptions[0],
			Filterable: boolOptions[0],
			DataValidation: validationOptions[0],
			DataType: dataTypeOptions[0],
			VariantStatus: boolOptions[0],
			HB: {
				DefaultValue: ''
			},
			LT: {
				AttributeValues: [{}]
			},
			ST: {
				DataValidation: validationOptions[0],
				DefaultValue: ''
			},
			ShowGlobalSearchFlag: boolOptions[0],
			ShowLocalSearchFlag: boolOptions[0],
			VariantDataType: variantOptions[0]
		};
	};
	service.deserialize = function(data) {
		var processed = angular.merge(service.generate(), data);
		processed.VariantStatus = find(boolOptions,data.VariantStatus);
		processed.VariantDataType = find(variantOptions,data.VariantDataType);
		processed.DataType = find(dataTypeOptions,data.DataType);
		processed.DataValidation = find(validationOptions, data.DataValidation);
		processed.ShowLocalSearchFlag = find(boolOptions, data.ShowLocalSearchFlag);
		processed.ShowGlobalSearchFlag = find(boolOptions, data.ShowGlobalSearchFlag);
		processed.IsRequired = find(boolOptions, data.IsRequired) || boolOptions[0];
		processed.Filterable = find(boolOptions, data.Filterable) || boolOptions[0];

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
		processed.IsRequired = processed.IsRequired ? processed.IsRequired.value : undefined;
		processed.Filterable = processed.Filterable ? processed.Filterable.value : undefined;

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
		}

		angular.forEach(dataTypeOptions, function(item) {
			delete processed[item.value];
		});
		return processed
	};
	return service;
};