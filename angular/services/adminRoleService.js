module.exports = function(common, AdminPermissionService) {
	'ngInject';
	var service = common.Rest('/UserGroups/Admin');

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		_.unset(processed, ['Permissions']);
		return processed;
	};

	service.deserialize = function(data) {
		var processed = _.merge({}, data);
		return processed;
	};
	service.generate = function() {
		var processed = {
			Permission: []
		};
		return processed;
	};
	return service;	
}