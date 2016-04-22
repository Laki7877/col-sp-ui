module.exports = function(common, AdminPermissionService) {
	'ngInject';
	var service = common.Rest('/UserGroups/Admin');

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		_.remove(processed.Permission, function(e) {
			return !e.check;
		});
		processed.Permission = _.map(processed.Permission, function(e) {
				return _.pick(e, ['PermissionId']);
			});
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