module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/SummaryReport/GetSKUEffective');

    service.getAll = function (parameters) {
        var req = {
            method: 'GET',
            url: '/CMS/GetAllSKUEffective',
            params: {
                _order: parameters.orderBy || 'Category',
                _limit: parameters.pageSize || 10,
                _offset: parameters.page * parameters.pageSize || 0,
                _direction: parameters.direction || 'asc',
                _filter: parameters.filter || 'ALL',
                searchText: (parameters.searchText && parameters.searchText.length > 0) ? parameters.searchText : undefined
            }
        };

        return common.makeRequest(req);
    };

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