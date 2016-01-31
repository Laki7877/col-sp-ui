module.exports = function(common) {
	var service = common.Rest('/Users/Admin');

	service.generate = function() {
		return {
			UserGroup: {
				GroupNameEn: '-- Choose Admin Role --' //dummy
			}
		};
	};

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		
		processed.UserGroup = [processed.UserGroup];

		return processed;
	};

	service.deserialize = function(data) {
		var processed = _.merge({
			EmployeeId: "",
			Position: "",
			Division: ""
		}, data);

		processed.Phone = _.trim(processed.Phone);
		processed.UserGroup = processed.UserGroup[0];
		return processed;
	};
	return service;
};