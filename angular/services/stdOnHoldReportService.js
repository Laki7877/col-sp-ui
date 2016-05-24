module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport/GetItemOnHoldReport');

	service.getOnHoldReport = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/GetItemOnHoldReport/' + params
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/ExportItemOnHoldReport',
	        params: params
	    });
	};

	return service;	
}