var angular = require('angular');
module.exports = ['common', function(common) {
	var service = common.Rest('/Coupons');
	return service;
}];
