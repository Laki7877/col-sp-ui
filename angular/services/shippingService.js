module.exports = function(common, $q, util) {
	'ngInject';
	var service = common.Rest('/Shippings');
	return service;
};