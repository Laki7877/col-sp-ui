module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/SummaryReport/GetSKUEffective');

    service.getSKUEffectiveReport = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/GetSKUEffectiveReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    service.export = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/SummaryReport/ExportSKUEffectiveReport/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

  return service;
}