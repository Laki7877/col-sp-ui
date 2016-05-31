module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Inventories');
	return service;
};