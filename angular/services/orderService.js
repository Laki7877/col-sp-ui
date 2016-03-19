module.exports = function(common) {
	'ngInject';
	service = common.Rest('/Orders');
	return service;
}