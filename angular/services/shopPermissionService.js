module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Permissions/Shop');

	return service;
}