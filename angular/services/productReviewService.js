module.exports = function(common, util) {
	'ngInject';
	var service = common.Rest('/ProductReviews');
	service.updateApprove = function(obj) {
		return common.makeRequest({
			method: 'PUT',
			url: '/ProductReviews/Approve',
			data: obj
		});
	}
	service.approve = function(obj) {
		obj = _.map(obj, function(e) {
			e.Status = 'AP';
			return _.pick(e, ['Status', 'ProductReviewId']);
		});
		console.log(obj);
		return common.makeRequest({
			method: 'PUT',
			url: '/ProductReviews/Approve',
			data: obj
		});
	};	
	service.unapprove = function(obj) {
		obj = _.map(obj, function(e) {
			e.Status = 'WA';
			return _.pick(e, ['Status', 'ProductReviewId']);
		});
		return common.makeRequest({
			method: 'PUT',
			url: '/ProductReviews/Approve',
			data: obj
		});
	};	
	return service;
};