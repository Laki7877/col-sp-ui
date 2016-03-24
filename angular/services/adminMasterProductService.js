module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/ProductStages/Master');
	return service;
};