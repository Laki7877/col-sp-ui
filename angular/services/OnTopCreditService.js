module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Promotion/Ontopcreate');
	return service;
};