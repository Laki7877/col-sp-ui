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
    service.generate = function() {
        return {
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