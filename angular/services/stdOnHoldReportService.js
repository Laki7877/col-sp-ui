module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport/GetOnHoldReport');

	service.getOnHoldReport = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/GetOnHoldReport/' + params
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/ExportOnHoldReport',
	        params: params
	    });
	};

	return service;	
}