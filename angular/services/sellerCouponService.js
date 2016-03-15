module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Coupons');
	return service;
}