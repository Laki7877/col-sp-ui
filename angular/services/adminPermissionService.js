module.exports = function(common, $q) {
	'ngInject';
	var service = common.Rest('/Permissions/Admin');
	return service;
}