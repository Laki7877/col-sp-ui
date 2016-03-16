module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Coupons');
	service.list = function(params) {
        return common.makeRequest({
            method: 'GET',
            url: '/Coupons',
            params: _.extend(params, {
            	IsGlobalCoupon: true
            })
        });
     };
    service.serialize = function(data) {
        var processed = _.merge({}, data);

        if(_.isArray(processed.Conditions.FilterBy.GlobalCategories)) {
            processed.Conditions.FilterBy.GlobalCategories = _.map(processed.Conditions.FilterBy.GlobalCategories, function(e) {
                return _.pick(e, ['CategoryId']);
            });
        }
        return processed;
    };
    service.generate = function() {
        return {
            Status: 'NA',
            Conditions: {
                Order: [{
                    Type: 'No filter'
                }],
                FilterBy: {
                    Type: 'No filter'
                }
            }
        }
    };
	return service;
}