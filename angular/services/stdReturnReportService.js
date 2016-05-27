module.exports = function (common, config, util) {
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
            method: 'POST',
            url: '/StandardReport/ExportReturnReport',
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