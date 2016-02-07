module.exports = function(common, config) {
	'ngInject';
	var service = common.Rest('/AttributeSets');
	var visibleOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
	var find = function(array, value) {
		return array.find(function(element) {
			if (element.value === value) {
				return true;
			}
			return false;
		});
	};
	service.generate = function() {
		return {
			AttributeSetNameEn: '',
			AttributeSetNameTh: '',
			AttributeSetDescriptionEn: '',
			AttributeSetDescriptionTh: '',
			Visibility: true,
			Tags: []
		};
	};
	service.deserialize = function(data) {
		var processed = angular.merge(service.generate(), data);
		processed.Tags = [];

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
	service.serialize = function(data) {
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
	return service;
}