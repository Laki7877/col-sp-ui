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

    service.deserialize = function(data) {
        var processed = _.cloneDeep(data);
        processed.Data = angular.fromJson(processed.Data || '{}');
        return processed;
    }

    service.serialize = function(data) {
        var processed = _.cloneDeep(data);
        console.log(processed.Data);
        processed.Data = angular.toJson(processed.Data || {});
        
        return processed;
    }

    return service;
};