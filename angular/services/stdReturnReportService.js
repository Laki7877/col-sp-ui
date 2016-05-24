module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport/GetReturnReport');

	service.getReturnReport = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/GetReturnReport/' + params
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/ExportReturnReport',
	        params: params
	    });
	};

	return service;	
}