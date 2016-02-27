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
			return e;
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
			return e;
		});
		return common.makeRequest({
			method: 'PUT',
			url: '/ProductReviews/Approve',
			data: obj
		});
	};	
	return service;
};