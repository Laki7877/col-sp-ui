module.exports = function(common, SellerPermissionService) {
	'ngInject';
	var service = common.Rest('/UserGroups/Seller');

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
		SellerPermissionService.listAll()
			.then(function(data) {
				console.log(data);
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
		SellerPermissionService.listAll()
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