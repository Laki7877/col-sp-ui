module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Permissions/Admin');

	return service;
}