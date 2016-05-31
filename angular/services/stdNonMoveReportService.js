module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/StandardReport/GetNonMoveReport');

    service.getNonMoveReport = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/GetSearchNonMoveReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.exportCsv = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/ExportNonMoveReport/',
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