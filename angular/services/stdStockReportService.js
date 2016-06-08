module.exports = function (common, config, util) {
    'ngInject';

    var service = common.Rest('/StandardReport/GetStockStatusReport');

    service.getStockReport = function (params) {

        return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/GetSearchStockStatusReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.exportCsv = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/ExportStockStatusReport',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.getBrand = function (cateId) {
        return common.makeRequest({
            method: 'GET',
            url: '/CMS/GetBrand/' + cateId
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