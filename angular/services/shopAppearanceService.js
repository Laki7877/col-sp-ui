module.exports = function (common, config, util) {
    'ngInject';
    var service = common.Rest('/Shops/ShopAppearance');
    	
    service.getThemes = function() {
    	return common.makeRequest({
    		method: 'GET',
    		url: '/Themes'
    	});
    };
    service.getTheme = function(id) {
    	return common.makeRequest({
    		method: 'GET',
    		url: '/Themes/' + id
    	});
    };

    return service;
};