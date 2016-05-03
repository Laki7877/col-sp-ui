module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Users/Admin');

	service.generate = function() {
		return {
			
		};
	};

	service.serialize = function(data) {
		var processed = _.merge({}, data);
		
		processed.UserGroup = [processed.UserGroup];
		
		//Remove password if no length or undefined
		processed = _.omit(processed, ['ConfirmPassword']);
		processed = _.omitBy(processed, ['Password'], function(e) {
			return _.isUndefined(e) || (e.length <= 0);
		});
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