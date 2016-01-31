module.exports = function(common, AdminPermissionService) {
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
		AdminPermissionService.listAll()
			.then(function(data) {
				processed.Permission = _.map(data, function(e) {
					if(_.isUndefined(_.find(processed.Permission, { PermissionId: e.PermissionId }))) {
						e.check = false;
					} else {
						e.check = true;
					}
					return e;
				});
			});
		return processed;
	};
	service.generate = function() {
		var processed = {
			Permission: []
		};
		AdminPermissionService.listAll()
			.then(function(data) {
				processed.Permission = _.map(data, function(e) {
					e.check = false;
					return e;
				});
			});
		return processed;
	};
	return service;	
}