module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Products/Master');
	return service;
};