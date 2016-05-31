module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport/GetOiReport');

	service.getOiReport = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/GetOiReport/' + params
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/ExportOiReport',
	        params: params
	    });
	};

	return service;	
}