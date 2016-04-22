module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Permissions/Admin');
	var _list = service.listAll;
	service.listAll = function() {
		var defer = $q.defer();
		_list().then(function(data) {
			_.forEach(data, function(item1) {
				item1.Children = [];
				_.forEach(data, function(item2) {
					if(item != item2) {
						if(item2.Parent == item1.PermissionId) {
							item1.Children.push(item2); 
						}
					}
				});
				_.sortBy(item1.Children, ['Position']);
			});
			_.remove(data, function(e) {
				return e.Parent != 0;
			});

			data = _.groupBy(data, 'PermissionGroup');

			defer.resolve(data);
		}, defer.reject);

		return defer.promise;
	}
	return service;
}