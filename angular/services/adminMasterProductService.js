module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/ProductStages/Masters');
	return service;
};