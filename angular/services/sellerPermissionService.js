module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Permissions/Seller');
	
	return service;
}