module.exports = function(util) {
	'ngInject';
	var service = {};

	service.serialize = function(ownedPermissionsObject) {
		var result = [];
		var owned = _.merge({}, ownedPermissionsObject);

		_.forOwn(ownedPermissionsObject, function(v,k) {
			util.traverse(v, 'Children', function(e) {
				if(e.check) {
					_.unset(e, ['ParentNode']);
					result.push(e);
				}
			});
		});
		return result;
	};

	service.deserialize = function(ownedPermissions, allPermissions) {
		var data = _.merge({}, allPermissions);

		data = service.format(data);
		
		//Check the data
		_.forOwn(data, function(v,k) {
			data[k] = util.traverse(v, 'Children', function(e) {
				if(_.isUndefined(_.find(ownedPermissions, { PermissionId: e.PermissionId }))) {
					e.check = false;
				} else {
					e.check = true;
				}
			});
		});

		return data;
	};

	service.generate = function(allPermissions) {
		var data = _.merge({}, allPermissions);

		data = service.format(data);
		
		_.forOwn(data, function(v,k) {
			data[k] = util.traverse(v, 'Children', function(e) {
				e.check = false;
			});
		});

		return data;
	};

	service.format = function(data) {
		//Reformat data
		_.forEach(data, function(item1) {
				item1.Children = [];
				_.forEach(data, function(item2) {
					if(item1 != item2) {
						if(item2.Parent === item1.PermissionId) {
							item1.Children.push(item2);
							item2.ParentNode = item1;
						}
					}
				});
				_.sortBy(item1.Children, ['Position']);
			});

		data = _.filter(data, { Parent: 0 });
		data = _.groupBy(data, 'PermissionGroup');
	
		return data;
	};

	return service;
}