module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/StandardReport/GetSaleReportForSeller');

	service.getSaleReport = function (params) {
	    return common.makeRequest({
	        method: 'POST',
	        url: '/StandardReport/GetSearchSaleReportForSeller/',
	        data: params,
	        headers: {
	            'Content-Type': 'application/json;charset=UTF-8'
	        }
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/ExportSaleReportForSeller/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
	    });
	};

	return service;	
}