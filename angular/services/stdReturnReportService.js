module.exports = function (common, config, util) {
    'ngInject';

    var service = common.Rest('/StandardReport/GetReturnReport');

    service.getReturnReport = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/GetSearchReturnReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
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


    return service;
}