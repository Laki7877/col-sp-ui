module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/SummaryReport/GetProductOnWeb');

    service.getProductOnWebReport = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/GetProductOnWebReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.exportCsv = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/ExportProductOnWebReport/',
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