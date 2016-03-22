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
			Tags: [],
			Categories: 'None',
		};
	};
	service.deserialize = function(data) {
		var processed = angular.merge(service.generate(), data);
		processed.Tags = _.map(processed.Tags, function(e) {
			return _.pick(e, ['TagId', 'TagName']);
		});
		processed.Categories = _.join(_.map(data.Category, function(e) {
			return e.NameEn + ' (' + e.CategoryId + ')';
		}), ', ');
		if(processed.Categories.length == 0) {
			processed.Categories = 'None'; 
		}
		if(angular.isUndefined(processed.Attributes)) {
			processed.Attributes = [];
		}
		angular.forEach(processed.Attributes, function(attr) {
			attr.Required = attr.Required || false;
			attr.Filterable = attr.Filterable || false;
		});
		return _.omit(processed, ['Category']);
	};
	service.serialize = function(data) {
		var processed = angular.copy(data);
		processed.Tags = _.map(processed.Tags, function(e) {
			e.match = function(i) {
				return this.TagName.match(i);
			};
			return e;
		});
		angular.forEach(processed.Attributes, function(attr) {
			attr.Required = attr.Required || false;
			attr.Filterable = attr.Filterable || false;
		});
		return processed;
	};
	return service;
}