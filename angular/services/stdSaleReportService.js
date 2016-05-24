module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/StandardReport/GetSaleReportForSeller');
    service.serialize = function (data) {
        var processed = _.merge({}, data);

        if (_.isArray(processed.Conditions.FilterBy.GlobalCategories)) {
            processed.Conditions.FilterBy.GlobalCategories = _.map(processed.Conditions.FilterBy.GlobalCategories, function (e) {
                return _.pick(e, ['CategoryId']);
            });
        }
        return processed;
    };
    service.generate = function () {
        return {
            Status: 'NA',
            Conditions: {
                Order: [{
                    Type: 'NoFilter'
                }],
                FilterBy: {
                    Type: 'NoFilter'
                }
            }
        }
    };

    service.getSaleReport = function (params) {
        return common.makeRequest({
            method: 'GET',
            url: '/StandardReport/GetSaleReportForSeller/' + params
        });
    };

    service.exportCsv = function (params) {
        return common.makeRequest({
            method: 'POST',
            url: '/StandardReport/ExportSaleReportForSeller/',
            data: params,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        });
    };

    return service;
}