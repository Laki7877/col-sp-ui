module.exports = function(common, util) {
	'ngInject';
	var service = common.Rest('/ProductTemps');

	return service;
};
