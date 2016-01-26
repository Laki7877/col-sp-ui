angular.module('app')
	.service('AttributeService', function(common) {
		this.list = function(params) {
			return common.makeRequest({
				method: 'GET',
				url: '/Attributes',
				params: params
			})
		}
	});