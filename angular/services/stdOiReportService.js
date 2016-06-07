module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport/GetOiReport');

	service.getOiReport = function (params) {
	    return common.makeRequest({
	        method: 'POST',
	        url: '/StandardReport/GetOiReport/',
	        data: params,
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'POST',
	        url: '/StandardReport/ExportOiReport',
	        data: params,
	    });
	};

	return service;	
}