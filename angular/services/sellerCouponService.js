module.exports = function(common) {
	'ngInject';
	var service = common.Rest('/Coupons');
    service.serialize = function(data) {
        var processed = _.merge({}, data);

        if(_.isArray(processed.Conditions.FilterBy.LocalCategories)) {
            processed.Conditions.FilterBy.LocalCategories = _.map(processed.Conditions.FilterBy.LocalCategories, function(e) {
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
                    Type: 'NoFilter'
                }],
                FilterBy: {
                    Type: 'NoFilter'
                }
            }
        }
    };
	return service;
}