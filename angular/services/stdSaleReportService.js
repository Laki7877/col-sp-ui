module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport');

	service.getSaleReport = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/GetSaleReportForSeller/' + params
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/ExportSaleReportForSeller/' + params
	    });
	};

	return service;	
}