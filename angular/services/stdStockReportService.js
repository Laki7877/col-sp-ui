module.exports = function(common, config, util) {
    'ngInject';

	var service = common.Rest('/StandardReport/GetStockStatusReport');

	service.getStockReport = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/GetStockStatusReport/' + params
	    });
	};

	service.exportCsv = function (params) {
	    return common.makeRequest({
	        method: 'GET',
	        url: '/StandardReport/ExportStockStatusReport',
	        params: params
	    });
	};

	return service;	
}