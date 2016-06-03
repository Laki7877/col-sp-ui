module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/SummaryReport/GetSKUNotEffective');

    service.getSKUNotEffectiveReport = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/GetSKUNotEffectiveReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.export = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/ExportSKUNotEffectiveReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

  return service;
}