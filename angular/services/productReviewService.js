module.exports = function(common, util) {
	'ngInject';
	var service = common.Rest('/ProductReviews');
	
	return service;
};