module.exports = function(common, util) {
	'ngInject';
	var service = common.Rest('/ProductReviews');
	
	service.approve = function(obj) {
		return common.makeRequest({
			method: 'PUT',
			url: '/ProductReviews/Approve',
			data: obj
		});
	};	
	return service;
};