module.exports = function (common, config, util, $log, $window) {
    'ngInject';
    'use strict';

    var service = common.Rest('/Onboarding');

    service.getListCompletedTask = function () {
        return common.makeRequest({
            url: '/Onboarding',
            method: 'GET'
        });
    };

    service.launchShop = function() {
        return common.makeRequest({
            url: '/Shops/Launch?Status=AT',
            method: 'GET'
        });
    };

    service.getNewsLetter = function () {
        return common.makeRequest({
            url: '/newsletters',
            method: 'GET'
        });
    }

    service.getLowStockAlert = function () {
        return common.makeRequest({
            url: '/Inventories?_direction=desc&_filter=LowStock&_limit=10&_offset=0&_order=Pid',
            method: 'GET'
        });
    }

    return service;
};
