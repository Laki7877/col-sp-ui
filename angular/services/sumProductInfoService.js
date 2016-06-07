module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/SummaryReport/GetProductInfo');

    service.getProductInfoReport = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/GetProductInfoReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.exportCsv = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/ExportProductInfoReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.getAllCategory = function (parameters) {
        return common.makeRequest({
            method: 'GET',
            url: '/CMS/GetAllCategory',
            params: parameters
        });
    };
    return service;
}