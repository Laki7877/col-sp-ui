module.exports = function (common) {
    'ngInject';
    var service = common.Rest('/Coupons');
    service.serialize = function (data) {
        var processed = _.merge({}, data);

        if (!_.isArray(processed.Conditions.Order)) {
            var object = angular.copy(processed.Conditions.Order);
            processed.Conditions.Order = [];
            angular.forEach(object, function (value, key) {
                processed.Conditions.Order.push(value);
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
                },
                Include: [],
                Exclude: []
            }
        }
    };
    return service;
}