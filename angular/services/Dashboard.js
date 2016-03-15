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

    return service;
};
